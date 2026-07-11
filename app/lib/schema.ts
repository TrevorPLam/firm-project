import { siteUrl, absoluteUrl, siteName } from './site-config';

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName(),
  description: "Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.",
  url: siteUrl(),
  logo: absoluteUrl('/logo.png'),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-234-567-890",
    contactType: "sales",
    email: "hello@elevatedigital.com",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [
    "https://twitter.com/elevatedigital",
    "https://linkedin.com/company/elevatedigital",
    "https://github.com/elevatedigital",
  ],
};

export const webDesignServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Design & Development",
  description: "Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.",
  provider: {
    "@type": "Organization",
    name: siteName(),
  },
  serviceType: "Web Design",
  offers: {
    "@type": "Offer",
    price: "5000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export const seoServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Optimization",
  description: "Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.",
  provider: {
    "@type": "Organization",
    name: siteName(),
  },
  serviceType: "SEO Services",
  offers: {
    "@type": "Offer",
    price: "3000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export const analyticsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Analytics & Insights",
  description: "Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.",
  provider: {
    "@type": "Organization",
    name: siteName(),
  },
  serviceType: "Analytics Services",
  offers: {
    "@type": "Offer",
    price: "2000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer comprehensive digital services including web design & development, SEO optimization, and analytics & insights. Our services are tailored to help businesses transform their digital presence and achieve measurable results.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical web design project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The timeline varies based on project complexity. A typical website project takes 4-8 weeks from discovery to launch. We work closely with you to establish clear timelines and milestones.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with businesses of all sizes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we work with businesses of all sizes from startups to enterprises. We customize our approach to meet your specific needs and budget, ensuring you get the most value from our services.",
      },
    },
    {
      "@type": "Question",
      name: "What is your pricing structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer flexible pricing based on project scope and requirements. We provide detailed quotes after understanding your specific needs. Contact us for a free consultation and custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing support and maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer ongoing support and maintenance packages to ensure your digital presence continues to perform optimally. Our team is available 24/7 for critical issues.",
      },
    },
  ],
};

export function generateSchemaJsonLd(schema: Record<string, unknown>) {
  return JSON.stringify(schema);
}

export function generateArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    url: url,
    publisher: {
      "@type": "Organization",
      name: siteName(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl('/logo.png'),
      },
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema({
  name,
  description,
  price,
  currency = "USD",
}: {
  name: string;
  description: string;
  price: string;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: siteName(),
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateHowToSchema({
  name,
  description,
  steps,
  estimatedCost,
  estimatedTime,
  tool,
  supply,
}: {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  estimatedTime?: string;
  tool?: string;
  supply?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      image: step.image,
    })),
  };

  if (estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: estimatedCost.currency,
      value: estimatedCost.value,
    };
  }

  if (estimatedTime) {
    schema.estimatedTime = estimatedTime;
  }

  if (tool) {
    schema.tool = tool;
  }

  if (supply) {
    schema.supply = supply;
  }

  return schema;
}
