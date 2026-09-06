"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const monoWrap = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline({ onComplete: onDone });
    tl.fromTo(monoWrap.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.15)
      .fromTo(
        word.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.55
      )
      .to(
        obj,
        {
          v: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
            if (bar.current) bar.current.style.transform = `scaleX(${obj.v / 100})`;
          },
        },
        0.25
      )
      .to(root.current, { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, "+=0.35");
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[250] flex flex-col justify-between bg-bone px-[3vw] py-10">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-mink">Atelier of Warm Minimalism</span>
        <span className="eyebrow hidden text-mink sm:block">Lisboa · Dubai · Milan</span>
      </div>

      <div className="flex flex-col items-center">
        <div ref={monoWrap} className="opacity-0">
          <img src="/logo.png" alt="ModernArt Logo" className="h-20 sm:h-28 object-contain" />
        </div>
        <div ref={word} className="mt-8 text-center opacity-0 hidden">
          <p className="font-serif text-3xl font-light tracking-[0.06em] text-ink sm:text-4xl">
            ModernArt
          </p>
          <p className="eyebrow mt-3 text-mink">Interior</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="w-40 sm:w-64">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-ink/60" />
          <p className="eyebrow mt-4 text-mink">Composing the atelier</p>
        </div>
        <span ref={count} className="font-serif text-6xl font-light leading-none text-ink/80 sm:text-8xl">
          000
        </span>
      </div>
    </div>
  );
}
