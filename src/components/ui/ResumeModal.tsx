import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';

import aiResume from '@/assets/resumes/Rohit_s_Resume_AI.pdf';
import frontendResume from '@/assets/resumes/Rohit_s_Resume_Frontend.pdf';
import sdeResume from '@/assets/resumes/Rohit_s_Resume_SDE.pdf';
import { trackResumeDownload, trackResumePreview } from '@/lib/analytics';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeVersions = [
  {
    id: 'ai-engineer',
    role: 'AI Engineer',
    description: 'LLMs, RAG pipelines, fine-tuning, vector DBs, and AI architectures.',
    fileUrl: aiResume,
    summary: 'Full-Stack & AI Engineer specializing in LLM integrations, RAG workflows, PyTorch, OpenAI/Claude APIs, and scalable Web Apps.',
    skills: ['Python', 'TypeScript', 'LangChain / LlamaIndex', 'OpenAI & Claude API', 'PyTorch', 'Vector DBs (Pinecone/Chroma)', 'React / Next.js', 'FastAPI / Node.js']
  },
  {
    id: 'full-stack-sde',
    role: 'Full Stack / SDE',
    description: 'End-to-end web applications, system design, REST & GraphQL APIs, and databases.',
    fileUrl: sdeResume,
    summary: 'Full-Stack Software Development Engineer proficient in React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Docker, and Cloud Deployments.',
    skills: ['React & Next.js', 'Node.js & Express', 'TypeScript', 'PostgreSQL / Prisma', 'MongoDB', 'Docker & AWS', 'REST & GraphQL APIs', 'Tailwind CSS']
  },
  {
    id: 'frontend',
    role: 'Frontend Developer',
    description: 'Creative animations, pixel-perfect design systems, responsive UI/UX.',
    fileUrl: frontendResume,
    summary: 'Frontend Engineer focused on building high-performance, pixel-perfect, accessible user interfaces with Framer Motion, GSAP, and Tailwind CSS.',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion & GSAP', 'Vite & Webpack', 'UI/UX Architecture', 'Web Performance & Accessibility']
  },
];

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activePreview, setActivePreview] = useState<typeof resumeVersions[0] | null>(null);

  const handleClose = () => {
    setActivePreview(null);
    onClose();
  };

  const handleDownload = (version: typeof resumeVersions[0]) => {
    trackResumeDownload(version.role);
    const link = document.createElement('a');
    link.href = version.fileUrl;
    link.download = `Rohit_Dubey_${version.role.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (version: typeof resumeVersions[0]) => {
    trackResumePreview(version.role);
    setActivePreview(version);
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

          {/* Centered Modal Container with safe top clearance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full ${
              activePreview ? 'max-w-4xl h-[78vh]' : 'max-w-xl'
            } bg-white border-[3px] border-black rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-[70] flex flex-col max-h-[82vh] my-auto transition-all duration-300`}
          >
            {activePreview ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121212]">
                {/* PDF Header Controls */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black border-b-2 border-white/10 z-10 flex-shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                      onClick={() => setActivePreview(null)}
                      className="px-3 py-1.5 rounded-full border border-white/30 text-[10px] sm:text-xs font-black uppercase text-white hover:bg-[#00F5A0] hover:text-black transition-all cursor-pointer flex-shrink-0"
                    >
                      ← Back
                    </button>
                    <span className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider truncate">
                      {activePreview.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDownload(activePreview)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#00F5A0] text-black font-black text-[10px] sm:text-xs rounded-full border border-black hover:scale-105 transition-all cursor-pointer"
                    >
                      <FaDownload className="w-3 h-3" /> Download
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                    >
                      <IoClose className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Resume In-Modal Viewer */}
                <div className="flex-1 w-full bg-[#1A1C23] text-white p-4 sm:p-6 overflow-y-auto flex flex-col gap-5">
                  <div className="bg-[#242731] border border-white/10 rounded-2xl p-5 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#00F5A0] block mb-1">
                          ROHIT DUBEY • {activePreview.role.toUpperCase()}
                        </span>
                        <h4 className="text-lg font-black uppercase text-white leading-tight">
                          Executive Resume Summary
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDownload(activePreview)}
                        className="px-4 py-2 rounded-xl bg-[#00F5A0] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 w-fit cursor-pointer"
                      >
                        <FaDownload /> Get Official PDF
                      </button>
                    </div>

                    <p className="text-white/80 text-xs font-medium leading-relaxed mb-4">
                      {activePreview.summary}
                    </p>

                    <div>
                      <span className="text-[9px] font-black uppercase text-white/40 tracking-wider block mb-2">
                        Core Competencies &amp; Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activePreview.skills.map((skill) => (
                          <span key={skill} className="text-[9.5px] font-black uppercase bg-[#0D9488]/20 text-[#00F5A0] border border-[#0D9488]/40 px-2.5 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Embedded PDF iframe fallback */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#121212] min-h-[360px] flex-1">
                    <iframe
                      src={`${activePreview.fileUrl}#toolbar=0&navpanes=0&view=FitH`}
                      title={`${activePreview.role} Resume PDF`}
                      className="w-full h-full min-h-[400px] border-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b-2 border-black bg-[#0D9488]/5">
                  <div>
                    <span className="inline-block bg-[#00F5A0] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1 border border-black">
                      RECRUITER HUB
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-black tracking-tight uppercase" style={{ fontFamily: '"Arial Black", sans-serif' }}>
                      CHOOSE RESUME
                    </h3>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <IoClose className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Resume Version Cards */}
                <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col gap-3">
                  {resumeVersions.map((version) => (
                    <div
                      key={version.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border-2 border-black/10 hover:border-black bg-[#F8F9FA] hover:bg-white transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
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
                          className="flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#00F5A0] hover:bg-black border-2 border-black text-black hover:text-white rounded-full flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
                        >
                          <FaDownload className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3.5 bg-[#F8F9FA] border-t-2 border-black text-center text-black/50 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                  Rohit Dubey • Engineering Portfolio 2026
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
