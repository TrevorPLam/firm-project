interface JsonLdProps {
  data: Record<string, unknown>;
  nonce?: string;
}

/**
 * JsonLd component for rendering structured data with optional nonce support.
 * This is a deep module that provides a simple interface for JSON-LD injection.
 */
export function JsonLd({ data, nonce }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
