 import { useEffect, useRef } from "react";

export const GridBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const tile = 56; // px

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const speed = 0.03; // px per frame; very subtle

    const step = () => {
      x = (x + speed) % tile;
      y = (y + speed) % tile;
      if (gridRef.current) {
        gridRef.current.style.backgroundPosition = `${x}px ${y}px`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.28) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.28) 1px, transparent 1px)
          `,
          backgroundSize: `${tile}px ${tile}px`,
          opacity: 0.22,
          willChange: "background-position",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% -10%, hsl(195 100% 50% / 0.08), transparent 60%), radial-gradient(1000px 600px at 80% 120%, hsl(250 70% 60% / 0.05), transparent 60%)",
          mixBlendMode: "screen",
          opacity: 0.45,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

