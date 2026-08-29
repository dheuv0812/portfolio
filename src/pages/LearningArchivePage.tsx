import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaAward, FaHourglassHalf, FaCompass, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import { useSEO } from '@/hooks/useSEO';
import certificationsData from '@/data/certifications.json';
import { trackCertificateView } from '@/lib/analytics';

const MOBILE_CERT_TABS = [
  { id: 'overview', label: '📋 Overview' },
  { id: 'learnt', label: '🧠 What I Learnt' },
  { id: 'skills', label: '🎯 Skills Gained' },
];

export function LearningArchivePage() {
  useSEO('Certifications', 'Explore my verified academic credentials, specialized development certifications, and deep technology training courses.');
  const [activeCategory, setActiveCategory] = useState<'featured' | 'collections' | 'other'>('featured');
  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'learnt' | 'skills'>('overview');
  
  const [activeItem, setActiveItem] = useState<any | null>(null);
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

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] pt-24 sm:pt-32 pb-24 px-3 sm:px-6 md:px-20 lg:px-28 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 border-b border-black/5 pb-6">
          <span className="inline-block bg-[var(--c-accent)] text-black font-black text-xs px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-sm">
            LEARNING LOG
          </span>
          <h1
            className="text-[clamp(2.2rem,7vw,80px)] font-black leading-none tracking-tighter text-black uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
          >
            CONTINUOUS<br />
            <span className="text-[var(--c-accent-2)]">LEARNING</span>
          </h1>
          <p className="text-black/50 text-xs sm:text-sm max-w-md font-medium leading-relaxed mt-3">
            A structured repository of verified certifications, deep specialized training courses, and academic milestones.
          </p>
        </div>

        {/* Mobile Category Toggle Pills */}
        <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setActiveCategory('featured');
              setActiveCertIdx(0);
              setActiveMobileTab('overview');
            }}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'featured'
                ? 'bg-black text-[var(--c-accent)] border-black shadow-[2px_2px_0_var(--c-accent-2)]'
                : 'bg-[var(--c-bg-surface)] text-black border-black/10 hover:border-black'
            }`}
          >
            📜 Featured ({featuredItems.length})
          </button>
          <button
            onClick={() => {
              setActiveCategory('collections');
              setActiveCertIdx(0);
              setActiveMobileTab('overview');
            }}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'collections'
                ? 'bg-black text-[var(--c-accent)] border-black shadow-[2px_2px_0_var(--c-accent-2)]'
                : 'bg-[var(--c-bg-surface)] text-black border-black/10 hover:border-black'
            }`}
          >
            📂 Collections ({githubSeries.items.length + dataAnalyticsSeries.items.length})
          </button>
          <button
            onClick={() => {
              setActiveCategory('other');
              setActiveCertIdx(0);
              setActiveMobileTab('overview');
            }}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'other'
                ? 'bg-black text-[var(--c-accent)] border-black shadow-[2px_2px_0_var(--c-accent-2)]'
                : 'bg-[var(--c-bg-surface)] text-black border-black/10 hover:border-black'
            }`}
          >
            🏆 Achievements ({achievementItems.length})
          </button>
        </div>

        {/* Mobile View: Swiper + Tabbed Card */}
        <div className="lg:hidden mb-12">
          {/* Swipable Item Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            {currentDataset.map((item: any, index: number) => {
              const isActive = activeCertIdx === index;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveCertIdx(index);
                    setActiveMobileTab('overview');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[var(--c-accent)] border-black shadow-[2px_2px_0_var(--c-accent-2)]'
                      : 'bg-[var(--c-bg-surface)] text-black border-black/10 hover:border-black'
                  }`}
                >
                  0{index + 1}. {item.title}
                </button>
              );
            })}
          </div>

          {/* Mobile Card Container */}
          <AnimatePresence mode="wait">
            {activeCert && (
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="border-[3px] border-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_var(--c-shadow)] bg-white/70 backdrop-blur-md"
              >
                {/* Card Header */}
                <div className="p-5 border-b-2 border-black bg-[var(--c-accent)]/10 flex items-start gap-3">
                  <span className="text-3xl leading-none flex-shrink-0">{activeCert.icon}</span>
                  <div>
                    <span className="text-[8.5px] font-black uppercase bg-[var(--c-accent-2)] text-white px-2 py-0.5 rounded-full tracking-wider inline-block mb-1">
                      {activeCert.issuer} • {activeCert.issueDate}
                    </span>
                    <h3 className="font-black text-lg uppercase leading-tight text-black">
                      {activeCert.title}
                    </h3>
                  </div>
                </div>

                {/* Mobile Tab Control Bar */}
                <div className="flex items-center justify-around border-b-2 border-black bg-[var(--c-bg-surface)] p-2">
                  {MOBILE_CERT_TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMobileTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                        activeMobileTab === tab.id
                          ? 'bg-black text-[var(--c-accent)] border border-black shadow-sm'
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
                      <div>
                        <span className="text-[8.5px] font-black text-[var(--c-accent-2)] uppercase tracking-wider block mb-1">
                          Overview
                        </span>
                        <p className="text-black/75 font-medium leading-relaxed bg-[var(--c-bg-surface)] p-3 rounded-xl border border-black/5">
                          {activeCert.desc}
                        </p>
                      </div>
                      {activeCert.hours && (
                        <div className="flex items-center justify-between text-[11px] font-extrabold text-black/60 pt-1">
                          <span>Course Duration:</span>
                          <span className="text-[var(--c-accent-2)]">{activeCert.hours}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {activeMobileTab === 'learnt' && (
                    <div className="flex flex-col gap-3 text-xs">
                      <span className="text-[8.5px] font-black text-[var(--c-accent-2)] uppercase tracking-wider">
                        Key Learnings
                      </span>
                      <p className="text-black/75 font-medium leading-relaxed bg-[var(--c-bg-surface)] p-3 rounded-xl border border-black/5">
                        {activeCert.learnt || 'Comprehensive practical coursework and hands-on modules.'}
                      </p>
                    </div>
                  )}

                  {activeMobileTab === 'skills' && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[8.5px] font-black text-black/40 uppercase tracking-wider">
                        Skills Gained
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(activeCert.skills || []).map((s: string, i: number) => (
                          <span key={i} className="text-[8.5px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2 py-0.5 rounded-full text-black/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trigger Certificate Modal */}
                  <button
                    onClick={() => {
                      setActiveItem(activeCert);
                      setShowPdf(false);
                    }}
                    className="w-full mt-2 py-2.5 rounded-xl bg-black text-[var(--c-accent)] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    View Official Certificate <FaExternalLinkAlt className="w-3 h-3 text-[var(--c-accent)]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View: Full Expanded Grids */}
        <div className="hidden lg:block">
          {/* Featured Section */}
          <div className="mb-16">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-6 pb-2 border-b-2 border-black/10 flex items-center gap-2">
              <FaAward className="text-[var(--c-accent-2)] w-5 h-5" /> Featured Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackCertificateView(item.title);
                    setActiveItem(item);
                    setShowPdf(false);
                  }}
                  className="text-left bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[2rem] p-6 shadow-[8px_8px_0px_0px_var(--c-shadow)] hover:shadow-[12px_12px_0px_0px_var(--c-accent-2)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 cursor-pointer group relative w-full"
                >
                  <div className="text-3xl flex-shrink-0 bg-black/5 w-12 h-12 rounded-full flex items-center justify-center border-2 border-black/10 group-hover:border-black transition-all">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-black uppercase bg-[var(--c-accent-2)]/10 text-[var(--c-accent-2)] border border-[var(--c-accent-2)]/10 px-2 py-0.5 rounded-full tracking-wider block w-fit mb-1.5">
                      {item.issuer} • {item.issueDate}
                    </span>
                    <h4 className="font-black text-black text-sm uppercase leading-tight group-hover:text-[var(--c-accent-2)] transition-colors pr-6">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {item.skills && item.skills.map((s, i) => (
                        <span key={i} className="text-[8px] font-black uppercase bg-[var(--c-accent)] text-black border border-black px-2.5 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-black/30 group-hover:text-[var(--c-accent-2)] transition-colors">
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Collections Section */}
          <div className="mb-16">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-6 pb-2 border-b-2 border-black/10">
              📂 Learning Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* GitHub Learning Series */}
              <div className="border-[3px] border-black rounded-[2.5rem] p-6 bg-[var(--c-bg-surface)] shadow-[8px_8px_0px_0px_var(--c-shadow)] hover:shadow-[12px_12px_0px_0px_var(--c-accent-2)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase bg-[var(--c-accent)] text-black border border-black px-2.5 py-1 rounded-full tracking-wider block w-fit mb-3">
                    GITHUB LEARNING SERIES ({githubSeries.items.length})
                  </span>
                  <h4 className="font-black text-lg text-black uppercase leading-tight">
                    {githubSeries.name}
                  </h4>
                  <p className="text-black/60 text-xs mt-2 leading-relaxed font-medium">
                    {githubSeries.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-black/5 pt-4">
                  {githubSeries.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveItem(item);
                        setShowPdf(false);
                      }}
                      className="text-left py-2.5 px-3.5 hover:bg-black/5 rounded-xl flex items-center justify-between text-xs font-black uppercase text-black/70 hover:text-black transition-all group cursor-pointer border border-transparent hover:border-black/10 w-full"
                    >
                      <span className="truncate max-w-[260px] tracking-wide">{item.icon} {item.title}</span>
                      <span className="text-[9px] font-black uppercase text-black/40 group-hover:text-[var(--c-accent-2)] flex items-center gap-1.5 flex-shrink-0">
                        Details ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Analytics Series */}
              <div className="border-[3px] border-black rounded-[2.5rem] p-6 bg-[var(--c-bg-surface)] shadow-[8px_8px_0px_0px_var(--c-shadow)] hover:shadow-[12px_12px_0px_0px_var(--c-accent-2)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase bg-[var(--c-accent)] text-black border border-black px-2.5 py-1 rounded-full tracking-wider block w-fit mb-3">
                    DATA ANALYTICS & VISUALIZATION ({dataAnalyticsSeries.items.length})
                  </span>
                  <h4 className="font-black text-lg text-black uppercase leading-tight">
                    {dataAnalyticsSeries.name}
                  </h4>
                  <p className="text-black/60 text-xs mt-2 leading-relaxed font-medium">
                    {dataAnalyticsSeries.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-black/5 pt-4">
                  {dataAnalyticsSeries.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveItem(item);
                        setShowPdf(false);
                      }}
                      className="text-left py-2.5 px-3.5 hover:bg-black/5 rounded-xl flex items-center justify-between text-xs font-black uppercase text-black/70 hover:text-black transition-all group cursor-pointer border border-transparent hover:border-black/10 w-full"
                    >
                      <span className="truncate max-w-[260px] tracking-wide">{item.icon} {item.title}</span>
                      <span className="text-[9px] font-black uppercase text-black/40 group-hover:text-[var(--c-accent-2)] flex items-center gap-1.5 flex-shrink-0">
                        Details ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-12">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-6 pb-2 border-b-2 border-black/10">
              🏆 Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievementItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    setShowPdf(false);
                  }}
                  className="text-left bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[2rem] p-6 shadow-[8px_8px_0px_0px_var(--c-shadow)] hover:shadow-[12px_12px_0px_0px_#00F5A0] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 cursor-pointer group relative w-full"
                >
                  <div className="text-3xl flex-shrink-0 bg-black/5 w-12 h-12 rounded-full flex items-center justify-center border-2 border-black/10 group-hover:border-black transition-all">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-black uppercase bg-[var(--c-accent)] text-black border border-black px-2 py-0.5 rounded-full tracking-wider block w-fit mb-1.5">
                      {item.issuer} • {item.issueDate}
                    </span>
                    <h4 className="font-black text-black text-sm uppercase leading-tight group-hover:text-[var(--c-accent-2)] transition-colors pr-6">
                      {item.title}
                    </h4>
                    <span className="inline-block mt-3 text-[9px] font-black uppercase bg-black/5 text-black px-2.5 py-0.5 rounded-full border border-black/10">
                      Quiz Participation Certificate
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 text-black/30 group-hover:text-[var(--c-accent)] transition-colors">
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay Modal for Certificate details (Centered on screen) */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center pt-20 pb-4 px-3 sm:px-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setActiveItem(null);
                  setShowPdf(false);
                }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-xl bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[2.5rem] shadow-2xl overflow-hidden z-[70] flex flex-col max-h-[80vh] my-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black bg-[var(--c-accent)]/10">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl leading-none">{activeItem.icon}</span>
                    <div className="text-left">
                      <h3 className="font-black text-xs sm:text-sm text-black uppercase leading-tight max-w-[240px] sm:max-w-[280px]">
                        {activeItem.title}
                      </h3>
                      <span className="text-[9px] font-black uppercase text-black/50 tracking-wider">
                        {activeItem.issuer} • {activeItem.issueDate}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      setShowPdf(false);
                    }}
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all flex-shrink-0 cursor-pointer"
                  >
                    <IoClose className="w-4 h-4" />
                  </button>
                </div>

                {/* Conditional Body: PDF Viewer vs Details Text */}
                {showPdf ? (
                  <div className="p-4 bg-zinc-900 flex flex-col gap-4 overflow-y-auto">
                    <iframe
                      src={activeItem.credential}
                      className="w-full h-[55vh] rounded-2xl border-[3px] border-black bg-white"
                      title="Certificate PDF Viewer"
                    />
                    <div className="flex justify-between items-center text-white text-xs font-bold px-2">
                      <button
                        onClick={() => setShowPdf(false)}
                        className="text-[var(--c-accent)] hover:text-white transition-colors cursor-pointer uppercase font-black tracking-wider"
                      >
                        ◀ Back to Details
                      </button>
                      <span className="text-white/50">Local Archive Viewer</span>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-y-auto">
                    {/* Details Info */}
                    <div className="p-6 sm:p-8 flex flex-col gap-5 text-left">
                      {/* Overview */}
                      <div>
                        <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <FaAward /> Overview
                        </h4>
                        <p className="text-black/70 text-xs font-medium leading-relaxed">
                          {activeItem.desc}
                        </p>
                      </div>

                      {/* What I Learnt */}
                      {activeItem.learnt && (
                        <div>
                          <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                            <FaBookOpen /> What I Learnt
                          </h4>
                          <p className="text-black/70 text-xs font-medium leading-relaxed">
                            {activeItem.learnt}
                          </p>
                        </div>
                      )}

                      {/* Skills Gained */}
                      {activeItem.skills && (
                        <div>
                          <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <FaCompass /> Skills Gained
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeItem.skills.map((s: string, i: number) => (
                              <span key={i} className="text-[9px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2.5 py-1 rounded-full text-black/70">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Hours completed */}
                      {activeItem.hours && (
                        <div>
                          <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                            <FaHourglassHalf /> Course Time
                          </h4>
                          <p className="text-black/70 text-xs font-bold">
                            {activeItem.hours} completed
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer / View Certificate Trigger */}
                    <div className="px-6 sm:px-8 py-4 bg-[var(--c-bg-surface)] border-t-2 border-black flex items-center justify-between text-xs font-bold text-black/50">
                      <span>ID: {activeItem.id}</span>
                      <button
                        onClick={() => setShowPdf(true)}
                        className="flex items-center gap-1.5 text-black hover:text-[var(--c-accent-2)] transition-colors cursor-pointer uppercase font-black tracking-wider"
                      >
                        View Certificate <FaExternalLinkAlt className="w-3 h-3 text-[var(--c-accent-2)]" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
