"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | Elevate Digital",
  description: "Learn about Elevate Digital's privacy policy and how we protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Elevate Digital",
    description: "Learn about Elevate Digital's privacy policy.",
    type: "website",
  },
};

export default async function PrivacyPolicyPage() {
  cacheLife("days");
  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Last updated: January 2025
            </p>
          </ScrollReveal>

          <div className="prose prose-lg max-w-none">
            <ScrollReveal delay={100}>
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Elevate Digital ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We collect several types of information to provide and improve our services to you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Company information (company name, job title)</li>
                    <li>Technical information (IP address, browser type, device information)</li>
                    <li>Usage data (pages visited, time spent, features used)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Providing and maintaining our services</li>
                    <li>Communicating with you about our services</li>
                    <li>Improving our website and user experience</li>
                    <li>Analyzing usage patterns and trends</li>
                    <li>Responding to your inquiries and requests</li>
                    <li>Sending marketing communications (with your consent)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>To trusted service providers who assist us in operating our website</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                    <li>With your explicit consent for specific purposes</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Object to processing of your personal information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use cookies and similar tracking technologies to improve your experience, analyze usage, and assist in our marketing efforts. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    Email: hello@elevatedigital.com<br />
                    Phone: +1 (234) 567-890
                  </p>
                </section>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
