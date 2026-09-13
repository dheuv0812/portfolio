import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

/* ── tiny star canvas ──────────────────────────────────────────────────────── */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.2,
      s: Math.random() * 0.02 + 0.004,
      p: Math.random() * Math.PI * 2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const t = performance.now() / 1000;
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.5 + 0.5 * Math.sin(t * s.s * 10 + s.p))})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

/* ── horizontal saber blade ────────────────────────────────────────────────── */
function SaberLine({ width = 180 }: { width?: number }) {
  const colour = 'var(--sw-saber)';
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-4 rounded-[2px] border-2 border-[#444] flex items-center justify-center"
        style={{ background: '#222' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: colour, boxShadow: `0 0 4px ${colour}` }} />
      </div>
      <div className="h-[3px] rounded-full" style={{
        width,
        background: `linear-gradient(to right, #fff 0%, ${colour} 20%, ${colour}60 100%)`,
        boxShadow: `0 0 6px 2px ${colour}80, 0 0 16px 3px ${colour}40`,
      }} />
    </div>
  );
}

/* ── neobrutalist stat pill ─────────────────────────────────────────────────── */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-black px-4 py-2 flex flex-col items-center"
      style={{ 
        background: 'var(--sw-yellow)', 
        boxShadow: '3px 3px 0 #000', 
        fontFamily: '"Arial Black", Impact, sans-serif' 
      }}>
      <span className="text-black text-xl font-black leading-none">{value}</span>
      <span className="text-black/60 text-[8px] font-black uppercase tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

/* ── main hero ─────────────────────────────────────────────────────────────── */
export function HeroStarWars() {
  const { activeTheme } = useTheme();
  const isSith = activeTheme.id === 'sith';
  const headShadow = Array.from({ length: 6 }, (_, i) => `${i+1}px ${i+1}px 0 #000`).join(',');

  return (
    <section
      id="home"
      className="snap-start relative w-full overflow-hidden flex flex-col justify-between"
      style={{ background: 'var(--sw-bg)', minHeight: 'calc(100svh - 32px)' }}
    >
      <Starfield />

      {/* ── ISSUE badge & WIP Status Banner — top left ─────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-[60px] flex flex-wrap items-center gap-4">
        <div className="flex items-stretch gap-0 w-fit border-2"
          style={{ borderColor: 'var(--sw-yellow)', boxShadow: '4px 4px 0 var(--sw-yellow)' }}>
          <div className="px-3 py-2 border-r-2"
            style={{ background: 'var(--sw-yellow)', borderColor: 'var(--sw-yellow)' }}>
            <p className="text-black font-black text-[10px] uppercase tracking-widest leading-none">ISSUE</p>
            <p className="text-black font-black text-2xl leading-none">#001</p>
          </div>
          <div className="px-4 py-2 flex flex-col justify-center">
            <p className="font-black text-xs uppercase tracking-wider leading-none" style={{ color: 'var(--sw-yellow)' }}>
              {isSith ? 'THE SITH LORD' : 'THE JEDI DEVELOPER'}
            </p>
            <p className="font-bold text-[11px] uppercase tracking-wider leading-none mt-1" style={{ color: 'var(--sw-white)', opacity: 0.85 }}>
              EST. A LONG TIME AGO IN A GALAXY FAR AWAY
            </p>
          </div>
        </div>

        {/* WIP Skin & Theme Mode Pill */}
        <div
          className="px-3.5 py-2 border-2 flex items-center gap-2"
          style={{
            borderColor: 'var(--sw-yellow)',
            background: 'color-mix(in srgb, var(--sw-yellow) 10%, transparent)',
            boxShadow: '3px 3px 0 #000',
            fontFamily: 'monospace',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--sw-yellow)' }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--sw-yellow)' }}>
            🚧 FORCE SKIN (WIP PREVIEW) • {isSith ? 'SITH THEME MODE' : 'JEDI THEME MODE'}
          </span>
        </div>
      </div>

      {/* ── Main content grid ───────────────────────────────────────── */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-[26px] pb-4 flex flex-col justify-start gap-2">

        {/* BIG stacked headline */}
        <div className="flex flex-col gap-0">
          <h1 className="sr-only">Dhruv Singh — Full-Stack Developer</h1>

          {/* JEDI */}
          <div className="flex items-center gap-4">
            <span
              className="text-[clamp(1rem,3vw,40px)] font-black uppercase tracking-[0.3em] border-2 px-3 py-1 self-start"
              style={{ 
                color: 'var(--sw-yellow)', 
                borderColor: 'var(--sw-yellow)',
                background: 'rgba(var(--sw-yellow-rgb, 255,232,31), 0.08)', 
                boxShadow: '3px 3px 0 var(--sw-yellow)', 
                fontFamily: 'monospace' 
              }}
            >
              JEDI
            </span>
            <span
              className="text-[clamp(0.65rem,1.5vw,18px)] font-black uppercase tracking-widest"
              style={{ color: 'var(--sw-white)', opacity: 0.4, fontFamily: 'monospace' }}
            >
              — WITH GREAT CODE COMES GREAT OUTPUT
            </span>
          </div>

          {/* FULL-STACK */}
          <h2
            className="text-[clamp(3.5rem,10vw,140px)] font-black leading-[0.85] tracking-tighter uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-yellow)', textShadow: headShadow }}
          >
            FULL-STACK
          </h2>

          {/* DEVELOPER — with offset border box behind it */}
          <div className="relative self-start md:self-center">
            {/* Offset border — neobrutalist */}
            <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] border-4" style={{ borderColor: 'var(--sw-yellow)' }} />
            <h2
              className="relative text-[clamp(4rem,13.5vw,192px)] font-black leading-[0.88] tracking-tighter uppercase border-4 px-2"
              style={{
                fontFamily: '"Arial Black", Impact, sans-serif',
                color: 'var(--sw-white)',
                borderColor: 'var(--sw-yellow)',
                background: 'var(--sw-bg)',
                textShadow: headShadow,
              }}
            >
              DEVELOPER
            </h2>
          </div>

          {/* ENGINEER + IN PROGRESS */}
          <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mt-1">
            <span
              className="text-[clamp(0.9rem,2.5vw,32px)] font-black uppercase tracking-[0.2em] border-b-4"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-saber)', borderColor: 'var(--sw-saber)' }}
            >
              ENGINEER
            </span>
            <span style={{ color: 'var(--sw-yellow)', opacity: 0.5, fontWeight: 900, fontSize: 'clamp(1rem,2vw,24px)' }}>✦</span>
            <h2
              className="text-[clamp(2.2rem,8vw,112px)] font-black leading-[0.88] tracking-tighter uppercase"
              style={{
                fontFamily: '"Arial Black", Impact, sans-serif',
                color: 'var(--sw-white)',
                opacity: 0.25,
                textShadow: headShadow,
              }}
            >
              IN PROGRESS
            </h2>
          </div>
        </div>


      </div>
    </section>
  );
}
