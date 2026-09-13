import {
  createContext, useContext, useState, useEffect,
  useCallback, useRef, type ReactNode,
} from 'react';
import { themes, DEFAULT_THEME_ID, type Theme } from './themes';

const STORAGE_KEY = 'dhruv-portfolio-skin';

interface ThemeContextValue {
  activeTheme:      Theme;
  setTheme:         (id: string) => void;
  themes:           Theme[];
  isSwitcherOpen:   boolean;
  openSwitcher:     () => void;
  closeSwitcher:    () => void;
  toggleSwitcher:   () => void;
  /** Fires on every skin change. Receives (newTheme, prevTheme) */
  onThemeChange:    (cb: (next: Theme, prev: Theme) => void) => () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme.id);
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  root.style.setProperty('--scrollbar-track', theme.vars['--c-bg']     ?? '#070A13');
  root.style.setProperty('--scrollbar-thumb', theme.vars['--c-accent'] ?? '#FF2A55');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const saved = typeof localStorage !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY) : null;
    return themes.find(t => t.id === saved)
        ?? themes.find(t => t.id === DEFAULT_THEME_ID)!;
  });

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // Registry of callbacks — receive (newTheme, prevTheme)
  const listenersRef = useRef<Set<(next: Theme, prev: Theme) => void>>(new Set());
  const prevThemeRef = useRef<Theme>(activeTheme);

  useEffect(() => {
    const prev = prevThemeRef.current;
    applyTheme(activeTheme);
    listenersRef.current.forEach(cb => cb(activeTheme, prev));
    prevThemeRef.current = activeTheme;
  }, [activeTheme]);

  const setTheme = useCallback((id: string) => {
    const t = themes.find(th => th.id === id);
    if (!t) return;
    setActiveTheme(t);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const onThemeChange = useCallback((cb: (next: Theme, prev: Theme) => void) => {
    listenersRef.current.add(cb);
    return () => listenersRef.current.delete(cb);
  }, []);

  const openSwitcher   = useCallback(() => setIsSwitcherOpen(true),      []);
  const closeSwitcher  = useCallback(() => setIsSwitcherOpen(false),     []);
  const toggleSwitcher = useCallback(() => setIsSwitcherOpen(p => !p),   []);

  return (
    <ThemeContext.Provider value={{
      activeTheme, setTheme, themes,
      isSwitcherOpen, openSwitcher, closeSwitcher, toggleSwitcher,
      onThemeChange,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
