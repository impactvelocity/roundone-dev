"use client";

import { useActionState } from "react";
import { Button } from "@heroui/react";
import { Field, TextInput } from "@/components/controls";
import { signUpDemo } from "@/lib/auth";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUpDemo, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field label="Name" hint="Optional">
        <TextInput name="name" autoComplete="name" defaultValue={state?.name} maxLength={80} autoFocus />
      </Field>
      <Field label="Email">
        <TextInput
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state?.email}
          placeholder="you@example.com"
          required
        />
      </Field>
      <Field label="Password" hint="8+ characters">
        <TextInput name="password" type="password" autoComplete="new-password" minLength={8} required />
      </Field>
      {state?.error && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3.5 py-2.5 text-sm font-medium text-danger-soft-foreground">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" isDisabled={pending} className="mt-1 w-full">
        {pending ? "Creating your account…" : "Create demo account"}
      </Button>
    </form>
  );
}
