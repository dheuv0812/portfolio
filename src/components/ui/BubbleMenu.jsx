import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaFilePdf, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  { label: 'home',           href: '/',               ariaLabel: 'Home',           rotation: -6, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'about',          href: '#about',          ariaLabel: 'About',          rotation:  5, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'skills',         href: '/skills',         ariaLabel: 'Skills',         rotation: -4, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'projects',       href: '/projects',       ariaLabel: 'Projects',       rotation:  6, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'experience',     href: '/experience',     ariaLabel: 'Experience',     rotation:  7, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'certifications', href: '/certifications', ariaLabel: 'Certifications', rotation: -4, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
  { label: 'contact',        href: '#contact',        ariaLabel: 'Contact',        rotation:  5, hoverStyles: { bgColor: '#FF2A55', textColor: '#FFFFFF' } },
];

export default function BubbleMenu({
  logo = 'DHRUV',
  items = DEFAULT_ITEMS,
  className = '',
  style,
  menuAriaLabel = 'Toggle navigation',
  menuBg = '#ffffff',
  menuContentColor = '#070A13',
  useFixedPosition = true,
  animationEase = 'back.out(1.7)',
  animationDuration = 0.48,
  onOpenResume
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const containerClassName = `bubble-menu ${useFixedPosition ? 'fixed' : 'absolute'} ${className}`.trim();

  const handleToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const isItemActive = (href) => {
    if (href === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (href !== '/' && href.startsWith('/') && currentPath === href) return true;
    return false;
  };

  const handleLinkClick = (e, href) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      e.preventDefault();
      if (currentPath === '/') {
        if (window.lenis) {
          window.lenis.scrollTo(href, { offset: -20, duration: 1.2 });
        } else {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        navigate('/' + href);
      }
    } else if (href.startsWith('/')) {
      e.preventDefault();
      if (currentPath !== href) {
        navigate(href);
      }
    }
  };

  // Mount/Unmount Overlay Animation
  useEffect(() => {
    if (isMenuOpen) {
      setShowOverlay(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (overlayRef.current) {
        const isDesktop = window.innerWidth >= 900;

        if (isDesktop) {
          gsap.to(bubblesRef.current, {
            scale: 0,
            opacity: 0,
            rotation: 0,
            duration: 0.25,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: () => setShowOverlay(false)
          });
        } else {
          gsap.to(bubblesRef.current, {
            y: 16,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: () => setShowOverlay(false)
          });
        }
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Entrance Animation with 50ms sequential stagger
  useEffect(() => {
    if (showOverlay && isMenuOpen) {
      const isDesktop = window.innerWidth >= 900;

      if (isDesktop) {
        bubblesRef.current.forEach((bubble, idx) => {
          if (!bubble) return;
          const targetRotation = menuItems[idx]?.rotation ?? 0;
          const targetTY = menuItems[idx]?.translateY ?? 0;

          gsap.fromTo(
            bubble,
            { scale: 0, opacity: 0, rotation: 0, y: 0 },
            {
              scale: 1,
              opacity: 1,
              rotation: targetRotation,
              y: targetTY,
              duration: animationDuration,
              ease: animationEase,
              delay: idx * 0.045
            }
          );
        });
      } else {
        // Mobile 40-50ms Sequential Stagger
        gsap.fromTo(
          bubblesRef.current,
          { y: 24, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: animationDuration,
            ease: animationEase,
            stagger: 0.045,
            delay: 0.05
          }
        );
      }
    }
  }, [showOverlay, isMenuOpen, menuItems, animationDuration, animationEase]);

  // Desktop Hover Tilt Setup
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && overlayRef.current) {
        const isDesktop = window.innerWidth >= 900;
        bubblesRef.current.forEach((bubble, idx) => {
          if (bubble) {
            const rotation = isDesktop ? (menuItems[idx]?.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        {/* Logo Bubble */}
        <div
          className="bubble logo-bubble"
          aria-label="Logo"
          style={{
            background: isMenuOpen ? '#0D1322' : (menuBg || '#070A13'),
            border: '1.5px solid rgba(255, 42, 85, 0.35)',
            boxShadow: isMenuOpen ? '0 0 18px rgba(255, 42, 85, 0.35)' : '0 4px 18px rgba(0, 0, 0, 0.4), 0 0 12px rgba(255, 42, 85, 0.2)',
          }}
        >
          <span className="logo-content">
            {typeof logo === 'string'
              ? <img src={logo} alt="Logo" className="bubble-logo" />
              : logo}
          </span>
        </div>

        {/* Toggle Bubble */}
        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{
            background: isMenuOpen ? '#0D1322' : (menuBg || '#070A13'),
            border: '1.5px solid rgba(255, 42, 85, 0.4)',
            boxShadow: isMenuOpen ? '0 0 18px rgba(255, 42, 85, 0.35)' : '0 4px 18px rgba(0, 0, 0, 0.4), 0 0 12px rgba(255, 42, 85, 0.2)',
          }}
        >
          <span className="menu-line" style={{ background: 'var(--c-accent, #FF2A55)' }} />
          <span className="menu-line short" style={{ background: 'var(--c-accent, #FF2A55)' }} />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
        >
          {/* Top Personalized Tagline Header */}
          <div className="overlay-tagline font-sans">
            <span className="tagline-title">DHRUV SINGH</span>
            <span className="tagline-sub">FULL-STACK DEVELOPER</span>
            <div className="tagline-badge">
              <span className="status-dot" /> OPEN FOR OPPORTUNITIES
            </div>
          </div>

          {/* Menu Items Grid/List */}
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => {
              const active = isItemActive(item.href);
              return (
                <li key={idx} role="none" className="pill-col">
                  <a
                    role="menuitem"
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    className={`pill-link ${active ? 'active-pill' : ''}`}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    style={{
                      '--item-rot': `${item.rotation ?? 0}deg`,
                      '--item-ty': `${item.translateY ?? 0}px`,
                      '--pill-bg': active ? '#000000' : 'rgba(255,255,255,0.06)',
                      '--pill-color': active ? 'var(--c-accent, #FF2A55)' : '#ffffff',
                      '--hover-bg': item.hoverStyles?.bgColor || 'var(--c-accent, #FF2A55)',
                      '--hover-color': item.hoverStyles?.textColor || '#ffffff'
                    }}
                    ref={el => {
                      if (el) bubblesRef.current[idx] = el;
                    }}
                  >
                    <span
                      className="pill-label"
                      ref={el => {
                        if (el) labelRefs.current[idx] = el;
                      }}
                    >
                      <span className="pill-num">0{idx + 1}</span>
                      <span className="pill-text">{item.label}</span>
                      {active && <span className="active-badge">CURRENT</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          
          {/* Recruiter Quick Action CTA Bar */}
          <div className="overlay-cta-bar">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              className="cta-btn primary-cta cursor-pointer"
            >
              <FaFilePdf className="w-3 h-3 text-white" /> ↓ Resume
            </button>
            <a
              href="https://github.com/dheuv0812"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
            >
              <FaGithub className="w-3 h-3" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/dhruv0812"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
            >
              <FaLinkedin className="w-3 h-3" /> LinkedIn
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="cta-btn"
            >
              <FaEnvelope className="w-3 h-3" /> Contact
            </a>
          </div>

          {/* Domain & Branding Footer */}
          <div className="overlay-domain-footer">
            <span className="footer-line" />
            <span className="domain-text">Built by Dhruv Singh • <strong>Toronto, Canada</strong></span>
          </div>
        </div>
      )}
    </>
  );
}
