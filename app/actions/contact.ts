"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

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
    // In a real application, you would:
    // 1. Send an email using a service like Resend, SendGrid, or Nodemailer
    // 2. Store the submission in a database
    // 3. Integrate with a CRM like HubSpot or Salesforce

    // Log submission metadata without PII
    console.log("[contact] Submission received", {
      success: true,
      timestamp: new Date().toISOString(),
    });

    // Track conversion event (for analytics)
    // This would be handled client-side in the success redirect
    // but we can also log it server-side for CRM integration

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Revalidate the contact page to show any updated UI
    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
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
