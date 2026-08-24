import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { Preloader } from '@/components/ui/Preloader';
import { PreloaderDoneContext } from '@/components/ui/PreloaderContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load pages to decrease initial chunk bundle weights
const SkillsPage = lazy(() => import('@/pages/SkillsPage').then(m => ({ default: m.SkillsPage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ClientWorkPage = lazy(() => import('@/pages/ClientWorkPage').then(m => ({ default: m.ClientWorkPage })));
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const LearningArchivePage = lazy(() => import('@/pages/LearningArchivePage').then(m => ({ default: m.LearningArchivePage })));
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
      <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase border border-black animate-pulse">
        LOADING PAGE...
      </span>
    </div>
  );
}

// Helper to determine if preloader should show on initial mount
function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  const isBot = /Lighthouse|Googlebot|Chrome-Lighthouse|HeadlessChrome/i.test(navigator.userAgent);
  const alreadySeen = sessionStorage.getItem('portfolio_preloader_seen') === 'true';
  return !isBot && !alreadySeen;
}

export default function App() {
  const [loading, setLoading] = useState(() => shouldShowPreloader());
  const [preloaderDone, setPreloaderDone] = useState(() => !shouldShowPreloader());

  // Initialize GA4 once on mount
  useEffect(() => {
    initGA();
  }, []);



  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => setPreloaderDone(true), 100);
  };

  return (
    <ErrorBoundary>
      <PreloaderDoneContext.Provider value={preloaderDone}>
        <Router>
          <ScrollToTop />

          {/* Global Cinematic Preloader */}
          <AnimatePresence mode="wait">
            {loading && (
              <Preloader onComplete={handlePreloaderComplete} />
            )}
          </AnimatePresence>

          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/client-work" element={<ClientWorkPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/certifications" element={<LearningArchivePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </PreloaderDoneContext.Provider>
    </ErrorBoundary>
  );
}
