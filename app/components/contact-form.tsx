"use client";

import { useActionState } from "react";
import { submitContactFormAction } from "../actions/contact";

interface ContactFormProps {
  showTitle?: boolean;
}

export function ContactForm({ showTitle = true }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitContactFormAction,
    null,
  );

  return (
    <div className="bg-background border-foreground/10 rounded-2xl border p-8">
      {showTitle && (
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Send us a message
        </h2>
      )}

      {state && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-6 rounded-lg p-4 ${
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

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium">
            Service Interested In *
          </label>
          <select
            id="service"
            name="service"
            required
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design & Development</option>
            <option value="seo">SEO Optimization</option>
            <option value="analytics">Analytics & Insights</option>
            <option value="full-service">Full Digital Strategy</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium">
            Project Budget
          </label>
          <select
            id="budget"
            name="budget"
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
          >
            <option value="">Select budget range</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={isPending}
            className="border-foreground/20 bg-background focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-50"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark w-full rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
