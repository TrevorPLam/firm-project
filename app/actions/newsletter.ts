"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";

const newsletterSchema = z.object({
  email: z.email("Invalid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export type FormResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function subscribeNewsletter(formData: FormData): Promise<FormResult> {
  return runNewsletterSubscription(formData);
}

// Variant for useActionState / progressive enhancement.
export async function subscribeNewsletterAction(
  _prevState: FormResult | null,
  formData: FormData
): Promise<FormResult> {
  return runNewsletterSubscription(formData);
}

async function runNewsletterSubscription(formData: FormData): Promise<FormResult> {
  // Rate limiting check
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for") ?? "anonymous";
  const ip = forwardedFor.split(",")[0]?.trim() ?? "anonymous";
  
  const rateLimitKey = `newsletter:${ip}`;
  const isAllowed = checkRateLimit(rateLimitKey, 3, 600000); // 3 subscriptions per 10 minutes
  
  if (!isAllowed) {
    return {
      success: false,
      message: "Too many subscription attempts. Please try again later.",
    };
  }

  // Extract form data from FormData
  const rawData = {
    email: formData.get("email") as string,
  };

  // Validate the form data
  const validatedFields = newsletterSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { } = validatedFields.data;

  try {
    // In a real application, you would:
    // 1. Add the email to a newsletter service (e.g., Mailchimp, ConvertKit, Resend)
    // 2. Send a confirmation email (double opt-in)
    // 3. Store the subscription in a database

    // Log subscription metadata without PII
    console.log("[newsletter] Subscription received", {
      success: true,
      timestamp: new Date().toISOString(),
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Revalidate the blog pages to show any updated UI
    revalidatePath("/blog");

    return {
      success: true,
      message: "Thanks for subscribing! Check your inbox for confirmation.",
    };
  } catch {
    console.error("[newsletter] Subscription error", {
      success: false,
      timestamp: new Date().toISOString(),
    });
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
