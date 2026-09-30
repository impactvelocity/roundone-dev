"use client";

import { useActionState } from "react";
import { Button } from "@heroui/react";
import { Field, TextInput } from "@/components/controls";
import { signIn } from "@/lib/auth";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(signIn, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {next && <input type="hidden" name="next" value={next} />}
      <Field label="Email">
        <TextInput
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state?.email}
          placeholder="you@example.com"
          required
          autoFocus
        />
      </Field>
      <Field label="Password">
        <TextInput name="password" type="password" autoComplete="current-password" required />
      </Field>
      {state?.error && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3.5 py-2.5 text-sm font-medium text-danger-soft-foreground">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" isDisabled={pending} className="mt-1 w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
