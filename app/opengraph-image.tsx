import {
  createOGImageResponse,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "./lib/og-image-helper";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return createOGImageResponse({
    title: "Web Design, SEO & Analytics",
    description: "Transform your digital presence",
    category: "Elevate Digital",
  });
}
