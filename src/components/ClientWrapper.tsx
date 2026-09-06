"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/anim";
import { Ctx, setLenis, getLenis, type AppCtx } from "../lib/app";
import Cursor from "./Cursor";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import { Lightbox, ScrollProgress, FloatingCTA } from "./Overlays";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState<string>(pathname);
  const [lb, setLb] = useState<{ src: string | null; alt?: string }>({ src: null });

  /* ————— smooth scroll ————— */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (pathname !== route) {
      setRoute(pathname);
      getLenis()?.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [pathname, route]);

  /* ————— navigation ————— */
  const navigate = useCallback(
    (to: string) => {
      const target = to === "home" ? "/" : (to.startsWith("/") ? to : "/" + to);
      if (target === pathname) {
        getLenis()?.scrollTo(0, { duration: 1.4 });
        return;
      }
      
      router.push(target);
    },
    [pathname, router]
  );

  const normalizedRoute = pathname === "/" ? "home" : pathname.replace(/^\//, "");

  const ctx: AppCtx = {
    route: normalizedRoute,
    navigate,
    openConsult: () => navigate("contact"),
    openLightbox: (src, alt) => setLb({ src, alt }),
    closeLightbox: () => setLb({ src: null }),
  };

  return (
    <Ctx.Provider value={ctx}>
      <Cursor />
      {ready && <ScrollProgress />}
      {!ready && <Loader onDone={() => setReady(true)} />}

      {ready && (
        <div className="w-full overflow-x-clip">
          {!pathname.startsWith('/admin') && <Header />}
          <div key={pathname}>{children}</div>
          {!pathname.startsWith('/admin') && <Footer />}
          {!pathname.startsWith('/admin') && <FloatingCTA />}
        </div>
      )}

      <Lightbox src={lb.src} alt={lb.alt} />

      <div className="grain" aria-hidden />
    </Ctx.Provider>
  );
}
