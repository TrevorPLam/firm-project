"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "../actions/newsletter";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, null);

  return (
    <div>
      {state && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            state.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {state.message}
          {state.errors && (
            <ul className="mt-2 text-sm">
              {Object.entries(state.errors).map(([field, errors]) => (
                <li key={field} className="list-disc ml-4">
                  {errors.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form action={formAction} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isPending}
          className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
