"use client";
import { useState } from "react";
import { useApp, getLenis } from "../lib/app";
import { BrandLockup } from "./Monogram";
import { Marquee, Fade, Rule, Split } from "../lib/anim";
import { OFFICE, PRESS } from "../data/content";

export default function Footer() {
  const { navigate, openConsult } = useApp();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative bg-coal text-bone">
      {/* ————— big CTA ————— */}
      <div className="px-[3vw] pb-20 pt-28 sm:pt-36">
        <Fade>
          <p className="eyebrow text-bone/40">Begin</p>
        </Fade>
        <h2 className="mt-6 font-serif font-light leading-[0.98] serif-tight text-[clamp(2.6rem,7.5vw,7.5rem)]">
          <Split text="Let’s design the rooms" scroll={false} /> <br className="hidden sm:block" />
          <Split text="your life deserves." delay={0.08} scroll={false} />
        </h2>
        <Fade className="mt-12 flex flex-wrap items-center gap-4" delay={0.15}>
          <button
            onClick={openConsult}
            data-hover
            data-cursor="Start"
            className="group relative overflow-hidden border border-bone/30 px-9 py-5 text-base font-medium uppercase tracking-[0.3em]"
          >
            <span className="absolute inset-0 translate-y-full bg-bone transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">Book a consultation</span>
          </button>
          <a href={`mailto:${OFFICE.email}`} data-hover className="link-line text-lg text-bone/60">
            {OFFICE.email}
          </a>
        </Fade>
      </div>

      <Rule light className="mx-[5vw]" />

      {/* ————— grid ————— */}
      <div className="grid gap-8 px-[3vw] py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <BrandLockup className="invert brightness-0" />
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-bone/50">
            An interior architecture atelier practicing warm minimalism for homes, villas and
            workplaces — from first sketch to the final object.
          </p>
          <p className="eyebrow mt-8 text-bone/30">Est. 2008 · Lisboa — Dubai — Milan</p>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-bone/40">Explore</p>
          <ul className="mt-5 space-y-3">
            {["projects", "services", "about", "process", "contact"].map((r) => (
              <li key={r}>
                <button
                  onClick={() => navigate(r)}
                  data-hover
                  className="link-line text-lg capitalize text-bone/70 hover:text-bone"
                >
                  {r}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-bone/40">Locations</p>
          <ul className="mt-5 space-y-3">
            {["Ahmedabad", "Gandhinagar", "Vadodara", "Surat", "Mumbai"].map((city) => (
              <li key={city}>
                <button
                  onClick={() => {
                    window.location.href = `/projects?location=${city}`;
                  }}
                  data-hover
                  className="link-line text-lg text-bone/70 hover:text-bone"
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-bone/40">The Quiet Rooms Letter</p>
          <p className="mt-4 text-lg leading-relaxed text-bone/50">
            Occasional notes on light, materials and rooms well lived.
          </p>
          {sent ? (
            <p className="mt-6 font-serif text-xl italic text-clay">Welcome to the letter.</p>
          ) : (
            <form
              className="mt-6 flex items-center gap-3 border-b border-bone/25 pb-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSent(true);
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent text-lg text-bone outline-none placeholder:text-bone/35"
              />
              <button data-hover aria-label="Subscribe" className="text-bone/60 transition-colors hover:text-gold">
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <path d="M14 1l5 5-5 5M19 6H1" stroke="currentColor" />
                </svg>
              </button>
            </form>
          )}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {[
              { n: "Instagram", h: OFFICE.instagram },
              { n: "WhatsApp", h: OFFICE.whatsapp },
              { n: "Pinterest", h: "https://in.pinterest.com/modernartinterior/" },
              // { n: "LinkedIn", h: "https://linkedin.com" },
            ].map((s) => (
              <a key={s.n} href={s.h} target="_blank" rel="noreferrer" data-hover className="link-line text-base uppercase tracking-[0.2em] text-bone/55 hover:text-bone">
                {s.n}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ————— press marquee ————— */}
      <div className="border-y border-bone/10 py-6">
        <Marquee duration={46}>
          {PRESS.map((p) => (
            <span key={p} className="mx-10 flex items-center gap-6 font-serif text-2xl font-light italic text-bone/40">
              {p} <span className="inline-block h-1 w-1 rounded-full bg-bone/25" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ————— bottom ————— */}
      <div className="flex flex-col items-start justify-between gap-4 px-[3vw] py-8 text-base uppercase tracking-[0.22em] text-bone/35 sm:flex-row sm:items-center">
        <p>© 2026 ModernArt Interior · All rooms reserved</p>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block">Photography — the atelier archive</span>
          <button
            onClick={() => getLenis()?.scrollTo(0, { duration: 1.6 })}
            data-hover
            className="flex items-center gap-2 text-bone/60 transition-colors hover:text-gold"
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 11V1M1.5 5.5L6 1l4.5 4.5" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
