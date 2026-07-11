import { createOGImageResponse, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image-helper";
import { getPostBySlug } from "@/lib/blog-data";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createOGImageResponse({
      title: "Blog Post Not Found",
      category: "Elevate Digital",
    });
  }

  return createOGImageResponse({
    title: post.title,
    description: post.excerpt,
    category: post.category,
    brand: "Elevate Digital Blog",
  });
}
