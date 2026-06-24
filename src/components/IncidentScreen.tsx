import { useState, useEffect } from 'react';
import type { LevelIncidentScreen } from '../types/game';
import { useIsMobile } from '../utils/responsive';

interface Props {
  incident: LevelIncidentScreen;
  levelId: number;
  onComplete: () => void;
}

const AUTO_ADVANCE_MS = 5500;

export default function IncidentScreen({ incident, levelId, onComplete }: Props) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(Math.ceil(AUTO_ADVANCE_MS / 1000));

  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const c = incident.content;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(10,8,18,0.97) 0%, #050408 100%)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
      onClick={onComplete}
    >
      <div className="scanlines absolute inset-0 pointer-events-none opacity-40" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-center gap-4">
        <div style={{ height: 1, width: isMobile ? 40 : 80, background: 'rgba(200,60,50,0.4)' }} />
        <span className="font-detective" style={{ color: 'rgba(200,60,50,0.7)', fontSize: '0.55rem', letterSpacing: '0.35em' }}>
          RECORDED INCIDENT · CASE {String(levelId).padStart(2, '0')}
        </span>
        <div style={{ height: 1, width: isMobile ? 40 : 80, background: 'rgba(200,60,50,0.4)' }} />
      </div>

      {/* Device mockup */}
      <div style={{ transform: `scale(${mounted ? 1 : 0.9}) translateY(${mounted ? 0 : 20}px)`, transition: 'transform 0.5s ease', width: '100%', maxWidth: isMobile ? 340 : 480, padding: isMobile ? '0 16px' : 0 }}>
        {incident.type === 'sms' && <SMSMockup c={c} isMobile={isMobile} />}
        {incident.type === 'chat' && <ChatMockup c={c} isMobile={isMobile} />}
        {incident.type === 'email' && <EmailMockup c={c} isMobile={isMobile} />}
        {incident.type === 'notification' && <NotificationMockup c={c} isMobile={isMobile} />}
        {incident.type === 'social' && <SocialMockup c={c} isMobile={isMobile} />}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 flex items-center gap-6">
        <span className="font-detective" style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.52rem', letterSpacing: '0.25em' }}>
          CLICK TO CONTINUE
        </span>
        <span className="font-detective" style={{ color: 'rgba(200,60,50,0.5)', fontSize: '0.52rem', letterSpacing: '0.2em' }}>
          {countdown}s
        </span>
      </div>
    </div>
  );
}

