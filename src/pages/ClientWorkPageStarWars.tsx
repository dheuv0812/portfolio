import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaHandshake, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '@/lib/ThemeContext';
import { useSEO } from '@/hooks/useSEO';
import clientWorkData from '@/data/client-work.json';

export function ClientWorkPageStarWars() {
  useSEO('Client Work — Force Skin', 'Explore commercial missions, client outcomes, scope deliverables, and architecture.');
  const { activeTheme } = useTheme();
  const isSith = activeTheme.id === 'sith';
  const accent = isSith ? '#FF2020' : '#FFE81F';

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'lessons'>('overview');

  const item = clientWorkData[activeIdx] || clientWorkData[0];
  const headShadow = Array.from({ length: 4 }, (_, i) => `${i + 1}px ${i + 1}px 0 #000`).join(',');

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: 'var(--sw-bg)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: '#000', background: accent, fontFamily: 'monospace' }}>
              COMMERCIAL CONTRACTS
            </div>
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
              CLIENT OUTCOMES / DELIVERABLES
            </div>
          </div>
          <h1 className="text-[clamp(2.5rem,8vw,90px)] font-black leading-none tracking-tighter uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: accent, textShadow: headShadow }}>
            CLIENT WORK
          </h1>
          <p className="text-xs md:text-sm font-semibold mt-2 max-w-md"
            style={{ color: 'var(--sw-white)', opacity: 0.7, fontFamily: 'monospace' }}>
            // Commercial web applications, catalog architectures, and direct business solutions.
          </p>
        </div>

        {/* Engagement Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b-2"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {clientWorkData.map((c, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={c.id}
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
                0{idx + 1}. {c.client}
              </button>
            );
          })}
        </div>

        {/* 2-Column Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-2"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>

          {/* Left: Engagement Overview & Details */}
          <div className="p-6 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 flex flex-col justify-between gap-6"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 border"
                  style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
                  {item.industry}
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--sw-white)', opacity: 0.6, fontFamily: 'monospace' }}>
                  TIMELINE: {item.timeline}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-white)' }}>
                {item.client}
              </h2>
              <div className="w-16 h-[3px] mb-4" style={{ background: accent }} />

              <p className="text-sm font-semibold leading-relaxed mb-6"
                style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                {item.role}
              </p>

              {/* Sub-tabs */}
              <div className="flex gap-2 mb-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {(['overview', 'deliverables', 'lessons'] as const).map(tab => (
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
                    {tab === 'overview' ? '📋 OUTCOME & IMPACT' : tab === 'deliverables' ? '💼 SCOPE DELIVERED' : '💡 FIELD LESSONS'}
                  </button>
                ))}
              </div>

              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // THE OUTCOME
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {item.outcome}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // KEY CHALLENGES
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {item.challenges}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'deliverables' && (
                    <motion.div key="deliverables" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                        // DELIVERABLES COMPLETED
                      </span>
                      {item.deliverables?.map((d: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: accent }}>✦</span>
                          <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                            {d}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'lessons' && (
                    <motion.div key="lessons" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: accent, fontFamily: 'monospace' }}>
                          // LESSONS LEARNED
                        </span>
                        <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: 'var(--sw-white)', opacity: 0.85, fontFamily: 'monospace' }}>
                          {item.lessons}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {item.links?.map((link: { label: string; url: string }) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider border-2 flex items-center gap-2 transition-all cursor-pointer"
                  style={{ background: accent, color: '#000', borderColor: accent, boxShadow: '3px 3px 0 #000', fontFamily: 'monospace' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-2px,-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                >
                  <span>LAUNCH {link.label.toUpperCase()}</span>
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Technical Details & Metrics */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.015)' }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4" style={{ background: accent }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: accent, fontFamily: 'monospace' }}>
                  TECHNICAL STACK
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.stack?.map((t: string) => (
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
                    INDUSTRY SECTOR
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {item.industry}
                  </span>
                </div>

                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    ROLE ASSIGNED
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {item.role}
                  </span>
                </div>

                <div className="border-2 p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
                    DELIVERY TIMELINE
                  </span>
                  <span className="text-xs font-black uppercase" style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>
                    {item.timeline}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
                CLIENT ENGAGEMENT #{String(activeIdx + 1).padStart(2, '0')} OF {String(clientWorkData.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex items-center gap-4 mt-6">
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
          <span className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
            {clientWorkData.length} COMMERCIAL ENGAGEMENTS · FORCE SKIN
          </span>
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
        </div>

      </div>
    </div>
  );
}
