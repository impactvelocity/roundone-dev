"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_MODE } from "@/lib/demo";
import { checkRateLimits, clientIp, hashKey } from "@/lib/intake";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type SignInState = { error?: string; email?: string } | undefined;
export type SignUpState = { error?: string; email?: string; name?: string } | undefined;

// Only follow same-origin paths, so ?next= can't bounce users to another site.
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message, email };

  redirect(safeNext(formData.get("next")));
}

/**
 * Create a demo account and sign in with it. Only while DEMO_MODE is on. The
 * account is made with the secret key so it can carry app_metadata.demo,
 * which users can't set themselves; that flag is what keeps it read-only.
 */
export async function signUpDemo(_prev: SignUpState, formData: FormData): Promise<SignUpState> {
  if (!DEMO_MODE) return { error: "Sign-ups are closed on this instance." };
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and a password.", email, name };
  if (password.length < 8) return { error: "Use a password of at least 8 characters.", email, name };

  const admin = createAdminClient();
  if (!admin) return { error: "Sign-ups need SUPABASE_SECRET_KEY set on the server.", email, name };

  // A few accounts per address an hour, and a ceiling for everyone, so a script can't fill the user table.
  const ip = hashKey(clientIp(await headers())).slice(0, 24);
  const retryAfter = await checkRateLimits([
    { bucket: `signup:${ip}`, limit: 5, seconds: 3600 },
    { bucket: "signup", limit: 200, seconds: 3600 },
  ]);
  if (retryAfter !== null) {
    return { error: `Too many sign-ups. Try again in ${Math.ceil(retryAfter / 60)} minutes.`, email, name };
  }

  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    // No confirmation email: a demo account can't change or send anything.
    email_confirm: true,
    app_metadata: { demo: true },
    user_metadata: name ? { display_name: name } : {},
  });
  if (createError) {
    const taken = createError.code === "email_exists" || createError.code === "user_already_exists";
    return { error: taken ? "There's already an account with that email. Sign in instead." : createError.message, email, name };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message, email, name };
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
