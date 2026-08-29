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
    <div className="inline-flex items-center gap-0 mb-6">
      <div className="w-3 h-full min-h-[28px]" style={{ background: Y }} />
      <span
        className="px-3 py-1.5 border-2 border-l-0 border-black text-black text-[9px] font-black uppercase tracking-[0.25em]"
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
      className="text-[9px] font-black uppercase tracking-wider border px-2 py-0.5"
      style={{
        color: Y,
        borderColor: 'color-mix(in srgb, var(--sw-yellow) 40%, transparent)',
        background: 'color-mix(in srgb, var(--sw-yellow) 8%, transparent)',
        ...mono,
      }}
    >
      {children}
    </span>
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
    <section id="about" className="py-20 px-6 md:px-12 border-t-4" style={{ background: BG, borderColor: Y }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel>— THE ORIGIN STORY —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <h2
            className="text-[clamp(2.5rem,7vw,90px)] font-black leading-none uppercase"
            style={{ ...brutal, color: WH, textShadow: '4px 4px 0 #000' }}
          >
            WHO IS<br />
            <span style={{ color: Y }}>ROHIT</span><br />
            DUBEY?
          </h2>
          <div
            className="border-2 p-4 max-w-[260px] self-start md:self-end"
            style={{ background: BGA, borderColor: Y, boxShadow: `4px 4px 0 var(--sw-yellow)`, ...mono }}
          >
            <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: Y, opacity: 0.8 }}>// CURRENT STATUS</p>
            <p className="font-black text-sm" style={{ color: B }}>LEARNING • BUILDING</p>
            <p className="font-black text-sm" style={{ color: Y }}>SHIPPING • ITERATING</p>
          </div>
        </div>

        {/* 4-panel comic style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `6px 6px 0 var(--sw-yellow)` }}>
          {cards.map((c, i) => (
            <div
              key={c.num}
              className="p-6 border-b-2 border-r-0 sm:odd:border-r-2 relative"
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
            >
              {/* Panel number */}
              <span
                className="absolute top-3 right-4 text-[40px] font-black leading-none opacity-10"
                style={{ ...brutal, color: Y }}
              >
                {c.num}
              </span>
              <div className="text-2xl mb-3">{c.icon}</div>
              <h3
                className="font-black text-base uppercase tracking-tight mb-2 border-b pb-2"
                style={{ ...brutal, color: Y, borderColor: 'color-mix(in srgb, var(--sw-yellow) 30%, transparent)' }}
              >
                {c.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: WH, opacity: 0.7, ...mono }}>
                {c.copy}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row — brutalist boxes */}
        <div className="flex flex-wrap gap-0 mt-8 border-2"
          style={{ borderColor: Y, boxShadow: `4px 4px 0 var(--sw-yellow)` }}>
          {[
            { v: '7+',   l: 'FEATURED\nPROJECTS' },
            { v: '24+',  l: 'CORE\nTECHNOLOGIES' },
            { v: '100%', l: 'FORCE\nLEVEL' },
          ].map((s, i) => (
            <div
              key={s.l}
              className="flex-1 min-w-[120px] py-6 flex flex-col items-center justify-center border-r-2 last:border-r-0"
              style={{ background: i % 2 === 0 ? BGA : BG, borderColor: Y }}
            >
              <span className="font-black text-3xl leading-none" style={{ ...brutal, color: Y }}>{s.v}</span>
              <span className="text-[8px] font-black uppercase tracking-[0.18em] text-center mt-1 whitespace-pre-line" style={{ color: WH, opacity: 0.5, ...mono }}>{s.l}</span>
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
    { num: '01', title: 'REACT\n& NEXT.JS',    sub: 'The Force of the Frontend',         tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { num: '02', title: 'NODE\n& PYTHON',       sub: 'Backend Jedi Arts',                  tags: ['Node.js', 'Express', 'FastAPI', 'MongoDB'] },
    { num: '03', title: 'AI &\nPROMPT ENG',     sub: 'I talk to machines. They listen.',   tags: ['LangChain', 'OpenAI', 'Gemini', 'n8n'] },
    { num: '04', title: 'THREE.JS\n& GSAP',      sub: 'Motion that feels alive — like this.', tags: ['Three.js', 'R3F', 'GSAP', 'Framer'] },
    { num: '05', title: 'DEVOPS\n& DEPLOY',     sub: 'From code to galaxy in 60 seconds.', tags: ['Vercel', 'Docker', 'Git', 'CI/CD'] },
  ];

  return (
    <section className="py-20 px-6 md:px-12 border-t-4" style={{ background: BGA, borderColor: Y }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel>— MY POWERS —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
          <h2
            className="text-[clamp(2.5rem,7vw,90px)] font-black leading-none uppercase"
            style={{ ...brutal, color: WH, textShadow: '4px 4px 0 #000' }}
          >
            THE<br /><span style={{ color: Y }}>ARSENAL</span>
          </h2>
          <p className="text-xs font-bold max-w-[220px] mb-2" style={{ color: WH, opacity: 0.5, ...mono }}>
            ← no wait, scroll this way →
          </p>
        </div>

        {/* Horizontal scroll list — Nitin style */}
        <div className="flex flex-col gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `6px 6px 0 var(--sw-yellow)` }}>
          {powers.map((p, i) => (
            <div
              key={p.num}
              className="group flex items-start gap-6 p-6 border-b-2 last:border-b-0 transition-all duration-150 cursor-default"
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--sw-yellow) 6%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? BG : BGA)}
            >
              {/* Number */}
              <span
                className="font-black text-4xl leading-none flex-shrink-0 w-12"
                style={{ ...brutal, color: Y, opacity: 0.3 }}
              >
                {p.num}
              </span>
              {/* Title */}
              <div className="flex-1">
                <h3
                  className="font-black text-2xl md:text-3xl leading-tight uppercase whitespace-pre-line mb-1"
                  style={{ ...brutal, color: Y }}
                >
                  {p.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: WH, opacity: 0.55, ...mono }}>{p.sub}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
              {/* Arrow — appears on hover */}
              <span
                className="font-black text-2xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: Y }}
              >
                →
              </span>
            </div>
          ))}
          {/* THAT'S IT row */}
          <div
            className="p-6 flex items-center justify-between"
            style={{ background: Y }}
          >
            <span className="font-black text-2xl text-black uppercase" style={brutal}>THAT'S IT.</span>
            <span className="text-black/60 text-xs font-black uppercase tracking-widest" style={mono}>short, like i promised.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. PROJECTS / MISSIONS ──────────────────────────────────────────────── */
function ProjectsSection() {
  const featured = projectsData.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-20 px-6 md:px-12 border-t-4" style={{ background: BG, borderColor: Y }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel>— FIELD REPORTS —</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <h2
            className="text-[clamp(2.5rem,7vw,90px)] font-black leading-none uppercase"
            style={{ ...brutal, color: WH, textShadow: '4px 4px 0 #000' }}
          >
            THE<br /><span style={{ color: Y }}>MISSIONS</span>
          </h2>
          <Link
            to="/projects"
            className="self-start md:self-end px-5 py-2.5 border-2 font-black text-xs uppercase tracking-widest transition-all"
            style={{ color: Y, borderColor: Y, background: 'transparent', boxShadow: `3px 3px 0 var(--sw-yellow)`, ...mono }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = Y; (e.currentTarget as HTMLElement).style.color = BK; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = Y; }}
          >
            ALL MISSIONS →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `6px 6px 0 var(--sw-yellow)` }}>
          {featured.map((p, i) => (
            <div
              key={p.id}
              className="p-6 border-b-2 md:border-b-0 md:border-r-2 last:border-r-0 flex flex-col gap-3"
              style={{ background: i % 2 === 0 ? BG : BGA, borderColor: Y }}
            >
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: B, ...mono }}>
                MISSION #{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-black text-lg uppercase leading-tight" style={{ ...brutal, color: Y }}>
                {p.name}
              </h3>
              <p className="text-[11px] leading-relaxed flex-1" style={{ color: WH, opacity: 0.6, ...mono }}>
                {p.shortDescription?.slice(0, 100)}...
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.techStack?.slice(0, 3).map((t: string) => <Tag key={t}>{t}</Tag>)}
              </div>
              {p.liveDemo && (
                <a
                  href={p.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-black uppercase tracking-widest border px-3 py-1.5 w-fit transition-all"
                  style={{ color: Y, borderColor: 'color-mix(in srgb, var(--sw-yellow) 50%, transparent)', ...mono }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = Y; (e.currentTarget as HTMLElement).style.color = BK; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = Y; }}
                >
                  DEPLOY LINK ↗
                </a>
              )}
            </div>
          ))}
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
    <section id="contact" className="py-20 px-6 md:px-12 border-t-4" style={{ background: BGA, borderColor: Y }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel>— ONE LAST THING, REBEL —</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2"
          style={{ borderColor: Y, boxShadow: `6px 6px 0 var(--sw-yellow)` }}>

          {/* Left — flavour copy */}
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 flex flex-col gap-6"
            style={{ background: BG, borderColor: Y }}>
            <h2
              className="text-[clamp(2rem,5vw,64px)] font-black leading-none uppercase"
              style={{ ...brutal, color: WH, textShadow: '3px 3px 0 #000' }}
            >
              GOT A<br />PROJECT?<br />
              <span style={{ color: Y }}>SHOOT<br />YOUR<br />SHOT.</span>
            </h2>
            <div
              className="border-2 p-4 w-fit"
              style={{ background: 'color-mix(in srgb, var(--sw-yellow) 8%, transparent)', borderColor: Y, boxShadow: `3px 3px 0 var(--sw-yellow)` }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: Y, opacity: 0.8, ...mono }}>// TRANSMISSION DETAILS</p>
              <p className="text-xs font-bold" style={{ color: B, ...mono }}>rohitdubey39005@gmail.com</p>
              <p className="text-xs font-bold mt-1" style={{ color: WH, opacity: 0.6, ...mono }}>India · Remote Worldwide · &lt;24h Reply</p>
            </div>

            {/* THWIP-style sound effect */}
            <div
              className="w-28 h-28 border-4 flex flex-col items-center justify-center -rotate-6 self-start"
              style={{ background: Y, borderColor: Y, boxShadow: '5px 5px 0 #000', ...brutal }}
            >
              <span className="text-black font-black text-xl leading-none">THWIP!</span>
              <span className="text-black/60 text-[7px] font-black uppercase tracking-wider mt-0.5">send message</span>
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
                    <label className="block text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: Y, opacity: 0.85, ...mono }}>
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
                  <label className="block text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: Y, opacity: 0.85, ...mono }}>
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

        {/* Bottom — footer strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2"
          style={{ borderColor: 'color-mix(in srgb, var(--sw-yellow) 30%, transparent)' }}>
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: WH, opacity: 0.35, ...mono }}>
            © {new Date().getFullYear()} ROHIT DUBEY · MAY THE CODE BE WITH YOU
          </p>
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: Y, opacity: 0.8, ...mono }}>
            🚧 FORCE SKIN (WIP PREVIEW) · JEDI &amp; SITH THEME MODES · v3.2
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Full Star Wars home page ────────────────────────────────────────────── */
export function HomePageStarWars() {
  useSEO('Home', 'Rohit Dubey — AI & Full-Stack Developer portfolio.');

  return (
    <div className="w-full relative" style={{ background: BG, paddingTop: '84px' }}>
      <HeroStarWars />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
