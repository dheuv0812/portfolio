import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Connect Lenis to GSAP ticker
    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(updateGsap);
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
    };
  }, []);

  // Handle page transitions & hash anchor scrolling (#contact, #about)
  useEffect(() => {
    if (lenisRef.current) {
      if (location.hash) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(location.hash, { offset: -20, duration: 1.2 });
        }, 300);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
