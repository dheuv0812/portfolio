import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found | Rohit Dubey';
  }, []);

  return (
    <div className="w-full min-h-[80vh] bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] flex flex-col items-center justify-center p-6 text-center select-none pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg bg-white border-[3px] border-black rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_#000] flex flex-col items-center gap-6"
      >
        <span className="text-6xl animate-bounce">🛰️</span>
        <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase border border-black">
          ERROR 404
        </span>
        <h1
          className="text-4xl md:text-5xl font-black text-black uppercase leading-tight tracking-tighter"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
        >
          LOST IN <br />
          <span className="text-[#0D9488]">THE GRID</span>
        </h1>
        <p className="text-black/60 text-xs font-semibold leading-relaxed max-w-sm">
          The coordinate page you are looking for has been moved, deleted, or never existed in the data layer grid.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#00F5A0] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full transition-all duration-300 shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
