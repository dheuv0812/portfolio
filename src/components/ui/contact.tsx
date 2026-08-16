import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaCopy, FaCheck, FaPaperPlane, FaClock, FaMapMarkerAlt, FaBolt, FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Grainient } from '@/components/ui/Grainient';
import { trackContactFormSubmit } from '@/lib/analytics';

const TOPICS = [
  { id: 'freelance', label: '⚡ Freelance Project' },
  { id: 'fulltime', label: '🚀 Full-time Role' },
  { id: 'collab', label: '🤖 AI & Web Integration' },
  { id: 'other', label: '💬 General Inquiry' },
];

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'freelance', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rohitdubey39005@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch('https://formspree.io/f/mqerqbyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        trackContactFormSubmit();
        setSubmitting(false);
        setIsSuccess(true);
        setForm({ name: '', email: '', subject: 'freelance', message: '' });
        setTimeout(() => {
          setSent(true);
          setIsSuccess(false);
        }, 2000);
        setTimeout(() => setSent(false), 7000);
      } else {
        setSubmitting(false);
        const data = await response.json();
        if (data.errors) {
          setError(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setError('Failed to submit form. Please try again.');
        }
      }
    } catch {
      setSubmitting(false);
      setError('Connection error. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#031714] w-full py-16 md:py-24 px-4 sm:px-6 md:px-20 lg:px-28 relative overflow-hidden z-30 min-h-screen flex items-center border-t-2 border-black/10"
    >
      {/* WebGL Grainient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Grainient
          color1="#00F5A0"
          color2="#0D9488"
          color3="#000000"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#031714]/40 via-transparent to-[#031714]/40 pointer-events-none" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="inline-block bg-[#00F5A0] text-black font-black text-[10px] px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black shadow-[3px_3px_0_#000]">
              GET IN TOUCH
            </span>
            <h2
              className="text-[clamp(2.5rem,6vw,72px)] font-black leading-none tracking-tighter text-white uppercase"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: '2px 2px 0 #000' }}
            >
              LET'S BUILD<br />
              <span className="text-white/40" style={{ textShadow: '2px 2px 0 #000' }}>TOGETHER</span>
            </h2>
          </div>
          <p className="text-white/80 text-xs max-w-sm font-bold leading-relaxed mb-1">
            Have a project in mind, need full-stack or AI integration expertise, or want to hire for your engineering team? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

          {/* Left Info Column — Premium Redesigned Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 border-[3px] border-black rounded-[2.5rem] p-6 bg-white shadow-[8px_8px_0_#000] flex flex-col justify-between gap-6"
          >
            {/* Direct Channel: Email Card with Quick Copy */}
            <div className="bg-[#042420] text-white p-5 rounded-[1.8rem] border-2 border-black relative overflow-hidden group shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#00F5A0] bg-black/40 px-3 py-1 rounded-full border border-[#00F5A0]/30">
                  <FaEnvelope className="w-3 h-3 text-[#00F5A0]" /> DIRECT EMAIL CHANNEL
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-pulse" />
              </div>
              
              <p className="font-black text-sm md:text-base text-white tracking-tight break-all mb-4 select-all">
                rohitdubey39005@gmail.com
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#00F5A0] text-black font-black text-xs px-4 py-2.5 rounded-xl border border-black hover:bg-white transition-all duration-200 shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5 text-black" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3.5 h-3.5 text-black" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>
                <a
                  href="mailto:rohitdubey39005@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/20 flex items-center justify-center text-white transition-colors"
                  title="Open in Mail app"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Live Telemetry & Location Card */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F9FA] border-2 border-black/5 hover:border-black/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#00F5A0] border border-black/10 flex items-center justify-center text-black flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-black/40">LOCATION</p>
                    <p className="font-extrabold text-xs text-black">India • Working Worldwide</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-1 rounded-full uppercase">
                  Remote
                </span>
              </div>

              {/* Live IST Time */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F9FA] border-2 border-black/5 hover:border-black/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-[#00F5A0] flex-shrink-0">
                    <FaClock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-black/40">CURRENT LOCAL TIME</p>
                    <p className="font-extrabold text-xs text-black font-mono">{currentTime || 'IST (UTC+5:30)'}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[8px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> IST
                </span>
              </div>

              {/* Response Time Guarantee */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F9FA] border-2 border-black/5">
                <div className="w-8 h-8 rounded-xl bg-[#042420] text-white flex items-center justify-center flex-shrink-0">
                  <FaBolt className="w-4 h-4 text-[#00F5A0]" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-black/40">GUARANTEED RESPONSE</p>
                  <p className="font-extrabold text-xs text-black">Within 24 Hours</p>
                </div>
              </div>
            </div>

            {/* Social Network Hub Pills */}
            <div className="border-t border-black/10 pt-4">
              <p className="text-[8px] font-black uppercase tracking-widest text-black/40 mb-2.5 text-center">
                SOCIAL CONNECTIVITY
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {[
                  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/anakinskywalker0903' },
                  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/rohit--dubey03/' },
                  { label: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/918777453162' },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-black text-[10px] font-black bg-white text-black hover:bg-[#00F5A0] hover:shadow-[3px_3px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right Form Column — Brutalist High-Interactivity Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white border-[3px] border-black rounded-[2.5rem] p-6 md:p-8 shadow-[8px_8px_0_#000] flex flex-col justify-between"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                <div className="w-20 h-20 bg-[#00F5A0] rounded-full flex items-center justify-center text-3xl border-3 border-black shadow-[4px_4px_0_#000]">
                  ✓
                </div>
                <h3 className="font-black text-2xl text-black text-center uppercase tracking-tight">Message Received!</h3>
                <p className="text-black/60 text-xs text-center font-medium max-w-sm leading-relaxed">
                  Thank you for reaching out. I've received your details and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Topic Selector Pills */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-2">
                    SELECT INQUIRY TYPE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPICS.map(topic => (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => setForm({ ...form, subject: topic.id })}
                        className={`px-3 py-2.5 rounded-xl border-2 text-[10px] font-black uppercase text-left transition-all cursor-pointer ${
                          form.subject === topic.id
                            ? 'bg-[#042420] text-[#00F5A0] border-black shadow-[2px_2px_0_#00F5A0]'
                            : 'bg-[#F8F9FA] text-black border-black/10 hover:border-black'
                        }`}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-1">YOUR NAME</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#F8F9FA] focus:bg-white rounded-xl px-4 py-3 text-xs font-bold text-black border-2 border-black/10 focus:border-[#0D9488] focus:shadow-[3px_3px_0_#000] outline-none transition-all placeholder:text-black/30"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-1">EMAIL ADDRESS</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full bg-[#F8F9FA] focus:bg-white rounded-xl px-4 py-3 text-xs font-bold text-black border-2 border-black/10 focus:border-[#0D9488] focus:shadow-[3px_3px_0_#000] outline-none transition-all placeholder:text-black/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-1">PROJECT DETAILS / MESSAGE</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your scope, timelines, goals, or questions..."
                    className="w-full bg-[#F8F9FA] focus:bg-white rounded-xl px-4 py-3 text-xs font-bold text-black border-2 border-black/10 focus:border-[#0D9488] focus:shadow-[3px_3px_0_#000] outline-none transition-all resize-none placeholder:text-black/30"
                  />
                </div>

                {error && (
                  <p className="text-red-600 font-black text-xs uppercase tracking-wider text-center bg-red-50 py-2 rounded-lg border border-red-200">
                    ⚠️ {error}
                  </p>
                )}

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#042420] text-[#00F5A0] font-black text-xs px-8 py-3.5 rounded-2xl border-2 border-black hover:bg-[#00F5A0] hover:text-black shadow-[4px_4px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    {submitting ? (
                      <span>SENDING MESSAGE...</span>
                    ) : isSuccess ? (
                      <span>SENT!</span>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
