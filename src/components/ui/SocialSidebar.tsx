import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaFilePdf, FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { SiLeetcode } from 'react-icons/si';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '@/lib/ThemeContext';
import {
  trackLinkedInClick,
  trackGithubClick,
  trackEmailClick,
  trackWhatsappClick,
  trackEvent,
} from '@/lib/analytics';

const GITHUB_USERNAME   = 'dheuv0812';
const LEETCODE_USERNAME = 'dheuv0812';

/* ── GitHub contribution popover ──────────────────────────────────────────── */
function GitHubPopover({ onClose }: { onClose: () => void }) {
  const { activeTheme } = useTheme();
  const accent = activeTheme.vars['--c-accent'];

  const calTheme = {
    light: [
      'rgba(0,0,0,0.07)',
      `${accent}40`,
      `${accent}70`,
      `${accent}A0`,
      accent,
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16, scale: 0.96 }}
      animate={{ opacity: 1, x: 0,  scale: 1 }}
      exit={{    opacity: 0, x: 16, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className="fixed right-16 sm:right-20 top-1/2 -translate-y-1/2 z-50 w-[min(92vw,480px)]"
    >
      <div
        className="rounded-2xl border-2 border-black shadow-2xl overflow-hidden"
        style={{ background: 'var(--c-bg-surface)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b-2 border-black"
          style={{ background: 'var(--c-bg-surface)' }}
        >
          <div className="flex items-center gap-2">
            <FaGithub className="w-4 h-4 text-black" />
            <span className="font-black text-xs uppercase tracking-widest text-black">
              @{GITHUB_USERNAME}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGithubClick('Popover')}
              className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ background: accent, color: 'var(--c-accent-text)', boxShadow: '2px 2px 0 #000' }}
            >
              GitHub <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </a>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-black"
            >
              <IoClose className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-4 overflow-x-auto">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme="light"
            theme={calTheme}
            fontSize={10}
            blockSize={11}
            blockMargin={3}
            labels={{ totalCount: '{{count}} contributions in the last year' }}
            style={{ fontFamily: 'monospace', color: '#000' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main dock ─────────────────────────────────────────────────────────────── */
export function RightActionDock({ onResumeOpen }: { onResumeOpen: () => void }) {
  const [isFabOpen,   setIsFabOpen]   = useState(false);
  const [ghPopover,   setGhPopover]   = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  const handleResumeClick = () => {
    trackEvent('Resume Hub Click', 'Resume', 'Action Dock');
    onResumeOpen();
  };

  // Close FAB + popover when clicking outside
  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsFabOpen(false);
      }
      // Close GH popover on any outside click
      const target = e.target as HTMLElement;
      if (!target.closest('.gh-popover-anchor') && !target.closest('.gh-popover')) {
        setGhPopover(false);
      }
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, []);

  // ── Desktop dock links ──────────────────────────────────────────────────
  const dockLinks = [
    {
      id: 'linkedin',
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/dhruv0812',
      onClick: () => trackLinkedInClick('Action Dock'),
    },
    {
      id: 'email',
      icon: MdEmail,
      label: 'Email',
      href: 'mailto:dhruv.singh@torontomu.ca',
      onClick: () => trackEmailClick('Action Dock'),
    },
    {
      id: 'resume',
      icon: FaFilePdf,
      label: 'Resume',
      href: 'https://drive.google.com/file/d/1cJKmsAqZNy6NeFj46CWnpGMhrv9Ovd1a/view?usp=sharing',
      onClick: () => trackEvent('Resume Click', 'Social', 'Action Dock'),
    },
  ];

  // ── Mobile FAB actions ──────────────────────────────────────────────────
  const fabActions = [
    {
      id: 'resume',
      icon: FaFilePdf,
      label: 'Resume',
      href: undefined,
      onClick: () => { handleResumeClick(); setIsFabOpen(false); },
      color: 'bg-[var(--c-accent)] text-white border-black',
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/dhruv0812',
      onClick: () => { trackLinkedInClick('Mobile FAB'); setIsFabOpen(false); },
      color: 'bg-[var(--c-bg-surface)] text-black border-black',
    },
    {
      id: 'github',
      icon: FaGithub,
      label: 'GitHub',
      href: `https://github.com/${GITHUB_USERNAME}`,
      onClick: () => { trackGithubClick('Mobile FAB'); setIsFabOpen(false); },
      color: 'bg-[var(--c-bg-surface)] text-black border-black',
    },
    {
      id: 'email',
      icon: MdEmail,
      label: 'Email',
      href: 'mailto:dhruv.singh@torontomu.ca',
      onClick: () => { trackEmailClick('Mobile FAB'); setIsFabOpen(false); },
      color: 'bg-[var(--c-bg-surface)] text-black border-black',
    },
  ];

  // Radial offsets for 5 mobile actions
  const radialOffsets = [
    { x: 0,   y: -90 },
    { x: -38, y: -82 },
    { x: -68, y: -58 },
    { x: -85, y: -24 },
    { x: -90, y:  14 },
  ];

  return (
    <>
      {/* GitHub popover — rendered at root level so it's above everything */}
      <AnimatePresence>
        {ghPopover && (
          <div className="gh-popover">
            <GitHubPopover onClose={() => setGhPopover(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* ── DESKTOP DOCK ──────────────────────────────────────────────── */}
      <div className="fixed right-2.5 sm:right-5 bottom-1/2 translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        <div
          className="flex flex-col items-center gap-2 sm:gap-3 px-1.5 py-3 sm:px-3 sm:py-5 rounded-full border border-white/25 bg-black/25 hover:bg-black/50 backdrop-blur-lg shadow-xl transition-all duration-300"
          style={{ boxShadow: '0 8px 32px 0 rgba(0,245,160,0.15)' }}
        >
          {/* Pulse dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)] mx-auto animate-pulse mb-0.5" />



          {/* GitHub — special: opens popover */}
          <motion.button
            whileHover={{ scale: 1.15, x: -2 }}
            onClick={() => setGhPopover(p => !p)}
            className="gh-popover-anchor w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--c-accent)] hover:text-black bg-black/30 hover:bg-[var(--c-accent)] border border-white/20 hover:border-transparent transition-all duration-300 relative group cursor-pointer"
            aria-label="GitHub contributions"
          >
            <FaGithub className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[var(--c-accent)] group-hover:text-black transition-colors" />
            <span className="absolute right-12 sm:right-14 opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-black text-[var(--c-accent)] text-[10px] font-black uppercase tracking-widest pointer-events-none transition-all duration-200 shadow-xl border border-[var(--c-accent)]/20 whitespace-nowrap">
              GITHUB
            </span>
          </motion.button>

          {/* Other social links */}
          {dockLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                onClick={link.onClick}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
                whileHover={{ scale: 1.15, x: -2 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--c-accent)] hover:text-black bg-black/30 hover:bg-[var(--c-accent)] border border-white/20 hover:border-transparent transition-all duration-300 relative group"
              >
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[var(--c-accent)] group-hover:text-black transition-colors" />
                <span className="absolute right-12 sm:right-14 opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-black text-[var(--c-accent)] text-[10px] font-black uppercase tracking-widest pointer-events-none transition-all duration-200 shadow-xl border border-[var(--c-accent)]/20 whitespace-nowrap">
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE FAB ────────────────────────────────────────────────── */}
      <div ref={fabRef} className="fixed right-3 bottom-16 z-40 md:hidden pointer-events-auto">
        <AnimatePresence>
          {isFabOpen && fabActions.map((action, idx) => {
            const Icon  = action.icon;
            const offset = radialOffsets[idx] ?? { x: 0, y: -(60 + idx * 48) };

            const btn = (
              <button
                onClick={action.onClick}
                aria-label={action.label}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer relative group ${action.color}`}
              >
                <Icon className="w-4 h-4" />
                <span className="absolute bottom-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black text-[var(--c-accent)] text-[9px] font-black uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-[var(--c-accent)]/30">
                  {action.label}
                </span>
              </button>
            );

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: offset.x, y: offset.y }}
                exit={{   opacity: 0, scale: 0.3, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24, delay: idx * 0.04 }}
                className="absolute bottom-0 right-0 z-40"
              >
                {action.href ? (
                  <a href={action.href} target="_blank" rel="noreferrer" onClick={action.onClick} className="no-underline">
                    {btn}
                  </a>
                ) : btn}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* FAB trigger */}
        <motion.button
          onClick={() => setIsFabOpen(p => !p)}
          whileTap={{ scale: 0.92 }}
          aria-expanded={isFabOpen}
          aria-label={isFabOpen ? 'Close Quick Actions' : 'Open Quick Actions'}
          className="w-10 h-10 rounded-full border-2 border-black bg-[var(--c-bg-surface)] flex items-center justify-center text-black shadow-lg hover:bg-[var(--c-accent)] transition-colors cursor-pointer z-50 relative"
          style={{ boxShadow: '0 6px 20px rgba(0,245,160,0.3)' }}
        >
          <AnimatePresence mode="wait">
            {isFabOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <IoClose className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <FaShareAlt className="w-4 h-4 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

export const SocialSidebar = RightActionDock;
