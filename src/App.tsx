import { useState, useCallback } from 'react';
import type { GameScreen, GameState, Clue, Detective } from './types/game';
import { LEVELS, getLevelById } from './data/levels';
import { getRank } from './utils/detective';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

import TitleScreen from './components/TitleScreen';
import DetectiveCreation from './components/DetectiveCreation';
import IntroSequence from './components/IntroSequence';
import DetectiveOffice from './components/DetectiveOffice';
import CaseBriefing from './components/CaseBriefing';
import Scene from './components/Scene';
import EvidenceBoard from './components/EvidenceBoard';
import Handbook from './components/Handbook';
import AccusationScreen from './components/AccusationScreen';
import CaseConclusion from './components/CaseConclusion';
import AllCasesComplete from './components/AllCasesComplete';

const STORAGE_DETECTIVE = 'ciu-detective-v1';
const STORAGE_INTRO = 'ciu-intro-v1';

function loadDetective(): Detective | null {
  try {
    const s = localStorage.getItem(STORAGE_DETECTIVE);
    if (!s) return null;
    const d = JSON.parse(s);
    if (!d.appearance) d.appearance = { skinTone: 2, hairStyle: 1, hairColor: 1, outfitColor: d.avatar ?? 0 };
    if (d.specialty === undefined) d.specialty = 0;
    return d;
  } catch { return null; }
}
function saveDetective(d: Detective) {
  localStorage.setItem(STORAGE_DETECTIVE, JSON.stringify(d));
}
function loadHasSeenIntro(): boolean {
  try { return localStorage.getItem(STORAGE_INTRO) === 'true'; }
  catch { return false; }
}

const init = (): GameState => {
  const detective = loadDetective();
  const hasSeenIntro = loadHasSeenIntro();
  return {
    screen: detective && hasSeenIntro ? 'detective-office' : 'title',
    detective,
    hasSeenIntro,
    currentLevel: 1,
    discoveredClues: [],
    accusationCorrect: null,
    pendingXP: 0,
  };
};

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

