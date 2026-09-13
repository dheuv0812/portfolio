/**
 * Theme definitions — every CSS custom property used across the entire portfolio.
 * Red & Blue (Crimson & Electric Blue) is the signature primary default theme.
 */

export interface Theme {
  id: string;
  name: string;
  subtitle: string;
  group: string;
  /** Themes in the same family switch without triggering the preloader */
  family?: string;
  swatches: string[];
  tickerText?: string;
  /** accent colour passed to the crawl preloader */
  crawlAccent?: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. CRIMSON & COBALT (Default — Signature Red & Blue Theme)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'default',
    name: 'Crimson & Cobalt',
    subtitle: 'DEFAULT · VIBRANT RED & BLUE',
    group: 'ACTIVE',
    swatches: ['#070A13', '#FF2A55', '#2563EB'],
    crawlAccent: '#FF2A55',
    tickerText: 'FULL-STACK DEVELOPER ✦ DHRUV SINGH ✦ TORONTO, CANADA ✦ BUILD • SHIP • ITERATE ✦ ',
    vars: {
      // ── core backgrounds ──────────────────────────────────────────────────
      '--c-bg':              '#070A13',   // hero, about, dark sections (rich midnight navy)
      '--c-bg-alt':          '#0D1322',   // slightly lighter dark panels
      '--c-bg-surface':      '#F8FAFC',   // light card / clean slate sections
      '--c-bg-page':         '#FFFFFF',   // page root background
      '--c-bg-footer':       '#03060D',   // void navy footer

      // ── accent / brand ────────────────────────────────────────────────────
      '--c-accent':          '#FF2A55',   // primary vibrant crimson red
      '--c-accent-2':        '#2563EB',   // secondary electric navy / cobalt blue
      '--c-accent-text':     '#FFFFFF',   // text ON red accent

      // ── text ──────────────────────────────────────────────────────────────
      '--c-text':            '#F8FAFC',   // text on dark bg
      '--c-text-muted':      'rgba(248,250,252,0.65)',
      '--c-text-dark':       '#090D16',   // text on light bg
      '--c-text-dark-muted': 'rgba(9,13,22,0.5)',

      // ── borders / shadows ─────────────────────────────────────────────────
      '--c-border':          'rgba(255,42,85,0.22)',
      '--c-border-dark':     'rgba(9,13,22,0.1)',
      '--c-shadow':          '#070A13',   // brutalist offset shadow colour

      // ── ticker ────────────────────────────────────────────────────────────
      '--c-ticker-bg':       '#070A13',
      '--c-ticker-text':     '#FF2A55',
      '--c-ticker-border':   'rgba(255,42,85,0.25)',

      // ── nav / bubble menu ─────────────────────────────────────────────────
      '--c-nav-bg':          '#FFFFFF',
      '--c-nav-content':     '#070A13',

      // ── skill/detail panel ────────────────────────────────────────────────
      '--c-panel-bg':        '#0F172A',
      '--c-panel-text':      '#F8FAFC',

      // ── scrollbar ─────────────────────────────────────────────────────────
      '--scrollbar-track':   '#070A13',
      '--scrollbar-thumb':   '#FF2A55',

      // ── preloader ─────────────────────────────────────────────────────────
      '--c-preloader-bg':    '#070A13',
      '--c-preloader-text':  '#FF2A55',

      // ── page transition curtain ───────────────────────────────────────────
      '--c-curtain-1':       '#FF2A55',
      '--c-curtain-2':       '#2563EB',

      // ── hero text shadow ──────────────────────────────────────────────────
      '--c-hero-shadow':     '#04060C',

      // ── grid overlay ──────────────────────────────────────────────────────
      '--c-grid':            'rgba(37,99,235,0.08)',

      // ── selection ─────────────────────────────────────────────────────────
      '--c-selection-bg':    '#FF2A55',
      '--c-selection-text':  '#FFFFFF',

      // ── gradients ─────────────────────────────────────────────────────────
      '--c-gradient-primary': 'linear-gradient(135deg, #FF2A55 0%, #2563EB 100%)',
      '--c-gradient-hover':   'linear-gradient(135deg, #FF1744 0%, #1D4ED8 100%)',
      '--c-gradient-subtle':  'linear-gradient(135deg, rgba(255,42,85,0.08) 0%, rgba(37,99,235,0.08) 100%)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. MIDNIGHT ELECTRIC (Full Dark Canvas with Red & Electric Cyan/Blue)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'midnight-electric',
    name: 'Midnight Azure',
    subtitle: 'DARK CANVAS · ELECTRIC BLUE & RED',
    group: 'ACTIVE',
    swatches: ['#0A0F1D', '#38BDF8', '#FF2A55'],
    crawlAccent: '#38BDF8',
    tickerText: 'DHRUV SINGH ✦ COMPUTER ENGINEERING ✦ TORONTO METROPOLITAN UNIVERSITY ✦ ',
    vars: {
      '--c-bg':              '#0A0F1D',
      '--c-bg-alt':          '#111827',
      '--c-bg-surface':      '#131D33',
      '--c-bg-page':         '#0A0F1D',
      '--c-bg-footer':       '#050811',

      '--c-accent':          '#38BDF8',
      '--c-accent-2':        '#FF2A55',
      '--c-accent-text':     '#000000',

      '--c-text':            '#F8FAFC',
      '--c-text-muted':      'rgba(248,250,252,0.65)',
      '--c-text-dark':       '#F8FAFC',
      '--c-text-dark-muted': 'rgba(248,250,252,0.5)',

      '--c-border':          'rgba(56,189,248,0.25)',
      '--c-border-dark':     'rgba(255,42,85,0.2)',
      '--c-shadow':          '#FF2A55',

      '--c-ticker-bg':       '#050811',
      '--c-ticker-text':     '#38BDF8',
      '--c-ticker-border':   'rgba(56,189,248,0.25)',

      '--c-nav-bg':          '#111827',
      '--c-nav-content':     '#38BDF8',

      '--c-panel-bg':        '#111827',
      '--c-panel-text':      '#F8FAFC',

      '--scrollbar-track':   '#0A0F1D',
      '--scrollbar-thumb':   '#38BDF8',

      '--c-preloader-bg':    '#0A0F1D',
      '--c-preloader-text':  '#38BDF8',

      '--c-curtain-1':       '#38BDF8',
      '--c-curtain-2':       '#FF2A55',

      '--c-hero-shadow':     '#050811',
      '--c-grid':            'rgba(56,189,248,0.06)',

      '--c-selection-bg':    '#38BDF8',
      '--c-selection-text':  '#000000',

      '--c-gradient-primary': 'linear-gradient(135deg, #FF2A55 0%, #38BDF8 100%)',
      '--c-gradient-hover':   'linear-gradient(135deg, #FF1744 0%, #0284C7 100%)',
      '--c-gradient-subtle':  'linear-gradient(135deg, rgba(255,42,85,0.12) 0%, rgba(56,189,248,0.12) 100%)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. FORCE THEME (Deep Space · Lightsaber Blue & Sith Red accents)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'starwars',
    name: 'Force (Galactic)',
    subtitle: 'JEDI & SITH THEME MODES',
    group: 'GALAXY',
    family: 'galaxy',
    crawlAccent: '#4FC3F7',
    swatches: ['#05060F', '#4FC3F7', '#FF2A55'],
    tickerText: 'MAY THE FORCE BE WITH YOU ✦ DHRUV SINGH ✦ COMPUTER ENGINEERING ✦ BUILD • SHIP • ITERATE ✦ ',
    vars: {
      '--c-bg':              '#05060F',
      '--c-bg-alt':          '#0D0E1F',
      '--c-bg-surface':      '#F0EFE6',
      '--c-bg-page':         '#F0EFE6',
      '--c-bg-footer':       '#02030A',

      '--c-accent':          '#4FC3F7',
      '--c-accent-2':        '#FF2A55',
      '--c-accent-text':     '#000000',

      '--c-text':            '#E8E6D0',
      '--c-text-muted':      'rgba(232,230,208,0.5)',
      '--c-text-dark':       '#1A1B2E',
      '--c-text-dark-muted': 'rgba(26,27,46,0.5)',

      '--c-border':          'rgba(79,195,247,0.25)',
      '--c-border-dark':     'rgba(26,27,46,0.12)',
      '--c-shadow':          '#1A1B2E',

      '--c-ticker-bg':       '#02030A',
      '--c-ticker-text':     '#4FC3F7',
      '--c-ticker-border':   'rgba(79,195,247,0.25)',

      '--c-nav-bg':          '#F0EFE6',
      '--c-nav-content':     '#05060F',

      '--c-panel-bg':        '#0D0E1F',
      '--c-panel-text':      '#E8E6D0',

      '--scrollbar-track':   '#05060F',
      '--scrollbar-thumb':   '#4FC3F7',

      '--c-preloader-bg':    '#05060F',
      '--c-preloader-text':  '#4FC3F7',

      '--c-curtain-1':       '#4FC3F7',
      '--c-curtain-2':       '#FF2A55',

      '--c-hero-shadow':     '#0A0B1A',
      '--c-grid':            'rgba(79,195,247,0.06)',

      '--c-selection-bg':    '#4FC3F7',
      '--c-selection-text':  '#000000',

      '--sw-yellow':         '#4FC3F7',
      '--sw-saber':          '#4FC3F7',
      '--sw-bg':             '#05060F',
      '--sw-white':          '#E8E6D0',
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 4. SITH (Sith Crimson Red & Void Black)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sith',
    name: 'Sith',
    subtitle: 'THE DARK SIDE · CRIMSON POWER',
    group: 'GALAXY',
    family: 'galaxy',
    crawlAccent: '#FF2020',
    swatches: ['#0A0000', '#FF2020', '#2563EB'],
    tickerText: 'UNLIMITED POWER ✦ DHRUV SINGH ✦ FULL-STACK & HARDWARE ✦ DO OR DO NOT ✦ ',
    vars: {
      '--c-bg':              '#0A0000',
      '--c-bg-alt':          '#120000',
      '--c-bg-surface':      '#1A0000',
      '--c-bg-page':         '#0A0000',
      '--c-bg-footer':       '#050000',

      '--c-accent':          '#FF2020',
      '--c-accent-2':        '#2563EB',
      '--c-accent-text':     '#FFFFFF',

      '--c-text':            '#F0D0D0',
      '--c-text-muted':      'rgba(240,208,208,0.5)',
      '--c-text-dark':       '#F0D0D0',
      '--c-text-dark-muted': 'rgba(240,208,208,0.4)',

      '--c-border':          'rgba(255,32,32,0.25)',
      '--c-border-dark':     'rgba(255,32,32,0.1)',
      '--c-shadow':          '#FF2020',

      '--c-ticker-bg':       '#050000',
      '--c-ticker-text':     '#FF2020',
      '--c-ticker-border':   'rgba(255,32,32,0.25)',

      '--c-nav-bg':          '#0A0000',
      '--c-nav-content':     '#FF2020',

      '--c-panel-bg':        '#120000',
      '--c-panel-text':      '#F0D0D0',

      '--scrollbar-track':   '#0A0000',
      '--scrollbar-thumb':   '#FF2020',

      '--c-preloader-bg':    '#0A0000',
      '--c-preloader-text':  '#FF2020',

      '--c-curtain-1':       '#FF2020',
      '--c-curtain-2':       '#0A0000',

      '--c-hero-shadow':     '#1A0000',
      '--c-grid':            'rgba(255,32,32,0.05)',

      '--c-selection-bg':    '#FF2020',
      '--c-selection-text':  '#000000',

      '--sw-yellow':         '#FF2020',
      '--sw-saber':          '#FF2020',
      '--sw-bg':             '#0A0000',
      '--sw-white':          '#F0D0D0',
    },
  },
];

export const DEFAULT_THEME_ID = 'default';

/** Returns true if two themes belong to the same family (e.g. starwars ↔ sith) */
export function isSameFamily(a: Theme, b: Theme): boolean {
  if (!a.family || !b.family) return false;
  return a.family === b.family;
}
