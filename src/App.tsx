import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { Preloader } from '@/components/ui/Preloader';
import { StarWarsPreloader } from '@/components/ui/StarWarsPreloader';
import { PreloaderDoneContext } from '@/components/ui/PreloaderContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useTheme } from '@/lib/ThemeContext';
import type { Theme } from '@/lib/themes';
import { isSameFamily } from '@/lib/themes';

// Lazy load pages to decrease initial chunk bundle weights
const SkillsPage = lazy(() => import('@/pages/SkillsPage').then(m => ({ default: m.SkillsPage })));
const SkillsPageStarWars = lazy(() => import('@/pages/SkillsPageStarWars').then(m => ({ default: m.SkillsPageStarWars })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectsPageStarWars = lazy(() => import('@/pages/ProjectsPageStarWars').then(m => ({ default: m.ProjectsPageStarWars })));
const ClientWorkPage = lazy(() => import('@/pages/ClientWorkPage').then(m => ({ default: m.ClientWorkPage })));
const ClientWorkPageStarWars = lazy(() => import('@/pages/ClientWorkPageStarWars').then(m => ({ default: m.ClientWorkPageStarWars })));
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const ExperiencePageStarWars = lazy(() => import('@/pages/ExperiencePageStarWars').then(m => ({ default: m.ExperiencePageStarWars })));
const LearningArchivePage = lazy(() => import('@/pages/LearningArchivePage').then(m => ({ default: m.LearningArchivePage })));
const LearningArchivePageStarWars = lazy(() => import('@/pages/LearningArchivePageStarWars').then(m => ({ default: m.LearningArchivePageStarWars })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

import { initGA, trackPageView } from '@/lib/analytics';
import { useLayoutEffect } from 'react';

// Disable automatic scroll restoration globally for instant page top resets
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Scroll to top instantly & track page view on every route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

// Brutalist loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] bg-white flex flex-col items-center justify-center gap-4">
      <span className="inline-block bg-[var(--c-accent)] text-black font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase border border-black animate-pulse">
        LOADING PAGE...
      </span>
    </div>
  );
}

function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  const isBot = /Lighthouse|Googlebot|Chrome-Lighthouse|HeadlessChrome/i.test(navigator.userAgent);
  const alreadySeen = sessionStorage.getItem('portfolio_preloader_seen') === 'true';
  return !isBot && !alreadySeen;
}

// Inner app — has access to ThemeContext so it can choose the right preloader
function AppInner() {
  const [loading, setLoading]             = useState(() => shouldShowPreloader());
  const [preloaderDone, setPreloaderDone] = useState(() => !shouldShowPreloader());
  const [switchingTheme, setSwitchingTheme] = useState<Theme | null>(null);
  const { activeTheme, onThemeChange }    = useTheme();
  const isFirstMount                      = useRef(true);

  useEffect(() => { initGA(); }, []);

  // Listen for skin changes — show preloader on every switch EXCEPT same-family toggles
  useEffect(() => {
    const unsub = onThemeChange((next, prev) => {
      // Skip very first apply on mount
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }
      // Same family (e.g. starwars ↔ sith) = just a colour swap, no preloader
      if (isSameFamily(next, prev)) return;

      // Different skin family → show preloader
      setSwitchingTheme(next);
      setLoading(true);
      setPreloaderDone(false);
    });
    return unsub;
  }, [onThemeChange]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('portfolio_preloader_seen', 'true');
    setLoading(false);
    setSwitchingTheme(null);
    setTimeout(() => setPreloaderDone(true), 100);
  };

  // Determine which skin the preloader should use
  // (switchingTheme during a skin switch, activeTheme on first load)
  const preloaderTheme = switchingTheme ?? activeTheme;
  const isSwPreloader  = preloaderTheme.id === 'starwars' || preloaderTheme.id === 'sith';

  return (
    <PreloaderDoneContext.Provider value={preloaderDone}>
      <Router>
        <ScrollToTop />

        {/* Preloader — skin-aware, fires on first load AND every skin switch */}
        <AnimatePresence mode="wait">
          {loading && isSwPreloader && (
            <StarWarsPreloader
              key={`sw-pre-${preloaderTheme.id}`}
              onComplete={handlePreloaderComplete}
              accentColour={preloaderTheme.crawlAccent ?? '#FFE81F'}
            />
          )}
          {loading && !isSwPreloader && (
            <Preloader key={`pre-${preloaderTheme.id}`} onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/skills"         element={(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? <SkillsPageStarWars /> : <SkillsPage />} />
              <Route path="/projects"       element={(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? <ProjectsPageStarWars /> : <ProjectsPage />} />
              <Route path="/client-work"    element={(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? <ClientWorkPageStarWars /> : <ClientWorkPage />} />
              <Route path="/experience"     element={(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? <ExperiencePageStarWars /> : <ExperiencePage />} />
              <Route path="/certifications" element={(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? <LearningArchivePageStarWars /> : <LearningArchivePage />} />
              <Route path="*"               element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </PreloaderDoneContext.Provider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
