import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaArrowUp, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RightActionDock } from '@/components/ui/SocialSidebar';
import { ResumeModal } from '@/components/ui/ResumeModal';
import BubbleMenu from '@/components/ui/BubbleMenu';
import { ScrollVelocity } from '@/components/ui/ScrollVelocity';
import ProfileCard from '@/components/ui/ProfileCard';
import { SkinButton } from '@/components/ui/SkinButton';
import { SkinSwitcher } from '@/components/ui/SkinSwitcher';
import { useTheme } from '@/lib/ThemeContext';
import { PageTransition } from '@/components/ui/PageTransition';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { LightsaberCursor } from '@/components/ui/LightsaberCursor';
import { NavStarWars } from '@/components/ui/NavStarWars';

const Logo = () => {
  const { activeTheme } = useTheme();
  return (
    <div className="p-0.5 rounded-full shadow-sm flex items-center justify-center" style={{ background: 'var(--c-nav-bg)' }}>
      <Link
        to="/"
        className="inline-flex items-center font-black text-[12px] px-4 py-1.5 rounded-full tracking-wider hover:scale-105 transition-all duration-300 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #18181B 0%, #09090B 100%)',
          color: activeTheme.vars['--c-accent'],
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)',
          textShadow: `0 0 8px ${activeTheme.vars['--c-accent']}99`,
        }}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        ROHIT
      </Link>
    </div>
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [resumeOpen, setResumeOpen] = useState(false);
  const { toggleSwitcher, activeTheme } = useTheme();

  const menuItems = [
    { label: 'home',           href: '/',               ariaLabel: 'Home',           rotation: -6, translateY: -14, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'about',          href: '#about',          ariaLabel: 'About',          rotation:  5, translateY:  12, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'skills',         href: '/skills',         ariaLabel: 'Skills',         rotation: -4, translateY:  -8, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'projects',       href: '/projects',       ariaLabel: 'Projects',       rotation:  6, translateY:  16, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'client work',    href: '/client-work',    ariaLabel: 'Client Work',    rotation: -5, translateY: -12, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'experience',     href: '/experience',     ariaLabel: 'Experience',     rotation:  7, translateY:  10, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'certifications', href: '/certifications', ariaLabel: 'Certifications', rotation: -4, translateY:  -8, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
    { label: 'contact',        href: '#contact',        ariaLabel: 'Contact',        rotation:  5, translateY:  14, hoverStyles: { bgColor: activeTheme.vars['--c-accent'], textColor: activeTheme.vars['--c-accent-text'] } },
  ];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSwitcher();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [toggleSwitcher]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const accent  = 'var(--c-accent)';
  const accent2 = 'var(--c-accent-2)';
  const shadow  = 'var(--c-shadow)';

  return (
    <SmoothScroll>
      <SkinSwitcher />

      {/* Per-skin special effects */}
      {activeTheme.id === 'starwars' && (
        <LightsaberCursor colour="#4FC3F7" />
      )}
      {activeTheme.id === 'sith' && (
        <LightsaberCursor colour="#FF2020" />
      )}

      <div className="w-full relative min-h-screen flex flex-col" style={{ background: 'var(--c-bg-page)' }}>

        {/* Ticker strip — displays on all skins, customized for Star Wars / Sith as UNDER CONSTRUCTION */}
        <div
          className="w-full border-b z-30 overflow-hidden relative h-8 flex items-center"
          style={{
            background: 'var(--c-ticker-bg)',
            borderColor: 'var(--c-ticker-border)',
            color: 'var(--c-ticker-text)',
          }}
        >
          <ScrollVelocity
            texts={[
              (activeTheme.id === 'starwars' || activeTheme.id === 'sith')
                ? `🚧 FORCE SKIN (BETA PREVIEW) ✦ UNDER CONSTRUCTION ✦ ${activeTheme.id === 'sith' ? 'SITH THEME MODE' : 'JEDI THEME MODE'} ACTIVE ✦ WORK IN PROGRESS ✦ `
                : (activeTheme.tickerText ?? 'BUILD • LEARN • ITERATE • SHIP • BUILD • LEARN • ITERATE • SHIP')
            ]}
            velocity={20}
            className="text-[10px] font-black tracking-widest uppercase"
            parallaxClassName="py-0.5"
            numCopies={8}
          />
        </div>

        {/* Skin switcher left vertical tab — available across all skins */}
        <SkinButton />

        {/* Nav — skin aware */}
        {(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? (
          <NavStarWars onResumeOpen={() => setResumeOpen(true)} />
        ) : (
          <BubbleMenu
            logo={<Logo />}
            items={menuItems}
            menuAriaLabel="Toggle navigation"
            menuBg={activeTheme.vars['--c-nav-bg']}
            menuContentColor={activeTheme.vars['--c-nav-content']}
            useFixedPosition={true}
            animationEase="back.out(1.7)"
            animationDuration={0.48}
            onOpenResume={() => setResumeOpen(true)}
          />
        )}

        {/* Back to home on subpages */}
        {location.pathname !== '/' && (
          <div className="fixed top-24 left-4 md:left-8 z-40">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 border-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-200"
              style={{
                borderColor: shadow,
                background: 'var(--c-bg-page)',
                color: 'var(--c-text-dark)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = accent;
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${shadow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--c-bg-page)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span>← Back <span className="hidden sm:inline">to Home</span></span>
            </Link>
          </div>
        )}

        <RightActionDock onResumeOpen={() => setResumeOpen(true)} />

        {/* Back to top */}
        <div className="fixed right-3 sm:right-6 bottom-4 sm:bottom-6 z-40">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors duration-300 cursor-pointer"
            style={{ borderColor: shadow, background: 'var(--c-bg-page)', color: 'var(--c-text-dark)' }}
            aria-label="Back to top"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--c-bg-page)'; }}
          >
            <FaArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>

        <div className="flex-1 w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </div>

        {/* Footer — Skin Aware */}
        {(activeTheme.id === 'starwars' || activeTheme.id === 'sith') ? (
          /* Star Wars / Sith Neobrutalist Footer */
          <footer
            className="py-16 px-6 md:px-10 border-t-4 relative z-10 w-full mt-auto"
            style={{
              background: 'var(--c-bg-footer)',
              borderColor: shadow,
              color: 'var(--c-text)',
            }}
          >
            <div className="max-w-6xl mx-auto flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 items-start">

                {/* Branding */}
                <div className="md:col-span-2 xl:col-span-2 flex flex-col gap-4">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg w-fit"
                    style={{
                      background: accent,
                      color: 'var(--c-accent-text)',
                      boxShadow: `4px 4px 0 ${shadow}`,
                      fontFamily: '"Arial Black", Impact, sans-serif',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    <span className="text-xs font-black tracking-widest uppercase">ROHIT DUBEY</span>
                  </div>
                  <p className="text-xs sm:text-sm max-w-sm font-semibold leading-relaxed" style={{ color: 'var(--c-text-muted)', fontFamily: 'monospace' }}>
                    // Full-Stack &amp; AI Engineer portfolio showcasing real-world engineering case studies, verified client outcomes, and core toolkit.
                  </p>
                  <div className="flex gap-3 mt-2">
                    {[
                      { icon: FaLinkedin, href: 'https://www.linkedin.com/in/rohit--dubey03/', label: 'LinkedIn Profile' },
                      { icon: FaGithub,   href: 'https://github.com/anakinskywalker0903',      label: 'GitHub Profile' },
                      { icon: MdEmail,    href: 'mailto:rohitdubey39005@gmail.com',             label: 'Email Contact' },
                      { icon: FaWhatsapp, href: 'https://wa.me/918777453162',                   label: 'WhatsApp Chat' },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center transition-all duration-200 cursor-pointer"
                          style={{
                            background: 'var(--c-bg-alt, #111)',
                            color: accent,
                            boxShadow: `3px 3px 0 ${shadow}`,
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = accent;
                            (e.currentTarget as HTMLElement).style.color = 'var(--c-accent-text)';
                            (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
                            (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${shadow}`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'var(--c-bg-alt, #111)';
                            (e.currentTarget as HTMLElement).style.color = accent;
                            (e.currentTarget as HTMLElement).style.transform = 'none';
                            (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${shadow}`;
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Navigate */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-3.5 rounded-xs" style={{ background: accent }} />
                    <h4 className="font-black text-xs tracking-widest uppercase" style={{ color: accent, fontFamily: 'monospace' }}>
                      NAVIGATE
                    </h4>
                  </div>
                  {[['/', 'Home / About'], ['/skills', 'Toolkit'], ['/experience', 'Timeline'], ['/client-work', 'Client Work'], ['/certifications', 'Learning Archive']].map(([to, label]) => (
                    <Link
                      key={to}
                      to={to}
                      className="text-xs font-bold w-fit transition-all hover:translate-x-1.5 flex items-center gap-1.5"
                      style={{ color: 'var(--c-text-muted)', fontFamily: 'monospace' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--c-text-muted)'; }}
                    >
                      <span>→</span>
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>

                {/* Documents */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-3.5 rounded-xs" style={{ background: accent }} />
                    <h4 className="font-black text-xs tracking-widest uppercase" style={{ color: accent, fontFamily: 'monospace' }}>
                      DOCUMENTS
                    </h4>
                  </div>
                  {['AI Engineer Resume', 'Full Stack / SDE Resume', 'Frontend Developer Resume'].map(label => (
                    <button
                      key={label}
                      onClick={() => setResumeOpen(true)}
                      className="text-left text-xs font-bold w-fit transition-all hover:translate-x-1.5 flex items-center gap-1.5 cursor-pointer"
                      style={{ color: 'var(--c-text-muted)', fontFamily: 'monospace' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--c-text-muted)'; }}
                    >
                      <span>↗</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {/* Profile card */}
                <div className="flex justify-center xl:justify-end md:col-span-2 xl:col-span-1 overflow-visible mt-4 xl:mt-0 pr-8 xl:pr-0">
                  <ProfileCard
                    name="Rohit Dubey"
                    title="AI & Full-Stack Developer"
                    handle="rohitdubey"
                    status="Building something"
                    contactText="Hire Me"
                    avatarUrl="/rohit.jpg"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    behindGlowEnabled={true}
                    behindGlowColor={`${activeTheme.vars['--c-accent']}26`}
                    innerGradient="transparent"
                    onContactClick={() => {
                      if (window.location.pathname !== '/') { window.location.href = '/#contact'; return; }
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </div>
              </div>

              {/* Bottom Bar Strip */}
              <div
                className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-[11px] border-t-2"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--c-text-muted)', fontFamily: 'monospace' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
                  <p className="font-bold uppercase tracking-wider">
                    © {new Date().getFullYear()} ROHIT DUBEY. ALL RIGHTS RESERVED.
                  </p>
                </div>
                <div
                  className="px-3 py-1 border border-black/20 rounded-md font-black uppercase tracking-widest text-[10px]"
                  style={{ background: 'rgba(255,255,255,0.04)', color: accent }}
                >
                  v3.2 • BUILT WITH REACT, THREE.JS, &amp; GSAP
                </div>
              </div>
            </div>
          </footer>
        ) : (
          /* Original Cyber Green Sleek Footer */
          <footer className="bg-black text-white py-16 px-6 md:px-10 border-t-4 border-black relative z-10 w-full mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 items-start">
                {/* Branding Column */}
                <div className="md:col-span-2 xl:col-span-2 flex flex-col gap-4">
                  <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-4 py-1.5 rounded-full w-fit tracking-wider uppercase">
                    ROHIT DUBEY
                  </span>
                  <p className="text-white/50 text-sm max-w-sm font-medium leading-relaxed">
                    A personal product and portfolio hub built to demonstrate engineering case studies, client outcomes, and core competencies.
                  </p>
                  <div className="flex gap-2.5 mt-2">
                    {[
                      { icon: FaLinkedin, href: 'https://www.linkedin.com/in/rohit--dubey03/', label: 'LinkedIn Profile' },
                      { icon: FaGithub, href: 'https://github.com/anakinskywalker0903', label: 'GitHub Profile' },
                      { icon: MdEmail, href: 'mailto:rohitdubey39005@gmail.com', label: 'Email Contact' },
                      { icon: FaWhatsapp, href: 'https://wa.me/918777453162', label: 'WhatsApp Chat' },
                    ].map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#00F5A0] hover:text-black transition-all duration-300"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[#00F5A0] font-black text-xs tracking-widest uppercase mb-1">
                    NAVIGATE
                  </h4>
                  <Link to="/" className="text-white/60 hover:text-white text-sm font-bold w-fit transition-colors">Home / About</Link>
                  <Link to="/skills" className="text-white/60 hover:text-white text-sm font-bold w-fit transition-colors">Toolkit</Link>
                  <Link to="/experience" className="text-white/60 hover:text-white text-sm font-bold w-fit transition-colors">Timeline</Link>
                  <Link to="/client-work" className="text-white/60 hover:text-white text-sm font-bold w-fit transition-colors">Client Work</Link>
                  <Link to="/certifications" className="text-white/60 hover:text-white text-sm font-bold w-fit transition-colors">Learning Archive</Link>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-[#00F5A0] font-black text-xs tracking-widest uppercase mb-1">
                    DOCUMENTS
                  </h4>
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="text-left text-white/60 hover:text-white text-sm font-bold w-fit transition-colors cursor-pointer animate-none"
                  >
                    AI Engineer Resume
                  </button>
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="text-left text-white/60 hover:text-white text-sm font-bold w-fit transition-colors cursor-pointer animate-none"
                  >
                    Full Stack / SDE Resume
                  </button>
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="text-left text-white/60 hover:text-white text-sm font-bold w-fit transition-colors cursor-pointer animate-none"
                  >
                    Frontend Developer Resume
                  </button>
                </div>

                {/* Profile Card Column */}
                <div className="flex justify-center xl:justify-end md:col-span-2 xl:col-span-1 overflow-visible mt-6 xl:mt-0 pr-8 xl:pr-0">
                  <ProfileCard
                    name="Rohit Dubey"
                    title="AI & Full-Stack Developer"
                    handle="rohitdubey"
                    status="Building something"
                    contactText="Hire Me"
                    avatarUrl="/rohit.jpg"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    behindGlowEnabled={true}
                    behindGlowColor="rgba(0, 245, 160, 0.15)"
                    innerGradient="transparent"
                    onContactClick={() => {
                      if (window.location.pathname !== '/') {
                        window.location.href = '/#contact';
                        return;
                      }
                      const el = document.getElementById('contact');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/#contact';
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4 text-white/40 text-xs">
                <p className="font-bold uppercase tracking-wider">
                  © {new Date().getFullYear()} ROHIT DUBEY. ALL RIGHTS RESERVED.
                </p>
                <p className="font-black uppercase tracking-widest text-[#00F5A0]/60">
                  v3.1 • BUILT WITH REACT, THREE.JS, &amp; GSAP
                </p>
              </div>
            </div>
          </footer>
        )}

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
