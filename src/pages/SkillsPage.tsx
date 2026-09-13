import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VscCode } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';
import { FaAws, FaRobot } from 'react-icons/fa6';
import {
  FaJava,
  FaMicrochip,
  FaWaveSquare,
  FaDatabase,
  FaTable,
  FaCss3Alt
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiC,
  SiArduino,
  SiOpencv,
  SiHtml5,
  SiJira
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandOpenai } from 'react-icons/tb';

import { useSEO } from '@/hooks/useSEO';
import skillsData from '@/data/skills.json';

// Icon and color mapping helper
const skillStyles: Record<string, { icon: any; color: string }> = {
  'Python': { icon: SiPython, color: '#3776AB' },
  'Java': { icon: FaJava, color: '#E76F00' },
  'C': { icon: SiC, color: '#00599C' },
  'C#': { icon: TbBrandCSharp, color: '#239120' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'SQL': { icon: FaDatabase, color: '#00758F' },
  'VHDL': { icon: FaMicrochip, color: '#FF2A55' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'CSS': { icon: FaCss3Alt, color: '#1572B6' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'REST APIs': { icon: VscCode, color: '#2563EB' },
  'FPGA (Quartus & ModelSim)': { icon: FaMicrochip, color: '#7B1FA2' },
  'Arduino': { icon: SiArduino, color: '#00979D' },
  'Digital Circuits & FSM Design': { icon: FaMicrochip, color: '#F59E0B' },
  'Analog IC Design': { icon: FaWaveSquare, color: '#EC4899' },
  'Git & GitHub': { icon: SiGit, color: '#F05032' },
  'Excel (VLOOKUP & Formulas)': { icon: FaTable, color: '#107C41' },
  'Jira': { icon: SiJira, color: '#0052CC' },
  'PostgreSQL & DBMS': { icon: SiPostgresql, color: '#4169E1' },
  'OpenAI API': { icon: TbBrandOpenai, color: '#10A37F' },
  'OpenCV': { icon: SiOpencv, color: '#5C3EE8' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
};

export function SkillsPage() {
  useSEO('Toolkit', 'Explore my engineering toolkit of technologies, programming languages, backend frameworks, and AI workflows.');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Hardware & Systems', 'Databases', 'AI / ML', 'Tools'];

  // Filter skills based on active tab and search query
  const filteredSkills = skillsData.filter(skill => {
    const matchesCategory = activeTab === 'All' || skill.category === activeTab;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const finalSelected = filteredSkills.some(s => s.name === selectedSkill.name)
    ? filteredSkills.find(s => s.name === selectedSkill.name) || filteredSkills[0] || selectedSkill
    : filteredSkills[0] || selectedSkill;

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
    setMobileDetailOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] pt-24 sm:pt-32 pb-24 px-3 sm:px-6 md:px-20 lg:px-28 font-sans selection:bg-[var(--c-accent)] selection:text-black relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 sm:mb-10 border-b border-black/5 pb-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-[var(--c-accent)] text-black font-black text-xs px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-sm">
              ENGINEERING TOOLKIT
            </span>
            <h1
              className="text-[clamp(2.2rem,7vw,80px)] font-black leading-none tracking-tighter text-black uppercase"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
            >
              SKILLS &amp;<br />
              <span className="text-[var(--c-accent-2)]">CAPABILITIES</span>
            </h1>
            <p className="text-black/50 text-xs sm:text-sm max-w-xl font-medium leading-relaxed mt-3">
              A breakdown of languages, frameworks, AI platforms, databases, and tooling I work with. Tap any card to inspect live project experience.
            </p>
          </div>

          {/* Metric Stats — HIDDEN ON MOBILE to eliminate horizontal scroll and vertical clutter */}
          <div className="hidden sm:flex gap-6 sm:gap-10 bg-white/40 backdrop-blur-md border-2 border-black rounded-[2.25rem] p-6 sm:p-8 shadow-[6px_6px_0_#000000] flex-shrink-0 self-start lg:self-center">
            <div>
              <span className="text-[10px] font-black uppercase text-black/40 block mb-1">Technologies</span>
              <span className="text-3xl sm:text-4xl font-black text-black leading-none">{skillsData.length}</span>
            </div>
            <div className="w-[2px] bg-black/10 self-stretch" />
            <div>
              <span className="text-[10px] font-black uppercase text-black/40 block mb-1">Categories</span>
              <span className="text-3xl sm:text-4xl font-black text-black leading-none">{categories.length - 1}</span>
            </div>
            <div className="w-[2px] bg-black/10 self-stretch" />
            <div>
              <span className="text-[10px] font-black uppercase text-black/40 block mb-1">Status</span>
              <span className="text-3xl sm:text-4xl font-black text-[var(--c-accent-2)] leading-none">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="sticky top-[75px] z-40 bg-white/60 backdrop-blur-md py-2.5 px-3 sm:px-5 border-2 border-black/10 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-nowrap md:flex-wrap gap-1.5 max-w-3xl overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
            {categories.map(cat => {
              const count = cat === 'All'
                ? skillsData.length
                : skillsData.filter(s => s.category === cat).length;
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    const list = cat === 'All' ? skillsData : skillsData.filter(s => s.category === cat);
                    if (list.length > 0) {
                      setSelectedSkill(list[0]);
                    }
                  }}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[var(--c-accent)] border-black shadow-md'
                      : 'bg-[var(--c-bg-surface)] text-black border-black/10 hover:border-black'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search technology..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const q = e.target.value.toLowerCase();
                const matches = skillsData.filter(s =>
                  s.name.toLowerCase().includes(q) &&
                  (activeTab === 'All' || s.category === activeTab)
                );
                if (matches.length > 0) {
                  setSelectedSkill(matches[0]);
                }
              }}
              className="w-full bg-[var(--c-bg-surface)] text-black font-bold text-xs px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-[var(--c-accent-2)] focus:outline-none transition-all placeholder:text-black/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-black/40 hover:text-black cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Content Panels */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Cards Grid — High-Density 2 Columns on Mobile */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 w-full">
            {filteredSkills.map((skill) => {
              const style = skillStyles[skill.name] || { icon: VscCode, color: '#555555' };
              const Icon = style.icon;
              const color = style.color;
              const isSelected = finalSelected.name === skill.name;
              
              const stageColors: Record<string, string> = {
                'Project Ready': 'bg-[var(--c-accent-2)]/10 text-[var(--c-accent-2)] border-[var(--c-accent-2)]/20',
                'Comfortable': 'bg-[var(--c-accent)] text-black border-black',
                'Learning': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
                'Comfortable (basic integration)': 'bg-[var(--c-accent)] text-black border-black'
              };

              return (
                <button
                  key={skill.name}
                  onClick={() => handleSkillClick(skill)}
                  className={`group flex flex-col justify-between text-left bg-white/50 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[var(--c-accent-2)] shadow-[3px_3px_0_var(--c-accent-2)] bg-white/80 -translate-x-0.5 -translate-y-0.5'
                      : 'border-black/5 hover:border-black/10 hover:shadow-[3px_3px_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                  }`}
                  style={{ minHeight: '95px' }}
                >
                  <div className="flex items-start gap-2 w-full mb-1.5">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[var(--c-bg-surface)] border border-black/5 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon style={{ color: color === '#000000' ? '#555' : color }} className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                      <p className="font-black text-[11px] sm:text-xs text-black leading-tight break-words pr-0.5">
                        {skill.name}
                      </p>
                      <span className={`text-[6.5px] sm:text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 border rounded-full max-w-full truncate ${stageColors[skill.status] || 'bg-black/5'}`}>
                        {skill.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full border-t border-black/5 pt-1.5 mt-auto text-[7.5px] sm:text-[8px] font-black text-black/40 uppercase tracking-wider">
                    <span>Used {skill.lastUsed}</span>
                    <span>
                      {skill.professionalUse ? '🏢 Prof' : '💻 Personal'}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredSkills.length === 0 && (
              <div className="col-span-full py-16 text-center text-black/35 font-bold text-sm">
                No technologies matching your filter or search query.
              </div>
            )}
          </div>

          {/* Details Sidebar Panel (Desktop Layout) */}
          {finalSelected && (
            <div className="hidden lg:block w-full lg:w-[440px] flex-shrink-0 bg-[var(--c-panel-bg)] text-white rounded-[2.25rem] p-7 border-4 border-black shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5.5">
                
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-[var(--c-accent)] flex items-center justify-center text-black shadow-lg">
                    {React.createElement(
                      (skillStyles[finalSelected.name] || { icon: VscCode }).icon,
                      {
                        style: { color: (skillStyles[finalSelected.name] || { color: 'var(--c-accent-2)' }).color },
                        className: 'w-6.5 h-6.5',
                      }
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase leading-none mb-1">
                      {finalSelected.name}
                    </h3>
                    <span className="text-[7.5px] font-black uppercase tracking-widest bg-[var(--c-accent-2)] text-white px-2 py-0.5 rounded-full">
                      {finalSelected.category}
                    </span>
                  </div>
                </div>

                {/* Status/Timeline Metrics */}
                <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-3.5">
                  <div>
                    <span className="text-[8.5px] font-black text-white/35 block uppercase tracking-wider mb-0.5">Status</span>
                    <span className="text-[10px] font-black text-[var(--c-accent)] uppercase tracking-wider">{finalSelected.status}</span>
                  </div>
                  <div className="w-[1px] bg-white/10 self-stretch justify-self-center" />
                  <div>
                    <span className="text-[8.5px] font-black text-white/35 block uppercase tracking-wider mb-0.5">Last Used</span>
                    <span className="text-[10px] font-black text-white">{finalSelected.lastUsed}</span>
                  </div>
                  <div className="w-[1px] bg-white/10 self-stretch justify-self-center" />
                  <div>
                    <span className="text-[8.5px] font-black text-white/35 block uppercase tracking-wider mb-0.5">Type</span>
                    <span className="text-[10px] font-black text-white uppercase">{finalSelected.professionalUse ? 'Professional' : 'Personal'}</span>
                  </div>
                </div>

                {/* Projects Used */}
                <div>
                  <h4 className="text-[var(--c-accent)] text-[10px] font-black uppercase tracking-wider mb-1.5">
                    PROJECTS / USE CASE
                  </h4>
                  <p className="text-white/75 text-xs font-semibold leading-relaxed">
                    {finalSelected.projectsUsed}
                  </p>
                </div>

                {/* Current Focus */}
                <div>
                  <h4 className="text-[var(--c-accent)] text-[10px] font-black uppercase tracking-wider mb-1">
                    CURRENT FOCUS
                  </h4>
                  <p className="text-white/70 text-xs font-bold leading-relaxed">
                    {finalSelected.currentFocus}
                  </p>
                </div>

                {/* Next Goal */}
                <div className="bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/20 rounded-xl p-3">
                  <h4 className="text-[var(--c-accent)] text-[10px] font-black uppercase tracking-wider mb-1">
                    NEXT GOAL
                  </h4>
                  <p className="text-white text-xs font-black leading-relaxed">
                    {finalSelected.nextGoal}
                  </p>
                </div>

                {/* Interview Confidence */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">
                    <span>Interview Confidence</span>
                    <span className="text-[var(--c-accent)]">{finalSelected.interviewConfidence}</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Skill Details Modal Drawer */}
      <AnimatePresence>
        {mobileDetailOpen && finalSelected && (
          <div className="fixed inset-0 z-[60] lg:hidden flex items-center justify-center pt-20 pb-4 px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm bg-[var(--c-panel-bg)] text-white rounded-[2rem] p-6 border-3 border-black shadow-2xl relative max-h-[80vh] overflow-y-auto z-[70]"
            >
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <IoClose className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-5 pr-8">
                <div className="w-11 h-11 rounded-xl bg-[var(--c-accent)] flex items-center justify-center text-black shadow-md flex-shrink-0">
                  {React.createElement(
                    (skillStyles[finalSelected.name] || { icon: VscCode }).icon,
                    {
                      style: { color: (skillStyles[finalSelected.name] || { color: 'var(--c-accent-2)' }).color },
                      className: 'w-5.5 h-5.5',
                    }
                  )}
                </div>
                <div>
                  <h3 className="font-black text-lg uppercase leading-tight mb-0.5">
                    {finalSelected.name}
                  </h3>
                  <span className="text-[7px] font-black uppercase tracking-widest bg-[var(--c-accent-2)] text-white px-2 py-0.5 rounded-full">
                    {finalSelected.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-3 mb-4 text-center">
                <div>
                  <span className="text-[8px] font-black text-white/40 block uppercase mb-0.5">Status</span>
                  <span className="text-[9px] font-black text-[var(--c-accent)] uppercase">{finalSelected.status}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black text-white/40 block uppercase mb-0.5">Last Used</span>
                  <span className="text-[9px] font-black text-white">{finalSelected.lastUsed}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black text-white/40 block uppercase mb-0.5">Type</span>
                  <span className="text-[9px] font-black text-white uppercase">{finalSelected.professionalUse ? 'Prof' : 'Personal'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <h4 className="text-[var(--c-accent)] text-[9.5px] font-black uppercase tracking-wider mb-1">PROJECTS / USE CASE</h4>
                  <p className="text-white/80 font-medium leading-relaxed">{finalSelected.projectsUsed}</p>
                </div>
                <div>
                  <h4 className="text-[var(--c-accent)] text-[9.5px] font-black uppercase tracking-wider mb-1">CURRENT FOCUS</h4>
                  <p className="text-white/75 font-medium leading-relaxed">{finalSelected.currentFocus}</p>
                </div>
                <div className="bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/20 rounded-xl p-3">
                  <h4 className="text-[var(--c-accent)] text-[9.5px] font-black uppercase tracking-wider mb-1">NEXT GOAL</h4>
                  <p className="text-white font-bold leading-relaxed">{finalSelected.nextGoal}</p>
                </div>
              </div>

              <button
                onClick={() => setMobileDetailOpen(false)}
                className="w-full mt-5 py-3 rounded-xl bg-[var(--c-accent)] text-black font-black text-xs uppercase tracking-wider border border-black cursor-pointer"
              >
                CLOSE DETAILS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
