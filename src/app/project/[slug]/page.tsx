"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Split, Fade, Eyebrow, Img, Rule, Marquee } from "../../../lib/anim";
import { useApp } from "../../../lib/app";
import { type Project } from "../../../data/content";

function VideoWalk({ p }: { p: Project }) {
  const [play, setPlay] = useState(false);
  return (
    <section className="px-[3vw] py-12">
      <div className="flex items-end justify-between">
        <Eyebrow>The walkthrough</Eyebrow>
        <Fade y={14}>
          <span className="text-lg uppercase tracking-[0.24em] text-mink">02:14 — film by the atelier</span>
        </Fade>
      </div>
      <Fade className="mt-10">
        <div className="relative overflow-hidden bg-coal">
          <video
            className="aspect-video w-full object-cover"
            src={p.video}
            poster={p.poster}
            controls={play}
            playsInline
            preload="none"
          />
          {!play && (
            <button
              onClick={() => setPlay(true)}
              data-cursor="Play"
              className="group absolute inset-0 flex items-center justify-center bg-coal/35 transition-colors duration-700 hover:bg-coal/20"
              aria-label="Play walkthrough film"
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full border border-bone/60 bg-coal/30 text-bone backdrop-blur transition-all duration-700 group-hover:scale-110 group-hover:bg-bone group-hover:text-ink">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor"><path d="M1 1.5v17l16-8.5-16-8.5z" /></svg>
              </span>
            </button>
          )}
        </div>
      </Fade>
    </section>
  );
}

