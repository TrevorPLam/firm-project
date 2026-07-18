import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "@/components/json-ld";

describe("JsonLd", () => {
  it("should render script tag with correct type", () => {
    const { container } = render(<JsonLd data={{ "@context": "https://schema.org" }} />);
    const script = container.querySelector("script");
    expect(script).toHaveAttribute("type", "application/ld+json");
  });

  it("should serialize data correctly", () => {
    const testData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Test Org",
    };
    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector("script");
    expect(script?.innerHTML).toBe(JSON.stringify(testData));
  });

  it("should include nonce when provided", () => {
    const { container } = render(
      <JsonLd data={{ test: "data" }} nonce="test-nonce" />,
    );
    const script = container.querySelector("script");
    expect(script).toHaveAttribute("nonce", "test-nonce");
  });

  it("should not include nonce when not provided", () => {
    const { container } = render(<JsonLd data={{ test: "data" }} />);
    const script = container.querySelector("script");
    expect(script).not.toHaveAttribute("nonce");
  });

  it("should handle complex nested data", () => {
    const complexData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://example.com",
        },
      ],
    };
    const { container } = render(<JsonLd data={complexData} />);
    const script = container.querySelector("script");
    expect(script?.innerHTML).toBe(JSON.stringify(complexData));
  });
});
