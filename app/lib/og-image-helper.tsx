import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_IMAGE_CONTENT_TYPE = "image/png";

interface OGImageProps {
  title: string;
  description?: string;
  category?: string;
  brand?: string;
}

/**
 * Reusable OG image component for consistent social card generation
 * Uses Satori (via next/og) to render JSX to PNG
 */
export function OGImage({
  title,
  description,
  category,
  brand = "Elevate Digital",
}: OGImageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        padding: "60px",
      }}
    >
      {category && (
        <div
          style={{
            fontSize: "24px",
            fontWeight: 500,
            opacity: 0.7,
            marginBottom: "20px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
      )}
      <div
        style={{
          fontSize: "64px",
          fontWeight: 700,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          {description}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          fontSize: "20px",
          fontWeight: 500,
          opacity: 0.5,
          letterSpacing: "1px",
        }}
      >
        {brand}
      </div>
    </div>
  );
}

/**
 * Create an ImageResponse with consistent OG image styling
 */
export function createOGImageResponse(props: OGImageProps): ImageResponse {
  return new ImageResponse(<OGImage {...props} />, {
    ...OG_IMAGE_SIZE,
  });
}
