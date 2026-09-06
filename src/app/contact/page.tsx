"use client";
import { Split, Fade, Eyebrow, Rule } from "../../lib/anim";
import { useApp } from "../../lib/app";
import { OFFICE } from "../../data/content";
import { ConsultForm } from "../../components/Overlays";

export default function Contact() {
  const { openLightbox } = useApp();
  return (
    <main>
      <section className="px-[3vw] pb-16 pt-40 sm:pt-48">
        <Eyebrow>Contact — Lisboa atelier</Eyebrow>
        <h1 className="mt-8 max-w-5xl font-serif font-light leading-[1.0] serif-tight text-[clamp(2.8rem,7.5vw,7.5rem)]">
          <Split text="Start a" scroll={false} delay={0.15} />{" "}
          <em className="text-bronze"><Split text="conversation." scroll={false} delay={0.3} /></em>
        </h1>
        <Fade delay={0.35} className="mt-10 max-w-[50ch] text-xl leading-[1.85] text-mink">
          <p>
            Whether a whole villa or a single room that has never felt right — write, call, or
            visit. The studio answers personally, within one working day.
          </p>
        </Fade>
        <Rule className="mt-14" />
      </section>

      <section className="px-[3vw] pb-28">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* form */}
          <div className="lg:col-span-7">
            <Fade>
              <p className="eyebrow text-bronze">Project enquiry</p>
            </Fade>
            <div className="mt-10">
              <ConsultForm />
            </div>
          </div>

          {/* details */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10">
              <Fade>
                <div>
                  <p className="eyebrow text-mink">Atelier</p>
                  <p className="mt-3 max-w-[30ch] font-serif text-xl font-light leading-snug">{OFFICE.address}</p>
                  <p className="mt-2 text-base text-mink">{OFFICE.hours}</p>
                </div>
              </Fade>
              <Fade delay={0.05}>
                <div>
                  <p className="eyebrow text-mink">Direct</p>
                  <a href={`mailto:${OFFICE.email}`} data-hover className="link-line mt-3 block w-fit text-lg">{OFFICE.email}</a>
                  <a href={`tel:${OFFICE.phoneLink}`} data-hover className="link-line mt-2 block w-fit text-lg">{OFFICE.phone}</a>
                </div>
              </Fade>
              <Fade delay={0.1}>
                <div>
                  <p className="eyebrow text-mink">Elsewhere</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={OFFICE.whatsapp} target="_blank" rel="noreferrer" data-hover className="link-line w-fit text-lg">WhatsApp — instant during hours</a>
                    <a href={OFFICE.instagram} target="_blank" rel="noreferrer" data-hover className="link-line w-fit text-lg">Instagram — @modernart.interior</a>
                  </div>
                </div>
              </Fade>
              <Fade delay={0.15}>
                <button onClick={() => openLightbox("/newprojects/Aditya Antilia Living Room (1)/0.jpg", "The Santos atelier — worktable")} data-cursor="Open" className="group block w-full text-left">
                  <div className="img-zoom relative overflow-hidden">
                    <img src={"/newprojects/Aditya Antilia Living Room (1)/0.jpg"} alt="The studio atelier" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <p className="mt-3 text-lg uppercase tracking-[0.24em] text-mink">The Santos atelier — visits by appointment</p>
                </button>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="map-frame relative h-[460px] border-t border-ink/10">
        <iframe title="ModernArt Interior — Lisboa" src={OFFICE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bone/30 to-transparent" />
        <div className="absolute bottom-8 left-[5vw] bg-bone px-6 py-5 shadow-[0_20px_60px_rgb(34_29_23/0.15)]">
          <p className="eyebrow text-bronze">Find us</p>
          <p className="mt-2 font-serif text-lg font-light">Rua das Flores 122 — Chiado, Lisboa</p>
        </div>
      </section>
    </main>
  );
}
