"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "../actions/newsletter";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletterAction,
    null,
  );

  return (
    <div>
      {state && (
        <div
          className={`mb-4 rounded-lg p-4 ${
            state.success
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
          {state.errors && (
            <ul className="mt-2 text-sm">
              {Object.entries(state.errors).map(([field, errors]) => (
                <li key={field} className="ml-4 list-disc">
                  {errors.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form
        action={formAction}
        className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isPending}
          className="border-foreground/20 focus:ring-primary/20 flex-1 rounded-lg border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>

        {/* Honeypot field for bot protection */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <label htmlFor="website">Leave this blank</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}
