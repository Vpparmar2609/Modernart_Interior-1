"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, Split, Fade, Eyebrow, Img, Rule } from "../../lib/anim";
import { useApp } from "../../lib/app";
import { CATEGORIES } from "../../data/content";

const RATIOS = ["4/5", "3/4", "16/12", "4/5", "1/1", "3/4", "16/12", "4/5"];

export default function Projects() {
  const { navigate } = useApp();
  const [cat, setCat] = useState("All");
  const [loc, setLoc] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error);
      
    // Check URL for location filter
    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get('location');
    if (locationParam) {
      setLoc(locationParam);
    }
  }, []);

  const list = projects.filter((p) => {
    const matchesCat = cat === "All" || p.cats?.includes(cat);
    const matchesLoc = loc === "All" || p.location?.includes(loc);
    return matchesCat && matchesLoc;
  });

  useEffect(() => {
    if (!grid.current || list.length === 0) return;
    gsap.fromTo(
      grid.current.querySelectorAll(".work-item"),
      { opacity: 0, y: 40, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.07 }
    );
  }, [cat, list.length]);

  return (
    <main>
      {/* hero */}
      <section className="px-[3vw] pb-16 pt-40 sm:pt-48">
        <Eyebrow>Portfolio — 2008 / 2026</Eyebrow>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif font-light leading-[0.98] serif-tight text-[clamp(3rem,8.5vw,8.5rem)]">
            <Split text="Selected" scroll={false} delay={0.15} />{" "}
            <em className="text-bronze"><Split text="works" scroll={false} delay={0.3} /></em>
          </h1>
          <Fade delay={0.3} className="max-w-[38ch] pb-3 text-lg leading-relaxed text-mink">
            <p>
              Eight commissions shown as they were lived — villas, apartments, kitchens and
              workplaces, photographed quietly and told completely.
            </p>
          </Fade>
        </div>
        <Rule className="mt-12" />
      </section>

      {/* filters */}
      <div className="sticky top-[57px] z-40 border-b border-ink/10 bg-bone/85 backdrop-blur-xl">
        <div className="no-bar flex items-center gap-2 overflow-x-auto px-[3vw]">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              data-hover
              className={`relative whitespace-nowrap px-4 py-4 text-lg font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${
                cat === c ? "text-bronze" : "text-ink/60 hover:text-ink"
              }`}
            >
              {c}
              <span className={` ml-1.5 font-serif text-base italic ${cat === c ? "text-bronze/70" : "text-ink/30"}`}>
                {c === "All" ? projects.length : projects.filter((p) => p.cats?.includes(c)).length}
              </span>
              <span
                className={`absolute inset-x-4 bottom-0 h-px bg-bronze transition-transform duration-500 ${
                  cat === c ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="no-bar flex items-center gap-2 overflow-x-auto px-[3vw] border-t border-ink/5">
          {["All", "Ahmedabad", "Gandhinagar", "Vadodara", "Surat", "Mumbai"].map((l) => (
            <button
              key={l}
              onClick={() => setLoc(l)}
              data-hover
              className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${
                loc === l ? "text-bronze" : "text-ink/60 hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* masonry */}
      <section className="px-[3vw] py-10">
        <div ref={grid} className="masonry masonry-3">
          {list.map((p, i) => (
            <article key={p.slug} className="work-item group mb-10">
              <button onClick={() => navigate("project/" + p.slug)} data-cursor="View" className="block w-full text-left">
                <div className="relative">
                  <Img src={p.poster || p.hero} alt={`${p.title}`} ratio={RATIOS[i % RATIOS.length]} drift={7} reveal={false} />
                  <span className="absolute left-4 top-4 z-10 bg-bone/85 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-ink backdrop-blur">
                    {p.cats?.join(" · ")}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                  <div>
                    <h2 className="font-serif text-2xl font-light transition-colors duration-500 group-hover:text-bronze">
                      {p.title}
                    </h2>
                    <p className="mt-1 text-base uppercase tracking-[0.2em] text-mink">
                      {p.location} · {p.area} — {p.year}
                    </p>
                  </div>
                  <span className="font-serif text-lg italic text-clay">{p.tagline}</span>
                </div>
              </button>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <Fade className="mt-16 flex justify-center">
            <p className="text-center text-lg text-mink">No projects found. Please run the migration or add projects via the admin panel.</p>
          </Fade>
        )}

        <Fade className="mt-16 flex justify-center">
          <p className="text-center text-lg text-mink">
            Further private commissions available upon introduction —
            <button onClick={() => navigate("contact")} data-hover className="link-line ml-2 text-bronze">
              speak with the studio
            </button>
          </p>
        </Fade>
      </section>
    </main>
  );
}
