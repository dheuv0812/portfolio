import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete:    () => void;
  accentColour?: string;
}

const CRAWL_TEXT = [
  { text: 'EPISODE I',            style: 'title'    },
  { text: 'THE PHANTOM CODEBASE', style: 'subtitle' },
  { text: '',                      style: 'gap'      },
  { text: 'It is a period of digital war. Rebel developers, striking from hidden keyboards, have won their first victory against the evil Legacy Codebase.', style: 'body' },
  { text: '',                      style: 'gap'      },
  { text: "During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon — an unscalable monolith with enough technical debt to destroy an entire startup.", style: 'body' },
  { text: '',                      style: 'gap'      },
  { text: "Pursued by the Empire's senior devs, ROHIT DUBEY races home, custodian of the stolen specs that can save his team and restore clean architecture to the galaxy….", style: 'body' },
];

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PERSPECTIVE CRAWL PLANE
 *
 * True 3D perspective — text lies on a tilted plane extending into space.
 *   • perspectiveOrigin 50% 100% = camera at bottom centre
 *   • rotateX(20deg) = top of plane tilts AWAY from viewer
 *   • Large, cinematic font sizes for effortless reading
 *   • translateY scrolls the plane upward smoothly over 38 seconds
 *   • Top gradient = horizon fade (text vanishes into the distance)
 *   • Bottom gradient = entry fade (text appears smoothly from below)
 * ═══════════════════════════════════════════════════════════════════════════
 */
