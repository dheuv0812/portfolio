import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';

export function SkinSwitcher() {
  const { themes, activeTheme, setTheme, isSwitcherOpen, closeSwitcher } = useTheme();
  
  // Filter out Sith — it's a theme mode within the Force skin
  const visibleThemes = themes.filter(t => t.id !== 'sith');
  
  const getActiveIndex = () => {
    const activeId = activeTheme.id === 'sith' ? 'starwars' : activeTheme.id;
    const idx = visibleThemes.findIndex(t => t.id === activeId);
    return idx >= 0 ? idx : 0;
  };
  
  const [cursor, setCursor] = useState(getActiveIndex);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync cursor when panel opens
  useEffect(() => {
    if (isSwitcherOpen) {
      setCursor(getActiveIndex());
    }
  }, [isSwitcherOpen, activeTheme.id]);

  // Scroll active item into view
  useEffect(() => {
    if (isSwitcherOpen) {
      itemRefs.current[cursor]?.scrollIntoView({ block: 'nearest' });
    }
  }, [cursor, isSwitcherOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isSwitcherOpen) return;

    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeSwitcher(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor(p => (p + 1) % visibleThemes.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor(p => (p - 1 + visibleThemes.length) % visibleThemes.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setTheme(visibleThemes[cursor].id);
        closeSwitcher();
      } else {
        // 1-9 jump
        const n = parseInt(e.key, 10);
        if (!isNaN(n) && n >= 1 && n <= visibleThemes.length) {
          setCursor(n - 1);
          setTheme(visibleThemes[n - 1].id);
          closeSwitcher();
        }
      }
    };

    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isSwitcherOpen, cursor, visibleThemes, setTheme, closeSwitcher]);

  // Group themes by group label
  const groups = visibleThemes.reduce<Record<string, typeof visibleThemes>>((acc, theme) => {
    (acc[theme.group] = acc[theme.group] ?? []).push(theme);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isSwitcherOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
            onClick={closeSwitcher}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] w-[92vw] max-w-[520px] rounded-2xl overflow-hidden shadow-2xl border border-black/20"
            style={{ background: '#FAFAF8', color: '#1a1a1a', fontFamily: 'monospace' }}
            role="dialog"
            aria-label="Switch skin"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/10"
              style={{ background: '#F2F0EC' }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                SWITCH SKIN
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                ESC
              </span>
            </div>

            {/* Theme list */}
            <ul
              ref={listRef}
              className="overflow-y-auto max-h-[60vh] py-2"
              role="listbox"
              aria-label="Theme options"
            >
              {Object.entries(groups).map(([groupName, groupThemes]) => (
                <li key={groupName}>
                  {/* Group label */}
                  <div className="px-5 pt-4 pb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-black/35">
                    {groupName}
                  </div>

                  {groupThemes.map((theme) => {
                    const globalIdx = visibleThemes.findIndex(t => t.id === theme.id);
                    const isActive = theme.id === activeTheme.id || (theme.id === 'starwars' && activeTheme.id === 'sith');
                    const isCursor  = globalIdx === cursor;

                    return (
                      <button
                        key={theme.id}
                        ref={el => { itemRefs.current[globalIdx] = el; }}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => { setTheme(theme.id); closeSwitcher(); }}
                        onMouseEnter={() => setCursor(globalIdx)}
                        className="w-full text-left flex items-center gap-4 px-5 py-3 transition-colors duration-75 outline-none"
                        style={{
                          background: isCursor ? '#FEF3C7' : 'transparent',
                          borderLeft: isCursor ? '3px solid #D97706' : '3px solid transparent',
                        }}
                      >
                        {/* Index number */}
                        <span
                          className="text-[10px] font-bold w-5 text-center flex-shrink-0"
                          style={{ color: isCursor ? '#D97706' : '#00000040' }}
                        >
                          {globalIdx + 1}
                        </span>

                        {/* Swatches */}
                        <div className="flex gap-0.5 flex-shrink-0">
                          {theme.swatches.map((c, i) => (
                            <span
                              key={i}
                              className="w-4 h-7 rounded-sm"
                              style={{ background: c }}
                            />
                          ))}
                        </div>

                        {/* Name + subtitle */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-tight text-black/90">
                              {theme.name}
                            </span>
                            {isActive && (
                              <span className="text-[8px] font-black uppercase tracking-wider text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-black/40 font-medium uppercase tracking-wider mt-0.5">
                            {theme.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </li>
              ))}
            </ul>

            {/* Footer hint */}
            <div
              className="flex items-center gap-5 px-5 py-2.5 border-t border-black/10 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35"
              style={{ background: '#F2F0EC' }}
            >
              <span>↑↓ NAVIGATE</span>
              <span>↵ SELECT</span>
              <span>1–{visibleThemes.length} JUMP</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
