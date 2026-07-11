"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
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
  // Rate limiting check
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for") ?? "anonymous";
  const ip = forwardedFor.split(",")[0]?.trim() ?? "anonymous";
  
  const rateLimitKey = `contact:${ip}`;
  const isAllowed = checkRateLimit(rateLimitKey, 5, 600000); // 5 requests per 10 minutes
  
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
      console.warn("[contact] RESEND_API_KEY not configured, skipping email send");
      // Revalidate the contact page to show any updated UI
      revalidatePath("/contact");
      return {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      };
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || "contact@elevatedigital.com";

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: "Elevate Digital <onboarding@resend.dev>",
      to: contactEmailTo,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Service:</strong> ${service}</p>
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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