function AppInner() {
  const { lang } = useLanguage();
  const [state, setState] = useState<GameState>(init);
  const [overlay, setOverlay] = useState<'board' | 'handbook' | null>(null);

  const go = useCallback((screen: GameScreen) => setState((s) => ({ ...s, screen })), []);

  // Title → check for existing detective
  const handleNewGame = useCallback(() => {
    go('detective-creation');
  }, [go]);

  const handleContinue = useCallback(() => {
    go(state.detective ? 'detective-office' : 'detective-creation');
  }, [state.detective, go]);

  // Detective created → intro (first time) or office (returning)
  const handleDetectiveCreated = useCallback((detective: Detective) => {
    saveDetective(detective);
    setState((s) => ({ ...s, detective, screen: 'intro-sequence' }));
  }, []);

  const handleIntroComplete = useCallback(() => {
    localStorage.setItem(STORAGE_INTRO, 'true');
    setState((s) => ({ ...s, hasSeenIntro: true, screen: 'detective-office' }));
  }, []);

  const handleNewDetective = useCallback(() => {
    localStorage.removeItem(STORAGE_DETECTIVE);
    localStorage.removeItem(STORAGE_INTRO);
    setState((s) => ({ ...s, screen: 'title', detective: null, hasSeenIntro: false, currentLevel: 1, discoveredClues: [], accusationCorrect: null, pendingXP: 0 }));
  }, []);

  // Office → case briefing
  const handleSelectCase = useCallback((levelId: number) => {
    setState((s) => ({ ...s, currentLevel: levelId, screen: 'case-briefing' }));
  }, []);

  // Briefing → scene
  const handleBeginInvestigation = useCallback(() => {
    setState((s) => ({ ...s, screen: 'scene', discoveredClues: [], accusationCorrect: null, pendingXP: 0 }));
    setOverlay(null);
  }, []);

  const handleClueDiscovered = useCallback((clue: Clue) => {
    setState((s) => {
      if (s.discoveredClues.includes(clue.id)) return s;
      return { ...s, discoveredClues: [...s.discoveredClues, clue.id] };
    });
  }, []);

  // Accusation → calculate XP → conclusion
  const handleAccusation = useCallback((answerId: string) => {
    const level = getLevelById(state.currentLevel, lang);
    if (!level) return;
    const correct = answerId === level.correctAnswer;

    const requiredIds = level.clues.map((c) => c.id);
    const bonusIds = level.bonusClues.map((c) => c.id);
    const foundAll = requiredIds.every((id) => state.discoveredClues.includes(id));
    const foundBonus = bonusIds.filter((id) => state.discoveredClues.includes(id)).length;

    let xp = 20;
    if (correct) xp += level.xpReward ?? 50;
    if (foundAll) xp += 30;
    xp += foundBonus * 10;

    // Save progress immediately on correct accusation — don't wait for conclusion dismiss
    if (correct && state.detective) {
      const newXP = state.detective.xp + xp;
      const completedCases = state.detective.completedCases.includes(state.currentLevel)
        ? state.detective.completedCases
        : [...state.detective.completedCases, state.currentLevel];
      const updated = { ...state.detective, xp: newXP, rank: getRank(newXP), completedCases };
      saveDetective(updated);
      setState((s) => ({ ...s, detective: updated, screen: 'case-conclusion', accusationCorrect: correct, pendingXP: xp }));
    } else {
      setState((s) => ({ ...s, screen: 'case-conclusion', accusationCorrect: correct, pendingXP: xp }));
    }
    setOverlay(null);
  }, [state.currentLevel, state.discoveredClues, state.detective]);

  // Conclusion → office (XP already saved in handleAccusation)
  const handleConclusionComplete = useCallback(() => {
    if (!state.detective) { go('detective-office'); return; }
    const allComplete = state.accusationCorrect && LEVELS.every(l => state.detective!.completedCases.includes(l.id));
    go(allComplete ? 'all-cases-complete' : 'detective-office');
  }, [state.detective, state.accusationCorrect, go]);

  const handleRetry = useCallback(() => {
    setState((s) => ({ ...s, screen: 'scene', discoveredClues: [], accusationCorrect: null, pendingXP: 0 }));
    setOverlay(null);
  }, []);

  const level = getLevelById(state.currentLevel, lang) ?? LEVELS[0];

  return (
    <div className="relative overflow-hidden font-sans" style={{ width: '100vw', height: '100dvh' }}>

      <ScreenLayer active={state.screen === 'title'}>
        <TitleScreen
          onNewGame={handleNewGame}
          onCaseSelect={handleContinue}
          onHandbook={() => {
            setState((s) => ({ ...s, screen: 'scene', currentLevel: 1 }));
            setOverlay('handbook');
          }}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'detective-creation'}>
        <DetectiveCreation onComplete={handleDetectiveCreated} />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'intro-sequence'}>
        {state.detective && (
          <IntroSequence detective={state.detective} onComplete={handleIntroComplete} />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'detective-office'}>
        {state.detective && (
          <DetectiveOffice
            detective={state.detective}
            levels={LEVELS}
            onSelectCase={handleSelectCase}
            onNewDetective={handleNewDetective}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'case-briefing'}>
        {state.detective && (
          <CaseBriefing
            level={level}
            detective={state.detective}
            onBegin={handleBeginInvestigation}
            onBack={() => go('detective-office')}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'scene'}>
        <Scene
          level={level}
          discoveredClues={state.discoveredClues}
          detective={state.detective}
          onClueDiscovered={handleClueDiscovered}
          onOpenBoard={() => setOverlay('board')}
          onOpenHandbook={() => setOverlay('handbook')}
          onAccuse={() => go('accusation')}
          onExit={() => go('detective-office')}
        />
        {overlay === 'board' && (
          <EvidenceBoard
            clues={[...level.clues, ...level.bonusClues]}
            discoveredIds={state.discoveredClues}
            onClose={() => setOverlay(null)}
          />
        )}
        {overlay === 'handbook' && (
          <Handbook terms={level.handbookTerms} onClose={() => setOverlay(null)} />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'accusation'}>
        <Scene
          level={level}
          discoveredClues={state.discoveredClues}
          detective={state.detective}
          onClueDiscovered={handleClueDiscovered}
          onOpenBoard={() => setOverlay('board')}
          onOpenHandbook={() => setOverlay('handbook')}
          onAccuse={() => {}}
        />
        <AccusationScreen
          level={level}
          onSubmit={handleAccusation}
          onCancel={() => go('scene')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'case-conclusion'}>
        {state.detective && (
          <CaseConclusion
            level={level}
            detective={state.detective}
            correct={state.accusationCorrect ?? false}
            xpEarned={state.pendingXP}
            discoveredCount={state.discoveredClues.length}
            onComplete={handleConclusionComplete}
            onRetry={handleRetry}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'all-cases-complete'}>
        {state.detective && (
          <AllCasesComplete
            detective={state.detective}
            onComplete={() => go('detective-office')}
          />
        )}
      </ScreenLayer>

    </div>
  );
}

function ScreenLayer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-200"
      style={{ opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none', zIndex: active ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
