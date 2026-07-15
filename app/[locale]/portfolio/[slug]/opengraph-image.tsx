import { ImageResponse } from "next/og";
import { createLocalPortfolioAdapter } from "@/lib/content/local-portfolio-adapter";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolioAdapter = createLocalPortfolioAdapter();
  const study = await portfolioAdapter.getBySlug(slug);

  if (!study) {
    return new ImageResponse(
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
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Case Study Not Found
        </div>
      </div>,
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
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
        Elevate Digital Portfolio
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: 600,
          opacity: 0.8,
          marginBottom: "30px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {study.category}
      </div>
      <div
        style={{
          fontSize: "56px",
          fontWeight: 700,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: "30px",
          maxWidth: "1000px",
        }}
      >
        {study.title}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 600,
          opacity: 0.9,
          marginBottom: "20px",
        }}
      >
        {study.client}
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: 400,
          opacity: 0.8,
          textAlign: "center",
          maxWidth: "900px",
          lineHeight: 1.4,
        }}
      >
        {study.description}
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: 500,
          opacity: 0.6,
          marginTop: "40px",
        }}
      >
        {study.timeline}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
