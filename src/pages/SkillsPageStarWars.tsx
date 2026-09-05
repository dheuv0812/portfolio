import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';
import { useSEO } from '@/hooks/useSEO';
import skillsData from '@/data/skills.json';

type Skill = typeof skillsData[number];

const STATUS_ORDER = ['Project Ready', 'Comfortable', 'Comfortable (basic integration)', 'Learning', 'Used'];
function statusRank(s: string) { const i = STATUS_ORDER.indexOf(s); return i === -1 ? 99 : i; }

function StatusBadge({ status, accent }: { status: string; accent: string }) {
  const isReady = status === 'Project Ready';
  const isComfy = status.startsWith('Comfortable');
  return (
    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 border-2 inline-block"
      style={{
        background: isReady ? accent : 'transparent',
        borderColor: isReady ? accent : isComfy ? accent : 'rgba(255,255,255,0.25)',
        color: isReady ? '#000' : isComfy ? accent : 'rgba(255,255,255,0.7)',
        fontFamily: 'monospace',
      }}>
      {status}
    </span>
  );
}

function SkillCard({ skill, accent, isSelected, onClick }: {
  skill: Skill; accent: string; isSelected: boolean; onClick: () => void;
}) {
  const isReady = skill.status === 'Project Ready';
  return (
    <motion.button onClick={onClick} whileHover={{ y: -2 }}
      className="w-full h-full text-left p-4 transition-all duration-100 cursor-pointer"
      style={{
        background: isSelected ? `color-mix(in srgb, ${accent} 12%, transparent)` : 'rgba(255,255,255,0.02)',
        outline: isSelected ? `2px solid ${accent}` : 'none',
        boxShadow: isSelected ? '4px 4px 0 #000' : 'none',
        fontFamily: 'monospace',
      }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-black uppercase tracking-tight leading-tight"
          style={{ color: isSelected ? accent : 'var(--sw-white)' }}>
          {skill.name}
        </span>
        {isReady && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />}
      </div>
      <StatusBadge status={skill.status} accent={accent} />
      {skill.professionalUse && (
        <div className="mt-2.5 text-[11px] font-black uppercase tracking-wider"
          style={{ color: accent, opacity: 0.85, fontFamily: 'monospace' }}>
          FORGED IN PRODUCTION
        </div>
      )}
    </motion.button>
  );
}

function DetailPanel({ skill, accent }: { skill: Skill; accent: string }) {
  const rows = [
    { label: 'PROJECTS DEPLOYED', value: skill.projectsUsed },
    { label: 'CURRENT FOCUS', value: skill.currentFocus },
    { label: 'NEXT MISSION', value: skill.nextGoal },
  ].filter(r => r.value && r.value !== '—');

  return (
    <motion.div key={skill.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }} className="flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
            style={{ borderColor: accent, color: '#000', background: accent, fontFamily: 'monospace' }}>
            {skill.category}
          </div>
          <StatusBadge status={skill.status} accent={accent} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: 'var(--sw-white)' }}>
          {skill.name}
        </h2>
        <div className="mt-2 w-12 h-[3px]" style={{ background: accent }} />
      </div>

      <div className="flex gap-0">
        {[
          { label: 'LAST USED', value: skill.lastUsed },
          { label: 'PRO USE', value: skill.professionalUse ? 'YES' : 'NO' },
          { label: 'CONFIDENCE', value: skill.interviewConfidence },
        ].map(({ label, value }) => (
          <div key={label} className="flex-1 border-2 p-3 flex flex-col"
            style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)' }}>
            <span className="text-[10px] font-black uppercase tracking-wider mb-1"
              style={{ color: accent, opacity: 0.9, fontFamily: 'monospace' }}>{label}</span>
            <span className="text-xs font-black uppercase"
              style={{ color: 'var(--sw-white)', fontFamily: 'monospace' }}>{value}</span>
          </div>
        ))}
      </div>

      {rows.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4" style={{ background: accent }} />
            <span className="text-xs font-black uppercase tracking-wider"
              style={{ color: accent, fontFamily: 'monospace' }}>{label}</span>
          </div>
          <p className="text-sm font-medium leading-relaxed pl-3.5"
            style={{ color: 'var(--sw-white)', opacity: 0.8, fontFamily: 'monospace' }}>{value}</p>
        </div>
      ))}
    </motion.div>
  );
}

