import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import type { CSSProperties } from "react";
import { brand } from "@/lib/branding";
import "./globals.css";

export const metadata: Metadata = {
  title: brand.name,
  description: "Run hackathons, judge with agents and humans, publish winners.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} h-full antialiased`}
      style={{ "--accent": brand.color, "--accent-foreground": brand.colorForeground } as CSSProperties}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
