import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaDownload, FaEye, FaExternalLinkAlt } from 'react-icons/fa';
import { trackResumeDownload, trackResumePreview } from '@/lib/analytics';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DHRUV_RESUME = {
  id: 'dhruv-master-resume',
  title: 'Dhruv Singh — Official Master Resume',
  role: 'Full-Stack Developer & Computer Engineering',
  subtitle: 'BEng Computer Engineering (Software Option) • TMU (2023–2028)',
  fileUrl: '/Dhruv_Singh_Resume.pdf',
  driveUrl: 'https://drive.google.com/file/d/1cJKmsAqZNy6NeFj46CWnpGMhrv9Ovd1a/view?usp=sharing',
  summary: 'Full-Stack Developer & Computer Engineering student at TMU building resilient web applications, REST APIs, and database-backed platforms.',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'VHDL / FPGA', 'PostgreSQL', 'OpenCV', 'REST APIs', 'Arduino']
};

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Lock background Lenis smooth scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      trackResumePreview('Official Master Resume');
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
    setZoomLevel(100);
    setTotalPages(1);
    onClose();
  };

  const handleDownload = () => {
    trackResumeDownload('Official Master Resume');
    const link = document.createElement('a');
    link.href = DHRUV_RESUME.fileUrl;
    link.download = 'Dhruv_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div className="fixed inset-0 z-[120] flex items-center justify-center pt-14 pb-4 px-2 sm:px-4">
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
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-5xl w-[96vw] h-[90vh] max-h-[90vh] bg-[#070A13] border-2 border-[var(--c-accent,#FF2A55)]/40 rounded-[1.6rem] sm:rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,42,85,0.22)] overflow-hidden z-[130] flex flex-col my-auto"
          >
            {/* Modal Top Navigation & Controls Bar */}
            <div
              className="flex items-center justify-between px-3 sm:px-6 py-3 border-b z-10 flex-shrink-0 gap-2"
              style={{ background: '#0D1322', borderColor: 'rgba(255, 42, 85, 0.25)' }}
            >
              {/* Left Identity Pill */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#FF2A55]/15 border border-[#FF2A55]/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-black text-[#FF2A55]">DS</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider truncate">
                      Dhruv Singh — Official Resume
                    </span>
                    <span className="hidden md:inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FF2A55] text-white">
                      ACTIVE MASTER
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70 truncate hidden sm:block">
                    {DHRUV_RESUME.subtitle}
                  </p>
                </div>
              </div>

              {/* Center Custom PDF Zoom Controls */}
              <div className="hidden sm:flex items-center gap-2 bg-[#070A13] border border-[#FF2A55]/30 rounded-full px-3 py-1 text-xs text-white">
                <span className="text-[9px] font-black text-[#FF2A55] uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/50 border border-[#FF2A55]/25">
                  {totalPages} {totalPages > 1 ? 'PAGES' : 'PAGE'}
                </span>
                <div className="h-3 w-px bg-white/20" />
                <button
                  onClick={handleZoomOut}
                  className="w-6 h-6 rounded-full hover:bg-[#FF2A55] hover:text-white flex items-center justify-center font-black text-xs transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-[10px] font-black text-white/90 min-w-[38px] text-center font-mono">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="w-6 h-6 rounded-full hover:bg-[#FF2A55] hover:text-white flex items-center justify-center font-black text-xs transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className="text-[9px] font-black uppercase text-[#FF2A55] hover:underline ml-1 cursor-pointer"
                >
                  Fit
                </button>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={DHRUV_RESUME.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white font-bold text-[10px] sm:text-xs rounded-full border border-white/20 hover:border-[#FF2A55] hover:text-[#FF2A55] hover:bg-[#FF2A55]/10 transition-all cursor-pointer"
                  title="Open Google Drive link in new tab"
                >
                  <FaExternalLinkAlt className="w-2.5 h-2.5" /> Drive
                </a>

                <a
                  href={DHRUV_RESUME.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white font-bold text-[10px] sm:text-xs rounded-full border border-white/20 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all cursor-pointer"
                  title="Open direct PDF file in browser tab"
                >
                  <FaEye className="w-3 h-3" /> Full Tab
                </a>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#FF2A55] to-[#2563EB] text-white font-black text-[10px] sm:text-xs rounded-full border-none hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,42,85,0.4)] cursor-pointer"
                >
                  <FaDownload className="w-3 h-3" /> Download
                </button>

                <button
                  onClick={handleClose}
                  aria-label="Close resume preview"
                  className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#FF2A55] hover:text-white hover:border-[#FF2A55] transition-all cursor-pointer ml-1"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* In-Modal Viewer Body with Interactive PDF Canvas */}
            <div className="flex-1 w-full bg-[#070A13] text-white p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-3 overflow-hidden">
              {/* Quick Resume Highlights Banner */}
              <div className="bg-[#0D1322]/90 border border-[#FF2A55]/20 rounded-xl px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#FF2A55] block">
                    DHRUV SINGH • FULL-STACK &amp; COMPUTER ENGINEERING
                  </span>
                  <p className="text-white/80 text-[11px] font-medium truncate mt-0.5">
                    {DHRUV_RESUME.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 flex-shrink-0">
                  {DHRUV_RESUME.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-bold uppercase bg-[#FF2A55]/10 text-[#FF2A55] border border-[#FF2A55]/30 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thematic Canvas Multi-Page PDF Viewer */}
              <div className="flex-1 w-full rounded-xl overflow-hidden border border-[#FF2A55]/30 bg-[#070A13] relative">
                <PdfCanvasViewer
                  url={DHRUV_RESUME.fileUrl}
                  zoomLevel={zoomLevel}
                  onNumPages={setTotalPages}
                />
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="px-4 py-2 bg-[#0D1322] border-t border-[rgba(255,42,85,0.2)] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/60">
              <span>Dhruv Singh • TMU Computer Engineering 2026</span>
              <span className="text-[#FF2A55]">Interactive In-Tab Preview</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
