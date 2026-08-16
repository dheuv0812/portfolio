import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaFilePdf, FaShareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import {
  trackLinkedInClick,
  trackGithubClick,
  trackEmailClick,
  trackWhatsappClick,
  trackEvent
} from '@/lib/analytics';

const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/rohit--dubey03/',
    label: 'LinkedIn',
    track: () => trackLinkedInClick('Action Dock'),
  },
  {
    icon: FaGithub,
    href: 'https://github.com/anakinskywalker0903',
    label: 'GitHub',
    track: () => trackGithubClick('Action Dock'),
  },
  {
    icon: MdEmail,
    href: 'mailto:rohitdubey39005@gmail.com',
    label: 'Email',
    track: () => trackEmailClick('Action Dock'),
  },
  {
    icon: FaWhatsapp,
    href: 'https://wa.me/918777453162',
    label: 'WhatsApp',
    track: () => trackWhatsappClick('Action Dock'),
  },
];

export function RightActionDock({ onResumeOpen }: { onResumeOpen: () => void }) {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  const handleResumeClick = () => {
    trackEvent('Resume Hub Click', 'Resume', 'Action Dock');
    onResumeOpen();
  };

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsFabOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const fabActions = [
    {
      id: 'resume',
      icon: FaFilePdf,
      label: 'Resume',
      onClick: () => {
        handleResumeClick();
        setIsFabOpen(false);
      },
      color: 'bg-[#00F5A0] text-black border-black',
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rohit--dubey03/',
      onClick: () => {
        trackLinkedInClick('Mobile FAB');
        setIsFabOpen(false);
      },
      color: 'bg-white text-black border-black',
    },
    {
      id: 'github',
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/anakinskywalker0903',
      onClick: () => {
        trackGithubClick('Mobile FAB');
        setIsFabOpen(false);
      },
      color: 'bg-white text-black border-black',
    },
    {
      id: 'email',
      icon: MdEmail,
      label: 'Email',
      href: 'mailto:rohitdubey39005@gmail.com',
      onClick: () => {
        trackEmailClick('Mobile FAB');
        setIsFabOpen(false);
      },
      color: 'bg-white text-black border-black',
    },
  ];

  return (
    <>
      {/* ── DESKTOP / TABLET DOCK (md:flex) ────────────────────────── */}
      <div className="fixed right-2.5 sm:right-5 bottom-1/2 translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        <div 
          className="flex flex-col items-center gap-2 sm:gap-3 px-1.5 py-3 sm:px-3 sm:py-5 rounded-full border border-white/25 bg-black/25 hover:bg-black/50 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0, 245, 160, 0.15)',
          }}
        >
          {/* Glow indicator at the top */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] mx-auto animate-pulse mb-0.5" />

          {/* Resume button */}
          <motion.button
            onClick={handleResumeClick}
            whileHover={{ scale: 1.15, x: -2 }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#00F5A0] hover:text-black bg-black/30 hover:bg-[#00F5A0] border border-white/20 hover:border-transparent transition-all duration-300 relative group cursor-pointer"
            aria-label="Open Resume Hub"
          >
            <FaFilePdf className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#00F5A0] group-hover:text-black transition-colors" />
            <span className="absolute right-12 sm:right-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 px-3 py-1.5 rounded-lg bg-black text-[#00F5A0] text-[10px] font-black uppercase tracking-widest pointer-events-none transition-all duration-200 shadow-xl border border-[#00F5A0]/20 whitespace-nowrap">
              RESUME
            </span>
          </motion.button>

          {/* Separator line */}
          <span className="w-4 h-[1px] bg-white/20 my-0.5" />

          {/* Social Links */}
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                onClick={social.track}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.15, x: -2 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#00F5A0] hover:text-black bg-black/30 hover:bg-[#00F5A0] border border-white/20 hover:border-transparent transition-all duration-300 relative group"
              >
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#00F5A0] group-hover:text-black transition-colors" />
                <span className="absolute right-12 sm:right-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 px-3 py-1.5 rounded-lg bg-black text-[#00F5A0] text-[10px] font-black uppercase tracking-widest pointer-events-none transition-all duration-200 shadow-xl border border-[#00F5A0]/20 whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE EXPANDABLE RADIAL FAB (md:hidden) ────────────────────── */}
      <div
        ref={fabRef}
        className="fixed right-3 bottom-16 z-40 md:hidden pointer-events-auto"
      >
        {/* Radial Circular Action Menu */}
        <AnimatePresence>
          {isFabOpen &&
            fabActions.map((action, idx) => {
              const Icon = action.icon;
              // Radial Arc offsets (R = 88px, spread from 90° Top to 180° Left)
              const radialOffsets = [
                { x: 0, y: -88 },   // Resume (Top)
                { x: -45, y: -74 }, // LinkedIn (Top-Left)
                { x: -74, y: -45 }, // GitHub (Left-Top)
                { x: -88, y: 0 },   // Email (Left)
              ];
              const offset = radialOffsets[idx] || { x: 0, y: -(60 + idx * 45) };

              const buttonElement = (
                <button
                  onClick={action.onClick}
                  aria-label={action.label}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer relative group ${action.color}`}
                >
                  <Icon className="w-4 h-4" />
                  {/* Tooltip Label (Appears ONLY on hover/focus) */}
                  <span className="absolute bottom-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black text-[#00F5A0] text-[9px] font-black uppercase tracking-wider border border-[#00F5A0]/30 shadow-xl whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200">
                    {action.label}
                  </span>
                </button>
              );

              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: offset.x,
                    y: offset.y,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.3,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 24,
                    delay: idx * 0.045,
                  }}
                  className="absolute bottom-0 right-0 z-40"
                >
                  {action.href ? (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={action.onClick}
                      className="no-underline"
                    >
                      {buttonElement}
                    </a>
                  ) : (
                    buttonElement
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Main Trigger FAB Button */}
        <motion.button
          onClick={() => setIsFabOpen(prev => !prev)}
          whileTap={{ scale: 0.92 }}
          aria-expanded={isFabOpen}
          aria-label={isFabOpen ? 'Close Quick Actions' : 'Open Quick Actions'}
          className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-black shadow-lg hover:bg-[#00F5A0] transition-colors relative cursor-pointer z-50"
          style={{
            boxShadow: '0 6px 20px rgba(0, 245, 160, 0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            {isFabOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <IoClose className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaShareAlt className="w-4 h-4 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

// Backward-compatible alias
export const SocialSidebar = RightActionDock;
