"use client";
/* Shared app context + smooth-scroll registry */
import { createContext, useContext } from "react";
import type Lenis from "lenis";

export type AppCtx = {
  route: string;
  navigate: (to: string) => void;
  openConsult: () => void;
  openLightbox: (src: string, alt?: string) => void;
  closeLightbox: () => void;
};

export const Ctx = createContext<AppCtx | null>(null);

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside provider");
  return ctx;
}

/* lenis singleton registry */
let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenisInstance = l);
export const getLenis = () => lenisInstance;
