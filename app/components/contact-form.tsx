"use client";

import { useActionState } from "react";
import { submitContactFormAction } from "../actions/contact";

interface ContactFormProps {
  showTitle?: boolean;
}

export function ContactForm({ showTitle = true }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactFormAction, null);

  return (
    <div className="bg-background p-8 rounded-2xl border border-foreground/10">
      {showTitle && (
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Send us a message
        </h2>
      )}

      {state && (
        <div
          className={`mb-6 p-4 rounded-lg ${
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

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service Interested In *
          </label>
          <select
            id="service"
            name="service"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
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
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Project Budget
          </label>
          <select
            id="budget"
            name="budget"
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
          >
            <option value="">Select budget range</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none disabled:opacity-50"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
