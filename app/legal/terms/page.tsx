"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/legal/terms",
  },
  title: "Terms of Service | Elevate Digital",
  description: "Read Elevate Digital's terms of service and conditions for using our website and services.",
  openGraph: {
    title: "Terms of Service | Elevate Digital",
    description: "Read Elevate Digital's terms of service.",
    type: "website",
  },
};

export default async function TermsOfServicePage() {
  cacheLife("days");
  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Last updated: January 2025
            </p>
          </ScrollReveal>

          <div className="prose prose-lg max-w-none">
            <ScrollReveal delay={100}>
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    By accessing or using Elevate Digital's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Services Description</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Elevate Digital provides the following services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Web design and development services</li>
                    <li>SEO optimization services</li>
                    <li>Analytics and insights services</li>
                    <li>Digital marketing consulting</li>
                    <li>Content strategy and creation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Client Responsibilities</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    As a client, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Provide accurate and complete information for your projects</li>
                    <li>Respond to communications in a timely manner</li>
                    <li>Provide necessary assets and materials as requested</li>
                    <li>Make payments according to agreed terms</li>
                    <li>Review and approve deliverables within specified timeframes</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Payment terms are as follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Project fees are outlined in project proposals and agreements</li>
                    <li>Payment schedules are agreed upon before project commencement</li>
                    <li>Late payments may incur additional fees</li>
                    <li>All payments are non-refundable unless otherwise specified</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Intellectual property rights are handled as follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Elevate Digital retains rights to pre-existing intellectual property</li>
                    <li>Client owns final deliverables upon full payment</li>
                    <li>Third-party assets remain property of their respective owners</li>
                    <li>License for use is granted upon full payment</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Confidentiality</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Both parties agree to maintain confidentiality of proprietary information shared during the course of our business relationship. This includes but is not limited to business strategies, technical information, and client data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Elevate Digital shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Termination</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Either party may terminate the agreement with written notice. Termination terms include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Client must pay for work completed up to termination date</li>
                    <li>Elevate Digital will deliver completed work upon payment</li>
                    <li>Outstanding obligations must be fulfilled</li>
                    <li>Termination does not affect accrued rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which Elevate Digital operates. Any disputes arising under these terms shall be resolved in accordance with applicable laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    For questions about these Terms of Service, please contact:
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
