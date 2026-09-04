import type { Metadata } from "next";
import "../index.css";
import ClientWrapper from "../components/ClientWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s — ModernArt Interior",
    default: "ModernArt Interior — Atelier of Warm Minimalism · Lisbon",
  },
  description: "Luxury interior design based in Lisbon, Portugal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-coal bg-sand overflow-x-clip w-full">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
