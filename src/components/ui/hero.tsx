import { Suspense, lazy } from 'react';
import { TextType } from './TextType';
import { usePreloaderDone } from './PreloaderContext';
import { useTheme } from '@/lib/ThemeContext';
import { HeroStarWars } from './hero-starwars';

const Lanyard = lazy(() => import('./Lanyard'));

const AvailabilityPill = () => (
  <div
    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full pointer-events-auto"
    style={{
      background: 'rgba(255,255,255,0.10)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    }}
  >
    <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--c-text-muted)' }}>Learning</span>
    <span className="text-xs font-bold" style={{ color: 'var(--c-text-muted)' }}>•</span>
    <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--c-text-muted)' }}>Building</span>
    <span className="text-xs font-bold" style={{ color: 'var(--c-text-muted)' }}>•</span>
    <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--c-accent)' }}>Iterating</span>
  </div>
);

const CircularBadge = () => (
  <div
    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-black/5 flex-shrink-0"
    style={{ background: 'var(--c-accent)' }}
  >
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
      <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current overflow-visible" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--c-accent-text)' }}>
        <path d="M20,80 Q 40,50 30,30 T 80,20" />
        <path d="M60,10 L80,20 L70,40" />
      </svg>
    </div>
  </div>
);

export const HeroSection = () => {
  const preloaderDone = usePreloaderDone();
  const { activeTheme } = useTheme();

  // Star Wars skin gets its own completely different hero
  if (activeTheme.id === 'starwars') return <HeroStarWars />;

  const heroShadow = Array.from({ length: 12 }, (_, i) => `${i + 1}px ${i + 1}px 0 var(--c-hero-shadow)`).join(',');
  const headFont: React.CSSProperties = { fontFamily: '"Arial Black", Impact, sans-serif', textShadow: heroShadow };

  return (
    <section
      id="home"
      className="font-sans relative overflow-hidden w-full min-h-[calc(100svh-32px)] flex flex-col justify-between"
      style={{ background: 'var(--c-bg)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[size:4rem_4rem] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, var(--c-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--c-grid) 1px, transparent 1px)`,
        }}
      />

      {/* Lanyard — desktop only */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[50%] h-full z-20 pointer-events-none items-center justify-center">
        <Suspense fallback={null}>
          <Lanyard className="w-full h-full" />
        </Suspense>
      </div>

      {/* Text layer */}
      <div className="relative z-10 pointer-events-none w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-20 pb-8 flex flex-col justify-between flex-1 h-full">

        <div className="mb-4">
          <AvailabilityPill />
        </div>

        <div className="flex flex-col gap-1 my-auto">
          <h1 className="sr-only">Dhruv Singh - Full-Stack Developer &amp; Computer Engineer</h1>

          <div className="flex justify-start sm:pl-[5%] md:pl-[10%]">
            {preloaderDone ? (
              <TextType
                text="FULL-STACK"
                as="h2"
                typingSpeed={100}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(2.4rem,9.2vw,130px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase"
                style={{ ...headFont, color: 'var(--c-accent)' }}
              />
            ) : (
              <h2 className="text-[clamp(2.4rem,9.2vw,130px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>
            )}
          </div>

          <div className="flex justify-center">
            {preloaderDone ? (
              <TextType
                text="DEVELOPER"
                as="h2"
                typingSpeed={100}
                initialDelay={1200}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(3.1rem,13.5vw,195px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase"
                style={{ ...headFont, color: 'var(--c-text)' }}
              />
            ) : (
              <h2 className="text-[clamp(3.1rem,13.5vw,195px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>
            )}
          </div>

          <div className="flex justify-end sm:pr-[4%] md:pr-[8%] items-baseline gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {preloaderDone ? (
              <TextType
                text="ENGINEER IN PROGRESS"
                as="h2"
                typingSpeed={80}
                initialDelay={2400}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                className="text-[clamp(1.6rem,6.5vw,90px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase"
                style={{ ...headFont, color: 'var(--c-text)', opacity: 0.85 }}
              />
            ) : (
              <h2 className="text-[clamp(1.6rem,6.5vw,90px)] font-black leading-[0.88] tracking-tighter m-0 p-0 uppercase opacity-0" style={headFont}>&nbsp;</h2>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 sm:gap-6 mt-6 pointer-events-auto">
          <CircularBadge />
          <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-[240px]" style={{ color: 'var(--c-text-muted)' }}>
            Building web apps, embedded systems &amp; everything in between.<br />
            Based in Toronto, Canada.
          </p>
        </div>
      </div>
    </section>
  );
};
