import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * SmoothScroll — wraps the entire app, mandatory for all skins.
 * Uses a single RAF loop (no GSAP ticker double-tick).
 * Lenis instance is exposed on window.lenis for other components to use.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite:        false,
    });

    lenisRef.current    = lenis;
    (window as any).lenis = lenis;

    // Single RAF loop — no GSAP ticker to avoid double-ticking
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current      = null;
      (window as any).lenis = null;
    };
  }, []);

  // Route change — scroll to top instantly, or to hash anchor smoothly
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (location.hash) {
      // Small delay so the page has painted before scrolling to anchor
      const t = setTimeout(() => {
        lenis.scrollTo(location.hash, { offset: -80, duration: 1.2 });
      }, 350);
      return () => clearTimeout(t);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
