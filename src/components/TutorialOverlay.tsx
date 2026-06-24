import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../utils/responsive';

interface Props {
  onDone: () => void;
}

export default function TutorialOverlay({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const steps = [
    { title: t('tutorialStep1Title'), desc: t('tutorialStep1Desc'), icon: '🔍' },
    { title: t('tutorialStep2Title'), desc: t('tutorialStep2Desc'), icon: '📌' },
    { title: t('tutorialStep3Title'), desc: t('tutorialStep3Desc'), icon: '📓' },
    { title: t('tutorialStep4Title'), desc: t('tutorialStep4Desc'), icon: '⚖' },
  ];

  const isLast = step === steps.length - 1;
  const current = steps[step];

  const handleNext = () => {
    if (isLast) {
      onDone();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    onDone();
  };

  return (
    <div
      className="absolute z-40 fade-in"
      style={
        isMobile
          ? { bottom: 80, left: 10, right: 10 }
          : { bottom: 84, left: 24, maxWidth: 420 }
      }
    >
      <div
        style={{
          background: 'rgba(10,8,6,0.97)',
          border: '1px solid rgba(245,166,35,0.45)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.85), 0 0 24px rgba(245,166,35,0.07)',
          padding: isMobile ? '14px 16px' : '20px 24px',
        }}
      >
        {/* Step dots */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === step ? 18 : 6,
                  height: 4,
                  background: i === step ? 'var(--accent)' : i < step ? 'rgba(245,166,35,0.4)' : 'rgba(245,166,35,0.15)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <span
            className="font-detective"
            style={{ color: 'rgba(245,166,35,0.35)', fontSize: '0.52rem', letterSpacing: '0.2em' }}
          >
            {step + 1} / {steps.length}
          </span>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3 mb-4">
          <span style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', flexShrink: 0, marginTop: 2 }}>
            {current.icon}
          </span>
          <div>
            <div
              className="font-detective mb-1.5"
              style={{
                color: 'var(--accent)',
                fontSize: isMobile ? '0.68rem' : '0.74rem',
                letterSpacing: '0.1em',
              }}
            >
              {current.title}
            </div>
            <p
              className="font-sans"
              style={{
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.7,
                fontSize: isMobile ? '0.75rem' : '0.8rem',
              }}
            >
              {current.desc}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="font-detective tracking-widest uppercase"
            style={{
              color: 'rgba(255,255,255,0.18)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.58rem',
              letterSpacing: '0.15em',
              padding: '4px 0',
            }}
          >
            {t('tutorialSkip')}
          </button>
          <button
            onClick={handleNext}
            className="font-detective tracking-widest uppercase transition-all duration-200"
            style={{
              background: 'rgba(245,166,35,0.1)',
              border: '1px solid rgba(245,166,35,0.45)',
              color: 'var(--accent)',
              letterSpacing: '0.18em',
              fontSize: '0.65rem',
              padding: isMobile ? '7px 14px' : '8px 18px',
              cursor: 'pointer',
            }}
          >
            {isLast ? t('tutorialFinish') : t('tutorialNext')}
          </button>
        </div>
      </div>

      {/* Corner accent lines */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: 12, height: 12, borderTop: '2px solid rgba(245,166,35,0.5)', borderLeft: '2px solid rgba(245,166,35,0.5)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, right: 0, width: 12, height: 12, borderTop: '2px solid rgba(245,166,35,0.5)', borderRight: '2px solid rgba(245,166,35,0.5)' }}
      />
    </div>
  );
}
