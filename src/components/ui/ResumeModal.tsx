import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';

import aiResume from '@/assets/resumes/Rohit_s_Resume_AI.pdf';
import frontendResume from '@/assets/resumes/Rohit_s_Resume_Frontend.pdf';
import sdeResume from '@/assets/resumes/Rohit_s_Resume_SDE.pdf';
import { trackResumeDownload, trackResumePreview } from '@/lib/analytics';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeVersions = [
  {
    id: 'full-stack-sde',
    role: 'Full Stack & Software Engineering',
    description: 'React, Node.js, Python, Java, REST APIs, PostgreSQL, and scalable web architectures.',
    fileUrl: sdeResume,
    summary: 'Full-Stack Developer & Computer Engineering student at TMU building resilient web applications, REST APIs, and database-backed platforms.',
    skills: ['React', 'JavaScript / TypeScript', 'Node.js & Express', 'Python', 'Java', 'PostgreSQL', 'HTML5 / CSS3', 'Git & GitHub']
  },
  {
    id: 'computer-engineering',
    role: 'Computer Engineering & Embedded Systems',
    description: 'VHDL, FPGA (Quartus & ModelSim), Arduino robotics, digital logic, and analog CMOS ICs.',
    fileUrl: aiResume,
    summary: 'Computer Engineering specialist with hands-on hardware expertise spanning 8-bit processor design, RTL synthesis, robotics microcontroller automation, and CMOS circuit design.',
    skills: ['C / C++', 'VHDL', 'FPGA (Quartus/ModelSim)', 'Arduino & Steppers', 'Digital Logic & FSM', 'Analog IC Design (CMOS)', 'OpenCV', 'Circuit Analysis']
  },
  {
    id: 'frontend',
    role: 'Frontend & Creative Web Development',
    description: 'Modern component architecture, Three.js 3D web canvas, responsive micro-animations.',
    fileUrl: frontendResume,
    summary: 'Frontend developer specializing in immersive, responsive, and accessible web experiences using React, Three.js, GSAP, and Tailwind CSS.',
    skills: ['React', 'JavaScript / TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP & Motion', 'Responsive UI/UX', 'Design Tokens']
  },
];

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activePreview, setActivePreview] = useState<typeof resumeVersions[0] | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Lock background Lenis smooth scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      (window as any).lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      (window as any).lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      (window as any).lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setActivePreview(null);
    setZoomLevel(100);
    setTotalPages(1);
    onClose();
  };

  const handleDownload = (version: typeof resumeVersions[0]) => {
    trackResumeDownload(version.role);
    const link = document.createElement('a');
    link.href = version.fileUrl;
    link.download = `Dhruv_Singh_${version.role.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (version: typeof resumeVersions[0]) => {
    trackResumePreview(version.role);
    setZoomLevel(100);
    setTotalPages(1);
    setActivePreview(version);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(200, prev + 15));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(70, prev - 15));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pt-20 pb-4 px-3 sm:px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Centered Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full ${
              activePreview ? 'max-w-5xl w-[95vw] h-[90vh] max-h-[90vh]' : 'max-w-xl max-h-[85vh]'
            } bg-[var(--c-bg-surface)] border-[3px] border-black rounded-[1.8rem] sm:rounded-[2.2rem] shadow-2xl overflow-hidden z-[70] flex flex-col my-auto transition-all duration-300`}
          >
            {activePreview ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden" style={{ background: 'var(--c-bg)' }}>
                {/* PDF Header Controls */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 z-10 flex-shrink-0"
                  style={{ background: 'var(--c-bg-alt)', borderColor: 'var(--c-border)' }}>
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                      onClick={() => setActivePreview(null)}
                      className="px-3.5 py-1.5 rounded-full border border-[var(--c-accent)]/40 text-[10px] sm:text-xs font-black uppercase text-[var(--c-accent)] hover:bg-[var(--c-accent)] hover:text-black transition-all cursor-pointer flex-shrink-0"
                    >
                      ← Versions
                    </button>
                    <span className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider truncate">
                      {activePreview.role} Resume
                    </span>
                  </div>

                  {/* Custom Thematic PDF Controls Bar */}
                  <div className="hidden sm:flex items-center gap-2 bg-[var(--c-bg)] border border-[var(--c-accent)]/30 rounded-full px-3 py-1 text-xs text-white">
                    <span className="text-[10px] font-black text-[var(--c-accent)] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 border border-[var(--c-accent)]/20">
                      {totalPages} {totalPages > 1 ? 'PAGES' : 'PAGE'}
                    </span>
                    <div className="h-3 w-px bg-white/20" />
                    <button
                      onClick={handleZoomOut}
                      className="w-6 h-6 rounded-full hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center font-black text-xs transition-colors cursor-pointer"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <span className="text-[10px] font-black text-white/90 min-w-[38px] text-center">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="w-6 h-6 rounded-full hover:bg-[var(--c-accent)] hover:text-black flex items-center justify-center font-black text-xs transition-colors cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="text-[9px] font-black uppercase text-[var(--c-accent)] hover:underline ml-1 cursor-pointer"
                    >
                      Fit
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={activePreview.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white font-bold text-[10px] sm:text-xs rounded-full border border-white/20 hover:bg-[var(--c-bg-surface)] hover:text-black transition-all cursor-pointer"
                    >
                      <FaEye className="w-3 h-3" /> Full Tab
                    </a>
                    <button
                      onClick={() => handleDownload(activePreview)}
                      className="flex items-center gap-1 px-3.5 py-1.5 bg-[var(--c-accent)] text-black font-black text-[10px] sm:text-xs rounded-full border border-black hover:scale-105 transition-all cursor-pointer"
                    >
                      <FaDownload className="w-3 h-3" /> Download
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[var(--c-accent)] hover:text-black transition-all cursor-pointer"
                    >
                      <IoClose className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Resume In-Modal Viewer with Custom Thematic Scrollbar */}
                <div className="flex-1 w-full bg-[var(--c-bg)] text-white p-3 sm:p-4 flex flex-col gap-3 overflow-hidden">
                  {/* Compact Header Summary Bar */}
                  <div className="bg-[#070A13] border border-[var(--c-accent)]/20 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 flex-shrink-0">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--c-accent)] block">
                        DHRUV SINGH • {activePreview.role.toUpperCase()}
                      </span>
                      <p className="text-white/80 text-xs font-medium truncate mt-0.5">
                        {activePreview.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 flex-shrink-0">
                      {activePreview.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-[9px] font-black uppercase bg-[var(--c-accent)]/10 text-[var(--c-accent)] border border-[var(--c-accent)]/30 px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thematic Canvas Multi-Page PDF Viewer */}
                  <div className="flex-1 w-full rounded-xl overflow-hidden border border-[var(--c-accent)]/30 bg-[#070A13] relative">
                    <PdfCanvasViewer url={activePreview.fileUrl} zoomLevel={zoomLevel} onNumPages={setTotalPages} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b-2 border-black bg-[var(--c-accent-2)]/5">
                  <div>
                    <span className="inline-block bg-[var(--c-accent)] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1 border border-black">
                      RECRUITER HUB
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-black tracking-tight uppercase" style={{ fontFamily: '"Arial Black", sans-serif' }}>
                      RESUME &amp; CREDENTIALS
                    </h3>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <IoClose className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Direct Google Drive Resume Button Banner */}
                <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl border-2 border-black bg-gradient-to-r from-[#FF2A55] to-[#2563EB] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-wide">Dhruv Singh — Official Master Resume</h4>
                    <p className="text-white/80 text-xs font-medium">BEng Computer Engineering (Software Option) • TMU</p>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1cJKmsAqZNy6NeFj46CWnpGMhrv9Ovd1a/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl border border-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm self-start sm:self-auto flex-shrink-0"
                  >
                    <FaDownload className="w-3.5 h-3.5" /> Open Drive Resume ↗
                  </a>
                </div>

                {/* Resume Version Cards */}
                <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col gap-3">
                  {resumeVersions.map((version) => (
                    <div
                      key={version.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border-2 border-black/10 hover:border-black bg-[var(--c-bg-surface)] hover:bg-[var(--c-bg-surface)] transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--c-accent-2)] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <FaFilePdf className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-black text-black text-sm sm:text-base leading-tight uppercase">
                            {version.role}
                          </h4>
                          <p className="text-black/60 text-xs mt-0.5 max-w-sm font-medium leading-relaxed">
                            {version.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                        <button
                          onClick={() => handlePreview(version)}
                          className="flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 border-black rounded-full hover:bg-black hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <FaEye className="w-3 h-3" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDownload(version)}
                          className="flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[var(--c-accent)] hover:bg-black border-2 border-black text-white rounded-full flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
                        >
                          <FaDownload className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3.5 bg-[var(--c-bg-surface)] border-t-2 border-black text-center text-black/50 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                  Dhruv Singh • Engineering Portfolio 2026
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
