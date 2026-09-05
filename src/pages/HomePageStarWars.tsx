import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroStarWars } from '@/components/ui/hero-starwars';
import { useSEO } from '@/hooks/useSEO';
import projectsData   from '@/data/projects.json';
import clientWorkData from '@/data/client-work.json';
import siteData       from '@/data/site.json';

const Y  = 'var(--sw-yellow)';
const B  = 'var(--sw-saber)';
const BG = 'var(--sw-bg)';
const BGA = 'var(--c-bg-alt)';
const WH = 'var(--sw-white)';
const BK = '#000000';

const mono: React.CSSProperties = { fontFamily: 'monospace' };
const brutal: React.CSSProperties = { fontFamily: '"Arial Black", Impact, sans-serif' };

/* ── reusable pieces ─────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-0 mb-4">
      <div className="w-3.5 h-full min-h-[30px]" style={{ background: Y }} />
      <span
        className="px-3.5 py-1.5 border-2 border-l-0 border-black text-black text-xs font-black uppercase tracking-widest"
        style={{ background: Y, ...mono }}
      >
        {children}
      </span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-wider border px-2.5 py-1"
      style={{
        color: Y,
        borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)',
        background: 'color-mix(in srgb, var(--sw-yellow) 10%, transparent)',
        ...mono,
      }}
    >
      {children}
    </span>
  );
}

function SectionDivider() {
  return (
    <div
      className="w-full h-[2px] relative z-20 flex-shrink-0"
      style={{
        background: Y,
      }}
    />
  );
}

/* ── 1. ABOUT / ORIGIN ───────────────────────────────────────────────────── */
function AboutSection() {
  const cards = [
    {
      num: '01',
      title: 'THE ORIGIN',
      copy: 'An ordinary student from an ordinary classroom — bitten by a radioactive idea called AI. Built his first project at 17. Never stopped.',
      icon: '⚡',
    },
    {
      num: '02',
      title: 'THE TRAINING',
      copy: 'Learned the ways of React, Node, Python, Three.js — trained under no master, only caffeine and Stack Overflow. The Jedi way.',
      icon: '📡',
    },
    {
      num: '03',
      title: 'THE MISSION',
      copy: 'Building polished, fast & accessible products. Every line of code is a step toward mastering the Force of Full-Stack.',
      icon: '🚀',
    },
    {
      num: '04',
      title: 'THE ALLIANCE',
      copy: 'Available for freelance, full-time & collabs. Based in India — operating galaxy-wide. Join the rebellion.',
      icon: '🌌',
    },
  ];

  return (
    <section
      id="about"
      className="snap-start min-h-[calc(100svh+20px)] flex flex-col justify-center pt-14 md:pt-16 pb-8 px-6 md:px-12"
      style={{ background: BG }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel>— THE ORIGIN STORY —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
          <h2
            className="text-[clamp(1.6rem,3.8vw,44px)] font-black leading-tight uppercase"
            style={{ ...brutal, color: WH, textShadow: '3px 3px 0 #000' }}
          >
            WHO IS <span style={{ color: Y }}>ROHIT DUBEY?</span>
          </h2>
          <div
            className="border-2 p-2 max-w-[280px] self-start md:self-end"
            style={{ background: BGA, borderColor: Y, boxShadow: `3px 3px 0 var(--sw-yellow)`, ...mono }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: Y }}>// CURRENT STATUS</p>
            <p className="font-black text-xs md:text-sm" style={{ color: B }}>LEARNING • BUILDING</p>
            <p className="font-black text-xs md:text-sm" style={{ color: Y }}>SHIPPING • ITERATING</p>
          </div>
        </div>

        {/* 4-panel comic style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `4px 4px 0 var(--sw-yellow)` }}>
          {cards.map((c, i) => (
            <div
              key={c.num}
              className="p-3 md:p-3.5 border-b-2 border-r-0 sm:odd:border-r-2 relative"
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
            >
              {/* Panel number */}
              <span
                className="absolute top-2 right-2.5 text-[24px] font-black leading-none opacity-20"
                style={{ ...brutal, color: Y }}
              >
                {c.num}
              </span>
              <div className="flex items-center gap-2 mb-1.5 border-b pb-1" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 30%, transparent)' }}>
                <span className="text-base">{c.icon}</span>
                <h3
                  className="font-black text-sm md:text-base uppercase tracking-tight"
                  style={{ ...brutal, color: Y }}
                >
                  {c.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed" style={{ color: WH, opacity: 0.95, ...mono }}>
                {c.copy}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row — brutalist boxes */}
        <div className="flex flex-wrap gap-0 mt-3 border-2"
          style={{ borderColor: Y, boxShadow: `3px 3px 0 var(--sw-yellow)` }}>
          {[
            { v: '7+',   l: 'FEATURED PROJECTS' },
            { v: '24+',  l: 'CORE TECHNOLOGIES' },
            { v: '100%', l: 'FORCE LEVEL' },
          ].map((s, i) => (
            <div
              key={s.l}
              className="flex-1 min-w-[120px] py-2 md:py-2.5 px-3 flex flex-col items-center justify-center border-r-2 last:border-r-0"
              style={{ background: i % 2 === 0 ? BGA : BG, borderColor: Y }}
            >
              <span className="font-black text-xl md:text-2xl leading-none" style={{ ...brutal, color: Y }}>{s.v}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-center mt-0.5" style={{ color: WH, opacity: 0.85, ...mono }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 2. SKILLS / POWERS ──────────────────────────────────────────────────── */
function SkillsSection() {
  const powers = [
    {
      num: '01',
      category: 'FRONTEND',
      icon: '⚛️',
      title: 'REACT & NEXT.JS',
      desc: 'The Force of the Frontend. Architecting fluid, responsive interfaces with clean state mechanics.',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    },
    {
      num: '02',
      category: 'BACKEND',
      icon: '⚙️',
      title: 'NODE & PYTHON',
      desc: 'Backend Jedi Arts. Building resilient server logic, RESTful endpoints, and persistent storage.',
      tags: ['Node.js', 'Express', 'Python', 'REST APIs'],
    },
    {
      num: '03',
      category: 'AI / AGENTS',
      icon: '🤖',
      title: 'AI & PROMPT ENG',
      desc: 'I talk to models, they respond in structured JSON. Production workflows with frontier LLMs.',
      tags: ['OpenAI', 'Claude API', 'Prompt Eng', 'LangChain'],
    },
    {
      num: '04',
      category: 'CREATIVE',
      icon: '✨',
      title: 'THREE.JS & GSAP',
      desc: 'Interactive 3D geometry and motion that feels alive. High-performance physics in the browser.',
      tags: ['Three.js', 'R3F', 'GSAP', 'Framer'],
    },
    {
      num: '05',
      category: 'DEVOPS',
      icon: '🚀',
      title: 'CLOUD & DEPLOY',
      desc: 'From git commit to global edge in seconds. Automated CI/CD, containerization, and hosting.',
      tags: ['Docker', 'Git', 'Vercel', 'Railway'],
    },
  ];

  return (
    <section id="skills" className="snap-start min-h-[calc(100svh+20px)] flex flex-col justify-center pt-14 md:pt-16 pb-8 px-6 md:px-12" style={{ background: BGA }}>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel>— MY POWERS —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
          <div>
            <h2
              className="text-[clamp(1.6rem,3.8vw,44px)] font-black leading-tight uppercase"
              style={{ ...brutal, color: WH, textShadow: '3px 3px 0 #000' }}
            >
              THE <span style={{ color: Y }}>ARSENAL</span>
            </h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: WH, opacity: 0.85, ...mono }}>
              // Battle-tested technologies deployed across live production environments
            </p>
          </div>

          <Link
            to="/skills"
            className="self-start md:self-end px-3.5 py-2 border-2 font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 group cursor-pointer"
            style={{ color: '#000', borderColor: Y, background: Y, boxShadow: `3px 3px 0 #000`, ...mono }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #000'; }}
          >
            <span>EXPLORE ALL 24+ SKILLS</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 6-box comic grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `4px 4px 0 var(--sw-yellow)` }}>
          {powers.map((p, i) => (
            <div
              key={p.num}
              className="p-3 md:p-3.5 border-b-2 sm:odd:border-r-2 lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r-2 flex flex-col justify-between gap-2.5 transition-all duration-150 cursor-default"
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--sw-yellow) 6%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? BG : BGA)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 border-b pb-1" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 25%, transparent)' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{p.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 border"
                      style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)', color: Y, ...mono }}>
                      {p.category}
                    </span>
                  </div>
                  <span className="font-black text-xs leading-none" style={{ ...brutal, color: Y, opacity: 0.5 }}>
                    #{p.num}
                  </span>
                </div>
                <h3
                  className="font-black text-sm md:text-base leading-tight uppercase mb-1"
                  style={{ ...brutal, color: WH }}
                >
                  {p.title}
                </h3>
                <p className="text-xs font-semibold leading-relaxed line-clamp-2" style={{ color: WH, opacity: 0.85, ...mono }}>
                  {p.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1.5 border-t" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 15%, transparent)' }}>
                {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          ))}

          {/* 6th Card: Interactive Portal to /skills */}
          <Link
            to="/skills"
            className="p-3 md:p-3.5 border-b-2 sm:border-b-0 flex flex-col justify-between gap-2.5 transition-all duration-150 group cursor-pointer"
            style={{
              background: 'color-mix(in srgb, var(--sw-yellow) 12%, transparent)',
              borderColor: Y,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--sw-yellow) 20%, transparent)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--sw-yellow) 12%, transparent)')}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5 border-b pb-1" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)' }}>
                <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 border"
                  style={{ background: Y, color: '#000', borderColor: Y, ...mono }}>
                  COMPLETE DATABASE
                </span>
                <span className="text-base group-hover:translate-x-1 transition-transform" style={{ color: Y }}>→</span>
              </div>
              <h3 className="font-black text-sm md:text-base leading-tight uppercase mb-1" style={{ ...brutal, color: Y }}>
                JEDI ARCHIVES
              </h3>
              <p className="text-xs font-semibold leading-relaxed line-clamp-2" style={{ color: WH, opacity: 0.9, ...mono }}>
                Explore all 24+ technologies with combat readiness status, interview confidence, and active projects.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 30%, transparent)' }}>
              <span className="text-xs font-black uppercase tracking-wider" style={{ color: Y, ...mono }}>
                OPEN TOOLKIT ARCHIVES
              </span>
              <span className="font-black text-xs" style={{ color: Y }}>→</span>
            </div>
          </Link>
        </div>

        {/* Bottom strip linking to skills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-2.5 border-t"
          style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 20%, transparent)' }}>
          <div className="flex items-center gap-2" style={mono}>
            <span className="w-2 h-2 rounded-full" style={{ background: Y, boxShadow: `0 0 8px ${Y}` }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: Y }}>
              STATUS: 24+ SKILLS INDEXED &amp; COMBAT READY
            </span>
          </div>
          <Link
            to="/skills"
            className="text-xs font-black uppercase tracking-wider hover:underline flex items-center gap-1.5"
            style={{ color: WH, opacity: 0.85, ...mono }}
          >
            <span>Need full technical breakdown? Open Jedi Archives</span>
            <span style={{ color: Y }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 3. PROJECTS / MISSIONS ──────────────────────────────────────────────── */
function ProjectsSection() {
  const featured = [
    ...projectsData.filter(p => p.featured),
    ...projectsData.filter(p => !p.featured && p.liveDemo),
  ].slice(0, 4);

  return (
    <section id="projects" className="snap-start min-h-[calc(100svh+20px)] flex flex-col justify-center pt-14 md:pt-16 pb-8 px-6 md:px-12" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel>— FIELD REPORTS —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
          <div>
            <h2
              className="text-[clamp(1.6rem,3.8vw,44px)] font-black leading-tight uppercase"
              style={{ ...brutal, color: WH, textShadow: '3px 3px 0 #000' }}
            >
              THE <span style={{ color: Y }}>MISSIONS</span>
            </h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: WH, opacity: 0.85, ...mono }}>
              // Deployed battle-tested missions, extensions & AI web systems
            </p>
          </div>

          <Link
            to="/projects"
            className="self-start md:self-end px-3.5 py-2 border-2 font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 group cursor-pointer"
            style={{ color: '#000', borderColor: Y, background: Y, boxShadow: `3px 3px 0 #000`, ...mono }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #000'; }}
          >
            <span>VIEW ALL MISSIONS</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 4-mission 2x2 brutalist comic grid with wider container & compact height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `4px 4px 0 var(--sw-yellow)` }}>
          {featured.map((p, i) => (
            <div
              key={p.id}
              className={`p-3.5 md:p-4 flex flex-col justify-between gap-2.5 transition-all duration-150 border-b-2 last:border-b-0 ${
                i % 2 === 0 ? 'md:border-r-2' : ''
              } ${i >= 2 ? 'md:border-b-0' : ''}`}
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--sw-yellow) 6%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? BG : BGA)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 border-b pb-1" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 25%, transparent)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 border"
                      style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)', color: Y, ...mono }}>
                      {p.projectType || 'WEB APP'}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: B, ...mono }}>
                      MISSION #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border"
                    style={{
                      borderColor: p.status === 'Live' || p.status === 'Published' ? Y : 'rgba(255,255,255,0.25)',
                      color: p.status === 'Live' || p.status === 'Published' ? Y : 'rgba(255,255,255,0.6)',
                      ...mono
                    }}>
                    {p.status}
                  </span>
                </div>

                <h3 className="font-black text-base md:text-lg uppercase leading-tight mb-0.5" style={{ ...brutal, color: Y }}>
                  {p.name}
                </h3>
                <p className="text-xs font-semibold leading-relaxed line-clamp-2" style={{ color: WH, opacity: 0.9, ...mono }}>
                  {p.shortDescription}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {p.techStack?.slice(0, 4).map((t: string) => <Tag key={t}>{t}</Tag>)}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1.5 border-t" style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 15%, transparent)' }}>
                  <div className="flex items-center gap-2.5">
                    {p.liveDemo && (
                      <a
                        href={p.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-black uppercase tracking-wider border-2 px-2.5 py-1 transition-all flex items-center gap-1"
                        style={{ color: '#000', background: Y, borderColor: Y, ...mono }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 #000'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                      >
                        <span>LAUNCH APP</span>
                        <span>↗</span>
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-black uppercase tracking-wider border px-2.5 py-1 transition-all flex items-center gap-1"
                        style={{ color: WH, borderColor: 'rgba(255,255,255,0.3)', ...mono }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = Y; (e.currentTarget as HTMLElement).style.color = Y; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.color = WH; }}
                      >
                        <span>SOURCE</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] font-bold opacity-60" style={{ color: WH, ...mono }}>
                    {p.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip linking to all projects */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-2.5 border-t"
          style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 20%, transparent)' }}>
          <div className="flex items-center gap-2" style={mono}>
            <span className="w-2 h-2 rounded-full" style={{ background: Y, boxShadow: `0 0 8px ${Y}` }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: Y }}>
              STATUS: {projectsData.length} COMBAT MISSIONS ARCHIVED
            </span>
          </div>
          <Link
            to="/projects"
            className="text-xs font-black uppercase tracking-wider hover:underline flex items-center gap-1.5"
            style={{ color: WH, opacity: 0.9, ...mono }}
          >
            <span>Explore all case studies &amp; system architecture</span>
            <span style={{ color: Y }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 4. CONTACT / TRANSMISSION ───────────────────────────────────────────── */
function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/mqerqbyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setSent(true);
    }
  };

  return (
    <section id="contact" className="snap-start min-h-[calc(100svh+20px)] flex flex-col justify-center pt-14 md:pt-16 pb-8 px-6 md:px-12" style={{ background: BGA }}>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel>— ONE LAST THING, REBEL —</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `6px 6px 0 var(--sw-yellow)` }}>

          {/* Left — flavour copy */}
          <div className="p-6 md:p-7 border-b-2 md:border-b-0 md:border-r-2 flex flex-col justify-between gap-5"
            style={{ background: BG, borderColor: Y }}>
            <div>
              <h2
                className="text-[clamp(1.8rem,4vw,52px)] font-black leading-none uppercase"
                style={{ ...brutal, color: WH, textShadow: '3px 3px 0 #000' }}
              >
                GOT A<br />PROJECT?<br />
                <span style={{ color: Y }}>SHOOT<br />YOUR<br />SHOT.</span>
              </h2>
            </div>
            <div
              className="border-2 p-3.5 w-fit"
              style={{ background: 'color-mix(in srgb, var(--sw-yellow) 8%, transparent)', borderColor: Y, boxShadow: `3px 3px 0 var(--sw-yellow)` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: Y, ...mono }}>// TRANSMISSION DETAILS</p>
              <p className="text-xs font-bold" style={{ color: B, ...mono }}>rohitdubey39005@gmail.com</p>
              <p className="text-xs font-bold mt-1" style={{ color: WH, opacity: 0.9, ...mono }}>India · Remote Worldwide · &lt;24h Reply</p>
            </div>

            {/* THWIP-style sound effect */}
            <div
              className="w-28 h-28 border-4 flex flex-col items-center justify-center -rotate-6 self-start"
              style={{ background: Y, borderColor: Y, boxShadow: '5px 5px 0 #000', ...brutal }}
            >
              <span className="text-black font-black text-xl leading-none">THWIP!</span>
              <span className="text-black/75 text-[10px] font-black uppercase tracking-wider mt-0.5">send message</span>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8" style={{ background: BGA }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                <div
                  className="w-20 h-20 border-4 flex items-center justify-center text-3xl"
                  style={{ background: Y, borderColor: Y, boxShadow: `4px 4px 0 #000` }}
                >
                  ✓
                </div>
                <p className="font-black text-xl uppercase" style={{ ...brutal, color: Y }}>TRANSMISSION SENT!</p>
                <p className="text-xs font-bold" style={{ color: WH, opacity: 0.5, ...mono }}>Replying within 24 parsecs.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name',    label: 'YOUR NAME',    type: 'text',  placeholder: 'Luke Skywalker' },
                  { name: 'email',   label: 'YOUR EMAIL',   type: 'email', placeholder: 'luke@rebellion.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: Y, ...mono }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 text-sm font-bold border-2 outline-none transition-colors"
                      style={{
                        background: BG,
                        color: WH,
                        borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)',
                        ...mono,
                        caretColor: Y,
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: Y, ...mono }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    placeholder="Tell me about your mission, timeline, and budget..."
                    className="w-full px-4 py-3 text-sm font-bold border-2 outline-none transition-colors resize-none"
                    style={{
                      background: BG,
                      color: WH,
                      borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)',
                      ...mono,
                      caretColor: Y,
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 border-2 font-black text-sm uppercase tracking-widest transition-all cursor-pointer"
                  style={{ background: Y, color: BK, borderColor: Y, boxShadow: `4px 4px 0 #000`, ...brutal }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #000'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 #000`; }}
                >
                  SEND TRANSMISSION →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Full Star Wars home page ────────────────────────────────────────────── */
export function HomePageStarWars() {
  useSEO('Home', 'Rohit Dubey — AI & Full-Stack Developer portfolio.');

  return (
    <div className="w-full relative snap-y snap-proximity" style={{ background: BG }}>
      <HeroStarWars />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ContactSection />
    </div>
  );
}

