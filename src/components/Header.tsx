"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useApp, getLenis } from "../lib/app";
import { BrandLockup } from "./Monogram";
import { OFFICE, PROJECTS } from "../data/content";

const LINKS = [
  { to: "projects", label: "Projects" },
  { to: "services", label: "Services" },
  { to: "about", label: "About" },
  { to: "process", label: "Process" },
  { to: "contact", label: "Contact" },
];

export default function Header() {
  const { route, navigate, openConsult } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(root.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.15 });
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menu) lenis?.stop();
    else lenis?.start();
  }, [menu]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menu) {
      gsap.set(el, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" })
        .fromTo(el.querySelectorAll(".menu-link"), { yPercent: 120 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }, "-=0.35")
        .fromTo(el.querySelectorAll(".menu-meta"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, "-=0.6");
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menu]);

  const go = (to: string) => {
    setMenu(false);
    if (route !== to) navigate(to);
  };

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[120] px-[4vw] transition-all duration-700 ${
          scrolled && !menu ? "border-b border-ink/5 bg-bone/85 py-3 backdrop-blur-xl" : "py-6"
        } ${menu ? "text-bone" : ""}`}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between">
          <button onClick={() => go("home")} data-hover aria-label="ModernArt Interior — home">
            <BrandLockup />
          </button>

          <nav className="hidden items-center gap-9 xl:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.to}
                onClick={() => go(l.to)}
                data-hover
                className={`link-line text-[10.5px] font-medium uppercase tracking-[0.28em] transition-colors ${
                  route.startsWith(l.to)
                    ? "text-bronze"
                    : menu || (route === "home" && !scrolled)
                      ? "text-bone/80 hover:text-bone"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              onClick={openConsult}
              data-hover
              className={`group relative hidden overflow-hidden border px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 sm:block ${
                menu || (route === "home" && !scrolled) ? "border-bone/40 text-bone hover:text-ink" : "border-ink/25 text-ink hover:text-bone"
              }`}
            >
              <span
                className={`absolute inset-0 -z-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 ${
                  menu || (route === "home" && !scrolled) ? "bg-bone" : "bg-ink"
                }`}
              />
              <span className="relative z-10">Book Consultation</span>
            </button>

            {/* hamburger */}
            <button
              onClick={() => setMenu((m) => !m)}
              data-hover
              aria-label={menu ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center xl:hidden"
            >
              <span className={`absolute h-px w-7 transition-all duration-500 ${menu ? "rotate-45 bg-bone" : `-translate-y-[4px] ${route === "home" && !scrolled ? "bg-bone" : "bg-ink"}`}`} />
              <span className={`absolute h-px w-7 transition-all duration-500 ${menu ? "-rotate-45 bg-bone" : `translate-y-[4px] ${route === "home" && !scrolled ? "bg-bone" : "bg-ink"}`}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ————— fullscreen menu ————— */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[110] hidden flex-col justify-between bg-coal px-[3vw] pb-10 pt-32 text-bone"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="pointer-events-none absolute right-[6vw] top-24 hidden font-serif text-[26vw] font-light leading-none text-bone/[0.04] lg:block">
          M
        </div>

        <nav className="flex flex-col" aria-label="Menu">
          {LINKS.map((l, i) => (
            <div key={l.to} className="overflow-hidden border-b border-bone/10">
              <button
                onClick={() => go(l.to)}
                data-hover
                className="menu-link group flex w-full items-baseline gap-6 py-4 text-left sm:py-5"
              >
                <span className="w-8 text-lg font-medium tracking-[0.3em] text-bone/40">
                  0{i + 1}
                </span>
                <span className="font-serif text-5xl font-light transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-clay sm:text-6xl lg:text-7xl">
                  {l.label}
                </span>
                <span className="ml-auto text-lg uppercase tracking-[0.3em] text-bone/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Enter
                </span>
              </button>
            </div>
          ))}
        </nav>

        <div className="grid gap-6 pt-10 sm:grid-cols-3">
          <div className="menu-meta">
            <p className="eyebrow text-bone/40">Atelier</p>
            <p className="mt-3 max-w-[26ch] text-lg leading-relaxed text-bone/70">{OFFICE.address}</p>
          </div>
          <div className="menu-meta">
            <p className="eyebrow text-bone/40">Enquiries</p>
            <a href={`mailto:${OFFICE.email}`} data-hover className="link-line mt-3 block w-fit text-lg text-bone/80">
              {OFFICE.email}
            </a>
            <a href={`tel:${OFFICE.phoneLink}`} data-hover className="link-line mt-1 block w-fit text-lg text-bone/80">
              {OFFICE.phone}
            </a>
          </div>
          <div className="menu-meta flex items-end justify-between gap-6 sm:flex-col sm:items-start sm:justify-start">
            <div>
              <p className="eyebrow text-bone/40">Latest project</p>
              <button onClick={() => go("project/" + PROJECTS[0].slug)} data-hover className="link-line mt-3 text-lg text-bone/80">
                {PROJECTS[0].title} — {PROJECTS[0].location}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
