import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  model: string;
  modelClass?: string;
  className?: string;
  delay?: number;
};

/** A screen card that tilts in 3D with the mouse; the 3D model pops out in front. */
export function Screen3D({ children, model, modelClass = "", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0, active: false });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ x, y, active: true });
  };

  return (
    <div className={`animate-rise [perspective:1400px] ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setT({ x: 0, y: 0, active: false })}
        className="relative aspect-[16/10] rounded-3xl shadow-screen transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:shadow-glow"
        style={{
          transform: `rotateY(${t.x * 16}deg) rotateX(${-t.y * 12}deg) scale(${t.active ? 1.02 : 1})`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl">{children}</div>
        {/* glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(circle at ${(t.x + 0.5) * 100}% ${(t.y + 0.5) * 100}%, oklch(1 0 0 / 18%), transparent 45%)`,
          }}
        />
        {/* 3D model floating above the screen */}
        <div
          className="pointer-events-none absolute [transform-style:preserve-3d] transition-transform duration-300"
          style={{ transform: `translate3d(${t.x * -30}px, ${t.y * -30}px, 0)`, inset: 0 }}
        >
          <img
            src={model}
            alt=""
            width={1024}
            height={1024}
            className={`absolute animate-floaty drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)] ${modelClass}`}
            style={{ ["--z" as string]: "90px" }}
          />
        </div>
      </div>
    </div>
  );
}