function SMSMockup({ c, isMobile }: { c: Record<string, string>; isMobile: boolean }) {
  return (
    <div style={{
      background: 'rgba(14,14,20,0.95)',
      border: '2px solid rgba(255,255,255,0.1)',
      borderRadius: 24,
      padding: isMobile ? '14px 10px 20px' : '18px 14px 24px',
      boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(60,120,220,0.06)',
      position: 'relative',
    }}>
      {/* Phone notch */}
      <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, margin: '0 auto 12px' }} />
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px', marginBottom: 12, fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
        <span>{c.time ?? '07:43'}</span>
        <span>DHL ·· ▲</span>
      </div>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 10, marginBottom: 14 }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{c.sender ?? 'DHL Express'}</div>
        <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>{c.senderNumber ?? ''}</div>
      </div>
      {/* Message bubble */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 6px' }}>
        <div style={{
          background: 'rgba(40,40,50,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px 16px 16px 4px',
          padding: '10px 14px',
          maxWidth: '88%',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? '0.72rem' : '0.8rem', lineHeight: 1.6, fontFamily: 'sans-serif', margin: 0 }}>
            {c.message}
          </p>
          <div style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.25)', marginTop: 6, fontFamily: 'monospace', textAlign: 'right' }}>
            {c.time ?? '07:43'}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMockup({ c, isMobile }: { c: Record<string, string>; isMobile: boolean }) {
  return (
    <div style={{
      background: 'rgba(32,34,37,0.97)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 0 80px rgba(0,0,0,0.8)',
    }}>
      {/* Discord-style header */}
      <div style={{ background: 'rgba(24,25,28,0.9)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5865F2', boxShadow: '0 0 8px #5865F250' }} />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}># {c.context ?? 'gaming-lounge'}</span>
      </div>
      {/* Message */}
      <div style={{ padding: '16px 14px', display: 'flex', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.avatarColor ?? '#5865F2', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 0 12px rgba(88,101,242,0.3)' }}>
          🎮
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ color: '#7289DA', fontSize: '0.72rem', fontFamily: 'sans-serif', fontWeight: 600 }}>{c.sender ?? 'LucasBFF99'}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem', fontFamily: 'monospace' }}>Today at {c.time ?? '22:18'}</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? '0.72rem' : '0.8rem', lineHeight: 1.6, fontFamily: 'sans-serif', margin: 0 }}>
            {c.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmailMockup({ c, isMobile }: { c: Record<string, string>; isMobile: boolean }) {
  return (
    <div style={{
      background: 'rgba(18,20,28,0.97)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 6,
      overflow: 'hidden',
      boxShadow: '0 0 80px rgba(0,0,0,0.8)',
    }}>
      {/* Email header */}
      <div style={{ background: 'rgba(10,12,18,0.9)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 6 }}>INCOMING MESSAGE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 10px', fontSize: '0.6rem', fontFamily: 'monospace' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>FROM</span>
          <span style={{ color: 'rgba(180,100,100,0.9)' }}>{c.from}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>TO</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{c.to}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>SUBJ</span>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>{c.subject}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>TIME</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>{c.time}</span>
        </div>
      </div>
      {/* Email body */}
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: isMobile ? '0.72rem' : '0.78rem', lineHeight: 1.7, fontFamily: 'sans-serif', margin: 0 }}>
          {c.preview}
        </p>
        {c.count && (
          <div style={{ marginTop: 12, background: 'rgba(200,60,50,0.12)', border: '1px solid rgba(200,60,50,0.25)', padding: '6px 10px', display: 'inline-block', borderRadius: 3 }}>
            <span style={{ color: 'rgba(200,100,90,0.9)', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{c.count}</span>
          </div>
        )}
      </div>
      {c.note && (
        <div style={{ padding: '8px 16px', background: 'rgba(245,166,35,0.05)' }}>
          <span style={{ color: 'rgba(245,166,35,0.55)', fontSize: '0.5rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>⚠ {c.note}</span>
        </div>
      )}
    </div>
  );
}

function NotificationMockup({ c, isMobile }: { c: Record<string, string>; isMobile: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Windows AutoPlay notification */}
      <div style={{
        background: 'rgba(30,32,42,0.97)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 6,
        padding: '16px 20px',
        width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, background: 'rgba(0,120,212,0.8)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
            💾
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontFamily: 'sans-serif', fontWeight: 600 }}>{c.title}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.55rem', fontFamily: 'monospace' }}>{c.subtitle}</div>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontFamily: 'sans-serif', margin: '0 0 14px 0', lineHeight: 1.5 }}>{c.message}</p>
        {/* Option */}
        <div style={{
          background: 'rgba(0,120,212,0.12)',
          border: '1px solid rgba(0,120,212,0.4)',
          padding: '8px 12px',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'default',
        }}>
          <span style={{ fontSize: '0.9rem' }}>⚙️</span>
          <span style={{ color: 'rgba(100,180,255,0.85)', fontSize: isMobile ? '0.6rem' : '0.65rem', fontFamily: 'sans-serif' }}>{c.option}</span>
        </div>
        <div style={{ marginTop: 8, textAlign: 'right', color: 'rgba(255,255,255,0.2)', fontSize: '0.48rem', fontFamily: 'monospace' }}>{c.time}</div>
      </div>
    </div>
  );
}

function SocialMockup({ c, isMobile }: { c: Record<string, string>; isMobile: boolean }) {
  return (
    <div style={{
      background: 'rgba(15,20,25,0.97)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '16px',
      boxShadow: '0 0 80px rgba(0,0,0,0.8)',
    }}>
      {/* X/Twitter header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(30,40,60,0.9)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          💀
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontFamily: 'sans-serif', fontWeight: 700 }}>{c.username}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem', fontFamily: 'monospace' }}>{c.handle}</div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem', fontFamily: 'monospace' }}>𝕏</div>
          </div>
        </div>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? '0.8rem' : '0.9rem', lineHeight: 1.65, fontFamily: 'sans-serif', margin: '0 0 12px 0' }}>
        {c.message}
      </p>
      {/* Engagement row */}
      <div style={{ display: 'flex', gap: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
        {[
          { icon: '💬', count: '0' },
          { icon: '🔁', count: c.retweets ?? '0' },
          { icon: '♥', count: c.likes ?? '3' },
        ].map(({ icon, count }) => (
          <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', fontFamily: 'monospace' }}>
            <span>{icon}</span><span>{count}</span>
          </div>
        ))}
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', fontSize: '0.52rem', fontFamily: 'monospace' }}>{c.time}</span>
      </div>
    </div>
  );
}
