import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '@/lib/ThemeContext';

const GITHUB_USERNAME  = 'dheuv0812';
const LEETCODE_USERNAME = 'dheuv0812';

/* ── LeetCode data via public GraphQL proxy ─────────────────────────────── */
interface LCStats {
  totalSolved:  number;
  easySolved:   number;
  mediumSolved: number;
  hardSolved:   number;
  ranking:      number;
  totalQuestions: number;
}

function useLeetCodeStats() {
  const [data, setData]   = useState<LCStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Public LeetCode stats proxy — no API key needed
    fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d) => {
        setData({
          totalSolved:    d.totalSolved    ?? 0,
          easySolved:     d.easySolved     ?? 0,
          mediumSolved:   d.mediumSolved   ?? 0,
          hardSolved:     d.hardSolved     ?? 0,
          ranking:        d.ranking        ?? 0,
          totalQuestions: d.totalQuestions ?? 3000,
        });
      })
      .catch(() => setError(true));
  }, []);

  return { data, error };
}

/* ── Radial progress ring ─────────────────────────────────────────────────── */
function Ring({
  value, max, label, sublabel, colour,
}: {
  value: number; max: number; label: string; sublabel: string; colour: string;
}) {
  const r   = 36;
  const circ = 2 * Math.PI * r;
  const pct  = Math.min(value / max, 1);
  const dash = pct * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0 -rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="8" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke={colour} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="text-center z-10">
          <span className="block text-xl font-black text-black leading-none">{value}</span>
          <span className="block text-[8px] font-black uppercase tracking-wider text-black/40">{sublabel}</span>
        </div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-black/60">{label}</span>
    </div>
  );
}

