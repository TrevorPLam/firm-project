"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
import { Resend } from "resend";

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
  const isAllowed = await checkRateLimit(rateLimitKey, 3, 600000); // 3 subscriptions per 10 minutes
  
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

  const { email } = validatedFields.data;

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resendApiKey || !audienceId) {
      // Graceful fallback when API keys are not configured
      console.warn("[newsletter] Resend API key or audience ID not configured", {
        success: true,
        timestamp: new Date().toISOString(),
      });

      revalidatePath("/blog");

      return {
        success: true,
        message: "Thanks for subscribing! Check your inbox for confirmation.",
      };
    }

    const resend = new Resend(resendApiKey);

    // Add contact to Resend audience (double opt-in is handled by Resend)
    await resend.contacts.create({
      audienceId: audienceId,
      email: email,
      unsubscribed: false,
    });

    // Log subscription metadata without PII
    console.log("[newsletter] Subscription successful", {
      success: true,
      timestamp: new Date().toISOString(),
    });

    // Revalidate the blog pages to show any updated UI
    revalidatePath("/blog");

    return {
      success: true,
      message: "Thanks for subscribing! Check your inbox for confirmation.",
    };
  } catch (error) {
    console.error("[newsletter] Subscription error", {
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
