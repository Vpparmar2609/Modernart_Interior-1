"use client";
import { useEffect, useRef, useState } from "react";
import { OFFICE } from "../data/content";
import gsap from "gsap";
import { useApp, getLenis } from "../lib/app";

/* ————— shared form atoms ————— */
export function Field({
  label,
  type = "text",
  required = false,
  textarea = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="field">
      {textarea ? (
        <textarea
          rows={4}
          required={required}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          required={required}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <label>{label}</label>
    </div>
  );
}

export function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="field">
      <select
        className={value ? "has-value" : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="" disabled hidden />
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label>{label}</label>
      <svg className="pointer-events-none absolute right-0 top-5 text-ink/50" width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" />
      </svg>
    </div>
  );
}

const TYPES = ["Private residence", "Villa / second home", "Apartment renovation", "Commercial space", "Office", "Other"];
const BUDGETS = ["< €150k", "€150–400k", "€400k–1M", "€1M+", "To be defined"];

export function ConsultForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const check = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (status === "success" && check.current) {
      const len = check.current.getTotalLength();
      gsap.fromTo(check.current, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", delay: 0.2 });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="text-bronze">
          <circle cx="36" cy="36" r="34" stroke="currentColor" strokeOpacity="0.3" />
          <path ref={check} d="M22 37l10 10 18-22" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h3 className="mt-8 font-serif text-3xl font-light">Thank you, {form.name.split(" ")[0] || "friend"}.</h3>
        <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-mink">
          Your brief is with the studio. Expect a personal reply within 24 hours — usually with a few questions only a designer would ask.
        </p>
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-8 ${compact ? "" : "mt-2"}`} onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Choice label="Project type" options={TYPES} value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
      </div>
      <Choice label="Investment range" options={BUDGETS} value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
      <Field label="Tell us about the space — city, timeline, dreams" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />

      {status === "error" && <p className="text-red-500 text-sm">There was an error sending your message. Please try again or email us directly.</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        data-hover
        className="group relative w-full overflow-hidden bg-ink py-5 text-base font-medium uppercase tracking-[0.32em] text-bone disabled:opacity-50"
      >
        <span className="absolute inset-0 translate-y-full bg-walnut transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span className="relative z-10">{status === "loading" ? "Sending..." : "Request consultation"}</span>
      </button>
      <p className="text-center text-base tracking-wide text-mink">Private &amp; without obligation · reply within 24h</p>
    </form>
  );
}

/* ————— lightbox ————— */
export function Lightbox({ src, alt }: { src: string | null; alt?: string }) {
  const { closeLightbox } = useApp();
  const [vis, setVis] = useState<string | null>(null);

  useEffect(() => {
    if (src) setVis(src);
    else {
      const t = setTimeout(() => setVis(null), 400);
      return () => clearTimeout(t);
    }
  }, [src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  if (!vis) return null;
  return (
    <div
      className={`fixed inset-0 z-[190] flex items-center justify-center bg-coal/90 p-6 backdrop-blur-md transition-opacity duration-400 ${src ? "opacity-100" : "opacity-0"}`}
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={vis}
        alt={alt || "Gallery image"}
        className="max-h-[86vh] max-w-full object-contain shadow-2xl"
        style={{ transition: "transform .5s cubic-bezier(.19,1,.22,1)", transform: src ? "scale(1)" : "scale(.96)" }}
      />
      <p className="absolute bottom-6 left-6 text-lg uppercase tracking-[0.3em] text-bone/50">{alt}</p>
      <button data-hover aria-label="Close" className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:bg-bone hover:text-ink">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" /></svg>
      </button>
    </div>
  );
}

/* ————— floating CTA ————— */
export function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={OFFICE.whatsapp}
      target="_blank"
      rel="noreferrer"
      data-hover
      aria-label="Message on WhatsApp"
      className={`fixed bottom-7 right-7 z-[115] flex items-center gap-3 rounded-full border border-ink/10 bg-bone/90 py-3 pl-3 pr-3 shadow-[0_10px_40px_rgb(34_29_23/0.14)] backdrop-blur-lg transition-all duration-700 hover:bg-gold ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
    >
      <span className="hidden sm:inline-block text-lg font-medium uppercase tracking-[0.26em] text-ink">WhatsApp</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-bone">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
    </a>
  );
}

/* ————— scroll progress ————— */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lenis = getLenis();
    const onScroll = (e: { progress: number }) => {
      if (bar.current) bar.current.style.transform = `scaleX(${e.progress || 0})`;
    };
    lenis?.on("scroll", onScroll as never);
    return () => lenis?.off("scroll", onScroll as never);
  }, []);
  return <div ref={bar} className="fixed left-0 top-0 z-[125] h-[2px] w-full origin-left scale-x-0 bg-gold" />;
}
