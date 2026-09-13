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
  // 1. CRIMSON & COBALT (Default — Signature Crimson Red & Cobalt Blue)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'default',
    name: 'Crimson & Cobalt',
    subtitle: 'DEFAULT · CRIMSON RED & COBALT BLUE',
    group: 'ACTIVE',
    swatches: ['#070A13', '#FF2A55', '#2563EB'],
    crawlAccent: '#FF2A55',
    tickerText: 'FULL-STACK DEVELOPER ✦ DHRUV SINGH ✦ TORONTO, CANADA ✦ BUILD • SHIP • ITERATE ✦ ',
    vars: {
      '--c-bg':              '#070A13',
      '--c-bg-alt':          '#0D1322',
      '--c-bg-surface':      '#F8FAFC',
      '--c-bg-page':         '#FFFFFF',
      '--c-bg-footer':       '#03060D',
      '--c-accent':          '#FF2A55',
      '--c-accent-2':        '#2563EB',
      '--c-accent-text':     '#FFFFFF',
      '--c-text':            '#F8FAFC',
      '--c-text-muted':      'rgba(248,250,252,0.65)',
      '--c-text-dark':       '#090D16',
      '--c-text-dark-muted': 'rgba(9,13,22,0.5)',
      '--c-border':          'rgba(255,42,85,0.22)',
      '--c-border-dark':     'rgba(9,13,22,0.1)',
      '--c-shadow':          '#070A13',
      '--c-ticker-bg':       '#070A13',
      '--c-ticker-text':     '#FF2A55',
      '--c-ticker-border':   'rgba(255,42,85,0.25)',
      '--c-nav-bg':          '#070A13',
      '--c-nav-content':     '#FF2A55',
      '--c-panel-bg':        '#0F172A',
      '--c-panel-text':      '#F8FAFC',
      '--scrollbar-track':   '#070A13',
      '--scrollbar-thumb':   '#FF2A55',
      '--c-preloader-bg':    '#070A13',
      '--c-preloader-text':  '#FF2A55',
      '--c-curtain-1':       '#FF2A55',
      '--c-curtain-2':       '#2563EB',
      '--c-hero-shadow':     '#04060C',
      '--c-grid':            'rgba(37,99,235,0.08)',
      '--c-selection-bg':    '#FF2A55',
      '--c-selection-text':  '#FFFFFF',
      '--c-gradient-primary': 'linear-gradient(135deg, #FF2A55 0%, #2563EB 100%)',
      '--c-gradient-hover':   'linear-gradient(135deg, #FF1744 0%, #1D4ED8 100%)',
      '--c-gradient-subtle':  'linear-gradient(135deg, rgba(255,42,85,0.08) 0%, rgba(37,99,235,0.08) 100%)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. FORCE THEME (Deep Space · Lightsaber Blue & Sith Red accents)
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
