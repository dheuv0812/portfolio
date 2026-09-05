import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';
import { SkinSwitcher } from './SkinSwitcher';

const links = [
  { label: 'Home',           href: '/'              },
  { label: 'About',          href: '#about'         },
  { label: 'Skills',         href: '/skills'        },
  { label: 'Projects',       href: '/projects'      },
  { label: 'Client Work',    href: '/client-work'   },
  { label: 'Experience',     href: '/experience'    },
  { label: 'Certifications', href: '/certifications'},
  { label: 'Contact',        href: '#contact'       },
];

export function NavStarWars({ onResumeOpen }: { onResumeOpen: () => void }) {
  const [open, setOpen]   = useState(false);
  const panelRef          = useRef<HTMLDivElement>(null);
  const { toggleSwitcher, activeTheme, setTheme } = useTheme();
  const location          = useLocation();

  const isSith  = activeTheme.id === 'sith';
  const accent  = isSith ? '#FF2020' : '#FFE81F';
  const accent2 = isSith ? '#8B0000' : '#4FC3F7';
  const navBg   = isSith ? '#0A0000' : '#05060F';
  const textWh  = isSith ? '#F0D0D0' : '#E8E6D0';

  // Family toggle — instant, no preloader
  const toggleSide = () => setTheme(isSith ? 'starwars' : 'sith');

  // Ctrl+K global shortcut
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggleSwitcher(); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [toggleSwitcher]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (location.pathname !== '/') window.location.href = '/' + href;
    }
  };

  return (
    <>
      {/* ── Minimal top bar — just logo + open button ─────────────────── */}
      <div
        className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8"
        style={{ height: '52px', pointerEvents: 'none' }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-0 flex-shrink-0"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="px-3 py-1 border-2 font-black text-xs uppercase tracking-[0.2em]"
            style={{
              borderColor: accent,
              color: '#000',
              background: accent,
              fontFamily: '"Arial Black", Impact, sans-serif',
              boxShadow: '2px 2px 0 #000',
            }}
          >
            ROHIT
          </div>
          <div
            className="px-2 py-1 border-2 border-l-0 font-black text-[9px] uppercase tracking-[0.15em]"
            style={{ borderColor: accent, color: accent, background: 'transparent', fontFamily: 'monospace' }}
          >
            .DEV
          </div>
        </Link>


        {/* Actions — top right */}
        <div className="flex items-center gap-2.5" style={{ pointerEvents: 'auto' }}>
          {/* Quick Jedi ↔ Sith toggle */}
          <motion.button
            onClick={toggleSide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-1.5 font-black text-[10px] uppercase tracking-widest cursor-pointer border-2 rounded-full flex items-center gap-2 transition-all"
            style={{
              borderColor: accent,
              color: isSith ? '#FF2020' : '#000',
              background: isSith ? '#180000' : '#FFE81F',
              fontFamily: '"Arial Black", Impact, sans-serif',
              boxShadow: '2px 2px 0 #000',
            }}
            title={isSith ? 'Force Skin: Switch to Jedi Theme Mode' : 'Force Skin: Switch to Sith Theme Mode'}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: isSith ? '#FF2020' : '#4FC3F7',
                boxShadow: `0 0 6px ${isSith ? '#FF2020' : '#4FC3F7'}`,
              }}
            />
            <span>{isSith ? 'JEDI THEME' : 'SITH THEME'}</span>
          </motion.button>

          {/* Open menu button */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 font-black text-[10px] uppercase tracking-widest cursor-pointer border-2 rounded-full"
            style={{
              borderColor: accent,
              color: '#000',
              background: accent,
              fontFamily: '"Arial Black", Impact, sans-serif',
              boxShadow: '2px 2px 0 #000',
            }}
          >
            MENU ↓
          </motion.button>
        </div>
      </div>

      {/* ── Floating nav panel — Thread style ─────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Subtle backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.94, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="fixed top-10 right-4 md:right-8 z-[70] w-[240px] md:w-[260px] rounded-2xl overflow-hidden"
              style={{
                background: '#111',
                border: `1px solid #333`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px #222',
              }}
            >
              {/* Panel header — CLOSE button */}
              <div className="flex items-center justify-end px-4 pt-4 pb-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                  style={{ background: accent, color: '#000', fontFamily: '"Arial Black", Impact, sans-serif' }}
                >
                  CLOSE ↑
                </button>
              </div>

              {/* Nav links — large stacked, right-aligned */}
              <nav className="flex flex-col px-5 pb-4 gap-0">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04, duration: 0.2 } }}
                  >
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="w-full text-right py-2 font-black uppercase tracking-tight cursor-pointer transition-colors block"
                        style={{
                          fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                          color: '#fff',
                          fontFamily: '"Arial Black", Impact, sans-serif',
                          lineHeight: 1.15,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="w-full text-right py-2 font-black uppercase tracking-tight block transition-colors"
                        style={{
                          fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                          color: location.pathname === link.href ? accent : '#fff',
                          fontFamily: '"Arial Black", Impact, sans-serif',
                          lineHeight: 1.15,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = location.pathname === link.href ? accent : '#fff'; }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
