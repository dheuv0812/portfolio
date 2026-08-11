import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaCalendarAlt, FaAward, FaBuilding, FaHandshake, FaFileAlt } from 'react-icons/fa';

import { useSEO } from '@/hooks/useSEO';
import internshipData from '@/data/experience.json';
import clientWorkData from '@/data/client-work.json';

const MOBILE_EXP_TABS = [
  { id: 'overview', label: '📋 Overview' },
  { id: 'achievements', label: '🏆 Achievements' },
  { id: 'stack', label: '🛠️ Tech Stack' },
];

export function ExperiencePage() {
  useSEO('Experience', 'Review my professional timeline and work experience, including internships and freelance history.');
  const [activeCategory, setActiveCategory] = useState<'internship' | 'freelance'>('internship');
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'achievements' | 'stack'>('overview');

  const currentDataset = activeCategory === 'internship' ? internshipData : clientWorkData;
  const activeExp: any = currentDataset[activeExpIdx] || currentDataset[0];

  return (
    <div className="w-full min-h-screen bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] pt-24 sm:pt-32 pb-24 px-3 sm:px-6 md:px-20 lg:px-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 border-b border-black/5 pb-6">
          <span className="inline-block bg-[#CCFF00] text-black font-black text-xs px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-sm">
            WORK TIMELINE
          </span>
          <h1
            className="text-[clamp(2.2rem,7vw,80px)] font-black leading-none tracking-tighter text-black uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
          >
            CAREER &amp;<br />
            <span className="text-[#0038FF]">EXPERIENCE</span>
          </h1>
          <p className="text-black/50 text-xs sm:text-sm max-w-md font-medium leading-relaxed mt-3">
            A structured repository separating official internships from freelance client work.
          </p>
        </div>

        {/* Category Toggle Tabs (Internships vs Freelance) */}
        <div className="flex gap-3 mb-6 border-b border-black/10 pb-4">
          <button
            onClick={() => {
              setActiveCategory('internship');
              setActiveExpIdx(0);
              setActiveMobileTab('overview');
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'internship'
                ? 'bg-black text-[#CCFF00] border-black shadow-[3px_3px_0_#0038FF]'
                : 'bg-white text-black border-black/10 hover:border-black'
            }`}
          >
            <FaBuilding className="w-3.5 h-3.5" /> Internships ({internshipData.length})
          </button>
          <button
            onClick={() => {
              setActiveCategory('freelance');
              setActiveExpIdx(0);
              setActiveMobileTab('overview');
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'freelance'
                ? 'bg-black text-[#CCFF00] border-black shadow-[3px_3px_0_#0038FF]'
                : 'bg-white text-black border-black/10 hover:border-black'
            }`}
          >
            <FaHandshake className="w-3.5 h-3.5" /> Freelance ({clientWorkData.length})
          </button>
        </div>

        {/* Mobile View: Swiper + Tabbed Card */}
        <div className="lg:hidden">
          {/* Swipable Role Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            {currentDataset.map((exp: any, index: number) => {
              const isActive = activeExpIdx === index;
              const title = exp.role || exp.client;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveExpIdx(index);
                    setActiveMobileTab('overview');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[#CCFF00] border-black shadow-[2px_2px_0_#0038FF]'
                      : 'bg-white text-black border-black/10 hover:border-black'
                  }`}
                >
                  0{index + 1}. {title}
                </button>
              );
            })}
          </div>

          {/* Mobile Card Container */}
          <AnimatePresence mode="wait">
            {activeExp && (
              <motion.div
                key={`${activeCategory}-${activeExpIdx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="border-[3px] border-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_#000000] bg-white/70 backdrop-blur-md"
              >
                {/* Header */}
                <div className="p-5 border-b-2 border-black bg-[#0038FF]/5 flex flex-col gap-2">
                  <span className="text-[8.5px] font-black uppercase text-[#0038FF] tracking-widest">
                    {activeExp.type || activeExp.industry}
                  </span>
                  <h3 className="text-xl font-black uppercase text-black leading-tight">
                    {activeExp.role || activeExp.client}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-extrabold text-black/60 pt-1">
                    <span>{activeExp.company || activeExp.role}</span>
                    <span className="text-[#0038FF]">{activeExp.duration || activeExp.timeline}</span>
                  </div>
                </div>

                {/* Mobile Tab Control Bar */}
                <div className="flex items-center justify-around border-b-2 border-black bg-[#F8F9FA] p-2">
                  {MOBILE_EXP_TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMobileTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                        activeMobileTab === tab.id
                          ? 'bg-black text-[#CCFF00] border border-black shadow-sm'
                          : 'text-black/60 hover:text-black'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Tabbed Content */}
                <div className="p-4 flex flex-col gap-4">
                  {activeMobileTab === 'overview' && (
                    <div className="flex flex-col gap-3 text-xs">
                      <span className="text-[8.5px] font-black text-[#0038FF] uppercase tracking-wider">
                        Core Responsibilities
                      </span>
                      <ul className="flex flex-col gap-2 text-[11px] font-medium text-black/75">
                        {(activeExp.responsibilities || []).map((point: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0038FF] mt-1.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeMobileTab === 'achievements' && (
                    <div className="flex flex-col gap-3 text-xs">
                      <span className="text-[8.5px] font-black text-black/40 uppercase tracking-wider">
                        Key Deliverables &amp; Outcomes
                      </span>
                      <ul className="flex flex-col gap-2 text-[11px] font-bold text-black/75">
                        {(activeExp.achievements || activeExp.deliverables || []).map((ach: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <FaAward className="w-3.5 h-3.5 text-[#0038FF] flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeMobileTab === 'stack' && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[8.5px] font-black text-black/40 uppercase tracking-wider">
                        Technologies &amp; Tools Used
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(activeExp.technologies || activeExp.stack || []).map((t: string) => (
                          <span key={t} className="text-[8.5px] font-black uppercase border border-black/10 bg-white px-2 py-0.5 rounded-full text-black/70">
                            {t}
                          </span>
                        ))}
                      </div>
                      {activeExp.offerLetter && (
                        <a
                          href={activeExp.offerLetter}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[9.5px] font-black uppercase bg-[#CCFF00] border border-black py-2 rounded-xl text-black flex items-center justify-center gap-1.5 mt-1"
                        >
                          <FaFileAlt className="w-3 h-3" /> Offer Letter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View: Full Expanded Timeline List */}
        <div className="hidden lg:flex flex-col gap-10">
          {activeCategory === 'internship' ? (
            internshipData.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="border-[3px] border-black rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#0038FF] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-md p-8 md:p-10 flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-6 text-left">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0038FF] mb-1.5 block">
                      {exp.type}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-black">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-black uppercase tracking-wider text-black/50 block mt-1.5">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-black/60 bg-black/5 px-4 py-2 rounded-full border border-black/5 w-fit h-fit flex-shrink-0">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-[#0038FF]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[9.5px] font-black text-[#0038FF] tracking-widest uppercase block mb-1">
                    Core Responsibilities
                  </span>
                  <ul className="flex flex-col gap-3 text-xs md:text-sm text-black/70 font-medium leading-relaxed">
                    {exp.responsibilities.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0038FF] mt-1.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[9.5px] font-black text-[#CCFF00] bg-zinc-900 px-3 py-1.5 rounded-full tracking-widest uppercase block w-fit mb-1 border border-black">
                    Key Achievements
                  </span>
                  <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-black/70 font-bold leading-relaxed">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <FaAward className="w-4 h-4 text-[#0038FF] flex-shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools footer */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-6 border-t border-black/5">
                  {exp.technologies.map(t => (
                    <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-white/80 px-2.5 py-1 rounded-full text-black/70">
                      {t}
                    </span>
                  ))}
                  {(exp as any).offerLetter && (
                    <a
                      href={(exp as any).offerLetter}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto text-[9.5px] font-black uppercase tracking-wider bg-[#CCFF00] border-2 border-black px-3.5 py-1.5 rounded-full text-black hover:bg-black hover:text-[#CCFF00] transition-colors flex items-center gap-1.5 shadow-sm flex-shrink-0"
                    >
                      <FaFileAlt className="w-2.5 h-2.5" /> Offer Letter
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            clientWorkData.map((exp, idx) => (
              <motion.div
                key={exp.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="border-[3px] border-black rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#0038FF] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-md p-8 md:p-10 flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-6 text-left">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0038FF] mb-1.5 block">
                      {exp.industry}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-black">
                      {exp.client}
                    </h3>
                    <span className="text-sm font-black uppercase tracking-wider text-black/50 block mt-1.5">
                      {exp.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-black/60 bg-black/5 px-4 py-2 rounded-full border border-black/5 w-fit h-fit flex-shrink-0">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-[#0038FF]" />
                    <span>{exp.timeline}</span>
                  </div>
                </div>

                {/* Outcome */}
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[9.5px] font-black text-[#0038FF] tracking-widest uppercase block mb-1">
                    Outcome
                  </span>
                  <p className="text-sm text-black/75 font-semibold leading-relaxed">
                    {exp.outcome}
                  </p>
                </div>

                {/* Tools footer */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-6 border-t border-black/5">
                  {exp.stack.map(t => (
                    <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-white/80 px-2.5 py-1 rounded-full text-black/70">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
