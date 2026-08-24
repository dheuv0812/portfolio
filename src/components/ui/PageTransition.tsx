import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import barba from '@barba/core';
import gsap from 'gsap';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const greenBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef<string>(location.pathname);

  // Initialize Barba.js core with GSAP transitions
  useEffect(() => {
    barba.init({
      preventRunning: true,
      transitions: [
        {
          name: 'brutalist-curtain-transition',
          sync: false,
          leave() {
            const tl = gsap.timeline();
            tl.to(greenBarRef.current, {
              scaleY: 1,
              transformOrigin: 'bottom',
              duration: 0.35,
              ease: 'power3.inOut',
            })
            .to(overlayRef.current, {
              scaleY: 1,
              transformOrigin: 'bottom',
              duration: 0.45,
              ease: 'power3.inOut',
            }, '-=0.15')
            .to(textRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: 'power2.out',
            }, '-=0.2');
            return tl;
          },
          enter() {
            const tl = gsap.timeline();
            tl.to(textRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.2,
              ease: 'power2.in',
            })
            .to(overlayRef.current, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.45,
              ease: 'power3.inOut',
            })
            .to(greenBarRef.current, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.35,
              ease: 'power3.inOut',
            }, '-=0.25');
            return tl;
          },
        },
      ],
    });

    return () => {
      barba.destroy();
    };
  }, []);

  // Trigger GSAP transition on React Router location change
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      const tl = gsap.timeline();
      tl.set(greenBarRef.current, { scaleY: 0, transformOrigin: 'bottom' })
        .set(overlayRef.current, { scaleY: 0, transformOrigin: 'bottom' })
        .set(textRef.current, { opacity: 0, y: 20 })

        // Leave transition: Curtain wipes UP to cover screen
        .to(greenBarRef.current, {
          scaleY: 1,
          duration: 0.3,
          ease: 'power3.inOut',
        })
        .to(overlayRef.current, {
          scaleY: 1,
          duration: 0.4,
          ease: 'power3.inOut',
        }, '-=0.15')
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, '-=0.2')

        // Enter transition: Curtain wipes UP out of screen
        .to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          delay: 0.1,
          ease: 'power2.in',
        })
        .to(overlayRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.4,
          ease: 'power3.inOut',
        })
        .to(greenBarRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.3,
          ease: 'power3.inOut',
        }, '-=0.25');
    }
  }, [location.pathname]);

  return (
    <div data-barba="wrapper" className="w-full relative min-h-screen">
      {/* Barba.js Curtain Transition Overlay Elements */}
      <div
        ref={greenBarRef}
        className="fixed inset-0 z-[9998] bg-[#00F5A0] pointer-events-none scale-y-0 origin-bottom"
      />
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-[#031714] pointer-events-none scale-y-0 origin-bottom flex items-center justify-center border-b-4 border-[#00F5A0]"
      >
        <div
          ref={textRef}
          className="opacity-0 translate-y-5 flex flex-col items-center justify-center gap-2 pointer-events-none text-center"
        >
          <span className="text-[#00F5A0] font-black text-xs uppercase tracking-[0.3em] border border-[#00F5A0]/40 px-4 py-1.5 rounded-full bg-black/40">
            ROHIT DUBEY • PORTFOLIO
          </span>
          <span className="text-white text-2xl font-black uppercase tracking-tight">
            LOADING PAGE
          </span>
        </div>
      </div>

      {/* Main Barba Container */}
      <main data-barba="container" data-barba-namespace={location.pathname} className="w-full">
        {children}
      </main>
    </div>
  );
};

export default PageTransition;
