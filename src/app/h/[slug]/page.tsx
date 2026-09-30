import { notFound, redirect } from "next/navigation";
import { getViewableHackathon } from "@/lib/hackathons";

const HOME = { setup: "setup/schema", judging: "judging/projects", results: "results" } as const;

export default async function HackathonIndex({ params }: PageProps<"/h/[slug]">) {
  const { slug } = await params;
  const hackathon = await getViewableHackathon(slug);
  if (!hackathon) notFound();
  redirect(`/h/${slug}/${HOME[hackathon.stage]}`);
}
