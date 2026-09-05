import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaAward, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useTheme } from '@/lib/ThemeContext';
import { useSEO } from '@/hooks/useSEO';
import certificationsData from '@/data/certifications.json';
import { trackCertificateView } from '@/lib/analytics';

export function LearningArchivePageStarWars() {
  useSEO('Archives — Force Skin', 'Explore verified Jedi credentials, certifications, and academy milestones.');
  const { activeTheme } = useTheme();
  const isSith = activeTheme.id === 'sith';
  const accent = isSith ? '#FF2020' : '#FFE81F';

  const [activeCategory, setActiveCategory] = useState<'featured' | 'collections' | 'other'>('featured');
  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'learnt' | 'skills'>('overview');
  const [showPdf, setShowPdf] = useState(false);

  const featuredItems = certificationsData.featured;
  const githubSeries = certificationsData.collections[0];
  const dataAnalyticsSeries = certificationsData.collections[1];
  const achievementItems = certificationsData.other;

  const currentDataset =
    activeCategory === 'featured'
      ? featuredItems
      : activeCategory === 'collections'
      ? [...githubSeries.items, ...dataAnalyticsSeries.items]
      : achievementItems;

  const activeCert: any = currentDataset[activeCertIdx] || currentDataset[0];

  const headShadow = Array.from({ length: 4 }, (_, i) => `${i + 1}px ${i + 1}px 0 #000`).join(',');

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: 'var(--sw-bg)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: '#000', background: accent, fontFamily: 'monospace' }}>
              JEDI ACADEMY
            </div>
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
              ACCREDITATIONS / CERTS
            </div>
          </div>
          <h1 className="text-[clamp(2.5rem,8vw,90px)] font-black leading-none tracking-tighter uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: accent, textShadow: headShadow }}>
            THE ARCHIVES
          </h1>
          <p className="text-xs md:text-sm font-semibold mt-2 max-w-md"
            style={{ color: 'var(--sw-white)', opacity: 0.7, fontFamily: 'monospace' }}>
            // Verified credentials, specialized technical training, and continuous learning milestones.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2.5 mb-6 border-b-2 pb-4 overflow-x-auto scrollbar-none" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {[
            { id: 'featured', label: `FEATURED (${featuredItems.length})` },
            { id: 'collections', label: `COLLECTIONS (${githubSeries.items.length + dataAnalyticsSeries.items.length})` },
            { id: 'other', label: `ACADEMIC & AWARDS (${achievementItems.length})` },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(c.id as any); setActiveCertIdx(0); setActiveTab('overview'); }}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
              style={{
                borderColor: activeCategory === c.id ? accent : 'rgba(255,255,255,0.2)',
                background: activeCategory === c.id ? accent : 'transparent',
                color: activeCategory === c.id ? '#000' : 'rgba(255,255,255,0.7)',
                boxShadow: activeCategory === c.id ? '3px 3px 0 #000' : 'none',
                fontFamily: 'monospace',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Item Selector Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b-2"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {currentDataset.map((item: any, idx: number) => {
            const isSelected = activeCertIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => { setActiveCertIdx(idx); setActiveTab('overview'); }}
                className="px-3.5 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{
                  borderColor: isSelected ? accent : 'rgba(255,255,255,0.2)',
                  background: isSelected ? accent : 'transparent',
                  color: isSelected ? '#000' : 'rgba(255,255,255,0.7)',
                  boxShadow: isSelected ? '3px 3px 0 #000' : 'none',
                  fontFamily: 'monospace',
                }}
              >
                0{idx + 1}. {item.title}
              </button>
            );
          })}
        </div>

        {/* 2-Column Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-2"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>

          {/* Left: Certificate Details */}
          <div className="p-6 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 flex flex-col justify-between gap-6"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 border"
                  style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
                  {activeCert.issuer}
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--sw-white)', opacity: 0.6, fontFamily: 'monospace' }}>
                  {activeCert.issuedDate}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-3"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-white)' }}>
                {activeCert.title}
              </h2>
              <div className="w-16 h-[3px] mb-4" style={{ background: accent }} />

              <p className="text-sm font-semibold leading-relaxed mb-6"
                style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                {activeCert.description}
              </p>

              {/* Sub-tabs */}
              <div className="flex gap-2 mb-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {(['overview', 'learnt', 'skills'] as const).map(tab => (
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
                    {tab === 'overview' ? '📋 CURRICULUM' : tab === 'learnt' ? '🧠 LESSONS' : '🎯 SKILLS ACQUIRED'}
                  </button>
                ))}
              </div>

              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // CORE FOCUS
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {activeCert.learningSummary || activeCert.description}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'learnt' && (
                    <motion.div key="learnt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                        // SYLLABUS HIGHLIGHTS
                      </span>
                      {(activeCert.highlights || [activeCert.learningSummary]).map((h: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: accent }}>✦</span>
                          <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                            {h}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div key="skills" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                        // VERIFIED SKILLS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(activeCert.skillsGained || activeCert.skills || []).map((s: string) => (
                          <span key={s} className="text-xs font-bold uppercase tracking-wider border px-3 py-1"
                            style={{
                              color: accent,
                              borderColor: 'rgba(255,255,255,0.2)',
                              background: 'color-mix(in srgb, var(--sw-yellow) 8%, transparent)',
                              fontFamily: 'monospace',
                            }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {activeCert.link && (
                <a
                  href={activeCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCertificateView(activeCert.title)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider border-2 flex items-center gap-2 transition-all cursor-pointer"
                  style={{ background: accent, color: '#000', borderColor: accent, boxShadow: '3px 3px 0 #000', fontFamily: 'monospace' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-2px,-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                >
                  <span>VERIFY CREDENTIAL</span>
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Accreditation Metadata */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.015)' }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4" style={{ background: accent }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: accent, fontFamily: 'monospace' }}>
                  ACCREDITATION INTEL
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    ISSUING AUTHORITY
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {activeCert.issuer}
                  </span>
                </div>

                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    AWARD DATE
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {activeCert.issuedDate}
                  </span>
                </div>

                {activeCert.credentialId && (
                  <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                      CREDENTIAL ID
                    </span>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--sw-white)' }}>
                      {activeCert.credentialId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
                STATUS: VERIFIED CREDENTIAL ARCHIVED
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex items-center gap-4 mt-6">
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
          <span className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
            {currentDataset.length} CREDENTIALS · FORCE SKIN · ACADEMY ARCHIVES
          </span>
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
        </div>

      </div>
    </div>
  );
}