/* ── Main exported section ─────────────────────────────────────────────────── */
export function CodingStats() {
  const { activeTheme } = useTheme();
  const accent  = activeTheme.vars['--c-accent'];
  const accent2 = activeTheme.vars['--c-accent-2'];
  const bg      = activeTheme.vars['--c-bg'];
  const shadow  = activeTheme.vars['--c-shadow'];

  const { data: lc, error: lcErr } = useLeetCodeStats();

  // Theme the GitHub calendar colours to match active skin
  const calendarTheme = {
    light: [
      'rgba(0,0,0,0.06)',
      `${accent}40`,
      `${accent}70`,
      `${accent}AA`,
      accent,
    ],
    dark: [
      'rgba(255,255,255,0.06)',
      `${accent}40`,
      `${accent}70`,
      `${accent}AA`,
      accent,
    ],
  };

  return (
    <section
      className="py-20 px-6 md:px-10 border-t-2 border-black/5 relative z-30 overflow-hidden"
      style={{ background: 'var(--c-bg-surface)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <span
              className="inline-block font-black text-xs px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase border border-black"
              style={{ background: accent, color: 'var(--c-accent-text)', boxShadow: `4px 4px 0 ${shadow}` }}
            >
              CODING ACTIVITY
            </span>
            <h2
              className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
            >
              CODE &amp; COMMIT
            </h2>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank" rel="noreferrer"
              className="px-5 py-2.5 font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ background: bg, color: accent, boxShadow: `3px 3px 0 ${shadow}` }}
            >
              GitHub ↗
            </a>
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              target="_blank" rel="noreferrer"
              className="px-5 py-2.5 font-black text-xs uppercase tracking-widest border-2 border-black rounded-full flex items-center gap-2 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ background: accent, color: 'var(--c-accent-text)', boxShadow: `3px 3px 0 ${shadow}` }}
            >
              LeetCode ↗
            </a>
          </div>
        </div>

        {/* Two column grid — LeetCode left, GitHub calendar right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── LeetCode Card ─────────────────────────────── */}
          <div
            className="lg:col-span-2 rounded-[2rem] p-6 border-[3px] border-black flex flex-col gap-5"
            style={{ background: bg, boxShadow: `6px 6px 0 ${shadow}` }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* LeetCode logo */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border-2 border-black font-black text-xs"
                  style={{ background: accent, color: 'var(--c-accent-text)' }}
                >
                  LC
                </div>
                <div>
                  <p className="font-black text-sm text-white leading-none">LeetCode</p>
                  <p className="text-[10px] font-bold text-white/50 mt-0.5">@{LEETCODE_USERNAME}</p>
                </div>
              </div>
              {lc && (
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Ranking</p>
                  <p className="font-black text-sm" style={{ color: accent }}>
                    #{lc.ranking.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Stats rings */}
            {lc && !lcErr ? (
              <>
                {/* Total solved progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Problems Solved</span>
                    <span className="font-black text-white text-sm">{lc.totalSolved} <span className="text-white/30 text-xs">/ {lc.totalQuestions}</span></span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(lc.totalSolved / lc.totalQuestions) * 100}%`, background: accent }}
                    />
                  </div>
                </div>

                {/* Easy / Medium / Hard rings */}
                <div className="flex items-center justify-around py-2">
                  <Ring value={lc.easySolved}   max={900}  label="Easy"   sublabel="solved" colour="#22C55E" />
                  <Ring value={lc.mediumSolved}  max={1800} label="Medium" sublabel="solved" colour="#F59E0B" />
                  <Ring value={lc.hardSolved}    max={800}  label="Hard"   sublabel="solved" colour="#EF4444" />
                </div>

                {/* Mini stat pills */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Easy',   val: lc.easySolved,   colour: '#22C55E' },
                    { label: 'Medium', val: lc.mediumSolved,  colour: '#F59E0B' },
                    { label: 'Hard',   val: lc.hardSolved,    colour: '#EF4444' },
                  ].map(s => (
                    <div
                      key={s.label}
                      className="flex-1 flex flex-col items-center py-2 rounded-xl border border-white/10"
                      style={{ background: `${s.colour}18` }}
                    >
                      <span className="font-black text-lg text-white leading-none">{s.val}</span>
                      <span className="text-[9px] font-black uppercase tracking-wider mt-0.5" style={{ color: s.colour }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : lcErr ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <p className="text-white/40 text-xs font-bold text-center">Could not load LeetCode stats.</p>
                <a
                  href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                  target="_blank" rel="noreferrer"
                  className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border-2 border-white/20 text-white/60 hover:text-white transition-colors"
                >
                  View Profile ↗
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-center py-10">
                <div
                  className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: `${accent} transparent transparent transparent` }}
                />
              </div>
            )}
          </div>

          {/* ── GitHub Contribution Calendar ──────────────── */}
          <div
            className="lg:col-span-3 rounded-[2rem] p-6 border-[3px] border-black flex flex-col gap-5"
            style={{ background: 'var(--c-bg-surface)', boxShadow: `6px 6px 0 ${shadow}` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border-2 border-black font-black text-xs"
                  style={{ background: bg, color: accent }}
                >
                  GH
                </div>
                <div>
                  <p className="font-black text-sm text-black leading-none">GitHub</p>
                  <p className="text-[10px] font-bold text-black/40 mt-0.5">@{GITHUB_USERNAME}</p>
                </div>
              </div>
              <span
                className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10"
                style={{ color: accent2, background: `${accent2}15` }}
              >
                Contribution Graph
              </span>
            </div>

            {/* Calendar */}
            <div className="overflow-x-auto pb-1">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="light"
                theme={calendarTheme}
                fontSize={11}
                blockSize={13}
                blockMargin={4}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
                style={{ fontFamily: 'monospace' }}
              />
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-black/10">
              {[
                { label: 'Profile',   val: 'Active',         colour: accent },
                { label: 'Repos',     val: 'Public',         colour: accent2 },
                { label: 'Focus',     val: 'Open Source',    colour: accent },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center py-2 rounded-xl bg-black/[0.03] border border-black/5">
                  <span className="font-black text-xs text-black leading-none" style={{ color: s.colour }}>{s.val}</span>
                  <span className="text-[8px] font-black uppercase tracking-wider text-black/40 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
