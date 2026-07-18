// Revalidate route for Sanity CMS webhooks
// DDD: Route handler as a deep module - handles webhook-based cache invalidation
// Security: Uses next-sanity's parseBody for signature validation with timing-safe comparison

import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { getSanityRevalidateSecret } from "@/lib/env";

// Webhook payload type from Sanity
interface SanityWebhookPayload {
  _type?: string;
  slug?: {
    current?: string;
  };
  _id?: string;
}

export async function POST(req: NextRequest) {
  try {
    const secret = getSanityRevalidateSecret();

    if (!secret) {
      return new Response(
        "Missing environment variable SANITY_REVALIDATE_SECRET",
        { status: 500 }
      );
    }

    // Parse and validate webhook signature
    // parseBody handles timing-safe signature verification internally
    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      req,
      secret,
      true // Wait for Content Lake propagation to avoid stale data
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body) {
      return new Response("Bad Request: Empty body", { status: 400 });
    }

    // Revalidate based on document type
    const { _type, slug } = body;

    if (!_type) {
      return new Response("Bad Request: Missing _type", { status: 400 });
    }

    // Path-based revalidation for documents with slugs
    if (slug?.current) {
      // Revalidate the specific document path
      revalidatePath(`/${_type}/${slug.current}`, "page");
      
      // Also revalidate listing pages
      if (_type === "blogPost") {
        revalidatePath("/blog", "page");
        revalidateTag("blog", "fetch-cache");
      } else if (_type === "caseStudy") {
        revalidatePath("/portfolio", "page");
        revalidateTag("portfolio", "fetch-cache");
      }
    } else {
      // For documents without slugs, revalidate by type tag
      revalidateTag(_type, "fetch-cache");
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: slug?.current,
      now: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate] Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
