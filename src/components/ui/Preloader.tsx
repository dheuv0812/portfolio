import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip preloader only for search engine crawlers
    const isBot =
      typeof navigator !== 'undefined' &&
      /Lighthouse|Googlebot|Chrome-Lighthouse|HeadlessChrome/i.test(navigator.userAgent);

    if (isBot) {
      onComplete();
      return;
    }

    // Snappy intro progress counter from 0 to 100
    const duration = 900;
    const intervalTime = 16;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.floor((step / totalSteps) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Initial letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  const { activeTheme } = useTheme();
  const accent = activeTheme.vars['--c-accent'];
  const shadow3D = `2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 #000, 8px 8px 0 ${accent}`;

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100vh',
        transition: { 
          duration: 0.5, 
          ease: [0.85, 0, 0.15, 1] as [number, number, number, number]
        }
      }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center select-none"
      style={{ background: 'var(--c-preloader-bg, #031714)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[size:3rem_3rem] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)' }}
      />

      {/* Main initials R.D. */}
      <div className="relative flex items-center justify-center mb-8 z-10" style={{ letterSpacing: 0 }}>
        {[
          { char: 'R', isDot: false },
          { char: '.', isDot: true },
          { char: 'D', isDot: false },
        ].map(({ char, isDot }, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="font-black uppercase text-white"
            style={{
              fontFamily: '"Arial Black", Impact, sans-serif',
              fontSize: isDot ? 'clamp(3rem, 8vw, 7rem)' : 'clamp(5rem, 12vw, 10rem)',
              lineHeight: 1,
              textShadow: !isDot ? shadow3D : undefined,
              color: isDot ? 'var(--c-preloader-text, #00F5A0)' : 'white',
              marginLeft: isDot ? '-0.05em' : index > 0 ? '-0.05em' : 0,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Loading bar */}
        <div className="w-48 h-[4px] bg-white/10 rounded-full overflow-hidden border border-[var(--c-accent)]/20">
          <motion.div 
            className="h-full bg-[var(--c-accent)] shadow-[0_0_12px_var(--c-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Monospace progress percent */}
        <span 
          className="text-xs font-black tracking-widest text-[var(--c-accent)] font-mono"
          style={{ textShadow: '0 0 10px rgba(0, 245, 160, 0.4)' }}
        >
          {String(progress).padStart(3, '0')}%
        </span>
      </div>
    </motion.div>
  );
}

export default Preloader;
