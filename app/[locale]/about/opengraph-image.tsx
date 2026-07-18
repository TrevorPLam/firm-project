import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
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
        Elevate Digital
      </div>
      <div
        style={{
          fontSize: "64px",
          fontWeight: 700,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        About Us
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 400,
          opacity: 0.8,
          textAlign: "center",
          maxWidth: "900px",
          lineHeight: 1.4,
        }}
      >
        We're a team of digital strategists, designers, and developers
        passionate about helping businesses succeed
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: 500,
          opacity: 0.7,
          marginTop: "40px",
        }}
      >
        Our Story & Team
      </div>
    </div>,
    {
      ...size,
    },
  );
}
