"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: fine) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const d = dot.current!, r = ring.current!, l = label.current!;
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const tagged = t.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = t.closest?.("a,button,[data-hover],input,select,textarea,label");
      if (tagged) {
        l.textContent = tagged.dataset.cursor || "";
        r.classList.add("is-tag");
        d.classList.add("is-tag");
      } else if (interactive) {
        r.classList.add("is-hover");
        l.textContent = "";
        r.classList.remove("is-tag");
        d.classList.remove("is-tag");
      } else {
        r.classList.remove("is-tag", "is-hover");
        d.classList.remove("is-tag");
        l.textContent = "";
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(d, { x: pos.x, y: pos.y });
      gsap.set(r, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden [@media(hover:fine)]:block" aria-hidden>
      <div
        ref={dot}
        className="cursor-dot fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-opacity duration-300 [&.is-tag]:opacity-0"
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 transition-all duration-500 ease-out [&.is-hover]:scale-[1.7] [&.is-hover]:border-ink/50 [&.is-tag]:h-20 [&.is-tag]:w-20 [&.is-tag]:scale-100 [&.is-tag]:border-transparent [&.is-tag]:bg-bone/90 [&.is-tag]:shadow-[0_2px_30px_rgb(0_0_0/0.12)]"
      >
        <span
          ref={label}
          className="text-[9px] font-medium uppercase tracking-[0.22em] text-ink"
        />
      </div>
    </div>
  );
}
