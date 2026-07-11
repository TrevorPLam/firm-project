"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type GtagCommand = "config" | "event" | "js" | "conversion";
type GtagFunction = (command: GtagCommand, ...args: unknown[]) => void;

// Shared event parameters accepted by gtag.
export type GtagEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const GA_CONVERSION_ID = process.env.NEXT_PUBLIC_GA_CONVERSION_ID;
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track form submission success
    if (searchParams.get("success") === "true") {
      trackEvent("form_submission", {
        form_type: "contact",
        success: true,
      });

      // Track Google Ads conversion if configured
      if (GA_CONVERSION_ID) {
        trackConversion(`${GA_CONVERSION_ID}/contact_form`);
      }
    }

    // Track form submission error
    if (searchParams.get("error") === "true") {
      trackEvent("form_submission", {
        form_type: "contact",
        success: false,
      });
    }
  }, [searchParams, GA_CONVERSION_ID]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

// Helper functions for custom event tracking
export const trackEvent = (eventName: string, parameters?: GtagEventParams) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_location: url,
    });
  }
};

export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
      currency: "USD",
    });
  }
};

// Track specific marketing events
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location: location,
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent("service_view", {
    service_name: serviceName,
  });
};

export const trackPortfolioClick = (caseStudyTitle: string) => {
  trackEvent("portfolio_click", {
    case_study_title: caseStudyTitle,
  });
};
