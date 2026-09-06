"use client";
import { useRef } from "react";
import { Split, Fade, Eyebrow, Img, Rule, ScrollTrigger, useGsap } from "../../lib/anim";
import { useApp } from "../../lib/app";
import { STEPS } from "../../data/content";

export default function Process() {
  const { openConsult } = useApp();
  const rail = useRef<HTMLDivElement>(null);

  useGsap(rail, () => {
    STEPS.forEach((_, i) => {
      const sec = document.getElementById(`step-${i}`);
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          const el = document.querySelectorAll(".rail-num")[i];
          if (el) el.classList.toggle("rail-on", self.isActive);
        },
      });
    });
  });

  return (
    <main>
      {/* hero */}
      <section className="px-[3vw] pb-24 pt-40 sm:pt-48">
        <Eyebrow>Process — the choreography</Eyebrow>
        <h1 className="mt-8 max-w-6xl font-serif font-light leading-[1.0] serif-tight text-[clamp(2.8rem,7.5vw,7.5rem)]">
          <Split text="Seven movements," scroll={false} delay={0.15} /><br />
          <em className="text-bronze"><Split text="one calm delivery." scroll={false} delay={0.3} /></em>
        </h1>
        <Fade delay={0.35} className="mt-10 max-w-[52ch] text-xl leading-[1.85] text-mink">
          <p>
            Beautiful interiors are the visible ten percent of a disciplined administration.
            This is ours — refined over eighteen years and 240 projects, and followed, without
            exception, on every commission.
          </p>
        </Fade>
        <Rule className="mt-14" />
      </section>

      <div ref={rail} className="relative px-[3vw]">
        {/* sticky rail */}
        <div className="pointer-events-none absolute left-[5vw] top-0 hidden h-full lg:block">
          <div className="sticky top-36 flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <a
                key={s.n}
                href={`#step-${i}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`step-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                data-hover
                className="rail-num pointer-events-auto flex items-baseline gap-3 opacity-30 transition-all duration-500 [&.rail-on]:translate-x-2 [&.rail-on]:opacity-100"
              >
                <span className="font-serif text-xl italic text-bronze">{s.n}</span>
                <span className="text-lg uppercase tracking-[0.24em]">{s.title}</span>
              </a>
            ))}
          </div>
        </div>

        {STEPS.map((s, i) => (
          <section
            key={s.n}
            id={`step-${i}`}
            className="grid items-center gap-12 border-t border-ink/8 py-10 lg:grid-cols-12 lg:py-28"
          >
            <div className={`lg:col-span-5 lg:col-start-4 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <Img src={s.src} alt={`${s.title} — ${s.time}`} ratio="16/11" drift={8} />
            </div>
            <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-4" : "lg:col-start-9"}`}>
              <div className="flex items-baseline gap-5">
                <Fade><span className="font-serif text-6xl font-light italic text-clay sm:text-7xl">{s.n}</span></Fade>
                <Fade delay={0.05}>
                  <span className="text-lg uppercase tracking-[0.26em] text-mink">{s.time}</span>
                </Fade>
              </div>
              <Fade delay={0.08}>
                <h2 className="mt-5 font-serif text-4xl font-light serif-tight sm:text-5xl">{s.title}</h2>
              </Fade>
              <Fade delay={0.12} className="mt-6 text-lg leading-[1.9] text-ink/75">
                <p>{s.body}</p>
              </Fade>
              <Fade delay={0.16} className="mt-8">
                <p className="eyebrow text-mink">You receive</p>
                <ul className="mt-4 space-y-2.5">
                  {s.deliver.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-lg text-mink">
                      <span className="h-px w-5 bg-bronze" /> {d}
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
          </section>
        ))}
      </div>

      {/* closing note */}
      <section className="bg-paper px-[3vw] py-16 text-center sm:py-36">
        <Fade y={16}>
          <p className="eyebrow text-mink">The promise</p>
        </Fade>
        <h2 className="mx-auto mt-8 max-w-4xl font-serif font-light leading-[1.12] serif-tight text-[clamp(2rem,4.6vw,4.2rem)]">
          <Split text="Six projects a year." /><br />
          <em className="text-bronze"><Split text="Never more." delay={0.12} /></em>
        </h2>
        <Fade delay={0.2} className="mx-auto mt-8 max-w-[52ch] text-lg leading-[1.9] text-mink">
          <p>
            Scarcity is not a sales posture — it is a quality mechanism. When the atelier is
            full, the answer is a date, not a shortcut.
          </p>
        </Fade>
        <Fade delay={0.28}>
          <button
            onClick={openConsult}
            data-hover
            className="group relative mt-12 inline-flex overflow-hidden bg-ink px-10 py-5 text-base font-medium uppercase tracking-[0.3em] text-bone"
          >
            <span className="absolute inset-0 translate-y-full bg-walnut transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Reserve a conversation</span>
          </button>
        </Fade>
      </section>
    </main>
  );
}
