"use client";
/* Animation primitives — GSAP + ScrollTrigger plumbing */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** run fn inside a gsap.context scoped to the ref, auto-reverted */
export function useGsap(
  scope: React.RefObject<HTMLElement | null>,
  fn: () => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(fn, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ————— Split · character reveal ————— */
export function Split({
  text,
  className = "",
  delay = 0,
  stagger = 0.016,
  scroll = true,
  start = "top 88%",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  scroll?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGsap(ref, () => {
    const chars = ref.current!.querySelectorAll(".spc");
    gsap.set(chars, { yPercent: 118, rotate: 3 });
    const cfg: gsap.TweenVars = {
      yPercent: 0,
      rotate: 0,
      duration: 1.3,
      ease: "power4.out",
      stagger,
      delay,
    };
    if (scroll) {
      gsap.to(chars, { ...cfg, scrollTrigger: { trigger: ref.current, start, once: true } });
    } else {
      gsap.to(chars, cfg);
    }
  });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="sp" aria-hidden>
          {w.split("").map((c, ci) => (
            <span key={ci} className="spc">
              {c}
            </span>
          ))}
          {wi < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

/* ————— Fade · rise on scroll ————— */
export function Fade({
  children,
  className = "",
  delay = 0,
  y = 44,
  once = true,
  start = "top 88%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(ref, () => {
    gsap.fromTo(
      ref.current,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.35,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: ref.current, start, once },
      }
    );
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ————— Img · mask reveal + parallax drift ————— */
export function Img({
  src,
  alt = "",
  ratio,
  className = "",
  imgClassName = "",
  drift = 10,
  eager = false,
  reveal = true,
  parallax = true,
  gradient = true,
}: {
  src: string;
  alt?: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  drift?: number;
  eager?: boolean;
  reveal?: boolean;
  parallax?: boolean;
  gradient?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useGsap(ref, () => {
    if (reveal) {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    }
    if (parallax) {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -drift / 2, scale: 1.14 },
        {
          yPercent: drift / 2,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }
  });
  return (
    <div ref={ref} className={`relative overflow-hidden bg-sand ${gradient ? "grade" : ""} ${className}`}>
      <Image
        ref={imgRef as React.Ref<HTMLImageElement>}
        src={src}
        alt={alt}
        fill
        priority={eager}
        className={`object-cover ${imgClassName}`}
        sizes="(max-width: 1024px) 100vw, 75vw"
      />
      {ratio && <div style={{ aspectRatio: ratio }} />}
    </div>
  );
}

/* ————— Counter ————— */
export function Counter({
  to,
  suffix = "",
  className = "",
  pad = 0,
}: {
  to: number;
  suffix?: string;
  className?: string;
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGsap(ref, () => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      onUpdate: () => {
        const n = Math.round(obj.v).toString().padStart(pad, "0");
        if (ref.current) ref.current.textContent = n + suffix;
      },
    });
  });
  return (
    <span ref={ref} className={className}>
      {String(0).padStart(pad, "0")}{suffix}
    </span>
  );
}

/* ————— Marquee ————— */
export function Marquee({
  children,
  duration = 40,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ "--marq-dur": `${duration}s` } as React.CSSProperties}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ————— Eyebrow label ————— */
export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Fade className={className} y={18}>
      <span
        className={`eyebrow inline-flex items-center gap-3 ${
          light ? "text-bone/70" : "text-taupe"
        }`}
      >
        <span className={`h-px w-8 ${light ? "bg-bone/50" : "bg-taupe/70"}`} />
        {children}
      </span>
    </Fade>
  );
}

/* ————— Magnetic wrapper ————— */
export function Magnet({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ————— hairline that draws itself ————— */
export function Rule({ className = "", light = false }: { className?: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(ref, () => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      }
    );
  });
  return (
    <div
      ref={ref}
      className={`h-px origin-left ${light ? "bg-bone/25" : "bg-ink/15"} ${className}`}
    />
  );
}