function CrawlPlane({ accentColour }: { accentColour: string }) {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = planeRef.current;
    if (!el) return;

    // Start position: the top of the text plane is positioned completely below the screen (100vh)
    el.style.transition = 'none';
    el.style.transform  = 'rotateX(22deg) translateY(100vh)';

    // Force layout reflow, then begin the slow linear crawl from bottom to top
    void el.offsetHeight;
    el.style.transition = 'transform 42s linear';
    el.style.transform  = 'rotateX(22deg) translateY(-4600px)';
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        perspective:       '320px',
        perspectiveOrigin: '50% 100%',   // camera at bottom — text recedes toward top-center vanishing point
      }}
    >
      <div
        ref={planeRef}
        style={{
          position:        'absolute',
          top:             0,
          left:            '50%',
          width:           'min(800px, 92vw)',
          marginLeft:      'calc(min(800px, 92vw) / -2)',
          transformOrigin: '50% 100%',   // pivot at the base of the plane
          willChange:      'transform',
          paddingBottom:   '120px',
        }}
      >
        {CRAWL_TEXT.map((line, i) => {
          if (line.style === 'gap') {
            return <div key={i} style={{ height: '2.5em' }} />;
          }

          const isTitle    = line.style === 'title';
          const isSubtitle = line.style === 'subtitle';
          const isBody     = line.style === 'body';

          return (
            <p
              key={i}
              style={{
                color:         accentColour,
                textAlign:     'center',
                margin:        '0 0 0.8em 0',
                fontFamily:    isBody
                  ? '"Times New Roman", Georgia, serif'
                  : '"Arial Black", Impact, sans-serif',
                fontSize:      isTitle
                  ? 'clamp(2.8rem, 7.5vw, 4.5rem)'
                  : isSubtitle
                    ? 'clamp(1.6rem, 4.8vw, 3rem)'
                    : 'clamp(1.3rem, 3.4vw, 1.85rem)',
                fontWeight:    isBody ? 600 : 900,
                letterSpacing: isTitle    ? '0.16em'
                             : isSubtitle ? '0.09em'
                                          : '0.03em',
                fontStyle:     isBody ? 'italic' : 'normal',
                lineHeight:    isBody ? 2.2 : 1.35,
                textShadow:    `0 0 28px ${accentColour}55`,
              }}
            >
              {line.text}
            </p>
          );
        })}
      </div>

      {/* Top horizon fade — text vanishes into deep space */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-10"
        style={{
          height: '42%',
          background: 'linear-gradient(to bottom, #000 12%, transparent 100%)',
        }}
      />
      {/* Bottom entry fade — text appears smoothly from below */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{
          height: '22%',
          background: 'linear-gradient(to top, #000 8%, transparent 100%)',
        }}
      />
    </div>
  );
}

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * STAR WARS PRELOADER — Three-phase cinematic opening
 *
 *   Phase 1  "A long time ago…"     0 → 4.0s      (fade in, hold, fade out)
 *   Phase 2  ROHIT DUBEY title      4.0 → 9.5s    (smoothly & continuously recedes away into deep space)
 *   Phase 3  Perspective crawl      9.5 → 48s     (38s linear scroll, large text)
 *   Done     fade to website        48s →          (1.5s fade out)
 *
 *   SKIP button appears at 3s
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function StarWarsPreloader({ onComplete, accentColour = '#FFE81F' }: Props) {
  const [phase, setPhase] = useState<'longago' | 'title' | 'crawl' | 'done'>('longago');

  useEffect(() => {
    // Phase 1 → Phase 2
    const t1 = setTimeout(() => setPhase('title'),  4000);
    // Phase 2 → Phase 3
    const t2 = setTimeout(() => setPhase('crawl'),  9500);
    // Phase 3 → Done
    const t3 = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 1200);
    }, 52000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const skip = () => { setPhase('done'); setTimeout(onComplete, 600); };

  // "A long time ago" text — blue for Jedi, red for Sith
  const introColour = accentColour === '#FFE81F' ? '#4FC3F7' : accentColour;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="sw-pre"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] select-none overflow-hidden"
          style={{ background: '#000' }}
        >
          {/* ── Subtle star field ─────────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              opacity: 0.08,
            }}
          />

          {/* ── Phase 1 — "A long time ago, in a galaxy far, far away…." ── */}
          <AnimatePresence>
            {phase === 'longago' && (
              <motion.div
                key="longago"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1,  transition: { duration: 1.8 } }}
                exit={{   opacity: 0,  transition: { duration: 0.8 } }}
                className="absolute inset-0 flex items-center justify-center px-6"
              >
                <p style={{
                  color:         introColour,
                  fontFamily:    '"Times New Roman", Georgia, serif',
                  fontSize:      'clamp(1.1rem, 2.6vw, 1.5rem)',
                  fontStyle:     'italic',
                  textAlign:     'center',
                  letterSpacing: '0.04em',
                  opacity:       0.9,
                }}>
                  A long time ago, in a galaxy far, far away….
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 2 — ROHIT DUBEY (Smooth continuous recession into space) ── */}
          <AnimatePresence>
            {phase === 'title' && (
              <motion.div
                key="title"
                initial={{ opacity: 0, scale: 1.25 }}
                animate={{
                  opacity: [0,    1,    1,    0.7,   0],
                  scale:   [1.25, 1.0,  0.5,  0.15,  0.02],
                  transition: {
                    duration: 5.5,
                    times:    [0, 0.15, 0.5, 0.8, 1],
                    ease:     'easeIn',
                  },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <span style={{
                  fontFamily:    '"Arial Black", Impact, sans-serif',
                  fontSize:      'clamp(3.8rem, 14vw, 140px)',
                  fontWeight:    900,
                  color:         accentColour,
                  lineHeight:    1,
                  letterSpacing: '0.14em',
                  textShadow:    `0 0 60px ${accentColour}80, 0 0 120px ${accentColour}30`,
                }}>
                  ROHIT
                </span>
                <span style={{
                  fontFamily:    'monospace',
                  fontSize:      'clamp(0.6rem, 2.4vw, 20px)',
                  fontWeight:    700,
                  color:         `${accentColour}65`,
                  letterSpacing: '0.65em',
                  textTransform: 'uppercase',
                }}>
                  DUBEY
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 3 — Perspective crawl ────────────────────────────── */}
          <AnimatePresence>
            {phase === 'crawl' && (
              <motion.div
                key="crawl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                className="absolute inset-0"
              >
                <CrawlPlane accentColour={accentColour} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Skip button ───────────────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 3, duration: 1 } }}
            onClick={skip}
            className="absolute bottom-6 right-6 z-20 cursor-pointer"
            style={{
              fontFamily:    'monospace',
              fontSize:      '9px',
              fontWeight:    700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color:         `${accentColour}70`,
              border:        `1px solid ${accentColour}35`,
              background:    `${accentColour}08`,
              padding:       '8px 18px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accentColour; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${accentColour}70`; }}
          >
            SKIP →
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
