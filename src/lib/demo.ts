// Demo accounts. With DEMO_MODE=true, /signup is a public sign-up form and the
// accounts it creates are demo accounts (app_metadata.demo, which only the
// server can set). A demo account sees just the hackathons flagged `demo`
// (scripts/seed-demo.mjs creates three) and can't change anything: the
// database refuses its writes (migrations/*_demo_accounts.sql) and the app
// turns off the controls that would make them.

/** Whether public demo sign-ups are open on this instance. Server-only. */
export const DEMO_MODE = process.env.DEMO_MODE === "true";

/** Why a control is off for a demo account. */
export const DEMO_READ_ONLY = "Demo accounts can look around but can't change anything.";