import { use } from "react";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<{project: any, next: any, related: any[]} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/slug/${resolvedParams.slug}`)
      .then(res => {
         if (!res.ok) throw new Error('Not found');
         return res.json();
      })
      .then(d => {
         setData(d);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) return <div className="min-h-screen bg-coal flex items-center justify-center text-bone">Loading...</div>;
  if (!data || !data.project) return <div className="min-h-screen bg-coal flex items-center justify-center text-bone">Project not found</div>;

  return <ProjectDetail project={data.project} next={data.next} related={data.related} />;
}

function ProjectDetail({ project, next, related }: { project: any, next: any, related: any[] }) {
  const { navigate, openLightbox } = useApp();
  const roomsRef = useRef<HTMLDivElement>(null);
  const [g0, g1, g2, g3, g4] = project.images || [];

  useEffect(() => {
    const el = roomsRef.current;
    if (!el) return;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      startX = pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const x = pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <main>
      {/* ————— hero ————— */}
      <section className="relative h-[100svh] overflow-hidden bg-coal text-bone">
        <Img src={project.hero} alt={`${project.title} — hero`} className="absolute inset-0 h-full" drift={12} eager />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/45 via-coal/10 to-coal/70" />
        <p
          className="absolute right-[4vw] top-1/2 hidden -translate-y-1/2 rotate-180 text-lg uppercase tracking-[0.4em] text-bone/60 lg:block"
          style={{ writingMode: "vertical-rl" }}
        >
          {project.location} — {project.year}
        </p>
        <div className="absolute inset-x-0 bottom-0 px-[3vw] pb-14">
          <Fade y={16} delay={0.45}>
            <p className="eyebrow text-bone/70">
              {project.index} — {project.cats.join(" · ")} · {project.year}
            </p>
          </Fade>
          <h1 className="mt-5 font-serif font-light leading-[0.98] serif-tight text-[clamp(3.5rem,10vw,10rem)]">
            <Split text={project.title} scroll={false} delay={0.55} />
          </h1>
          <Fade delay={0.85} className="mt-5 flex flex-wrap items-center gap-6 text-lg text-bone/70">
            <em className="font-serif text-xl text-clay">{project.tagline}</em>
            <span className="hidden h-px w-16 bg-bone/40 sm:block" />
            <span className="eyebrow">{project.area} · {project.duration}</span>
          </Fade>
        </div>
      </section>

      {/* ————— meta ————— */}
      <section className="border-b border-ink/10 px-[3vw]">
        <div className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ["Location", project.location],
            ["Year", project.year],
            ["Area", project.area],
            ["Duration", project.duration],
            ["Scope", project.scope.join(", ")],
          ].map(([k, v], i) => (
            <Fade key={k} delay={i * 0.06} className="border-l border-ink/10 pl-5">
              <p className="eyebrow text-mink">{k}</p>
              <p className="mt-2 max-w-[24ch] font-serif text-lg font-light leading-snug">{v}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* ————— story ————— */}
      <section className="px-[3vw] py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Project note</Eyebrow>
              <p className="mt-7 font-serif text-3xl font-light italic leading-snug text-bronze">
                “{project.tagline}.”
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {project.description.map((d: string, i: number) => (
              <Fade key={i} delay={i * 0.08} className="mb-8 max-w-[62ch] text-xl leading-[1.85] text-ink/80">
                <p>{d}</p>
              </Fade>
            ))}
            <Fade delay={0.16} className="mt-12">
              <div className="flex flex-wrap gap-3">
                {project.materials.map((m: string) => (
                  <span key={m} className="border border-ink/15 px-4 py-2 text-lg uppercase tracking-[0.22em] text-mink">
                    {m}
                  </span>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ————— gallery compositions ————— */}
      <section className="px-[3vw]">
        {g0 && (
          <button onClick={() => openLightbox(g0.src, g0.cap)} data-cursor="Open" className="block w-full">
            <Img src={g0.src} alt={g0.cap} ratio="16/9" drift={8} />
            <Fade y={14}><p className="mt-4 text-base uppercase tracking-[0.24em] text-mink">01 — {g0.cap}</p></Fade>
          </button>
        )}

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {g1 && (
            <div className="lg:col-span-5">
              <button onClick={() => openLightbox(g1.src, g1.cap)} data-cursor="Open" className="block w-full">
                <Img src={g1.src} alt={g1.cap} ratio="3/4" drift={9} />
                <Fade y={14}><p className="mt-4 text-base uppercase tracking-[0.24em] text-mink">02 — {g1.cap}</p></Fade>
              </button>
            </div>
          )}
          {g2 && (
            <div className="lg:col-span-6 lg:col-start-7 lg:mt-40">
              <button onClick={() => openLightbox(g2.src, g2.cap)} data-cursor="Open" className="block w-full">
                <Img src={g2.src} alt={g2.cap} ratio="4/5" drift={7} />
                <Fade y={14}><p className="mt-4 text-base uppercase tracking-[0.24em] text-mink">03 — {g2.cap}</p></Fade>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ————— horizontal rooms film ————— */}
      <section className="mt-16 overflow-hidden bg-paper py-12">
        <div className="flex items-end justify-between px-[3vw]">
          <Eyebrow>Rooms in sequence</Eyebrow>
          <Fade y={14}>
            <span className="hidden text-lg uppercase tracking-[0.24em] text-mink sm:block">Drag horizontally</span>
          </Fade>
        </div>
        <div ref={roomsRef} data-lenis-prevent className="no-bar mt-12 flex gap-4 overflow-x-auto px-[3vw] cursor-grab active:cursor-grabbing">
          {[g3, g4, ...project.images].filter(Boolean).slice(0, 6).map((g: any, i: number) => (
            <button
              key={i}
              onClick={() => openLightbox(g.src, g.cap)}
              data-cursor="Open"
              className="group relative w-[82vw] shrink-0 sm:w-[58vw] lg:w-[44vw]"
            >
              <div className="img-zoom grade relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image src={g.src} alt={g.cap} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 70vw" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-base uppercase tracking-[0.24em] text-mink">{g.cap}</p>
                <span className="font-serif text-2xl font-light text-clay">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {project.video && <VideoWalk p={project} />}

      {/* ————— material palette & furniture ————— */}
      <section className="border-t border-ink/10 px-[3vw] py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Material palette</Eyebrow>
            <h3 className="mt-6 font-serif text-4xl font-light serif-tight">What the house is made of</h3>
            <div className="mt-10 space-y-4">
              {project.mood.map((m: any, i: number) => (
                <Fade key={m.name} delay={i * 0.05} className="flex items-center gap-5 border-b border-ink/10 pb-4">
                  <span className="h-10 w-10 rounded-full border border-ink/10" style={{ background: m.tone }} />
                  <span className="flex-1 font-serif text-xl font-light">{m.name}</span>
                  <span className="text-lg uppercase tracking-[0.2em] text-mink">{m.tone}</span>
                </Fade>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Furniture schedule — edit</Eyebrow>
            <h3 className="mt-6 font-serif text-4xl font-light serif-tight">Key pieces</h3>
            <div className="mt-10">
              {project.furniture.map((f: any, i: number) => (
                <Fade key={f.piece} delay={i * 0.05} className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/10 py-5">
                  <span className="col-span-1 font-serif text-clay">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-6 font-serif text-xl font-light leading-snug sm:col-span-5">{f.piece}</span>
                  <span className="col-span-5 text-base uppercase tracking-[0.18em] text-mink sm:col-span-3">{f.maker}</span>
                  <span className="col-span-12 text-base uppercase tracking-[0.18em] text-taupe sm:col-span-3 sm:text-right">{f.room}</span>
                </Fade>
              ))}
              <Fade delay={0.2} className="mt-8 text-lg text-mink">
                <p>Full FF&E schedules are shared with clients — every object is documented, insured and serviceable for decades.</p>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* ————— related ————— */}
      <section className="bg-paper px-[3vw] py-16">
        <div className="flex items-end justify-between">
          <Eyebrow>Related works</Eyebrow>
          <Fade y={14}>
            <button onClick={() => navigate("projects")} data-hover className="link-line text-lg font-medium uppercase tracking-[0.28em] text-bronze">
              All projects
            </button>
          </Fade>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {related.map((r: any) => (
            <Fade key={r.slug}>
              <button onClick={() => navigate("project/" + r.slug)} data-cursor="View" className="group block w-full text-left">
                <div className="img-zoom grade relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image src={r.poster} alt={r.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                  <div>
                    <h4 className="font-serif text-2xl font-light transition-colors duration-500 group-hover:text-bronze">{r.title}</h4>
                    <p className="mt-1 text-base uppercase tracking-[0.2em] text-mink">{r.location} — {r.year}</p>
                  </div>
                  <span className="font-serif italic text-clay">{r.cats[0]}</span>
                </div>
              </button>
            </Fade>
          ))}
        </div>
      </section>

      {/* ————— next project ————— */}
      <section className="relative overflow-hidden bg-coal text-bone">
        <Img src={next.hero} alt={next.title} className="absolute inset-0 h-full opacity-80" drift={14} reveal={false} />
        <div className="absolute inset-0 bg-coal/60" />
        <button onClick={() => navigate("project/" + next.slug)} data-cursor="Next" className="relative flex min-h-[70svh] w-full flex-col items-center justify-center px-[3vw] py-12 text-center">
          <Fade y={16}><p className="eyebrow text-bone/60">Next project</p></Fade>
          <h2 className="mt-6 font-serif font-light leading-none serif-tight text-[clamp(4rem,11vw,11rem)]">
            <Split text={next.title} />
          </h2>
          <Fade delay={0.15} className="mt-6 text-lg uppercase tracking-[0.3em] text-bone/60">
            <p>{next.location} — {next.year}</p>
          </Fade>
        </button>
      </section>

      {/* ————— marquee strip ————— */}
      <div className="border-y border-ink/10 bg-bone py-5">
        <Marquee duration={36}>
          {[project.title, project.location, ...project.materials, project.tagline].map((t: string, i: number) => (
            <span key={i} className="mx-8 flex items-center gap-4 font-serif text-xl font-light italic text-ink/45">
              {t} <span className="inline-block h-1 w-1 rounded-full bg-bronze/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="h-6" />
      <Rule className="mx-[5vw]" />
      <div className="h-6" />
    </main>
  );
}
