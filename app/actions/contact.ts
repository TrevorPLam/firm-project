"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
import { getClientIdentifier } from "@/lib/ip-utils";
import { escapeHtml } from "@/lib/escape-html";
import { Resend } from "resend";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  company: z.string().trim().optional(),
  service: z.string().trim().min(1, "Please select a service"),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type FormResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(formData: FormData): Promise<FormResult> {
  return runContactFormSubmission(formData);
}

// Variant for useActionState / progressive enhancement.
export async function submitContactFormAction(
  _prevState: FormResult | null,
  formData: FormData
): Promise<FormResult> {
  return runContactFormSubmission(formData);
}

async function runContactFormSubmission(formData: FormData): Promise<FormResult> {
  // Honeypot check - reject if bot filled the hidden field
  const honeypotValue = formData.get("website");
  if (honeypotValue && typeof honeypotValue === "string" && honeypotValue.trim() !== "") {
    console.log("[contact] Honeypot triggered - bot detected");
    // Return success to not alert the bot
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  }

  // Rate limiting check
  const headerList = await headers();
  const identifier = getClientIdentifier(headerList);
  
  const rateLimitKey = `contact:${identifier}`;
  const isAllowed = await checkRateLimit(rateLimitKey, 5, 600000); // 5 requests per 10 minutes
  
  if (!isAllowed) {
    return {
      success: false,
      message: "Too many submissions. Please try again later.",
    };
  }

  // Extract form data from FormData
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string | undefined,
    service: formData.get("service") as string,
    budget: formData.get("budget") as string | undefined,
    message: formData.get("message") as string,
  };

  // Validate the form data
  const validatedFields = contactFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, company, service, budget, message } = validatedFields.data;

  try {
    // Check if email service is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("[contact] RESEND_API_KEY not configured, email service unavailable");
      return {
        success: false,
        message: "Email service is not configured. Please contact us directly.",
      };
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || "contact@elevatedigital.com";

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: "Elevate Digital <onboarding@resend.dev>",
      to: contactEmailTo,
      subject: `New Contact Form Submission from ${escapeHtml(name)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    });

    if (emailResult.error) {
      console.error("[contact] Email sending failed", {
        error: emailResult.error,
        timestamp: new Date().toISOString(),
      });
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    // Log submission metadata without PII
    console.log("[contact] Submission received", {
      success: true,
      timestamp: new Date().toISOString(),
    });

    // Revalidate the contact page to show any updated UI
    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch {
    console.error("[contact] Submission error", {
      success: false,
      timestamp: new Date().toISOString(),
    });
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
