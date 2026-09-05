import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '@/lib/ThemeContext';
import { useSEO } from '@/hooks/useSEO';
import projectsData from '@/data/projects.json';
import { trackProjectDemo, trackProjectRepo } from '@/lib/analytics';

export function ProjectsPageStarWars() {
  useSEO('Missions — Force Skin', 'Inspect combat-tested missions, architectures, hurdles, and source code.');
  const { activeTheme } = useTheme();
  const isSith = activeTheme.id === 'sith';
  const accent = isSith ? '#FF2020' : '#FFE81F';

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'arch' | 'hurdles'>('overview');
  const project = projectsData[activeIdx];

  const headShadow = Array.from({ length: 4 }, (_, i) => `${i + 1}px ${i + 1}px 0 #000`).join(',');

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: 'var(--sw-bg)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: '#000', background: accent, fontFamily: 'monospace' }}>
              REBEL ARCHIVES
            </div>
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
              FIELD REPORTS / CASE STUDIES
            </div>
          </div>
          <h1 className="text-[clamp(2.5rem,8vw,90px)] font-black leading-none tracking-tighter uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: accent, textShadow: headShadow }}>
            THE MISSIONS
          </h1>
          <p className="text-xs md:text-sm font-semibold mt-2 max-w-md"
            style={{ color: 'var(--sw-white)', opacity: 0.7, fontFamily: 'monospace' }}>
            // Declassified engineering logs, system architectures, and technical hurdles.
          </p>
        </div>

        {/* Mission Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b-2"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {projectsData.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.id}
                onClick={() => { setActiveIdx(idx); setActiveTab('overview'); }}
                className="px-3.5 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{
                  borderColor: isSelected ? accent : 'rgba(255,255,255,0.2)',
                  background: isSelected ? accent : 'transparent',
                  color: isSelected ? '#000' : 'rgba(255,255,255,0.7)',
                  boxShadow: isSelected ? '3px 3px 0 #000' : 'none',
                  fontFamily: 'monospace',
                }}
              >
                MISSION #{String(idx + 1).padStart(2, '0')} · {p.name}
              </button>
            );
          })}
        </div>

        {/* 2-Column Mission Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-2"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>

          {/* Left: Mission Overview / Details */}
          <div className="p-6 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 flex flex-col justify-between gap-6"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 border"
                    style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
                    {project.projectType}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 border"
                    style={{
                      borderColor: project.status === 'Live' || project.status === 'Published' ? accent : 'rgba(255,255,255,0.3)',
                      color: project.status === 'Live' || project.status === 'Published' ? accent : 'rgba(255,255,255,0.6)',
                      fontFamily: 'monospace',
                    }}>
                    STATUS: {project.status.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--sw-white)', opacity: 0.6, fontFamily: 'monospace' }}>
                  CYCLE: {project.year}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-white)' }}>
                {project.name}
              </h2>
              <div className="w-16 h-[3px] mb-4" style={{ background: accent }} />

              <p className="text-sm font-semibold leading-relaxed mb-6"
                style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                {project.shortDescription}
              </p>

              {/* Sub-tabs for detailed intelligence */}
              <div className="flex gap-2 mb-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {(['overview', 'arch', 'hurdles'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border"
                    style={{
                      background: activeTab === tab ? accent : 'transparent',
                      color: activeTab === tab ? '#000' : 'rgba(255,255,255,0.7)',
                      borderColor: activeTab === tab ? accent : 'rgba(255,255,255,0.2)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {tab === 'overview' ? '📋 BRIEFING' : tab === 'arch' ? '🧩 ARCHITECTURE' : '💡 HURDLES & LESSONS'}
                  </button>
                ))}
              </div>

              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // THE PROBLEM &amp; OBJECTIVE
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // WHY BUILT
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {project.whyBuilt}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'arch' && (
                    <motion.div key="arch" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // ROLE &amp; CONTRIBUTION
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          <strong className="text-white font-black">{project.role}:</strong> {project.contribution}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // NEXT MISSION MILESTONE
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {project.futureImprovements || 'Operations stable. No active refactors planned.'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'hurdles' && (
                    <motion.div key="hurdles" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // TECHNICAL HURDLES
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {project.challenges}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // COMBAT LESSONS LEARNED
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {project.lessonsLearned}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProjectDemo(project.name)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider border-2 flex items-center gap-2 transition-all cursor-pointer"
                  style={{ background: accent, color: '#000', borderColor: accent, boxShadow: '3px 3px 0 #000', fontFamily: 'monospace' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-2px,-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                >
                  <span>LAUNCH DEPLOYMENT</span>
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProjectRepo(project.name)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider border-2 flex items-center gap-2 transition-all cursor-pointer"
                  style={{ background: 'transparent', color: 'var(--sw-white)', borderColor: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'var(--sw-white)'; }}
                >
                  <span>INSPECT SOURCE</span>
                  <FaGithub className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Combat Stack & Intel Panel */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.015)' }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4" style={{ background: accent }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: accent, fontFamily: 'monospace' }}>
                  DEPLOYED ARSENAL
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack?.map((t: string) => (
                  <span key={t} className="text-xs font-bold uppercase tracking-wider border px-3 py-1"
                    style={{
                      color: accent,
                      borderColor: 'rgba(255,255,255,0.15)',
                      background: 'color-mix(in srgb, var(--sw-yellow) 6%, transparent)',
                      fontFamily: 'monospace',
                    }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    MISSION DIRECTIVE
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {project.projectType}
                  </span>
                </div>

                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    SYSTEM OPERATOR
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {project.role}
                  </span>
                </div>

                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    VERIFICATION STATUS
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {project.status === 'Live' ? '🟢 OPERATIONAL IN PRODUCTION' : project.status === 'Published' ? '🟡 PUBLISHED ON WEB STORE' : '⚪ ARCHIVED / PAUSED'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
                MISSION #{String(activeIdx + 1).padStart(2, '0')} OF {String(projectsData.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex items-center gap-4 mt-6">
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
          <span className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
            {projectsData.length} MISSIONS · FORCE SKIN · REBEL DOSSIERS
          </span>
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
        </div>

      </div>
    </div>
  );
}
