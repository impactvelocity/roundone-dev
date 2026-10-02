import posthog from "posthog-js";

// Runs in the browser before the app hydrates, on every page (landing, docs,
// app). The '2026-05-30' defaults capture pageviews on client-side navigation
// too, not just full loads. Skipped when the key is unset (e.g. local dev
// without PostHog configured).
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
  });
}
