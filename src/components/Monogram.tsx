"use client";
export default function Monogram({
  className = "",
  dark = "#221d17",
  accent = "#b08d57",
}: {
  className?: string;
  dark?: string;
  accent?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M4 28 L13 3 L22 28" stroke={dark} strokeWidth="2.2" strokeLinecap="square" />
      <path d="M14 28 L21 10 L28 28" stroke={accent} strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="ModernArt Logo" className="h-20 md:h-28 w-auto object-contain" />
    </span>
  );
}
