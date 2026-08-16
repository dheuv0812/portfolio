import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaGithub, FaExternalLinkAlt, FaChartLine, FaPuzzlePiece, FaLightbulb } from 'react-icons/fa';

import { useSEO } from '@/hooks/useSEO';
import projectsData from '@/data/projects.json';
import { trackProjectDemo, trackProjectRepo } from '@/lib/analytics';

const MOBILE_TABS = [
  { id: 'overview', label: '📋 Overview' },
  { id: 'arch', label: '🧩 Architecture' },
  { id: 'hurdles', label: '💡 Hurdles' },
];

export function ProjectsPage() {
  useSEO('Projects', 'Inspect my engineering projects and case studies, including NoteLift, Brainstormzz, and AI Career Engine.');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'arch' | 'hurdles'>('overview');

  const project = projectsData[activeProjectIdx];

  return (
    <div className="w-full min-h-screen bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] pt-24 sm:pt-32 pb-24 px-3 sm:px-6 md:px-20 lg:px-28 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 border-b border-black/5 pb-6">
          <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-sm">
            CASE STUDIES
          </span>
          <h1
            className="text-[clamp(2.2rem,7vw,80px)] font-black leading-none tracking-tighter text-black uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
          >
            ENGINEERING<br />
            <span className="text-[#0D9488]">PROJECTS</span>
          </h1>
          <p className="text-black/50 text-xs sm:text-sm max-w-md font-medium leading-relaxed mt-3">
            Deep dive case studies detailing design decisions, architectural parameters, real-world hurdles, and lessons learned.
          </p>
        </div>

        {/* Project Selector Row */}
        <div className="mb-6">
          {/* Mobile Horizontal Touch Swiper */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {projectsData.map((p, index) => {
              const isActive = activeProjectIdx === index;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProjectIdx(index);
                    setActiveMobileTab('overview');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[#00F5A0] border-black shadow-[2px_2px_0_#0D9488]'
                      : 'bg-white text-black border-black/10 hover:border-black'
                  }`}
                >
                  0{index + 1}. {p.name}
                </button>
              );
            })}
          </div>

          {/* Desktop Circular Selector Row */}
          <div className="hidden lg:flex items-center justify-between gap-4 px-2">
            <span className="text-[10px] font-black uppercase text-black/40 tracking-wider">
              Project Case Study (0{activeProjectIdx + 1} / 0{projectsData.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {projectsData.map((_, index) => {
                const isActive = activeProjectIdx === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveProjectIdx(index)}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-black text-[#00F5A0] border-black shadow-[2px_2px_0_#0D9488] -translate-x-0.5 -translate-y-0.5'
                        : 'bg-white/40 backdrop-blur-sm text-black border-black/10 hover:border-black hover:bg-white'
                    }`}
                  >
                    0{index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Case Study Card with Dynamic Slide Transition */}
        <AnimatePresence mode="wait">
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="bg-white/70 backdrop-blur-md border-[3px] border-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#0D9488] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black p-5 sm:p-8 bg-[#0D9488]/5 gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase leading-tight">
                  {project.name}
                </h3>
                <p className="text-black/60 text-[11px] sm:text-xs font-black uppercase tracking-wider mt-1">
                  {project.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackProjectRepo(project.name)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 border-2 border-black rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white hover:bg-black hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FaGithub /> Repo
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackProjectDemo(project.name)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 border-2 border-black rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#00F5A0] hover:bg-black text-black hover:text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Tab Control Bar */}
            <div className="lg:hidden flex items-center justify-around border-b-2 border-black bg-[#F8F9FA] p-2">
              {MOBILE_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMobileTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                    activeMobileTab === tab.id
                      ? 'bg-black text-[#00F5A0] border border-black shadow-sm'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Tabbed View Content */}
            <div className="lg:hidden p-5">
              {activeMobileTab === 'overview' && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <FaChartLine className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-black text-black text-xs uppercase tracking-wider">Problem &amp; Why Built</h4>
                      <p className="text-black/70 text-xs font-medium leading-relaxed mt-1">{project.problem}</p>
                      <div className="bg-[#0D9488]/5 p-2.5 rounded-xl border border-black/5 mt-2">
                        <strong className="text-black uppercase text-[8.5px] block mb-0.5">Why Built:</strong>
                        <p className="text-black/70 text-[11px] font-semibold italic">{project.whyBuilt}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-black/10 pt-3 text-xs">
                    <div>
                      <span className="text-[8.5px] font-black text-black/40 block uppercase">Role &amp; Year</span>
                      <p className="font-extrabold text-black text-[11px]">{project.role}</p>
                      <span className="text-[10px] font-black text-[#0D9488]">{project.year}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-black text-black/40 block uppercase">Project Status</span>
                      <p className="font-extrabold text-[#0D9488] text-[11px] uppercase">{project.status}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8.5px] font-black text-black/40 block uppercase mb-1.5">Technologies</span>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map(t => (
                        <span key={t} className="text-[8.5px] font-black uppercase border border-black/10 bg-white px-2 py-0.5 rounded-full text-black/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMobileTab === 'arch' && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0D9488] flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                      <FaPuzzlePiece className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-black text-black text-xs uppercase tracking-wider">Architecture Details</h4>
                      <p className="text-black/70 text-xs font-medium leading-relaxed mt-1">
                        System Type: <span className="font-black text-black">{project.projectType}</span>
                      </p>
                      <div className="bg-[#F8F9FA] rounded-xl p-3 border border-black/5 mt-2">
                        <span className="text-[8.5px] font-black uppercase text-black/45 block mb-1">Future Planned Improvements</span>
                        <p className="text-black/85 text-xs font-semibold leading-relaxed">{project.futureImprovements}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8.5px] font-black text-black/40 block uppercase mb-1">Core Contribution</span>
                    <p className="text-xs font-semibold text-black/80 leading-relaxed bg-white p-3 rounded-xl border border-black/10">
                      {project.contribution}
                    </p>
                  </div>
                </div>
              )}

              {activeMobileTab === 'hurdles' && (
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-yellow-200">
                    <FaLightbulb className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-xs uppercase tracking-wider">Hurdles &amp; Lessons</h4>
                    <div className="bg-[#F8F9FA] rounded-xl p-3 border border-black/5 mt-2 flex flex-col gap-2.5">
                      <p className="text-black/75 text-xs font-medium leading-relaxed">
                        <strong className="text-black block mb-0.5 uppercase text-[9px]">The Hurdle:</strong> {project.challenges}
                      </p>
                      <p className="text-black/75 text-xs font-medium leading-relaxed border-t border-black/5 pt-2">
                        <strong className="text-[#0D9488] block mb-0.5 uppercase text-[9px]">The Solution:</strong> {project.lessonsLearned}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop 2-Column Full View Content */}
            <div className="hidden lg:grid p-8 grid-cols-3 gap-8">
              
              {/* Left col: Tech stats, Role, Timeline */}
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-black text-black/40 uppercase tracking-widest block mb-1">
                    Role &amp; Timeline
                  </span>
                  <p className="text-xs font-black uppercase text-black leading-snug">{project.role}</p>
                  <span className="text-xs font-black text-[#0D9488] tracking-wider block mt-1">{project.year}</span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-black/40 uppercase tracking-widest block mb-1">
                    Contribution
                  </span>
                  <p className="text-[11px] font-bold text-black/70 leading-relaxed pr-1">{project.contribution}</p>
                </div>

                <div>
                  <span className="text-[10px] font-black text-black/40 uppercase tracking-widest block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map(t => (
                      <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-white/60 px-2.5 py-1 rounded-full text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights Card */}
                <div className="bg-[#1E2026] text-white p-5 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden border-2 border-black">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                  <span className="text-[9px] font-black text-[#00F5A0] tracking-widest uppercase block mb-1">
                    PROJECT STATUS
                  </span>
                  <span className="text-2xl font-black uppercase tracking-widest">{project.status}</span>
                </div>
              </div>

              {/* Right col: Case details */}
              <div className="col-span-2 flex flex-col gap-6">
                {/* Problem & Research */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-1 border border-red-200">
                    <FaChartLine className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase tracking-wider">The Problem &amp; Why Built</h4>
                    <p className="text-black/70 text-xs font-medium leading-relaxed mt-1.5">{project.problem}</p>
                    <p className="text-black/60 text-[11px] font-semibold leading-relaxed mt-2 italic bg-[#0D9488]/5 px-3 py-2 rounded-xl border border-black/5">
                      <strong className="text-black uppercase text-[9px] block mb-0.5">Why Built:</strong> {project.whyBuilt}
                    </p>
                  </div>
                </div>

                {/* Architecture & Features */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0D9488] flex items-center justify-center flex-shrink-0 mt-1 border border-blue-200">
                    <FaPuzzlePiece className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase tracking-wider">Architecture &amp; Future Goals</h4>
                    <p className="text-black/70 text-xs font-medium leading-relaxed mt-1.5">
                      Type: <span className="font-black text-black">{project.projectType}</span>
                    </p>
                    <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-black/5 mt-3">
                      <span className="text-[9px] font-black uppercase text-black/45 block mb-1">Future Planned Improvements</span>
                      <p className="text-black/85 text-xs font-semibold leading-relaxed">{project.futureImprovements}</p>
                    </div>
                  </div>
                </div>

                {/* Key Hurdles & Lessons */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 mt-1 border border-yellow-200">
                    <FaLightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase tracking-wider">Key Hurdles &amp; Lessons</h4>
                    <p className="text-black/70 text-xs font-medium leading-relaxed mt-1.5">
                      <strong className="text-black">The Hurdle:</strong> {project.challenges}
                    </p>
                    <p className="text-black/70 text-xs font-medium leading-relaxed mt-2">
                      <strong className="text-[#0D9488]">The Solution:</strong> {project.lessonsLearned}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.article>
        </AnimatePresence>

      </div>
    </div>
  );
}
