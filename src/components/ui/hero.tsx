import { Suspense, lazy } from 'react';
import { TextType } from './TextType';
import { usePreloaderDone } from './PreloaderContext';

const Lanyard = lazy(() => import('./Lanyard').then(module => ({ default: module.Lanyard })));

// ── Glassmorphic status pill ─────────────────────────────────────────────────
const AvailabilityPill = () => (
  <div
    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full pointer-events-auto"
    style={{
      background:          'rgba(255,255,255,0.10)',
      backdropFilter:      'blur(12px)',
      WebkitBackdropFilter:'blur(12px)',
      border:    '1px solid rgba(255,255,255,0.18)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    }}
  >
    <span className="text-white/80 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
      Learning
    </span>
    <span className="text-white/30 text-xs font-bold">•</span>
    <span className="text-white/80 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
      Building
    </span>
    <span className="text-white/30 text-xs font-bold">•</span>
    <span className="text-[#00F5A0] text-xs font-bold uppercase tracking-widest whitespace-nowrap">
      Iterating
    </span>
  </div>
);

// ── Circular spinning badge ──────────────────────────────────────────────────
const CircularBadge = () => (
  <div className="relative w-28 h-28 md:w-32 md:h-32 bg-[#00F5A0] rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-black/5 flex-shrink-0">
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <path id="heroBadgePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.18em' }} fill="black">
          <textPath href="#heroBadgePath" startOffset="0%">
            PORTFOLIO 2026 • AVAILABLE FOR WORK •{' '}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-10 h-10 text-black stroke-current overflow-visible" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20,80 Q 40,50 30,30 T 80,20" />
        <path d="M60,10 L80,20 L70,40" />
      </svg>
    </div>
  </div>
);

const shadow = '1px 1px 0 #021412,2px 2px 0 #021412,3px 3px 0 #021412,4px 4px 0 #021412,5px 5px 0 #021412,6px 6px 0 #021412,7px 7px 0 #021412,8px 8px 0 #021412,9px 9px 0 #021412,10px 10px 0 #021412,11px 11px 0 #021412,12px 12px 0 #021412';
const headFont: React.CSSProperties = { fontFamily: '"Arial Black", Impact, sans-serif', textShadow: shadow };

export const HeroSection = () => {
  const preloaderDone = usePreloaderDone();

  return (
    <section
      id="home"
      className="bg-[#031714] font-sans selection:bg-[#00F5A0] selection:text-black relative overflow-hidden w-full min-h-[calc(100svh-32px)] flex flex-col justify-between"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,160,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,160,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Interactive 3D Lanyard Layer (Desktop / Large Screens Only) */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[50%] h-full z-20 pointer-events-none items-center justify-center">
        <Suspense fallback={null}>
          <Lanyard className="w-full h-full" />
        </Suspense>
      </div>

      {/* ── Text layer ── */}
      <div className="relative z-10 pointer-events-none w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-20 pb-8 flex flex-col justify-between flex-1 h-full">

        {/* Glassmorphic availability pill */}
        <div className="mb-4">
          <AvailabilityPill />
        </div>

        {/* Stacked headline — FULL-STACK / DEVELOPER / IN PROGRESS */}
        <div className="flex flex-col gap-1 my-auto">
          <h1 className="sr-only">Rohit Dubey - Full-Stack Developer &amp; AI Engineer</h1>

          <div className="flex justify-start sm:pl-[5%] md:pl-[10%]">
            {preloaderDone && (
              <TextType
                text="FULL-STACK"
                as="h2"
                typingSpeed={100}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(2.4rem,9.2vw,130px)] font-black leading-[0.88] tracking-tighter text-[#00F5A0] m-0 p-0 uppercase"
                style={headFont}
              />
            )}
            {!preloaderDone && <h2 className="text-[clamp(2.4rem,9.2vw,130px)] font-black leading-[0.88] tracking-tighter text-[#00F5A0] m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>}
          </div>

          <div className="flex justify-center">
            {preloaderDone && (
              <TextType
                text="DEVELOPER"
                as="h2"
                typingSpeed={100}
                initialDelay={1200}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(3.1rem,13.5vw,195px)] font-black leading-[0.88] tracking-tighter text-white m-0 p-0 uppercase"
                style={headFont}
              />
            )}
            {!preloaderDone && <h2 className="text-[clamp(3.1rem,13.5vw,195px)] font-black leading-[0.88] tracking-tighter text-white m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>}
          </div>

          {/* "IN PROGRESS" row — smaller, muted, with a blinking cursor feel */}
          <div className="flex justify-end sm:pr-[4%] md:pr-[8%] items-baseline gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {preloaderDone && (
              <TextType
                text="AI ENGINEER"
                as="span"
                typingSpeed={100}
                initialDelay={2400}
                loop={false}
                showCursor={false}
                className="text-[clamp(0.85rem,2.5vw,32px)] font-black uppercase tracking-[0.22em] text-[#0D9488]"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
              />
            )}
            <span className="text-[#00F5A0]/60 text-[clamp(0.85rem,2vw,24px)] font-black">+</span>
            {preloaderDone && (
              <TextType
                text="IN PROGRESS"
                as="h2"
                typingSpeed={100}
                initialDelay={3800}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(2.1rem,8.8vw,120px)] font-black leading-[0.88] tracking-tighter text-white/40 m-0 p-0 uppercase"
                style={headFont}
              />
            )}
            {!preloaderDone && <h2 className="text-[clamp(2.1rem,8.8vw,120px)] font-black leading-[0.88] tracking-tighter text-white/40 m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>}
          </div>

        </div>

        {/* Bottom: badge + bio */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 mt-6 pointer-events-auto">
          <CircularBadge />
          <p className="text-white/60 text-xs sm:text-sm font-medium leading-relaxed max-w-[240px]">
            Building polished, fast &amp; accessible digital products.<br />
            Based in India — working worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};
