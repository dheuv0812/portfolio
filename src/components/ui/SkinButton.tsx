import { useTheme } from '@/lib/ThemeContext';

export function SkinButton() {
  const { activeTheme, toggleSwitcher, isSwitcherOpen } = useTheme();

  // Show clean skin name on the vertical tab button
  const displayName = (activeTheme.id === 'starwars' || activeTheme.id === 'sith')
    ? 'FORCE'
    : activeTheme.name;

  const chars = displayName.toUpperCase().split('');

  return (
    <button
      onClick={toggleSwitcher}
      aria-label="Switch site skin"
      aria-expanded={isSwitcherOpen}
      title="Switch Skin (Ctrl + K)"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 cursor-pointer select-none flex flex-col items-center py-4 px-[7px] gap-[5px] transition-all duration-300 hover:scale-105 shadow-md"
      style={{
        background: 'var(--c-bg-surface)',
        border: '2px solid var(--c-shadow, #000)',
        borderLeft: 'none',
        borderRadius: '0 10px 10px 0',
        backdropFilter: 'blur(8px)',
        boxShadow: '3px 3px 0 var(--c-shadow, #000)',
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            lineHeight: 1,
            color: char === ' '
              ? 'transparent'
              : 'var(--c-text-dark, #000)',
            display: 'block',
            transition: 'color 0.2s',
          }}
        >
          {char === ' ' ? '·' : char}
        </span>
      ))}
    </button>
  );
}
