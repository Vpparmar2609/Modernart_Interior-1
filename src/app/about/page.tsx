"use client";
import { Split, Fade, Eyebrow, Img, Rule, Counter, Marquee, ScrollTrigger, useGsap, gsap } from "../../lib/anim";
import { useApp } from "../../lib/app";
import { TEAM, TIMELINE, PRESS  } from "../../data/content";
import { useRef } from "react";

function Timeline() {
  const col = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  useGsap(col, () => {
    gsap.fromTo(line.current, { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: col.current, start: "top 70%", end: "bottom 55%", scrub: true },
    });
    gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 65%",
        onEnter: () => el.classList.add("tl-on"),
        onLeaveBack: () => el.classList.remove("tl-on"),
      });
    });
  });
  return (
    <section className="bg-paper px-[3vw] py-16 sm:py-36">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Eighteen years</Eyebrow>
            <h2 className="mt-7 font-serif font-light leading-[1.06] serif-tight text-[clamp(2.2rem,4.4vw,4.2rem)]">
              <Split text="A slow-growing" /><br />
              <em className="text-bronze"><Split text="atelier." delay={0.1} /></em>
            </h2>
          </div>
        </div>
        <div ref={col} className="relative lg:col-span-7 lg:pl-16">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-ink/10 lg:block">
            <div ref={line} className="h-full w-px origin-top bg-walnut" />
          </div>
          {TIMELINE.map((t) => (
            <div key={t.y} className="tl-item border-b border-ink/10 py-10 opacity-35 transition-opacity duration-700 [&.tl-on]:opacity-100">
              <div className="flex flex-wrap items-baseline gap-x-8">
                <span className="font-serif text-5xl font-light italic text-clay">{t.y}</span>
                <h3 className="font-serif text-2xl font-light">{t.t}</h3>
              </div>
              <p className="mt-4 max-w-[58ch] text-lg leading-[1.85] text-mink">{t.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { navigate } = useApp();
  return (
    <main>
      {/* hero */}
      <section className="relative px-[3vw] pb-24 pt-40 sm:pt-48">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>The studio — Lisboa</Eyebrow>
            <h1 className="mt-8 font-serif font-light leading-[1.0] serif-tight text-[clamp(2.8rem,7vw,7rem)]">
              <Split text="An atelier of" scroll={false} delay={0.15} /><br />
              <em className="text-bronze"><Split text="warm restraint." scroll={false} delay={0.3} /></em>
            </h1>
            <Fade delay={0.35} className="mt-10 max-w-[48ch] text-xl leading-[1.85] text-mink">
              <p>
                Founded in 2008 by Sofia Amaral, ModernArt Interior is a twenty-three-person
                atelier of architects, joiners, stylists and one very opinionated material
                library. We believe luxury is a temperature, not a price.
              </p>
            </Fade>
          </div>
          <div className="relative lg:col-span-5">
            <Img src={"/newprojects/Aditya Antilia Living Room (1)/0.jpg"} alt="Sofia Amaral, founder of ModernArt Interior" ratio="4/5" />
            <Fade delay={0.3} className="absolute -bottom-10 -left-8 hidden border-8 border-bone sm:block" y={24}>
              <img src={"/newprojects/Aditya Antilia Living Room (1)/0.jpg"} alt="Arched interior" className="h-44 w-36 object-cover" />
            </Fade>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="border-y border-ink/10 px-[3vw] py-16">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {[
            { n: 23, s: "", l: "Hands in the atelier" },
            { n: 6, s: "", l: "Commissions per year" },
            { n: 240, s: "+", l: "Projects since 2008" },
            { n: 94, s: "%", l: "Clients who return" },
          ].map((s) => (
            <Fade key={s.l}>
              <p className="font-serif text-5xl font-light">
                <Counter to={s.n} suffix={s.s} pad={s.n < 100 ? 2 : 0} />
              </p>
              <p className="eyebrow mt-3 text-mink">{s.l}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* founder */}
      <section className="px-[3vw] py-16 sm:py-36">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Img src={"/newprojects/Aditya Antilia Living Room (1)/0.jpg"} alt="The founder reviewing fabric samples in the studio" ratio="5/6" drift={8} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>The founder</Eyebrow>
            <blockquote className="mt-8 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] font-light italic leading-[1.35]">
              “A project is finished not when there is nothing left to add, but when there is
              nothing left that the light doesn't need.”
            </blockquote>
            <Fade delay={0.1} className="mt-8">
              <p className="font-serif text-2xl">Sofia Amaral</p>
              <p className="eyebrow mt-2 text-mink">Founder · Creative Director</p>
            </Fade>
            <Fade delay={0.15} className="mt-8 space-y-4 text-lg leading-[1.85] text-mink">
              <p>
                Trained as an architect in Porto and formed in Antwerp, Sofia began the studio
                with a single rented desk and a refusal: no room that photographs loudly and
                lives badly.
              </p>
              <p>
                She still reviews every material sample personally — usually against the
                north light of the Rua das Flores window, always after 6 p.m.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <button onClick={() => navigate("process")} data-hover className="group mt-9 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em]">
                <span className="link-line">How we work</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-bone">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
                </span>
              </button>
            </Fade>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="bg-coal px-[3vw] py-16 text-bone sm:py-36">
        <Eyebrow light>Three principles</Eyebrow>
        <div className="mt-14 grid gap-px overflow-hidden bg-bone/10 lg:grid-cols-3">
          {[
            { n: "I", t: "Light is a material", d: "We schedule it like stone: morning for kitchens, noon for voids, evening for rooms where people linger. Everything else — palette, texture, glass — obeys the sun." },
            { n: "II", t: "Fewer, better things", d: "A room with eight chosen objects outlives a room with forty fine ones. We spend the budget on touchpoints — handles, thresholds, the arm of the chair you actually hold." },
            { n: "III", t: "Design for mornings", d: "Houses are judged in photographs but lived at 7 a.m. If the breakfast corner is right, the rest of the house tends to follow. We design the ritual first." },
          ].map((p, i) => (
            <Fade key={p.n} delay={i * 0.08} className="bg-coal p-10 sm:p-14">
              <span className="font-serif text-4xl font-light italic text-gold">{p.n}</span>
              <h3 className="mt-6 font-serif text-3xl font-light">{p.t}</h3>
              <p className="mt-5 text-lg leading-[1.9] text-bone/60">{p.d}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* timeline */}
      <Timeline />

      {/* team */}
      <section className="px-[3vw] py-16 sm:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>The hands</Eyebrow>
            <h2 className="mt-6 font-serif font-light serif-tight text-[clamp(2rem,4.6vw,4.4rem)]">
              <Split text="Twenty-three, carefully" />
            </h2>
          </div>
          <Fade delay={0.1} className="max-w-[36ch] pb-2 text-lg leading-relaxed text-mink">
            <p>Architects, joiners, stylists, and one accountant who understands travertine freight.</p>
          </Fade>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Fade key={m.name} delay={i * 0.07}>
              <div className="group">
                <div className="img-zoom relative overflow-hidden bg-sand">
                  <img src={m.src} alt={m.name} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:saturate-75" />
                </div>
                <div className="mt-5 border-t border-ink/10 pt-4">
                  <p className="font-serif text-2xl font-light">{m.name}</p>
                  <p className="mt-1 text-base uppercase tracking-[0.22em] text-mink">{m.role}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* press strip */}
      <div className="border-t border-ink/10 py-10">
        <Marquee duration={44}>
          {PRESS.map((p) => (
            <span key={p} className="mx-12 font-serif text-3xl font-light italic text-ink/35">
              {p}
            </span>
          ))}
        </Marquee>
      </div>
      <Rule className="mx-[5vw]" />
    </main>
  );
}
