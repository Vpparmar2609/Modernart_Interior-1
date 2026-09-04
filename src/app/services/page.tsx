"use client";
import { Split, Fade, Eyebrow, Img, Rule } from "../../lib/anim";
import { useApp } from "../../lib/app";
import { SERVICES, FAQS } from "../../data/content";
import { useState } from "react";

function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="bg-paper px-[3vw] py-16">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-7 font-serif font-light leading-[1.08] serif-tight text-[clamp(2rem,3.6vw,3.4rem)]">
            <Split text="Asked, answered," /><br />
            <em className="text-bronze"><Split text="honestly." delay={0.1} /></em>
          </h2>
        </div>
        <div className="lg:col-span-8">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`border-t border-ink/10 last:border-b ${open === i ? "acc-open" : ""}`}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                data-hover
                className="flex w-full items-center gap-6 py-7 text-left"
                aria-expanded={open === i}
              >
                <span className="font-serif text-lg text-taupe">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-serif text-2xl font-light">{f.q}</span>
                <span className="acc-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" /></svg>
                </span>
              </button>
              <div className="acc-body">
                <div>
                  <p className="max-w-[62ch] pb-8 pl-14 pr-4 text-lg leading-[1.9] text-mink sm:pl-16">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const { openConsult } = useApp();
  return (
    <main>
      <section className="px-[3vw] pb-20 pt-40 sm:pt-48">
        <Eyebrow>Services — eight disciplines</Eyebrow>
        <h1 className="mt-8 max-w-5xl font-serif font-light leading-[1.02] serif-tight text-[clamp(2.8rem,7vw,7rem)]">
          <Split text="One studio," scroll={false} delay={0.15} /><br />
          <em className="text-bronze"><Split text="every discipline." scroll={false} delay={0.3} /></em>
        </h1>
        <Fade delay={0.35} className="mt-10 max-w-[46ch] text-lg leading-relaxed text-mink">
          <p>
            From a single planning study to a turnkey villa, every commission receives the same
            senior hands, the same material obsession, and the same rule: quiet over loud.
          </p>
        </Fade>
        <Rule className="mt-14" />
      </section>

      <section className="px-[3vw]">
        {SERVICES.map((s, i) => (
          <div key={s.slug} className={`grid items-center gap-6 py-16 lg:grid-cols-12 ${i ? "border-t border-ink/8" : ""}`}>
            <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
              <Img src={s.src} alt={s.title} ratio="16/10" drift={8} />
            </div>
            <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-2" : "lg:col-start-9"}`}>
              <Fade>
                <span className="font-serif text-5xl font-light text-clay">{s.n}</span>
              </Fade>
              <Fade delay={0.05}>
                <h2 className="mt-4 font-serif text-4xl font-light serif-tight">{s.title}</h2>
                <p className="eyebrow mt-2 text-mink">{s.short}</p>
              </Fade>
              <Fade delay={0.1} className="mt-6 text-lg leading-[1.85] text-ink/75">
                <p>{s.body}</p>
              </Fade>
              <Fade delay={0.15} className="mt-7 space-y-2.5">
                {s.points.map((p) => (
                  <p key={p} className="flex items-center gap-3 text-lg text-mink">
                    <span className="h-px w-5 bg-bronze" /> {p}
                  </p>
                ))}
              </Fade>
              <Fade delay={0.2}>
                <button
                  onClick={openConsult}
                  data-hover
                  className="group mt-9 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em]"
                >
                  <span className="link-line">Discuss this service</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-bone">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
                  </span>
                </button>
              </Fade>
            </div>
          </div>
        ))}
      </section>

      <Faq />
    </main>
  );
}
