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

const Logo = () => (
  <div className="p-0.5 rounded-full bg-white shadow-sm flex items-center justify-center border border-black/5">
    <Link
      to="/"
      className="inline-flex items-center text-[#00F5A0] font-black text-[12px] px-4 py-1.5 rounded-full tracking-wider hover:scale-105 transition-all duration-300 relative overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #18181B 0%, #09090B 100%)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -2px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)',
        textShadow: '0 0 8px rgba(204, 255, 0, 0.9)'
      }}
    >
      {/* Liquid light reflection swipe */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      ROHIT
    </Link>
  </div>
);

const menuItems = [
  { label: 'home',           href: '/',               ariaLabel: 'Home',           rotation: -6, translateY: -14, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'about',          href: '#about',          ariaLabel: 'About',          rotation:  5, translateY:  12, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'skills',         href: '/skills',         ariaLabel: 'Skills',         rotation: -4, translateY:  -8, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'projects',       href: '/projects',       ariaLabel: 'Projects',       rotation:  6, translateY:  16, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'client work',    href: '/client-work',    ariaLabel: 'Client Work',    rotation: -5, translateY: -12, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'experience',     href: '/experience',     ariaLabel: 'Experience',     rotation:  7, translateY:  10, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'certifications', href: '/certifications', ariaLabel: 'Certifications', rotation: -4, translateY:  -8, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
  { label: 'contact',        href: '#contact',        ariaLabel: 'Contact',        rotation:  5, translateY:  14, hoverStyles: { bgColor: '#00F5A0', textColor: '#000000' } },
];

import { PageTransition } from '@/components/ui/PageTransition';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className="w-full relative min-h-screen flex flex-col bg-white">
        {/* Top scroll velocity ticker */}
        <div className="w-full bg-[#031714] text-[#00F5A0] py-2 border-b border-[#00F5A0]/20 z-30 overflow-hidden relative h-8 flex items-center">
          <ScrollVelocity
            texts={[
              "BUILD • LEARN • ITERATE • SHIP • BUILD • LEARN • ITERATE • SHIP"
            ]}
            velocity={20}
            className="text-[10px] font-black tracking-widest uppercase text-[#00F5A0]"
            parallaxClassName="py-0.5"
            numCopies={8}
          />
        </div>
        {/* Dynamic BubbleMenu linked to routes */}
        <BubbleMenu
          logo={<Logo />}
          items={menuItems}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#031714"
          useFixedPosition={true}
          animationEase="back.out(1.7)"
          animationDuration={0.48}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Global "← Back to Home" button on subpages */}
        {location.pathname !== '/' && (
          <div className="fixed top-24 left-4 md:left-8 z-40">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 border-2 border-black rounded-full bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-wider hover:bg-[#00F5A0] hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>← Back <span className="hidden sm:inline">to Home</span></span>
            </Link>
          </div>
        )}

        {/* Persistent Right Action Dock (Resume + Social Channels) */}
        <RightActionDock onResumeOpen={() => setResumeOpen(true)} />

        {/* Persistent Floating Back-to-Top Button (Bottom Right) */}
        <div className="fixed right-3 sm:right-6 bottom-4 sm:bottom-6 z-40">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black bg-white flex items-center justify-center text-black hover:bg-[#00F5A0] shadow-lg transition-colors duration-300 cursor-pointer"
            aria-label="Back to top"
            title="Back to Top"
          >
            <FaArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>

        {/* Barba.js + GSAP Page Transition Container */}
        <div className="flex-1 w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </div>

        {/* Persistent Action Hub Footer */}
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

      {/* Global Resume Picker Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
    </SmoothScroll>
  );
}
