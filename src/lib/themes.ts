/**
 * Theme definitions — every CSS custom property used across the entire portfolio.
 * Add new themes here. All components read these vars, so switching is instant.
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
  // 1. CYBER GREEN  (default — current build)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'default',
    name: 'Cyber Green',
    subtitle: 'DEFAULT · CURRENT BUILD',
    group: 'ACTIVE',
    swatches: ['#031714', '#00F5A0', '#0D9488'],
    vars: {
      // ── core backgrounds ──────────────────────────────────────────────────
      '--c-bg':              '#031714',   // hero, about, dark sections
      '--c-bg-alt':          '#042420',   // slightly lighter dark panels
      '--c-bg-surface':      '#F8F9FA',   // light card / white sections
      '--c-bg-page':         '#FFFFFF',   // page root background
      '--c-bg-footer':       '#000000',   // footer

      // ── accent / brand ────────────────────────────────────────────────────
      '--c-accent':          '#00F5A0',   // primary accent (badges, cta, highlights)
      '--c-accent-2':        '#0D9488',   // secondary teal
      '--c-accent-text':     '#000000',   // text ON accent bg

      // ── text ──────────────────────────────────────────────────────────────
      '--c-text':            '#FFFFFF',   // text on dark bg
      '--c-text-muted':      'rgba(255,255,255,0.55)',
      '--c-text-dark':       '#0A0A0A',   // text on light bg
      '--c-text-dark-muted': 'rgba(0,0,0,0.45)',

      // ── borders / shadows ─────────────────────────────────────────────────
      '--c-border':          'rgba(0,245,160,0.18)',
      '--c-border-dark':     'rgba(0,0,0,0.08)',
      '--c-shadow':          '#000000',   // brutalist offset shadow colour

      // ── ticker ────────────────────────────────────────────────────────────
      '--c-ticker-bg':       '#031714',
      '--c-ticker-text':     '#00F5A0',
      '--c-ticker-border':   'rgba(0,245,160,0.2)',

      // ── nav / bubble menu ─────────────────────────────────────────────────
      '--c-nav-bg':          '#ffffff',
      '--c-nav-content':     '#031714',

      // ── skill/detail panel ────────────────────────────────────────────────
      '--c-panel-bg':        '#1E2026',
      '--c-panel-text':      '#FFFFFF',

      // ── scrollbar ─────────────────────────────────────────────────────────
      '--scrollbar-track':   '#031714',
      '--scrollbar-thumb':   '#00F5A0',

      // ── preloader ─────────────────────────────────────────────────────────
      '--c-preloader-bg':    '#031714',
      '--c-preloader-text':  '#00F5A0',

      // ── page transition curtain ───────────────────────────────────────────
      '--c-curtain-1':       '#00F5A0',
      '--c-curtain-2':       '#031714',

      // ── hero text shadow ──────────────────────────────────────────────────
      '--c-hero-shadow':     '#021412',

      // ── grid overlay ──────────────────────────────────────────────────────
      '--c-grid':            'rgba(0,245,160,0.07)',

      // ── selection ─────────────────────────────────────────────────────────
      '--c-selection-bg':    '#00F5A0',
      '--c-selection-text':  '#000000',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. STAR WARS  (deep space · crawl yellow · neobrutalist)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'starwars',
    name: 'Force (Under Construction)',
    subtitle: 'JEDI & SITH THEME MODES · WORK IN PROGRESS',
    group: 'GALAXY',
    family: 'galaxy',
    crawlAccent: '#FFE81F',
    swatches: ['#05060F', '#FFE81F', '#4FC3F7'],
    tickerText: 'MAY THE FORCE BE WITH YOU ✦ EPISODE I ✦ THE PHANTOM CODEBASE ✦ BUILD • SHIP • ITERATE ✦ ',
    vars: {
      // ── backgrounds ──────────────────────────────────────────────────────
      '--c-bg':              '#05060F',   // deep space
      '--c-bg-alt':          '#0D0E1F',   // slightly lighter space
      '--c-bg-surface':      '#F0EFE6',   // aged parchment (light sections)
      '--c-bg-page':         '#F0EFE6',   // page root
      '--c-bg-footer':       '#02030A',   // void black footer

      // ── accent ───────────────────────────────────────────────────────────
      '--c-accent':          '#FFE81F',   // crawl yellow
      '--c-accent-2':        '#4FC3F7',   // lightsaber blue
      '--c-accent-text':     '#000000',   // text ON yellow bg

      // ── text ─────────────────────────────────────────────────────────────
      '--c-text':            '#E8E6D0',   // warm starfield white
      '--c-text-muted':      'rgba(232,230,208,0.5)',
      '--c-text-dark':       '#1A1B2E',   // dark text on parchment
      '--c-text-dark-muted': 'rgba(26,27,46,0.5)',

      // ── borders / shadows ────────────────────────────────────────────────
      '--c-border':          'rgba(255,232,31,0.2)',
      '--c-border-dark':     'rgba(26,27,46,0.12)',
      '--c-shadow':          '#1A1B2E',   // navy shadow — neobrutalist

      // ── ticker ───────────────────────────────────────────────────────────
      '--c-ticker-bg':       '#02030A',
      '--c-ticker-text':     '#FFE81F',
      '--c-ticker-border':   'rgba(255,232,31,0.25)',

      // ── nav ──────────────────────────────────────────────────────────────
      '--c-nav-bg':          '#F0EFE6',
      '--c-nav-content':     '#05060F',

      // ── skill panel ──────────────────────────────────────────────────────
      '--c-panel-bg':        '#0D0E1F',
      '--c-panel-text':      '#E8E6D0',

      // ── scrollbar ────────────────────────────────────────────────────────
      '--scrollbar-track':   '#05060F',
      '--scrollbar-thumb':   '#FFE81F',

      // ── preloader ────────────────────────────────────────────────────────
      '--c-preloader-bg':    '#05060F',
      '--c-preloader-text':  '#FFE81F',

      // ── page transition curtain ──────────────────────────────────────────
      '--c-curtain-1':       '#FFE81F',   // yellow sweeps first
      '--c-curtain-2':       '#05060F',   // space black covers

      // ── hero text shadow ─────────────────────────────────────────────────
      '--c-hero-shadow':     '#0A0B1A',

      // ── grid overlay ─────────────────────────────────────────────────────
      '--c-grid':            'rgba(255,232,31,0.05)',

      // ── selection ────────────────────────────────────────────────────────
      '--c-selection-bg':    '#FFE81F',
      '--c-selection-text':  '#000000',

      // ── Star Wars hero colors ────────────────────────────────────────────
      '--sw-yellow':         '#FFE81F',
      '--sw-saber':          '#4FC3F7',    // lightsaber blue
      '--sw-bg':             '#05060F',    // space black
      '--sw-white':          '#E8E6D0',    // warm white
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. SITH  (Star Wars dark side · void black · Sith red)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sith',
    name: 'Sith',
    subtitle: 'THE DARK SIDE · UNLIMITED POWER',
    group: 'GALAXY',
    family: 'galaxy',
    crawlAccent: '#FF2020',
    swatches: ['#0A0000', '#FF2020', '#8B0000'],
    tickerText: 'UNLIMITED POWER ✦ THE DARK SIDE IS STRONG ✦ FEAR · ANGER · HATE · SUFFERING ✦ DO OR DO NOT ✦ ',
    vars: {
      '--c-bg':              '#0A0000',
      '--c-bg-alt':          '#120000',
      '--c-bg-surface':      '#1A0000',
      '--c-bg-page':         '#0A0000',
      '--c-bg-footer':       '#050000',

      '--c-accent':          '#FF2020',   // Sith red
      '--c-accent-2':        '#8B0000',   // deep blood red
      '--c-accent-text':     '#FFFFFF',

      '--c-text':            '#F0D0D0',   // warm red-tinted white
      '--c-text-muted':      'rgba(240,208,208,0.5)',
      '--c-text-dark':       '#F0D0D0',
      '--c-text-dark-muted': 'rgba(240,208,208,0.4)',

      '--c-border':          'rgba(255,32,32,0.2)',
      '--c-border-dark':     'rgba(255,32,32,0.1)',
      '--c-shadow':          '#FF2020',   // red brutalist shadow

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

      // ── Star Wars hero colors (Sith version) ──────────────────────────────
      '--sw-yellow':         '#FF2020',    // replace yellow with Sith red
      '--sw-saber':          '#FF2020',    // lightsaber red
      '--sw-bg':             '#0A0000',    // darker void black
      '--sw-white':          '#F0D0D0',    // red-tinted white
    },
  },

];

export const DEFAULT_THEME_ID = 'default';

/** Returns true if two themes belong to the same family (e.g. starwars ↔ sith) */
export function isSameFamily(a: Theme, b: Theme): boolean {
  if (!a.family || !b.family) return false;
  return a.family === b.family;
}
