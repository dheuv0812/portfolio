import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaBriefcase, FaHandshake, FaQuoteLeft, FaExternalLinkAlt, FaAward } from 'react-icons/fa';

import { useSEO } from '@/hooks/useSEO';
import clientWorkData from '@/data/client-work.json';

const MOBILE_CLIENT_TABS = [
  { id: 'overview', label: '📋 Overview' },
  { id: 'deliverables', label: '💼 Scope' },
  { id: 'lessons', label: '💡 Lessons' },
];

export function ClientWorkPage() {
  useSEO('Client Work', 'Explore my professional client engagements, website catalog designs, outcome summaries, and testimonials.');
  const [activeClientIdx, setActiveClientIdx] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'deliverables' | 'lessons'>('overview');
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');

  const item = clientWorkData[activeClientIdx];

  return (
    <div className="w-full min-h-screen bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] pt-24 sm:pt-32 pb-24 px-3 sm:px-6 md:px-20 lg:px-28 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 border-b border-black/5 pb-6">
          <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-sm">
            CLIENT PROJECTS
          </span>
          <h1
            className="text-[clamp(2.2rem,7vw,80px)] font-black leading-none tracking-tighter text-black uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
          >
            PROFESSIONAL<br />
            <span className="text-[#0D9488]">ENGAGEMENTS</span>
          </h1>
          <p className="text-black/50 text-xs sm:text-sm max-w-md font-medium leading-relaxed mt-3">
            Paid freelance engagements built to address direct business problems, layout parameters, and post-launch updates.
          </p>
        </div>

        {/* Client Engagement Selector Row */}
        <div className="mb-6">
          {/* Mobile Horizontal Touch Swiper */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {clientWorkData.map((c, index) => {
              const isActive = activeClientIdx === index;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveClientIdx(index);
                    setActiveMobileTab('overview');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[#00F5A0] border-black shadow-[2px_2px_0_#0D9488]'
                      : 'bg-white text-black border-black/10 hover:border-black'
                  }`}
                >
                  0{index + 1}. {c.client}
                </button>
              );
            })}
          </div>

          {/* Desktop Circular Selector Row */}
          <div className="hidden lg:flex items-center justify-between gap-4 px-2">
            <span className="text-[10px] font-black uppercase text-black/40 tracking-wider">
              Client Engagement (0{activeClientIdx + 1} / 0{clientWorkData.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {clientWorkData.map((_, index) => {
                const isActive = activeClientIdx === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveClientIdx(index)}
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
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="border-[3px] border-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#0D9488] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white/70 backdrop-blur-md"
          >
            {/* Mobile View Container */}
            <div className="lg:hidden flex flex-col">
              {/* Header Image Bar */}
              <div
                onClick={() => {
                  setActiveScreenshot(item.img);
                  setPreviewTitle(`${item.client} Layout Preview`);
                }}
                className="relative h-48 border-b-2 border-black cursor-pointer overflow-hidden group"
              >
                <img src={item.img} alt={item.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[8.5px] font-black uppercase text-[#00F5A0] tracking-widest">{item.industry}</span>
                  <h3 className="font-black text-lg uppercase leading-tight">{item.client}</h3>
                  <p className="text-[10px] text-white/70 font-semibold">{item.role} • {item.timeline}</p>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#00F5A0] border border-[#00F5A0]/30 text-[8px] font-black px-2.5 py-1 rounded-full uppercase">
                  👁️ Tap Image
                </div>
              </div>

              {/* Mobile Tab Controls */}
              <div className="flex items-center justify-around border-b-2 border-black bg-[#F8F9FA] p-2">
                {MOBILE_CLIENT_TABS.map(tab => (
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

              {/* Mobile Tab Content */}
              <div className="p-4 flex flex-col gap-4">
                {activeMobileTab === 'overview' && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-[8.5px] font-black text-black/40 uppercase tracking-widest block mb-0.5">Key Business Outcome</span>
                      <p className="text-black/80 text-xs font-semibold leading-relaxed bg-[#0D9488]/5 p-3 rounded-xl border border-black/5">
                        {item.outcome}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8.5px] font-black text-black/40 uppercase tracking-widest block mb-1">Tech Stack</span>
                      <div className="flex flex-wrap gap-1">
                        {item.stack.map(t => (
                          <span key={t} className="text-[8.5px] font-black uppercase border border-black/10 bg-white px-2 py-0.5 rounded-full text-black/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'deliverables' && (
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <h4 className="font-black text-black text-[11px] uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <FaBriefcase className="text-[#0D9488]" /> Responsibilities
                      </h4>
                      <ul className="flex flex-col gap-1 text-[11px] font-medium text-black/70">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-black/5 pt-2">
                      <h4 className="font-black text-black text-[11px] uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <FaHandshake className="text-[#0D9488]" /> Deliverables
                      </h4>
                      <ul className="flex flex-col gap-1 text-[11px] font-medium text-black/70">
                        {item.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'lessons' && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-[#1E2026] text-white rounded-xl p-4 border border-black flex gap-2.5 items-start">
                      <FaQuoteLeft className="w-3.5 h-3.5 text-[#00F5A0] flex-shrink-0 mt-1" />
                      <div>
                        <span className="text-[8px] font-black text-[#00F5A0] uppercase block mb-1">LESSONS LEARNED</span>
                        <p className="text-white/80 text-xs font-medium leading-relaxed">{item.lessons}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                      <button
                        onClick={() => {
                          setActiveScreenshot(item.img);
                          setPreviewTitle(`${item.client} Layout Preview`);
                        }}
                        className="flex-1 text-[9.5px] font-black uppercase bg-white border border-black py-2 rounded-xl text-black"
                      >
                        👁️ Preview Layout
                      </button>
                      {(item as any).cert && (
                         <button
                           onClick={() => {
                             setActiveScreenshot((item as any).cert);
                             setPreviewTitle(`${item.client} — Completion Certificate`);
                           }}
                           className="flex-1 text-[9.5px] font-black uppercase bg-[#00F5A0] border border-black py-2 rounded-xl text-black flex items-center justify-center gap-1"
                         >
                           <FaAward className="w-3 h-3" /> Certificate
                         </button>
                       )}
                      {item.links.map(l => (
                        l.url !== '#' ? (
                          <a
                            key={l.label}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-[9.5px] font-black uppercase bg-white border border-black py-2 rounded-xl text-black text-center"
                          >
                            Live Site ↗
                          </a>
                        ) : null
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop View Container */}
            <div className="hidden lg:flex flex-row">
              {/* Left Side: Thumbnail & Summary */}
              <div
                onClick={() => {
                  setActiveScreenshot(item.img);
                  setPreviewTitle(`${item.client} Layout Preview`);
                }}
                className="w-[360px] flex-shrink-0 relative h-auto min-h-[300px] border-r-[3px] border-black cursor-pointer overflow-hidden group/img"
              >
                <img
                  src={item.img}
                  alt={item.client}
                  className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#00F5A0] text-black border-2 border-black font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider shadow-md">
                    🔍 Click to Preview
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end text-white text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00F5A0] mb-1.5">
                    {item.industry}
                  </span>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {item.logo && (
                      <div className="w-8 h-8 rounded-lg bg-white p-1.5 flex items-center justify-center flex-shrink-0 shadow-md">
                        <img src={item.logo} alt="Client Logo" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <h3 className="font-black text-xl uppercase leading-none">
                      {item.client}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-white/70">
                    <span>{item.role}</span>
                    <span>{item.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Case Study */}
              <div className="flex-1 p-8 flex flex-col gap-6 justify-between">
                <div className="flex flex-col gap-4 text-left">
                  <div>
                    <span className="text-[9px] font-black text-black/40 uppercase tracking-widest block mb-1">OUTCOME</span>
                    <p className="text-black/75 text-xs font-semibold leading-relaxed">
                      {item.outcome}
                    </p>
                  </div>

                  <hr className="border-black/5" />

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-black text-black text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FaBriefcase className="text-[#0D9488]" /> Core Responsibilities
                      </h4>
                      <ul className="flex flex-col gap-1.5 text-[11px] font-bold text-black/60">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-black text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FaHandshake className="text-[#0D9488]" /> Deliverables
                      </h4>
                      <ul className="flex flex-col gap-1.5 text-[11px] font-bold text-black/60">
                        {item.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <hr className="border-black/5" />

                  <div className="bg-[#1E2026] text-white rounded-2xl p-5 border-2 border-black flex gap-3 items-start relative overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                    <FaQuoteLeft className="w-4 h-4 text-[#00F5A0] flex-shrink-0 mt-1" />
                    <div className="relative z-10 text-left">
                      <span className="text-[8px] font-black text-[#00F5A0] tracking-widest uppercase block mb-1">
                        LESSONS LEARNED
                      </span>
                      <p className="text-white/80 text-[11px] font-medium leading-relaxed">
                        {item.lessons}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-black/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map(t => (
                      <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-white/60 px-2.5 py-1 rounded-full text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                     <button
                       onClick={() => {
                         setActiveScreenshot(item.img);
                         setPreviewTitle(`${item.client} Layout Preview`);
                       }}
                       className="text-[9.5px] font-black uppercase tracking-wider bg-white border-2 border-black px-3.5 py-1.5 rounded-full text-black hover:bg-black hover:text-white transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                     >
                       👁️ Preview Layout
                     </button>
                     {(item as any).cert && (
                       <button
                         onClick={() => {
                           setActiveScreenshot((item as any).cert);
                           setPreviewTitle(`${item.client} — Completion Certificate`);
                         }}
                         className="text-[9.5px] font-black uppercase tracking-wider bg-[#00F5A0] border-2 border-black px-3.5 py-1.5 rounded-full text-black hover:bg-black hover:text-[#00F5A0] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                       >
                         <FaAward className="w-2.5 h-2.5" /> Certificate
                       </button>
                     )}
                     {item.links.map(l => (
                       l.url !== '#' ? (
                         <a
                           key={l.label}
                           href={l.url}
                           target="_blank"
                           rel="noreferrer"
                           className="text-[9.5px] font-black uppercase tracking-wider bg-white border-2 border-black px-3.5 py-1.5 rounded-full text-black hover:bg-black hover:text-white transition-colors flex items-center gap-1 shadow-sm"
                         >
                           <FaExternalLinkAlt className="w-2.5 h-2.5" /> {l.label}
                         </a>
                       ) : (
                         <span
                           key={l.label}
                           className="text-[9.5px] font-black uppercase tracking-wider bg-[#00F5A0]/30 border-2 border-black/20 px-3.5 py-1.5 rounded-full text-black/40 flex items-center gap-1 select-none cursor-not-allowed"
                           title="Site launching soon"
                         >
                           ⏳ {l.label} (Soon)
                         </span>
                       )
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      {activeScreenshot && (
        <div
          onClick={() => {
            setActiveScreenshot(null);
            setPreviewTitle('');
          }}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center pt-20 pb-4 px-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center z-[70]">
            <button
              onClick={() => {
                setActiveScreenshot(null);
                setPreviewTitle('');
              }}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-[#00F5A0] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full border border-white/20 cursor-pointer shadow-lg"
            >
              Close ✕
            </button>
            <img
              src={activeScreenshot}
              alt="Website Layout Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border-4 border-black shadow-2xl bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/60 text-xs mt-3 font-bold uppercase tracking-wider pointer-events-none">
              {previewTitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
