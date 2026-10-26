import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  model: string;
  modelAlt?: string;
  modelClass?: string;
  className?: string;
};

/** Reveal-on-scroll hook: adds data-visible once the element enters view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/** A screen card that tilts in 3D with the mouse; the model pops out in front. Touch devices get a static, clean card. */
export function Screen3D({ children, model, modelAlt = "", modelClass = "", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: wrap, visible } = useReveal<HTMLDivElement>();
  const [t, setT] = useState({ x: 0, y: 0, active: false });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5, active: true });
  };

  return (
    <div ref={wrap} data-visible={visible} className={`reveal [perspective:1400px] ${className}`}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setT({ x: 0, y: 0, active: false })}
        className="relative aspect-[16/10] rounded-2xl shadow-screen transition-[transform,box-shadow] duration-500 ease-out [transform-style:preserve-3d] md:rounded-3xl"
        style={{ transform: `rotateY(${t.x * 14}deg) rotateX(${-t.y * 10}deg)`, boxShadow: t.active ? "var(--shadow-glow)" : undefined }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">{children}</div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 md:rounded-3xl"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(circle at ${(t.x + 0.5) * 100}% ${(t.y + 0.5) * 100}%, oklch(1 0 0 / 14%), transparent 45%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${t.x * -28}px, ${t.y * -28}px, 90px)` }}
        >
          <img
            src={model}
            alt={modelAlt}
            loading="lazy"
            width={1024}
            height={1024}
            className={`absolute animate-drift drop-shadow-[0_30px_35px_rgba(0,0,0,0.5)] ${modelClass}`}
          />
        </div>
      </div>
    </div>
  );
}
