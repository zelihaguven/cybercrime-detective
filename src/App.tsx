import { useState, useCallback } from 'react';
import type { GameScreen, GameState, Clue, Detective } from './types/game';
import { LEVELS, getLevelById } from './data/levels';
import { getRank } from './utils/detective';
import { checkNewBadges } from './data/badges';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LangToggle from './components/LangToggle';

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
import MultiplayerModal from './components/multiplayer/MultiplayerModal';
import CreateRoom from './components/multiplayer/CreateRoom';
import JoinRoom from './components/multiplayer/JoinRoom';
import RoomLobby from './components/multiplayer/RoomLobby';
import MultiplayerGame from './components/multiplayer/MultiplayerGame';
import MultiplayerResult from './components/multiplayer/MultiplayerResult';
import { getOrCreatePlayerId } from './utils/roomCode';

const STORAGE_DETECTIVE = 'ciu-detective-v1';
const STORAGE_INTRO = 'ciu-intro-v1';

function loadDetective(): Detective | null {
  try {
    const s = localStorage.getItem(STORAGE_DETECTIVE);
    if (!s) return null;
    const d = JSON.parse(s);
    if (!d.appearance) d.appearance = { skinTone: 2, hairStyle: 1, hairColor: 1, outfitColor: d.avatar ?? 0 };
    if (d.specialty === undefined) d.specialty = 0;
    if (!d.earnedBadges) d.earnedBadges = [];
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
    pendingSpecialtyBonus: 0,
    pendingBadges: [],
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

  // Multiplayer state
  const [mpRoomCode, setMpRoomCode] = useState<string | null>(null);
  const [mpPlayerId] = useState<string>(getOrCreatePlayerId);

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
    const foundAllBonus = bonusIds.length > 0 && foundBonus === bonusIds.length;

    // Specialty bonus: +5 XP per discovered clue matching the detective's specialty type
    const SPECIALTY_CLUE_TYPES = ['screenshot', 'witness', 'note', 'photo'] as const;
    const specialtyClueType = state.detective ? SPECIALTY_CLUE_TYPES[state.detective.specialty ?? 0] : null;
    const allLevelClues = [...level.clues, ...level.bonusClues];
    const specialtyBonus = specialtyClueType
      ? allLevelClues.filter((c) => c.type === specialtyClueType && state.discoveredClues.includes(c.id)).length * 5
      : 0;

    let xp = 20;
    if (correct) xp += level.xpReward ?? 50;
    if (foundAll) xp += 30;
    xp += foundBonus * 10;
    xp += specialtyBonus;

    const soloCases = LEVELS.filter((l) => !l.multiplayerOnly);

    // Save progress immediately on correct accusation — don't wait for conclusion dismiss
    if (correct && state.detective) {
      const newXP = state.detective.xp + xp;
      const completedCases = state.detective.completedCases.includes(state.currentLevel)
        ? state.detective.completedCases
        : [...state.detective.completedCases, state.currentLevel];
      const newBadges = checkNewBadges({
        correct,
        foundAll,
        foundAllBonus,
        newXP,
        newCompletedSoloCases: completedCases.filter((id) => soloCases.some((l) => l.id === id)),
        totalSoloCases: soloCases.length,
        alreadyEarned: state.detective.earnedBadges ?? [],
      });
      const earnedBadges = [...(state.detective.earnedBadges ?? []), ...newBadges];
      const updated = { ...state.detective, xp: newXP, rank: getRank(newXP), completedCases, earnedBadges };
      saveDetective(updated);
      setState((s) => ({ ...s, detective: updated, screen: 'case-conclusion', accusationCorrect: correct, pendingXP: xp, pendingSpecialtyBonus: specialtyBonus, pendingBadges: newBadges }));
    } else {
      // Wrong accusation — still check clue-finding badges
      const newBadges = state.detective ? checkNewBadges({
        correct: false,
        foundAll,
        foundAllBonus,
        newXP: state.detective.xp,
        newCompletedSoloCases: state.detective.completedCases.filter((id) => soloCases.some((l) => l.id === id)),
        totalSoloCases: soloCases.length,
        alreadyEarned: state.detective.earnedBadges ?? [],
      }) : [];
      if (newBadges.length > 0 && state.detective) {
        const earnedBadges = [...(state.detective.earnedBadges ?? []), ...newBadges];
        const updated = { ...state.detective, earnedBadges };
        saveDetective(updated);
        setState((s) => ({ ...s, detective: updated, screen: 'case-conclusion', accusationCorrect: correct, pendingXP: xp, pendingSpecialtyBonus: specialtyBonus, pendingBadges: newBadges }));
      } else {
        setState((s) => ({ ...s, screen: 'case-conclusion', accusationCorrect: correct, pendingXP: xp, pendingSpecialtyBonus: specialtyBonus, pendingBadges: [] }));
      }
    }
    setOverlay(null);
  }, [state.currentLevel, state.discoveredClues, state.detective]);

  // Conclusion → office (XP already saved in handleAccusation)
  const handleConclusionComplete = useCallback(() => {
    if (!state.detective) { go('detective-office'); return; }
    const allComplete = state.accusationCorrect && LEVELS.filter(l => !l.multiplayerOnly).every(l => state.detective!.completedCases.includes(l.id));
    go(allComplete ? 'all-cases-complete' : 'detective-office');
  }, [state.detective, state.accusationCorrect, go]);

  const handleRetry = useCallback(() => {
    setState((s) => ({ ...s, screen: 'scene', discoveredClues: [], accusationCorrect: null, pendingXP: 0, pendingSpecialtyBonus: 0, pendingBadges: [] }));
    setOverlay(null);
  }, []);

  const level = getLevelById(state.currentLevel, lang) ?? LEVELS[0];
  const translatedLevels = LEVELS.filter((l) => !l.multiplayerOnly).map((l) => getLevelById(l.id, lang) ?? l);

  return (
    <div className="app-root relative overflow-hidden font-sans" style={{ width: '100vw' }}>
      <LangToggle />

      <ScreenLayer active={state.screen === 'title'}>
        <TitleScreen
          onNewGame={handleNewGame}
          onCaseSelect={handleContinue}
          onHandbook={() => setOverlay('handbook')}
          onMultiplayer={() => go('mp-modal')}
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
            levels={translatedLevels}
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
            specialtyBonus={state.pendingSpecialtyBonus}
            newBadges={state.pendingBadges}
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

      {/* ── Multiplayer screens ── */}
      <ScreenLayer active={state.screen === 'mp-modal'}>
        <MultiplayerModal
          onCreate={() => go('mp-create')}
          onJoin={() => go('mp-join')}
          onBack={() => go('title')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'mp-create'}>
        <CreateRoom
          onRoomCreated={(code) => {
            setMpRoomCode(code);
            go('mp-lobby');
          }}
          onBack={() => go('mp-modal')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'mp-join'}>
        <JoinRoom
          onRoomJoined={(code) => {
            setMpRoomCode(code);
            go('mp-lobby');
          }}
          onBack={() => go('mp-modal')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'mp-lobby'}>
        {mpRoomCode && (
          <RoomLobby
            roomCode={mpRoomCode}
            playerId={mpPlayerId}
            onGameStarted={() => go('mp-game')}
            onLeave={() => { setMpRoomCode(null); go('mp-modal'); }}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'mp-game'}>
        {mpRoomCode && (
          <MultiplayerGame
            roomCode={mpRoomCode}
            playerId={mpPlayerId}
            onResult={() => go('mp-result')}
            onLeave={() => { setMpRoomCode(null); go('mp-modal'); }}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'mp-result'}>
        {mpRoomCode && (
          <MultiplayerResult
            roomCode={mpRoomCode}
            playerId={mpPlayerId}
            onPlayAgain={() => go('mp-lobby')}
            onReturnTitle={() => { setMpRoomCode(null); go('title'); }}
          />
        )}
      </ScreenLayer>

      {/* Global handbook overlay — works from any screen */}
      {overlay === 'handbook' && (
        <div className="absolute inset-0" style={{ zIndex: 100 }}>
          <Handbook terms={level.handbookTerms} onClose={() => setOverlay(null)} />
        </div>
      )}

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
