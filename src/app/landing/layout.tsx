import type { Metadata } from "next";
import { brand } from "@/lib/branding";
import { MotionRoot } from "./_components/motion-root";
import "./landing.css";

// Only reachable on the RoundOne site hosts (lib/site.ts): the proxy rewrites
// "/" here for signed-out visitors. The .landing wrapper scopes landing.css.

export const metadata: Metadata = {
  title: `${brand.name} · Self-hosted hackathon judging and management`,
  description: `Self-hosted hackathon judging and management. The ${brand.name} agent, built on NVIDIA Nemotron and Nebius, checks every project so your judges can score the ideas.`,
};

export default function LandingLayout({ children }: LayoutProps<"/landing">) {
  return (
    <div className="landing flex-1">
      <MotionRoot>{children}</MotionRoot>
    </div>
  );
}
