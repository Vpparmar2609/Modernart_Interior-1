"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGsap, Split, Fade, Img, Counter, Eyebrow, Rule, Magnet } from "../lib/anim";
import { useApp } from "../lib/app";
import { FILM, PROJECTS, SERVICES, STEPS, TESTIMONIALS, INSTAGRAM, OFFICE, } from "../data/content";

/* ————————————————— hero ————————————————— */
function Hero() {
  const { navigate, openConsult } = useApp();
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    gsap.fromTo(".hero-video", { scale: 1.18 }, { scale: 1, duration: 2.8, ease: "power2.out" });
    gsap.to(".hero-content", {
      yPercent: -12,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-coal">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover [filter:saturate(.9)_contrast(1.05)]"
        src={FILM.hero}
        poster={FILM.heroPoster}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-coal/60 via-coal/25 to-coal/70" />
      <div className="absolute inset-0 bg-coal/10" />

      {/* rotating mark */}
      <div className="absolute right-[5vw] top-[22vh] hidden lg:block">
        <Fade delay={1.6}>
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 100 100" className="spin-slow h-full w-full text-bone/70">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current text-[8.2px] uppercase tracking-[0.32em]">
                <textPath href="#circ">ModernArt Interior · Warm Minimalism ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        </Fade>
      </div>

      <div className="hero-content mt-10 absolute inset-0 flex flex-col justify-end px-[3vw] pb-[11vh] text-bone">
        <Fade delay={0.9} y={20}>
          <p className="eyebrow text-bone/70">Interior architecture atelier — est. 2008</p>
        </Fade>

        <h1 className="mt-7 font-serif font-light leading-[0.97] serif-tight text-[clamp(2.5rem,7.5vw,7.5rem)]">
          <span className="block"><Split text="The quiet" scroll={false} delay={1.05} /></span>
          <span className="block">
            <span className="italic text-clay"><Split text="architecture" scroll={false} delay={1.2} /></span>{" "}
            <Split text="of" scroll={false} delay={1.32} />
          </span>
          <span className="block"><Split text="living well." scroll={false} delay={1.42} /></span>
        </h1>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Fade delay={1.75} y={24}>
            <p className="max-w-[32 ch] text-lg leading-relaxed text-bone/70">
              An award-winning studio shaping warm-minimal homes, villas and
              workplaces — from first sketch to the final object.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Magnet>
                <button
                  onClick={() => navigate("projects")}
                  data-hover
                  data-cursor="View"
                  className="group relative overflow-hidden bg-bone px-8 py-4 text-lg font-medium uppercase tracking-[0.3em] text-ink"
                >
                  <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Selected works</span>
                </button>
              </Magnet>
              <button onClick={openConsult} data-hover className="link-line text-lg font-medium uppercase tracking-[0.3em] text-bone/80">
                Book a consultation
              </button>
            </div>
          </Fade>

          <Fade delay={1.95} y={20} className="hidden items-end gap-12 sm:flex">
            <div className="text-right">
              <p className="font-serif text-4xl font-light">240<span className="text-gold">+</span></p>
              <p className="eyebrow mt-1 text-bone/50">Rooms delivered</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="eyebrow text-bone/50" style={{ writingMode: "vertical-rl" }}>Scroll</span>
              <span className="scrollhint block h-14 w-px bg-bone/60" />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ————————————————— intro ————————————————— */
function Intro() {
  const { navigate } = useApp();
  return (
    <section className="relative px-[3vw] py-16 sm:py-40">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>The Atelier</Eyebrow>
          <h2 className="mt-8 font-serif font-light leading-[1.04] serif-tight text-[clamp(2.2rem,4.6vw,4.4rem)]">
            <Split text="Rooms that hold" /><br />
            <em className="text-bronze"><Split text="a life well lived." delay={0.1} /></em>
          </h2>
          <Fade className="mt-10 max-w-[52ch] space-y-5 text-xl leading-relaxed text-mink" delay={0.15}>
            <p>
              ModernArt Interior is a Lisbon atelier practicing warm minimalism — rooms built
              from light, proportion and honest material rather than decoration. We take six
              commissions a year, and give each one senior hands and slow attention.
            </p>
            <p>
              Our buildings age well because they were never fashionable. Travertine, walnut,
              limewash and linen: a narrow palette, argued over for months, and detailed to the
              millimetre.
            </p>
          </Fade>
          <Fade delay={0.2}>
            <button onClick={() => navigate("about")} data-hover className="group mt-10 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em]">
              <span className="link-line">Our story</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-bone">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
              </span>
            </button>
          </Fade>
        </div>

        <div className="relative lg:col-span-7">
          <div className="ml-auto w-[78%] sm:w-[68%]">
            <Img src="/newprojects/Aditya Antilia Living Room (1)/0.jpg" alt="Atelier work table with drawings and material rolls" ratio="4/5" />
          </div>
          <div className="absolute -bottom-14 left-0 w-[46%] border-[10px] border-bone sm:-bottom-20 sm:w-[40%]">
            <Img src="/newprojects/Aditya Antilia Living Room (1)/1.jpg" alt="Arched interior with soft light" ratio="3/4" drift={7} />
            <p className="absolute -bottom-8 left-0 text-lg uppercase tracking-[0.26em] text-mink">Santos atelier — Lisboa</p>
          </div>
          <Fade delay={0.4} className="absolute -left-2 top-6 hidden md:block">
            <p className="text-lg uppercase tracking-[0.3em] text-taupe" style={{ writingMode: "vertical-rl" }}>
              Est. 2008 — twenty-three hands
            </p>
          </Fade>
        </div>
      </div>

      {/* stats */}
      <div className="mt-16 grid grid-cols-2 gap-y-12 border-t border-ink/10 pt-12 lg:grid-cols-4">
        {[
          { n: 900, suf: "+", l: "Projects delivered" },
          { n: 35, suf: "", l: " Years of experties" },
          { n: 80, suf: "+", l: "Ongoing Projects" },
          { n: 100, suf: "%", l: "Achivement Ratio" },
        ].map((s) => (
          <Fade key={s.l} className="pr-6">
            <p className="font-serif text-5xl font-light sm:text-6xl">
              <Counter to={s.n} suffix={s.suf} pad={s.n < 100 ? 2 : 0} />
            </p>
            <p className="eyebrow mt-3 text-mink">{s.l}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ————————————————— featured works — pinned horizontal ————————————————— */
function Featured() {
  const { navigate } = useApp();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLDivElement>(null);
  const works = PROJECTS.slice(0, 5);

  useGsap(wrap, () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth + window.innerWidth * 0.05;
      gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (prog.current) prog.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });
  });

  return (
    <section className="relative bg-paper">
      <div className="flex items-end justify-between px-[3vw] pt-28 sm:pt-36">
        <div className="w-full">
          <Eyebrow>Selected works — 01/08</Eyebrow>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif font-light leading-none serif-tight text-[clamp(2.4rem,5.5vw,5.5rem)]">
              <Split text="Featured projects" />
            </h2>
            <Fade delay={0.1}>
              <button onClick={() => navigate("projects")} data-hover className="link-line mb-2 text-lg font-medium uppercase tracking-[0.3em] text-bronze">
                All projects — 08
              </button>
            </Fade>
          </div>
          <Rule className="mt-8" />
        </div>
      </div>

      <div ref={wrap} className="relative mt-4 lg:overflow-hidden">
        <div className="relative lg:flex lg:h-[100svh] lg:items-center">
          <div className="pointer-events-none absolute inset-x-[5vw] bottom-8 z-20 hidden lg:block">
            <div className="h-px w-full bg-ink/10">
              <div ref={prog} className="h-px origin-left scale-x-0 bg-walnut" />
            </div>
          </div>
          <div ref={track} className="no-bar flex w-full items-stretch gap-[7vw] overflow-x-auto px-[3vw] py-14 lg:w-auto lg:overflow-visible lg:py-0 lg:will-change-transform">
            {works.map((p, i) => (
              <article
                key={p.slug}
                className="group w-[82vw] shrink-0 sm:w-[58vw] lg:h-[68vh] lg:w-[40vw] lg:shrink"
              >
                <button
                  onClick={() => navigate("project/" + p.slug)}
                  data-cursor="View"
                  data-hover
                  className="block h-full w-full text-left"
                >
                  <div className={`img-zoom grade relative w-full overflow-hidden bg-sand ${i % 2 ? "h-[46vh] lg:h-[80%]" : "h-[52vh] lg:h-full"}`}>
                    <Image src={p.poster} alt={p.title} fill priority={i < 2} className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    {p.images && p.images[0] && (
                      <Image
                        src={typeof p.images[0] === 'string' ? p.images[0] : p.images[0].src}
                        alt=""
                        fill
                        loading="lazy"
                        className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                    <span className="absolute left-4 top-4 z-10 bg-bone/85 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-ink backdrop-blur">
                      {p.cats[0]}
                    </span>
                    <span className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 bg-coal/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-bone opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 lg:flex">
                      <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor"><path d="M0.5 0.8v7.4L7.5 4.5 0.5 0.8z" /></svg>
                      Preview
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-4">
                    <div>
                      <h3 className="font-serif text-2xl font-light transition-colors duration-500 group-hover:text-bronze sm:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-base uppercase tracking-[0.2em] text-mink">
                        {p.location} — {p.year}
                      </p>
                    </div>
                    <span className="font-serif text-xl text-clay">0{i + 1}</span>
                  </div>
                </button>
              </article>
            ))}

            {/* end card */}
            <div className="flex w-[70vw] shrink-0 items-center justify-center sm:w-[40vw] lg:h-[68vh] lg:w-[30vw]">
              <button onClick={() => navigate("projects")} data-hover data-cursor="All" className="group flex flex-col items-center gap-6">
                <span className="flex h-28 w-28 items-center justify-center rounded-full border border-ink/20 transition-all duration-700 group-hover:bg-ink group-hover:text-bone">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M14 1l6 7-6 7M20 8H1" stroke="currentColor" /></svg>
                </span>
                <span className="text-lg font-medium uppercase tracking-[0.3em] text-mink">All 08 projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————— philosophy ————————————————— */
// function Philosophy() {
//   const { navigate } = useApp();
//   return (
//     <section className="relative overflow-hidden text-bone">
//       <Img src={px(20703618, 2200)} alt="Curved blush arch in soft light" className="absolute inset-0 h-full" drift={16} reveal={false} />
//       <div className="absolute inset-0 bg-coal/62" />
//       <div className="relative flex min-h-[92svh] flex-col items-center justify-center px-[3vw] py-16 text-center">
//         <Fade y={16}>
//           <p className="eyebrow text-bone/60">Design philosophy</p>
//         </Fade>
//         <h2 className="mt-10 font-serif font-light leading-[1.06] text-[clamp(2.6rem,6.5vw,6.5rem)]">
//           <em><Split text="Light first." scroll={false} /></em><br />
//           <em><Split text="Material second." delay={0.12} scroll={false} /></em><br />
//           <em className="text-clay"><Split text="Silence always." delay={0.24} scroll={false} /></em>
//         </h2>
//         <Fade delay={0.25} className="mt-10 max-w-[52ch] text-lg leading-relaxed text-bone/65">
//           <p>
//             We begin every plan with the sun's path and end it by removing everything the room
//             doesn't need. What remains — proportion, texture, shadow — is the luxury.
//           </p>
//         </Fade>
//         <Fade delay={0.35}>
//           <button onClick={() => navigate("about")} data-hover className="group mt-10 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em] text-bone/80">
//             <span className="link-line">The studio's beliefs</span>
//             <span className="h-8 w-px bg-bone/40" />
//           </button>
//         </Fade>
//       </div>
//     </section>
//   );
// }

/* ————————————————— capabilities ————————————————— */
function Services() {
  const { navigate } = useApp();
  const list = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const shown = useRef(false);

  useEffect(() => {
    const el = list.current, pv = preview.current;
    if (!el || !pv) return;
    const xTo = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left - 130);
      yTo(e.clientY - r.top - 170);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const enter = (i: number) => {
    setActive(i);
    if (!shown.current) {
      shown.current = true;
      gsap.fromTo(preview.current, { opacity: 0, scale: 0.9, rotate: -4 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "power3.out" });
    }
  };
  const leave = () => {
    shown.current = false;
    gsap.to(preview.current, { opacity: 0, scale: 0.94, rotate: 3, duration: 0.4, ease: "power2.in" });
  };

  return (
    <section className="px-[3vw] py-16 sm:py-36">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="mt-7 font-serif font-light leading-[1.05] serif-tight text-[clamp(2.2rem,4.4vw,4.2rem)]">
              <Split text="What the studio" /><br />
              <em className="text-bronze"><Split text="can do for you" delay={0.1} /></em>
            </h2>
            <Fade delay={0.15} className="mt-8 max-w-[40ch] text-lg leading-relaxed text-mink">
              <p>
                Eight disciplines, one accountable hand. Commission a single service or the
                entire choreography — the standard never changes.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <button onClick={() => navigate("services")} data-hover className="group mt-9 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em]">
                <span className="link-line">All services</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-bone">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
                </span>
              </button>
            </Fade>
          </div>
        </div>

        <div ref={list} className="relative lg:col-span-8" onMouseLeave={leave}>
          {/* floating preview */}
          <div
            ref={preview}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[300px] w-[240px] overflow-hidden opacity-0 shadow-[0_30px_80px_rgb(34_29_23/0.25)] lg:block"
          >
            {SERVICES.map((s, i) => (
              <img
                key={s.slug}
                src={s.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          {SERVICES.map((s, i) => (
            <Fade key={s.slug} delay={i * 0.03}>
              <button
                onClick={() => navigate("services")}
                onMouseEnter={() => enter(i)}
                data-hover
                className="group flex w-full items-center gap-6 border-t border-ink/10 py-7 text-left transition-colors last:border-b hover:bg-paper/60 sm:gap-10"
              >
                <span className="font-serif text-lg text-taupe transition-colors group-hover:text-bronze">{s.n}</span>
                <span className="flex-1">
                  <span className="block font-serif text-2xl font-light transition-transform duration-500 group-hover:translate-x-3 sm:text-4xl">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-base uppercase tracking-[0.2em] text-mink">{s.short}</span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-bone">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M4.5 2H11v6.5" stroke="currentColor" /></svg>
                </span>
              </button>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————— process timeline ————————————————— */
function ProcessHome() {
  const { navigate } = useApp();
  const col = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useGsap(col, () => {
    gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: col.current, start: "top 65%", end: "bottom 60%", scrub: true },
      }
    );
    gsap.utils.toArray<HTMLElement>(".step-row").forEach((row) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 62%",
        end: "bottom 40%",
        onEnter: () => row.classList.add("step-on"),
        onLeaveBack: () => row.classList.remove("step-on"),
      });
    });
  });

  return (
    <section className="bg-paper px-[3vw] py-16 sm:py-36">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-7 font-serif font-light leading-[1.05] serif-tight text-[clamp(2.4rem,5vw,4.8rem)]">
              <Split text="From first sketch" /><br />
              <em className="text-bronze"><Split text="to final styling" delay={0.1} /></em>
            </h2>
            <Fade delay={0.15} className="mt-8 max-w-[44ch] text-lg leading-relaxed text-mink">
              <p>
                Seven movements, forty decision points, one calm timeline. Scroll the score —
                then read the full choreography.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <button onClick={() => navigate("process")} data-hover className="group mt-9 inline-flex items-center gap-4 text-lg font-medium uppercase tracking-[0.3em]">
                <span className="link-line">The full process</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-bone">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
                </span>
              </button>
            </Fade>
          </div>
        </div>

        <div ref={col} className="relative lg:col-span-7 lg:pl-14">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-ink/10 lg:block">
            <div ref={line} className="h-full w-px origin-top bg-walnut" />
          </div>
          {STEPS.map((s) => (
            <div key={s.n} className="step-row group border-b border-ink/10 py-9 opacity-40 transition-opacity duration-700 lg:[&.step-on]:opacity-100">
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-4xl font-light text-clay transition-colors duration-500 group-[.step-on]:text-bronze sm:text-5xl">
                  {s.n}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-3xl font-light sm:text-4xl">{s.title}</h3>
                    <span className="text-lg uppercase tracking-[0.24em] text-mink">{s.time}</span>
                  </div>
                  <p className="mt-3 max-w-[58ch] text-lg leading-relaxed text-mink">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————— testimonials ————————————————— */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const q = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (n: number) => {
    setIdx(() => (n + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    gsap.fromTo(q.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
  }, [idx]);

  useEffect(() => {
    timer.current = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section className="px-[3vw] py-16 sm:py-36">
      <div className="flex items-end justify-between">
        <Eyebrow>Client words</Eyebrow>
        <Fade y={14}>
          <span className="font-serif text-xl text-taupe">
            {String(idx + 1).padStart(2, "0")} <span className="text-ink/30">/ {String(TESTIMONIALS.length).padStart(2, "0")}</span>
          </span>
        </Fade>
      </div>

      <div ref={q} className="mx-auto mt-16 max-w-4xl text-center">
        <span className="font-serif text-7xl leading-none text-clay">“</span>
        <blockquote className="mt-2 font-serif text-[clamp(1.6rem,3.4vw,3rem)] font-light italic leading-[1.25]">
          {t.quote}
        </blockquote>
        <div className="mt-10 flex items-center justify-center gap-4">
          <img src={t.src} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
          <div className="text-left">
            <p className="text-lg font-medium">{t.name}</p>
            <p className="text-base uppercase tracking-[0.2em] text-mink">{t.role}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl items-center justify-center gap-4">
        <button onClick={() => go(idx - 1)} data-hover aria-label="Previous" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 hover:bg-ink hover:text-bone">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M5.5 1L2 5l3.5 4M2 5h11" stroke="currentColor" /></svg>
        </button>
        <span className="h-px w-16 bg-ink/15" />
        <button onClick={() => go(idx + 1)} data-hover aria-label="Next" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 hover:bg-ink hover:text-bone">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="currentColor" /></svg>
        </button>
      </div>
    </section>
  );
}

/* ————————————————— instagram masonry ————————————————— */
function Insta() {
  const { openLightbox } = useApp();
  return (
    <section className="bg-paper px-[3vw] py-16 sm:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>@modernart.interior</Eyebrow>
          <h2 className="mt-6 font-serif font-light serif-tight text-[clamp(2rem,4.6vw,4.4rem)]">
            <Split text="From the studio diary" />
          </h2>
        </div>
        <Fade delay={0.1}>
          <a href={OFFICE.instagram} target="_blank" rel="noreferrer" data-hover className="link-line mb-2 text-lg font-medium uppercase tracking-[0.3em] text-bronze">
            Follow the day-to-day
          </a>
        </Fade>
      </div>

      <div className="masonry masonry-3 mt-14">
        {INSTAGRAM.map((src, i) => (
          <Fade key={i} delay={(i % 3) * 0.08} className="mb-6">
            <button
              onClick={() => openLightbox(src, `@modernart.interior — archive ${String(i + 1).padStart(2, "0")}`)}
              data-cursor="Open"
              className="img-zoom grade relative block w-full overflow-hidden"
            >
              <img src={src} alt={`Studio archive ${i + 1}`} loading="lazy" decoding="async" className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-coal/0 opacity-0 transition-all duration-500 hover:bg-coal/45 hover:opacity-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-bone">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </span>
            </button>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ————————————————— awards & press ————————————————— */
// function Press() {
//   return (
//     <section className="px-[3vw] py-16 sm:py-36">
//       <div className="grid gap-8 lg:grid-cols-12">
//         <div className="lg:col-span-5">
//           <Eyebrow>Awards & press</Eyebrow>
//           <h2 className="mt-7 font-serif font-light leading-[1.06] serif-tight text-[clamp(2rem,4vw,3.8rem)]">
//             <Split text="Quietly recognised," /><br />
//             <em className="text-bronze"><Split text="internationally." delay={0.1} /></em>
//           </h2>
//           <Fade delay={0.15} className="mt-8 max-w-[44ch] text-lg leading-relaxed text-mink">
//             <p>
//               The studio's rooms have been published and shortlisted across three continents —
//               always for the same reason: they are calm, and they stay calm.
//             </p>
//           </Fade>
//         </div>
//         <div className="lg:col-span-7">
//           {AWARDS.map((a, i) => (
//             <Fade key={a.t} delay={i * 0.04}>
//               <div className="group flex items-baseline justify-between gap-6 border-t border-ink/10 py-5 transition-colors last:border-b hover:bg-paper/70">
//                 <span className="w-14 shrink-0 font-serif text-lg text-taupe">{a.y}</span>
//                 <span className="flex-1">
//                   <span className="block font-serif text-2xl font-light transition-transform duration-500 group-hover:translate-x-2">{a.t}</span>
//                   <span className="text-base uppercase tracking-[0.2em] text-mink">{a.s}</span>
//                 </span>
//               </div>
//             </Fade>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ————————————————— CTA ————————————————— */
// function Cta() {
//   const { openConsult } = useApp();
//   return (
//     <section className="relative overflow-hidden text-bone">
//       <Img src={px(15758636, 2200)} alt="Looking down a sculptural oak staircase" className="absolute inset-0 h-full" drift={18} reveal={false} />
//       <div className="absolute inset-0 bg-coal/55" />
//       <div className="relative flex min-h-[86svh] flex-col items-center justify-center px-[3vw] py-16 text-center">
//         <Fade y={16}>
//           <p className="eyebrow text-bone/60">Begin your story</p>
//         </Fade>
//         <h2 className="mt-8 font-serif font-light leading-[1.03] serif-tight text-[clamp(2.6rem,7vw,7rem)]">
//           <Split text="Every home tells a story." scroll={false} /><br />
//           <em className="text-clay"><Split text="Let’s write yours." delay={0.12} scroll={false} /></em>
//         </h2>
//         <Fade delay={0.25}>
//           <Magnet className="mt-12">
//             <button
//               onClick={openConsult}
//               data-hover
//               data-cursor="Start"
//               className="group relative overflow-hidden bg-bone px-10 py-5 text-base font-medium uppercase tracking-[0.3em] text-ink"
//             >
//               <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 ease-out group-hover:translate-y-0" />
//               <span className="relative z-10">Book a consultation</span>
//             </button>
//           </Magnet>
//         </Fade>
//         <Fade delay={0.35} className="mt-8 text-lg text-bone/60">
//           <p>or write to <a href={`mailto:${OFFICE.email}`} data-hover className="link-line text-bone/85">{OFFICE.email}</a></p>
//         </Fade>
//       </div>
//     </section>
//   );
// }

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Featured />
      {/* <Philosophy /> */}
      <Services />
      <ProcessHome />
      <Testimonials />
      <Insta />
      {/* <Press /> */}
      {/* <Cta /> */}
    </main>
  );
}
