import { useEffect, useRef } from 'react';

/**
 * Static lightsaber cursor — always points straight up, no rotation.
 * Hilt is the hotspot (grip = cursor tip for clicking).
 * System cursor is hidden via a global <style> tag so it works on
 * every child element too (CSS cursor:none cascades everywhere).
 */
export function LightsaberCursor({ colour = '#4FC3F7' }: { colour?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject a global <style> — this beats inline style.cursor on every element
    const style = document.createElement('style');
    style.id = 'sw-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      // Position so the bottom of the hilt (grip) sits at the pointer
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.getElementById('sw-cursor-hide')?.remove();
    };
  }, []);

  const bladeH  = 44;
  const bladeW  = 4;
  const handleH = 14;
  const handleW = 8;
  const totalH  = bladeH + handleH;
  const totalW  = handleW + 16;

  return (
    <div
      ref={ref}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        pointerEvents: 'none',
        zIndex:        99999,
        // Translate origin = bottom of hilt = the "grip" hotspot
        marginLeft:    -(totalW / 2),
        marginTop:     -totalH,
        willChange:    'transform',
      }}
    >
      <svg
        width={totalW}
        height={totalH + 6}
        viewBox={`0 0 ${totalW} ${totalH + 6}`}
        overflow="visible"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id="sw-glow" x="-150%" y="-20%" width="400%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sw-softglow" x="-200%" y="-30%" width="500%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Outer soft halo */}
        <rect
          x={(totalW - bladeW * 4) / 2}
          y={2}
          width={bladeW * 4}
          height={bladeH - 4}
          rx={bladeW * 2}
          fill={colour}
          opacity={0.25}
          filter="url(#sw-softglow)"
        />

        {/* Blade body — glowing */}
        <rect
          x={(totalW - bladeW) / 2}
          y={2}
          width={bladeW}
          height={bladeH - 2}
          rx={bladeW / 2}
          fill={colour}
          filter="url(#sw-glow)"
        />

        {/* White core */}
        <rect
          x={(totalW - bladeW * 0.45) / 2}
          y={4}
          width={bladeW * 0.45}
          height={bladeH - 8}
          rx={bladeW * 0.2}
          fill="#ffffff"
          opacity={0.9}
        />

        {/* Tip highlight */}
        <ellipse
          cx={totalW / 2}
          cy={3}
          rx={bladeW * 0.7}
          ry={2.5}
          fill="#ffffff"
          opacity={0.8}
        />

        {/* Hilt body */}
        <rect
          x={(totalW - handleW) / 2}
          y={bladeH}
          width={handleW}
          height={handleH}
          rx={2}
          fill="#1a1a1a"
          stroke="#444"
          strokeWidth={1}
        />

        {/* Hilt grooves */}
        {[3, 6, 9].map(offset => (
          <line
            key={offset}
            x1={(totalW - handleW) / 2}
            y1={bladeH + offset}
            x2={(totalW + handleW) / 2}
            y2={bladeH + offset}
            stroke="#555"
            strokeWidth={0.8}
          />
        ))}

        {/* Activation gem */}
        <circle
          cx={totalW / 2 + handleW * 0.25}
          cy={bladeH + 5}
          r={1.6}
          fill={colour}
          opacity={0.95}
        />
      </svg>
    </div>
  );
}
