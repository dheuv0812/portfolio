import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSection } from '@/components/ui/hero';
import { ContactSection } from '@/components/ui/contact';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { SiReact, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { FaArrowRight, FaAward, FaHourglassHalf, FaCompass, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Grainient } from '@/components/ui/Grainient';
import { InteractiveGridPattern } from '@/components/ui/InteractiveGridPattern';
import { useTheme } from '@/lib/ThemeContext';
import { useSEO } from '@/hooks/useSEO';
import { HomePageStarWars } from './HomePageStarWars';

import projectsData from '@/data/projects.json';
import clientWorkData from '@/data/client-work.json';
import internshipData from '@/data/experience.json';
import certificationsData from '@/data/certifications.json';
import siteData from '@/data/site.json';

// Custom animated skill gauge component
function AnimatedSkillGauge({ value, gaugePrimaryColor, gaugeSecondaryColor }: { value: number; gaugePrimaryColor: string; gaugeSecondaryColor: string }) {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    // 1.5 second animation transition from 0 to actual value on load
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const current = Math.min(Math.floor((step / steps) * value), value);
      setDisplayVal(current);
      if (current >= value) {
        clearInterval(interval);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <AnimatedCircularProgressBar
      value={displayVal}
      min={0}
      max={100}
      gaugePrimaryColor={gaugePrimaryColor}
      gaugeSecondaryColor={gaugeSecondaryColor}
      className="!size-20 !text-sm !font-black"
    />
  );
}

export function HomePage() {
  useSEO('Home', 'Personal portfolio of Rohit Dubey - AI & Full-Stack Developer. Showcasing engineering project case studies, client outcomes, skills toolkit, and internships.');
  const { activeTheme } = useTheme();

  const g1 = activeTheme.vars['--c-accent'];
  const g2 = activeTheme.vars['--c-accent-2'];
  const g3 = activeTheme.vars['--c-bg'];
  const [activeCert, setActiveCert] = useState<any | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  const originScrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Gentle auto-scroll effect (temporarily pauses on hover/touch and automatically resumes on mouse leave)
  useEffect(() => {
    if (!isAutoScrolling || isHovered) return;
    const container = originScrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        container.scrollBy({ left: 1.5, behavior: 'auto' });
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isHovered]);

  // Star Wars family (Force + Sith) gets its own full page
  // This return MUST come after all hooks to satisfy React's rules of hooks
  const isGalaxy = activeTheme.id === 'starwars' || activeTheme.id === 'sith';
  if (isGalaxy) return <HomePageStarWars />;

  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const latestClient = clientWorkData[0];
  const latestInternship = internshipData[0];
  const featuredCerts = certificationsData.featured.slice(0, 2);

  // Duplicated cards for seamless infinite horizontal loop
  const duplicatedAboutDeck = [...siteData.aboutDeck, ...siteData.aboutDeck];

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = originScrollRef.current;
    if (container) {
      const scrollAmount = window.innerWidth < 640 ? 320 : 420;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full relative bg-white">
      {/* 1. Hero Section */}
      <div className="relative">
        <HeroSection />
        {/* Gradient fade OUT of hero → into Origin, no hard cut */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--c-bg)] pointer-events-none z-20" />
      </div>

      {/* 2. Origin — Infinite & Manual Horizontal Scrolling Deck */}
      <section
        id="about"
        className="relative py-20 md:py-28 w-full z-30 overflow-hidden" style={{ background: `var(--c-bg)` }}
      >
        {/* WebGL Grainient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            color1={g1}
            color2={g2}
            color3={g3}
            timeSpeed={1.2}
            colorBalance={0.06}
            warpStrength={1.2}
            warpFrequency={3.0}
            warpSpeed={0.8}
            warpAmplitude={40.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={300.0}
            noiseScale={1.5}
            grainAmount={0.07}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.3}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={1.05}
          />
        </div>

        {/* Top/Bottom seamless gradients */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '120px',
            background: 'linear-gradient(to bottom, var(--c-bg) 0%, rgba(3, 23, 20, 0.6) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '100px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)'
          }}
        />

        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-20 mb-8 text-center flex flex-col items-center">
          <span className="inline-block bg-[var(--c-accent)] text-black font-black text-[10px] px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-[3px_3px_0_var(--c-shadow)]">
            ⚡ ORIGIN DECK • AUTO &amp; MANUAL SCROLL
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-3" style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: '2px 2px 0 #000' }}>
            ORIGIN &amp; ENGINEERING PHILOSOPHY
          </h2>
          <p className="text-white/80 text-xs sm:text-sm font-bold uppercase tracking-wider max-w-xl mb-4">
            Swipe, drag, or use arrows to scroll manually. Touch or hover to pause auto-scroll.
          </p>

          {/* Interactive Manual Scroll Controls */}
          <div className="flex items-center gap-2.5 z-30">
            <button
              onClick={() => handleManualScroll('left')}
              className="w-9 h-9 rounded-full border-2 border-black bg-[var(--c-bg-surface)] hover:bg-[var(--c-accent)] text-black flex items-center justify-center font-black text-sm shadow-[3px_3px_0_var(--c-shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              aria-label="Scroll Left"
              title="Scroll Left"
            >
              ←
            </button>
            <button
              onClick={() => setIsAutoScrolling(prev => !prev)}
              className="px-4 py-1.5 rounded-full border-2 border-black bg-[var(--c-bg-surface)] hover:bg-[var(--c-accent)] text-black font-black text-[10px] uppercase tracking-wider shadow-[3px_3px_0_var(--c-shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              {isAutoScrolling ? '⏸ Pause Auto-Scroll' : '▶ Auto-Scroll'}
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-9 h-9 rounded-full border-2 border-black bg-[var(--c-bg-surface)] hover:bg-[var(--c-accent)] text-black flex items-center justify-center font-black text-sm shadow-[3px_3px_0_var(--c-shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              aria-label="Scroll Right"
              title="Scroll Right"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Deck Container */}
        <div className="relative w-full py-4 z-20">
          {/* Left & Right gradient edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-[var(--c-bg)] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-[var(--c-bg)] to-transparent z-20 pointer-events-none" />

          <div
            ref={originScrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-6 md:px-12 scroll-smooth select-none cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            {duplicatedAboutDeck.map((card, idx) => {
              const realIdx = idx % siteData.aboutDeck.length;
              const isCurrentMission = card.id === 'current-mission';
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className="w-[300px] sm:w-[380px] md:w-[460px] flex-shrink-0 bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[2.5rem] p-7 md:p-9 shadow-[8px_8px_0_var(--c-shadow)] flex flex-col justify-between text-left h-[420px] overflow-y-auto no-scrollbar hover:border-[var(--c-accent)] transition-colors"
                >
                  <div>
                    <span className="inline-block bg-[var(--c-accent)] text-black font-black text-[9px] px-3 py-1 rounded-full mb-3 tracking-widest uppercase border border-black">
                      SECTION 0{realIdx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-none mb-1 text-left" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-black/50 text-xs font-bold uppercase tracking-wider mb-4 italic text-left">
                        {card.subtitle}
                      </p>
                    )}
                    <div className="flex flex-col gap-3 text-black/75 text-xs sm:text-sm font-medium leading-relaxed text-left">
                      {card.paragraphs.map((p, i) => (
                        <p key={i} className={realIdx === 0 && i === 0 ? "font-bold text-black text-xs sm:text-sm" : ""}>
                          {isCurrentMission ? (
                            <span className="font-black text-black text-xs sm:text-sm uppercase leading-snug tracking-tight">
                              Building a strong foundation in <span className="text-[var(--c-accent-2)]">Full-Stack Development</span> and <span className="text-[var(--c-accent-2)]">Artificial Intelligence</span> through consistent learning, real-world projects, and continuous improvement.
                            </span>
                          ) : p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {isCurrentMission ? (
                    <div className="flex flex-col gap-2 mt-4 text-left">
                      <h5 className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-black">
                        Current Focus:
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs text-black/80 font-bold">
                        {siteData.homeStatus.currentObjectives.map((focus, i) => (
                          <li key={i} className="flex items-center gap-1.5 bg-[var(--c-bg-surface)] border border-black/5 p-1.5 rounded-xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)] border border-black/40 flex-shrink-0" />
                            <span className="truncate">{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    card.footer && (
                      <p className="font-bold text-[var(--c-accent-2)] text-xs sm:text-sm mt-4 text-left">
                        {card.footer}
                      </p>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Engineering Toolkit Preview (Merged Section) */}
      <section className="py-24 px-6 md:px-10 bg-[var(--c-bg-surface)] border-t-2 border-black/5 relative z-30 overflow-hidden">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern
          className="opacity-40"
          width={45}
          height={45}
          squares={[32, 25]}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Combined Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div
                className="inline-flex items-center px-4 py-1.5 rounded-full text-[var(--c-accent-2)] font-black text-[10px] tracking-widest uppercase border border-[var(--c-accent-2)]/30 relative overflow-hidden mb-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(13, 148, 136, 0.03) 50%, rgba(0, 0, 0, 0.05) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(13, 148, 136, 0.08)',
                }}
              >
                CURRENT MISSION: LEARNING • BUILDING • IMPROVING
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none mb-4" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
                ENGINEERING TOOLKIT
              </h3>
              <p className="text-black/60 text-sm max-w-2xl font-bold leading-relaxed">
                A snapshot of the technologies, tools, and frameworks I'm learning and using to build modern software. Explore the complete toolkit to see my experience, projects, and learning journey with each one.
              </p>
            </div>
            <Link
              to="/skills"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] self-start md:self-auto flex-shrink-0"
            >
              <span>Explore My Toolkit</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {['Tailwind CSS', 'JavaScript', 'React'].map((name) => {
              const styleObj = {
                'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8', desc: 'Utility-First Styling', level: 100 },
                'JavaScript': { icon: SiJavascript, color: '#F7DF1E', desc: 'Dynamic Interactivity', level: 80 },
                'React': { icon: SiReact, color: '#61DAFB', desc: 'Component-Based UI', level: 70 }
              }[name] || { icon: SiJavascript, color: '#F7DF1E', desc: 'Dynamic Interactivity', level: 80 };
              const Icon = styleObj.icon;
              return (
                <div key={name} className="bg-[var(--c-bg-surface)] rounded-3xl p-8 border-2 border-black/5 flex flex-col items-center gap-6 text-center shadow-sm hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative flex items-center justify-center">
                    <AnimatedSkillGauge
                      value={styleObj.level}
                      gaugePrimaryColor="var(--c-accent-2)"
                      gaugeSecondaryColor="#E8EEFF"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 mt-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon style={{ color: styleObj.color }} className="w-5 h-5 flex-shrink-0" aria-label={`${name} icon`} title={`${name} icon`} />
                      <span className="font-black text-sm uppercase text-black">{name}</span>
                    </div>
                    <span className="text-xs text-black/50 font-bold uppercase tracking-wider">{styleObj.desc}</span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* 5. Featured Project preview */}
      <section className="py-24 px-6 md:px-10 border-t-2 border-black/10 relative z-30 overflow-hidden" style={{ background: `var(--c-bg)` }}>
        {/* WebGL Grainient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            color1={g1}
            color2={g2}
            color3={g3}
            timeSpeed={1.0}
            colorBalance={0.06}
            warpStrength={1.2}
            warpFrequency={3.0}
            warpSpeed={0.8}
            warpAmplitude={40.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={300.0}
            noiseScale={1.5}
            grainAmount={0.07}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.3}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={1.05}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/40 via-transparent to-[var(--c-bg)]/40 pointer-events-none" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-[var(--c-accent)] text-black font-black text-xs uppercase tracking-widest border-2 border-black rounded-full shadow-[4px_4px_0_var(--c-shadow)] self-start">
              FEATURED BUILD
            </div>
            <Link
              to="/projects"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] self-start md:self-auto flex-shrink-0"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div
            className="border-[3px] border-black rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-start gap-8 shadow-[8px_8px_0_var(--c-shadow)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex-1 flex flex-col gap-4 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--c-accent-2)]">
                {featuredProject.projectType}
              </span>
              <h4 className="text-2xl font-black uppercase leading-tight text-black">
                {featuredProject.name} – {featuredProject.shortDescription}
              </h4>
              <p className="text-black/75 text-xs font-medium leading-relaxed max-w-lg">
                {featuredProject.problem}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {featuredProject.techStack.map(t => (
                  <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2.5 py-1 rounded-full text-black/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/projects"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 self-stretch md:self-center justify-center transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex-shrink-0"
            >
              <span>Read Case Study</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Experience / Career Timeline preview */}
      <section className="py-24 px-6 md:px-10 bg-[var(--c-bg-surface)] border-t-2 border-black/5 relative z-30 overflow-hidden">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern
          className="opacity-40"
          width={45}
          height={45}
          squares={[32, 20]}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-[var(--c-accent)] text-black font-black text-xs uppercase tracking-widest border-2 border-black rounded-full shadow-[4px_4px_0_var(--c-shadow)] self-start">
              WORK TIMELINE PREVIEW
            </div>
            <Link
              to="/experience"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] self-start md:self-auto flex-shrink-0"
            >
              <span>Explore Career Timeline</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div
            className="border-[3px] border-black rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-start gap-8 shadow-[8px_8px_0_var(--c-shadow)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex-1 flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--c-accent-2)]">
                  {latestInternship.type}
                </span>
                <span className="text-[10px] font-bold text-black/60 bg-black/5 px-3 py-1 rounded-full border border-black/5">
                  {latestInternship.duration}
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase leading-tight text-black">
                {latestInternship.role} @ {latestInternship.company}
              </h4>
              <ul className="flex flex-col gap-2 text-black/75 text-xs font-medium leading-relaxed max-w-xl">
                {latestInternship.responsibilities.slice(0, 3).map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent-2)] mt-1.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {latestInternship.technologies.map(t => (
                  <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2.5 py-1 rounded-full text-black/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/experience"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 self-stretch md:self-center justify-center transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex-shrink-0"
            >
              <span>View Experience</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Client Work preview */}
      <section className="py-24 px-6 md:px-10 border-t-2 border-black/10 relative z-30 overflow-hidden" style={{ background: `var(--c-bg)` }}>
        {/* WebGL Grainient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            color1={g1}
            color2={g2}
            color3={g3}
            timeSpeed={1.0}
            colorBalance={0.06}
            warpStrength={1.2}
            warpFrequency={3.0}
            warpSpeed={0.8}
            warpAmplitude={40.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={300.0}
            noiseScale={1.5}
            grainAmount={0.07}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.3}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={1.05}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/40 via-transparent to-[var(--c-bg)]/40 pointer-events-none" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-[var(--c-accent)] text-black font-black text-xs uppercase tracking-widest border-2 border-black rounded-full shadow-[4px_4px_0_var(--c-shadow)] self-start">
              CLIENT WORK PREVIEW
            </div>
            <Link
              to="/client-work"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] self-start md:self-auto flex-shrink-0"
            >
              <span>Explore Client Work</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div
            className="border-[3px] border-black rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-start gap-8 shadow-[8px_8px_0_var(--c-shadow)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex-1 flex flex-col gap-4 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--c-accent-2)]">
                {latestClient.industry}
              </span>
              <h4 className="text-2xl font-black uppercase leading-tight text-black">
                {latestClient.client} – {latestClient.role}
              </h4>
              <p className="text-black/75 text-xs font-medium leading-relaxed max-w-lg">
                {latestClient.outcome}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {latestClient.stack.map(t => (
                  <span key={t} className="text-[9px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2.5 py-1 rounded-full text-black/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/client-work"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 self-stretch md:self-center justify-center transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex-shrink-0"
            >
              <span>Read Case Study</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Learning Archive preview */}
      <section className="py-24 px-6 md:px-10 bg-[var(--c-bg-surface)] border-t-2 border-black/5 relative z-30 overflow-hidden">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern
          className="opacity-40"
          width={45}
          height={45}
          squares={[32, 20]}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-[var(--c-accent)] text-black font-black text-xs uppercase tracking-widest border-2 border-black rounded-full shadow-[4px_4px_0_var(--c-shadow)] self-start">
              CONTINUOUS LEARNING
            </div>
            <Link
              to="/certifications"
              className="px-6 py-3 bg-[var(--c-accent)] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-300 shadow-[4px_4px_0_var(--c-shadow)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] self-start md:self-auto flex-shrink-0"
            >
              <span>Explore Learning Archive</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredCerts.map((cert) => (
              <button
                key={cert.id}
                onClick={() => {
                  setActiveCert(cert);
                  setShowPdf(false);
                }}
                className="text-left p-6 rounded-[2rem] border-[3px] border-black flex items-start gap-4 shadow-[6px_6px_0_#000] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer block w-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <span className="text-3xl flex-shrink-0">{cert.icon}</span>
                <div className="text-left">
                  <h4 className="font-black text-black text-sm uppercase leading-tight">{cert.title}</h4>
                  <p className="text-black/50 text-[10px] font-bold uppercase tracking-wider mt-1">{cert.issuer} • {cert.issueDate}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Form */}
      <ContactSection />

      {/* Overlay Modal for Certificate details */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b-2 border-black bg-[var(--c-accent)]/10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl leading-none">{activeCert.icon}</span>
                  <div className="text-left">
                    <h3 className="font-black text-sm text-black uppercase leading-tight max-w-[280px]">
                      {activeCert.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase text-black/50 tracking-wider">
                      {activeCert.issuer} • {activeCert.issueDate}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all flex-shrink-0 cursor-pointer"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>

              {/* Conditional Body: PDF Viewer vs Details Text */}
              {showPdf ? (
                <div className="p-4 bg-zinc-900 flex flex-col gap-4">
                  <iframe
                    src={activeCert.credential}
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
                <>
                  {/* Details */}
                  <div className="p-8 flex flex-col gap-5 text-left">
                    {/* Overview */}
                    <div>
                      <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <FaAward /> Overview
                      </h4>
                      <p className="text-black/70 text-xs font-medium leading-relaxed">
                        {activeCert.desc}
                      </p>
                    </div>

                    {/* What I Learnt */}
                    <div>
                      <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <FaBookOpen /> What I Learnt
                      </h4>
                      <p className="text-black/70 text-xs font-medium leading-relaxed">
                        {activeCert.learnt}
                      </p>
                    </div>

                    {/* Skills Gained */}
                    <div>
                      <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FaCompass /> Skills Gained
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCert.skills.map((s: string, i: number) => (
                          <span key={i} className="text-[9px] font-black uppercase border border-black/10 bg-[var(--c-bg-surface)] px-2.5 py-1 rounded-full text-black/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hours completed */}
                    <div>
                      <h4 className="text-[var(--c-accent-2)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <FaHourglassHalf /> Course Time
                      </h4>
                      <p className="text-black/70 text-xs font-bold">
                        {activeCert.hours} completed
                      </p>
                    </div>
                  </div>

                  {/* Footer / ID Action */}
                  <div className="px-8 py-5 bg-[var(--c-bg-surface)] border-t-2 border-black flex items-center justify-between text-xs font-bold text-black/50">
                    <span>ID: {activeCert.id}</span>
                    <button
                      onClick={() => setShowPdf(true)}
                      className="flex items-center gap-1.5 text-black hover:text-[var(--c-accent-2)] transition-colors cursor-pointer uppercase font-black tracking-wider"
                    >
                      View Certificate <FaExternalLinkAlt className="w-3 h-3 text-[var(--c-accent-2)]" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