export function SkillsPageStarWars() {
  useSEO('Toolkit — Force Skin', 'Jedi arsenal: explore the tech stack powering the missions.');
  const { activeTheme } = useTheme();
  const isSith = activeTheme.id === 'sith';
  const accent = isSith ? '#FF2020' : '#FFE81F';

  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Databases', 'AI / ML', 'Cloud', 'Tools'];
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Skill>(skillsData[0]);

  const filtered = skillsData
    .filter(s =>
      (activeTab === 'All' || s.category === activeTab) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => statusRank(a.status) - statusRank(b.status));

  const headShadow = Array.from({ length: 4 }, (_, i) => `${i + 1}px ${i + 1}px 0 #000`).join(',');

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: 'var(--sw-bg)' }}>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: '#000', background: accent, fontFamily: 'monospace' }}>
              JEDI ARCHIVES
            </div>
            <div className="px-3 py-1 border-2 text-xs font-black uppercase tracking-wider"
              style={{ borderColor: accent, color: accent, fontFamily: 'monospace' }}>
              TOOLKIT / SKILLS
            </div>
          </div>
          <h1 className="text-[clamp(3rem,10vw,120px)] font-black leading-none tracking-tighter uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: accent, textShadow: headShadow }}>
            ARSENAL
          </h1>
          <p className="text-sm font-bold mt-2 max-w-md"
            style={{ color: 'var(--sw-white)', opacity: 0.6, fontFamily: 'monospace' }}>
            // Technologies deployed in the field. Sorted by combat-readiness.
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH TECH..."
            className="px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 outline-none w-full max-w-xs"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: search ? accent : 'rgba(255,255,255,0.2)',
              color: 'var(--sw-white)',
              fontFamily: 'monospace',
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)}
                className="px-3.5 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer"
                style={{
                  borderColor: activeTab === cat ? accent : 'rgba(255,255,255,0.2)',
                  background: activeTab === cat ? accent : 'transparent',
                  color: activeTab === cat ? '#000' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'monospace',
                  boxShadow: activeTab === cat ? '3px 3px 0 #000' : 'none',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] border-2"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}>

          {/* Left: skill grid */}
          <div className="border-r-2 overflow-y-auto"
            style={{ borderColor: 'rgba(255,255,255,0.15)', maxHeight: '68vh' }}>
            <div className="sticky top-0 px-4 py-2.5 border-b-2 flex items-center justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'var(--sw-bg)', fontFamily: 'monospace' }}>
              <span className="text-xs font-black uppercase tracking-wider" style={{ color: accent }}>
                {filtered.length} SKILLS INDEXED
              </span>
              <span className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {activeTab.toUpperCase()}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-2 md:grid-cols-3">
                {filtered.map(skill => (
                  <motion.div key={skill.name} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.12 }}
                    className="border-r border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <SkillCard skill={skill} accent={accent}
                      isSelected={selected?.name === skill.name}
                      onClick={() => setSelected(skill)} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="p-8 text-center">
                <span className="text-xs font-black uppercase tracking-wider"
                  style={{ color: accent, opacity: 0.6, fontFamily: 'monospace' }}>
                  NO TECH FOUND IN THIS SECTOR
                </span>
              </div>
            )}
          </div>

          {/* Right: detail */}
          <div className="p-6 overflow-y-auto"
            style={{ maxHeight: '68vh', background: 'rgba(255,255,255,0.015)' }}>
            <AnimatePresence mode="wait">
              {selected
                ? <DetailPanel key={selected.name} skill={selected} accent={accent} />
                : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs font-black uppercase tracking-wider"
                      style={{ color: accent, opacity: 0.5, fontFamily: 'monospace' }}>
                      SELECT A SKILL
                    </span>
                  </div>
                )
              }
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex items-center gap-4 mt-5">
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
          <span className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent, opacity: 0.65, fontFamily: 'monospace' }}>
            {skillsData.length} SKILLS · FORCE SKIN · TOOLKIT SECTOR
          </span>
          <div className="h-[2px] flex-1" style={{ background: accent, opacity: 0.25 }} />
        </div>

      </div>
    </div>
  );
}
