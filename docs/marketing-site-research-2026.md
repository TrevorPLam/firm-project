# Marketing Site Research: Repositories, Fundamentals & Best Practices (2026)

## Executive Summary

This document compiles comprehensive research on marketing site repositories, fundamentals, best practices, and implementation approaches for businesses as of July 2026. The research covers modern technical stacks, content management strategies, SEO optimization, conversion rate optimization, security practices, and analytics measurement.

---

## 1. Marketing Site Repositories & Templates

### Popular GitHub Repositories (2025-2026)

#### **SaaSiaGreen Next.js 16 Template**
- **Tech Stack**: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 5
- **Features**: 
  - Single source of truth for branding, SEO, navigation in `data/site-config.ts`
  - Composable sections (Hero, Features, Team, Testimonials, Pricing, CTA)
  - Interactive pricing toggle with monthly/yearly billing
  - Local-first assets in `/public/assets`
- **Best for**: SaaS launches with centralized content controls
- **Repository**: `administrakt0r/SaaSiaGreen-nextjs16-template`

#### **Business Landing Page Template**
- **Tech Stack**: Next.js 15, Tailwind CSS v4, TypeScript, React 19
- **Features**:
  - Modern design with AOS scroll animations
  - Headless UI for accessible components
  - Lighthouse score 95+ across all metrics
  - Core Web Vitals optimized
- **Best for**: General business and startup landing pages
- **Repository**: `darkmage208/business-landing-page-template`

#### **NOVA Business Case Studies Template**
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Features**:
  - Dark mode support via next-themes
  - Modular architecture for scalability
  - Config-driven content for easy customization
  - Embla Carousel for mobile carousels
- **Best for**: Consultancies, agencies, and SaaS businesses
- **Repository**: `MohamedDjoudir/landing-page-template-3`

#### **Verve SaaS Template**
- **Tech Stack**: Next.js 15, TailwindCSS, Shadcn UI, Framer Motion
- **Features**:
  - Beautiful marketing pages, pricing, integrations, blog
  - React Hook Form for validations
  - Number Flow for animated numbers
  - Clean, responsive, animated UI
- **Best for**: Developer tools, automation, and digital product teams
- **Repository**: `Shreyas-29/verve`

#### **NOVA Agency Marketing Site**
- **Tech Stack**: Next.js 14, Tailwind CSS, Framer Motion, next-intl, Radix UI
- **Features**:
  - Multilingual support (4 locales)
  - Dynamic OG images generated at edge
  - JSON-LD structured data
  - Command palette, smooth scroll, animated hero
  - End-to-end accessibility
- **Best for**: Production-grade agency sites with international audiences
- **Repository**: `timur123-star/Landing-page-for-an-agency`

### Key Technical Trends (2025-2026)

- **Next.js 16.2.7** is the latest stable version (July 2026), with Next.js 15.5.18 as parallel LTS
- **React 19.2** is standard across modern templates
- **Tailwind CSS v4** for utility-first styling
- **TypeScript 5.1+** for type safety is universal
- **Framer Motion** for animations is widely adopted
- **Component-based architecture** with reusable sections
- **Config-driven content** for easy client handoffs
- **Performance optimization** (Lighthouse 95+ scores) is standard
- **Cache Components** (new in Next.js 16) enable caching arbitrary React subtrees, replacing experimental_ppr flag
- **React Compiler** is stable but **opt-in** (requires `reactCompiler: true` in next.config.js) - not automatic
- **400% faster dev startup** and **60% faster rendering** via Turbopack improvements in Next.js 16.2
- **Breaking change**: `middleware.ts` renamed to `proxy.ts` in Next.js 16 (edge runtime no longer supported)

---

## 2. Marketing Site Fundamentals & Best Practices

### Core Marketing Strategy Components

#### **Brand Foundation**
- Define your brand beyond logo and colors
- Answer key questions:
  - What problem do you solve and for whom?
  - What should customers feel when interacting with your brand?
  - Why should someone choose you over competitors?
- Write a single sentence describing what your business does, who it's for, and why it matters

#### **Customer Segmentation**
- Identify high-value customer segments (not "everyone")
- Build detailed profiles beyond demographics:
  - How do they search for solutions online?
  - What platforms do they use?
  - What language do they use to describe problems?
  - What concerns/objections do they have before buying?
- Start with existing customers - interview your best ones

#### **Website Evaluation Criteria**
- **Content accuracy**: No outdated services, team members, or blog posts
- **Page speed**: Load under 3 seconds on mobile (2026 standard)
- **Mobile optimization**: 60%+ of traffic is mobile; must be genuinely usable on small screens
- **Clear conversion path**: Visitors must immediately see what to do next

### Website Marketing Strategy Framework

A comprehensive website marketing strategy focuses on three main objectives:
1. **Attracting traffic** through search engines, social media, and other channels
2. **Engaging visitors** with relevant content and intuitive design
3. **Converting users** into customers, subscribers, or leads

### Key Components

#### **SEO-Driven Content Strategy**
- Keyword research aligned with user intent
- High-quality blog posts and landing pages
- On-page optimization (titles, meta descriptions, headings)
- Internal linking to improve navigation and rankings

#### **Website Design and User Experience**
- Fast loading speed
- Mobile responsiveness
- Clear navigation structure
- Visually appealing layouts
- Accessible and readable content

#### **Conversion Rate Optimization (CRO)**
- Call-to-action (CTA) placement
- Landing page structure
- Forms and checkout processes
- Trust signals (reviews, testimonials, certifications)

#### **Analytics and Performance Tracking**
- Website traffic sources
- User behavior
- Conversion rates
- Content performance

---

## 3. Modern Implementation Approaches (2025-2026)

### Headless CMS Architecture

#### **When to Use Headless CMS**
Headless architecture makes sense when you need to:
- Serve content to multiple platforms (website, app, displays)
- Use modern frameworks without CMS constraints
- Prioritize performance and scalability
- Plan to expand to new channels in 12-18 months

**Skip headless if**: Building a simple blog or small business website with no multi-channel needs

#### **Content Modeling Best Practices**

**Recommended Model**: Page + Sections + Section Types

```
Page:
- title
- slug  
- seo (meta title, description, canonical, OG image)
- sections[] (ordered)

Each section:
- type (string enum): hero, features, testimonials, faq, cta
- id (unique)
- data (fields for that type)
```

**Common Section Types**:

**Hero Section**:
- headline (string)
- subheadline (text)
- primaryCtaLabel (string)
- primaryCtaHref (string)
- secondaryCtaLabel (string, optional)
- secondaryCtaHref (string, optional)
- image (media, optional)
- variant (enum: centered, split, minimal)

**Features Grid**:
- items[]: title, description, icon

**Testimonials**:
- items[]: quote, name, role, company, avatar

**FAQ**:
- items[]: question, answer

**CTA**:
- headline, body, ctaLabel, ctaHref, variant

#### **Platform Selection Criteria**

**API-first, Developer-centric** (Sanity, Contentful, Strapi):
- Flexible content modeling, strong APIs
- Structured admin UI for editors
- Best for: Marketing teams needing structured content

**Git-based** (content stored as files):
- Great for developer-owned content like docs
- Awkward for non-technical editors
- Best for: Technical documentation

**Visual/Page-builder hybrids** (Storyblok, Builder.io):
- Visual preview for non-technical teams
- Couples content more tightly to layout
- Best for: Marketing teams who want visual editing
- Builder.io now has deeper AI-assisted layout editing

**Additional 2026 Options**:
- **Payload CMS**: Self-hosted, code-first, Postgres/MongoDB. Open core with paid cloud option. Scores 95/100 on TypeScript DX vs Contentful's 68. Best for engineering-heavy teams wanting control without Strapi's complexity.
- **Hygraph** (formerly GraphCMS): GraphQL-native, federated content. Best for sites pulling from multiple data sources.

**AI-Era Developments (2026)**:
- **Salesforce acquired Contentful** in 2026, reshaping enterprise CMS positioning for Agentforce integration
- **MCP (Model Context Protocol) support** is now a key evaluation criterion for AI agent content workflows
- **Strapi 5** includes built-in MCP server with permission-scoped tokens for AI-driven content operations
- CMS platforms evaluated on AI-readiness: real-time content APIs, structured data export for LLM pipelines, MCP support

**Key Evaluation Factors**:
1. Content modeling flexibility
2. Editor experience and preview capabilities
3. Developer experience (typed SDKs, webhooks)
4. Pricing model (per-seat, API-call limits)
5. Lock-in and export capabilities

#### **Frontend Framework Choices**

- **Next.js** (React-based): Supports static and server-side rendering
- **Nuxt** (Vue-based): Similar capabilities to Next.js
- **Astro**: Focused on static sites with minimal JavaScript
- **Gatsby**: React-based static site generator with strong plugin ecosystem

### Implementation Workflow

1. **Audit current content and channels**
2. **Define content model** (most critical step)
3. **Choose CMS platform** based on needs
4. **Select frontend framework**
5. **Set up development environment** with CI/CD
6. **Build and connect frontend**
7. **Configure roles and permissions**
8. **Optimize for SEO and AI search**
9. **Test, launch, and iterate**

---

## 4. SEO Best Practices for 2026

### Core SEO Principles

#### **1. Focus on Search Intent, Not Just Keywords**
- Identify user intent: information, comparison, or action
- Align content with the right intent for better rankings
- Consider: Are users looking for specific information? Making comparisons? Ready to take action?

#### **2. Incorporate EEAT Signals**
- **E**xperience, **E**xpertise, **A**uthoritativeness, and **T**rust
- Include author profiles, citations, case studies, original data
- Example: Healthcare blog with medical credentials, research references, government site links

#### **3. Optimize for AI-Driven Search and Overviews**
- Structure content with clear headings
- Use concise definitions
- Employ informational language
- Search engines increasingly use AI for personalized results

#### **4. Improve Website Experience**
- Easy navigation
- Clean layout
- Fast loading time
- Mobile-friendly design
- Simple fonts and graphics

#### **5. Implement Structured Data Smartly**
- Schema Markup helps search engines understand content
- Enhances eligibility for rich snippets, FAQs, product panels
- Use relevant schema types (e.g., Product Schema for e-commerce)

#### **6. Earn High-Quality Links**
- Focus on high-authority links from editorial mentions, digital PR, niche citations
- Avoid poor-quality backlinks from low DA websites
- Example: SaaS company publishes industry benchmark report cited by publications

#### **7. Keep Content Updated**
- Regularly update with newer data
- Refresh high-value pages
- Include latest images and infographics
- Remove broken links

#### **8. Build Authority with Topical Depth**
- Create comprehensive content clusters
- Demonstrate expertise in specific topics
- Build internal linking between related content

#### **9. Strengthen Internal Links**
- Create logical content hierarchy
- Link related content to help users and search engines
- Use descriptive anchor text

#### **10. Optimize for Branded Search**
- Optimize content for branded queries, reviews, reputational signals
- Build off-site presence across forums, news sites, niche publications
- Sites with consistent brand mentions get cited more by AI tools

---

### Generative Engine Optimization (GEO)

**What is GEO?**
GEO is the practice of structuring content and digital presence so that AI-powered search platforms (ChatGPT, Google AI Overviews, Perplexity, Claude, Copilot) can retrieve, cite, and recommend your brand when answering user questions.

**Why GEO Matters in 2026**:
- **AI-driven search traffic surged 527% year-over-year** (Jan-May 2025: 17,076 sessions → 107,100 sessions)
- **Traditional organic search dropped 40%** year-over-year (US organic Google referrals down 38% YoY)
- **25% of Google searches now trigger AI Overviews** (up from 13.14% in March 2025)
- **ChatGPT commands 87% of AI referral traffic** across AI search platforms
- **98% of CMOs** report investing in AEO (Answer Engine Optimization)
- GEO is now a distinct discipline alongside traditional SEO

**AEO vs GEO Distinction**:
- **AEO (Answer Engine Optimization)**: Focuses specifically on direct question-answer formats that AI engines can extract verbatim
- **GEO (Generative Engine Optimization)**: Broader discipline covering all tactics to be cited, recommended, and discovered by AI search engines
- Both are critical; AEO is a subset of GEO focused on Q&A content structure

**GEO Framework: Assess, Optimize, Measure, Iterate**

**Phase 1: Assess AI Search Readiness**
- Are major AI engines citing your content?
- Can AI crawlers read and understand your structured data?
- How does your brand show up in AI-generated answers?
- Where are competitors earning AI citations you're missing?

**Phase 2: Optimize Content for AI Engines**

**Structure Content for AI Retrieval**:
- Start each section with a clear, direct answer
- Use clean heading hierarchy (H2, H3) to signal topic
- Add TL;DR statements under key headings for standalone answers
- Include FAQ sections (AI engines rely heavily on Q&A pairs)

**Build Entity Authority**:
- Keep brand mentions consistent across the web
- Publish detailed About and author bio pages
- Pursue Wikipedia presence when appropriate
- Actively build and manage knowledge panel
- AI engines favor earned media (third-party coverage) over brand-owned content
- Digital PR and thought leadership are direct GEO levers

**Technical Foundations**:
- Implement schema markup (Article, Organization, FAQ, HowTo, Breadcrumb)
- Review robots.txt to ensure AI crawlers (GPTBot, ClaudeBot, PerplexityBot) aren't blocked
- Consider adding llms.txt file to guide AI systems
- Maintain fast load times, clean architecture, mobile optimization

**Prioritize Freshness and Depth**:
- Refresh cornerstone content regularly with updated data
- Add clear "Last updated" timestamps
- Publish original research, proprietary data, expert commentary
- AI engines weigh recency when selecting sources

**Phase 3: Measure AI Search Performance**
- Track AI Share of Voice (via Semrush and similar tools)
- Monitor citation frequency across AI platforms
- Measure brand visibility in AI-generated answers

**Phase 4: Iterate and Scale**
- Treat GEO as ongoing discipline, not one-time tweak
- Continuously build entity authority through earned media
- Update content based on AI citation patterns

### Technical SEO Requirements

#### **Core Web Vitals (2026 Standards)**

**Updated Thresholds (Effective January 2026)**:

**Important Distinction**: Google's official "Good" thresholds for ranking purposes remain LCP ≤ 2.5s and CLS ≤ 0.1. The tightened targets below (LCP < 2.0s, CLS < 0.08) represent performance-optimization community best practices for exceeding minimum standards.

**Largest Contentful Paint (LCP)**: Loading performance
- Google official "Good": ≤ 2.5 seconds
- Best practice target: **Under 2.0 seconds**
- Optimize: Server response times, image optimization, CDN usage

**First Contentful Paint (FCP)**: Initial render (new metric in 2026)
- Target: **Under 1.5 seconds**
- Optimize: Server response, critical CSS, render-blocking resources

**Interaction to Next Paint (INP)**: Responsiveness (replaced FID in 2024)
- Target: **Under 150 milliseconds** (Google official "Good")
- Optimize: JavaScript execution, main thread blocking
- Note: INP has the lowest pass rate (72%) and is the hardest metric to fix

**Cumulative Layout Shift (CLS)**: Visual stability
- Google official "Good": ≤ 0.1
- Best practice target: **Under 0.08**
- Optimize: Image dimensions, reserved space for dynamic content

**Smooth Frame Rate (SFR)**: Animation and scroll performance (new 2026 metric)
- Target: **≥ 90%** (maintain 60fps during scrolling and animations)
- Optimize: Avoid excessive will-change, use CSS transforms for animations, implement virtualization for long lists

**Important March 2026 Update**: Google shifted Core Web Vitals scoring to be evaluated **site-wide** rather than per-page. A handful of slow pages can now drag your entire domain's ranking signal.

#### **Mobile-First Optimization**
- Google uses mobile performance as primary ranking factor
- 60%+ of web traffic is mobile
- Must be genuinely usable on small screens, not just technically responsive

#### **Site Speed Requirements**
- Users expect sites to load in under 3 seconds on mobile (2026 standard)
- Page speed is both a ranking factor and conversion factor
- Beyond 3 seconds, abandonment rates rise sharply

---

## 5. Conversion Rate Optimization (CRO)

### CRO Fundamentals

**Definition**: Systematic process of increasing the percentage of website visitors who complete a desired action (form submission, demo request, purchase, trial signup)

**Importance in 2026**: AI Overviews reduce click-through rates, making traffic harder to earn. CRO is critical to extract more value from existing traffic.

### Industry Benchmarks (2026)

**Global Baselines**:
- **Global average website conversion rate**: 2.35% across all industries
- **Top 25% of advertisers**: 5.31% average conversion rate
- **Top 10% of advertisers**: 11.45% average conversion rate
- **E-commerce**: 2.5-3% average, 2-4% is "good" (3.3% across all platforms)
- **SaaS/B2B lead gen**: Median 3.8% (top 25% hit 11.6%+)
- **Landing pages**: 6.6% median (all-industry)
- **Desktop conversion rates**: ~4.3% vs mobile ~2.2% (roughly 2x gap)
- **Mobile traffic share**: 79-82.9% of SaaS landing page traffic is mobile
- **Email conversion**: 16.9% in SaaS (4x better than any other channel)
- **Copy simplicity impact**: Pages written at 5th-7th grade level convert at 12.9% vs 2.1% for professional-level copy (514% gap) - *treat as directional, not definitive*

**A/B Testing Reality**:
- **Only 12-15% of A/B tests** produce a statistically significant lift
- Critical context for setting realistic testing expectations
- Most tests stopped too early before reaching statistical significance

**CRO ROI**:
- **$223 return per dollar invested** in CRO
- **5x more cost-effective** than acquiring equivalent new traffic
- Cart abandonment rate: 69.99% average for e-commerce

### High-Impact CRO Tactics

#### **1. Above-the-Fold Value Proposition**
- Clarify value proposition immediately
- Answer "What? Why? What next?" before visitor scrolls
- Headline has 3 seconds to convince visitors they're in the right place

#### **2. Social Proof at Decision Points**
- Place testimonials, reviews, client logos near CTAs
- Add behavioral proof ("Most customers bought this with X")
- Display product ratings directly on product pages

#### **3. Trust Signals**
- Awards, certifications, partner badges, media mentions
- Security badges, return policies, safe payment indicators
- Case studies with specific metrics ("51.78% conversion rate" vs "great results")

#### **4. CTA Optimization**
- Use commitment-based phrasing ("I'll add to cart" vs "Add to cart")
- Replace generic CTAs with intent-driven language
- Ensure contrast, action copy, and tappable size

#### **5. Form Optimization**
- Reduce fields to essentials only
- Use multi-step flows for longer forms
- Add inline validation
- Enable address auto-completion

#### **6. Urgency and Scarcity**
- Time-limited offers ("Get 10% off this week")
- Low stock labels on high-demand products
- Limited-time access or availability

#### **7. Mobile-Specific Optimization**
- Click-to-call for high-value leads
- Simplified checkout flows
- Larger touch targets
- Streamlined forms
- 79%+ of SaaS landing page traffic is mobile, yet conversion rates lag desktop

#### **8. Copy Simplicity (High-Impact Lever)**
- Write at 5th-7th grade reading level for maximum conversion
- Simple copy converts 514% better than complex professional copy
- Simplified value propositions outperform sophisticated but cluttered approaches
- This single insight outperforms most structural A/B tests

#### **9. AI-Powered Personalization**
- Real-time personalization delivers up to 40% conversion lift (top-decile results, not averages)
- Personalized CTAs convert 202% better than generic defaults (top-decile results)
- AI-powered traffic routing delivers up to 30% more conversions
- AI predictive testing tools identify losing variants before reaching statistical significance
- Chatbots (when done well) improve conversion rates by ~27%

### The EPIC Testing Framework

Score test hypotheses on four dimensions (1-5 scale each):

- **E**xperiment: What will we learn even if it loses?
- **P**riority: What needs testing most right now?
- **I**mpact: How much could this move the needle?
- **C**ost: Is the ROI worth the effort?

**Total score = E + P + I + C (max 20). Run highest-scoring tests first.**

### Highest-Impact Test Categories

1. **Pricing and packaging tests** (annual vs monthly, tier structures, discount framing)
2. **Above-the-fold value proposition tests** (hero headline, sub-headline, primary CTA)
3. **Trust and proof tests** (testimonials, case studies, security badges)
4. **Friction-removal tests** (form fields, checkout flow, payment options)

---

## 6. Security Best Practices (2026)

### HTTPS/SSL Implementation

#### **Current Standards**
- HTTPS is a confirmed ranking signal since 2014
- 96.5% of pages in Google's top 10 use HTTPS (January 2026)
- Basic HTTPS is no longer enough - advanced security signals matter

#### **Implementation Requirements**

**SSL Certificate**:
- Valid, from trusted authority, not nearing expiry
- Covers all subdomains in use (wildcard SSL if needed)
- Automated monitoring for expiration alerts

**TLS Configuration**:
- Implement TLS 1.3 (modern standard)
- Disable TLS 1.0, 1.1 (known vulnerabilities)
- Use strong cipher suites (ECDHE with AES-GCM)
- Enable forward secrecy

**HSTS (HTTP Strict Transport Security)**:
- Force browsers to use HTTPS exclusively
- Prevent protocol downgrade attacks
- Header: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- Submit to HSTS preload list

**Mixed Content Prevention**:
- Ensure all resources load via HTTPS
- Use Content Security Policy headers
- Replace HTTP URLs with HTTPS equivalents

**Security Headers**:
- Content-Security-Policy (protects against XSS)
- X-Frame-Options (prevents clickjacking)
- Permissions-Policy (controls browser API access)

### Comprehensive Security Checklist

**Authentication**:
- Multi-factor authentication (MFA) for all admin access
- Strong password policies (minimum 12 characters)
- Rate-limited login attempts or CAPTCHA

**CMS Security** (WordPress example):
- Core, theme, and plugins kept current
- Default "admin" usernames changed
- Unused plugins/themes fully removed (not just deactivated)

**Monitoring**:
- Weekly Google Search Console security checks
- Monthly external malware scans
- Automated uptime/anomaly detection
- File integrity monitoring

**Web Application Firewall**:
- Active WAF (Cloudflare, Wordfence, or equivalent)
- Directory listing disabled
- Sensitive files not publicly accessible

---

## 7. Analytics & Measurement (2026)

### What's Changed in 2026

**Privacy Impact**:
- Cookie deprecation and privacy-first tracking reduce cross-site tracking
- Zero-party and first-party data collection is voluntary and less complete
- Quality data now matters more than volume

**AI Impact**:
- AI-powered attribution and predictive analytics change measurement
- Tools provide data-driven insights and real-time optimization
- Helps offset limitations from new data regulations

**Attribution Challenges**:
- Customer journeys are now multi-touch, multi-channel, non-linear
- Last-click attribution is no longer sufficient
- Must understand entire customer path from first to last click
- **GA4 data-driven attribution model** is now the default and recommended starting point for multi-touch analysis

**Server-Side Tagging**:
- Moves data processing from browser to controlled server environment
- Improves data governance and privacy compliance
- Mitigates tracking degradation from browser restrictions and ad blockers
- Enables operational flexibility (transform, validate, enrich data before sending)
- Potential performance benefits by moving vendor scripts off browser
- Implementation via Google Tag Manager Server-Side or similar solutions

### Core Metrics That Drive Real Growth

#### **Lead Quality Over Quantity**
- Focus on qualified leads, not just volume
- Measure lead-to-customer conversion rates
- Track lead source quality

#### **Customer Acquisition Cost (CAC) and Lifetime Value (LTV)**
- CAC: Total acquisition spend ÷ new customers acquired
- LTV: Average revenue per customer × customer lifespan
- Target LTV:CAC ratio of 3:1 or better

#### **Return on Ad Spend (ROAS)**
- Revenue from ads ÷ ad spend
- Measure by channel and campaign
- Optimize for highest ROAS channels

#### **Cost Per Lead (CPL)**
- Ad spend ÷ conversions
- CRO's direct impact: when conversion rate goes up, CPL goes down

#### **Average Order Value (AOV)**
- Total revenue ÷ number of orders
- Increase through upsells, bundles, pricing optimization

#### **Net Promoter Score (NPS)**
- Customer loyalty and satisfaction metric
- Predicts long-term growth and retention

### Metrics by Funnel Stage

**Top-of-Funnel (Awareness)**:
- Engagement signals (time on page, scroll depth)
- Social shares and mentions
- Branded search volume

**Mid-Funnel (Nurture)**:
- Email open and click-through rates
- Content consumption patterns
- Return visitor rates

**Bottom-of-Funnel (Revenue)**:
- Conversion rates
- Revenue attribution
- Customer retention and repeat purchases

### Metrics to Stop Tracking (Vanity Metrics)

- Social media likes (don't equal business growth)
- Bounce rate (unreliable in isolation)
- Time-on-site (misleading without context)
- Page views (without conversion context)

---

## 8. Accessibility & Compliance

### WCAG 2.2 & EAA Compliance

**WCAG 2.2 Current Standard**:
- WCAG 2.2 is the current enforceable standard (October 2023), replacing WCAG 2.1
- Backwards compatible - sites conforming to 2.2 also conform to 2.1
- New success criteria focus on cognitive disabilities, low vision, and mobile users
- Reference: https://www.w3.org/TR/WCAG22/

**European Accessibility Act (EAA)**:
- Became enforceable in EU member states in June 2025
- WCAG 2.2 compliance is now a legal requirement for many businesses with European customers
- Material compliance update for organizations serving EU markets

**WCAG 3.0 Working Draft (March 2026)**:
- **Not yet enforceable** - expected W3C Recommendation in 2028-2030, legal adoption 2030+
- Introduces 174 requirements (renamed from "outcomes")
- Replaces binary pass/fail model with Bronze/Silver/Gold scoring system
- Introduces APCA (Accessible Perceptual Contrast Algorithm) to replace 4.5:1 contrast ratio
- Expands coverage to VR, AR, spatial computing, authoring tools, and testing tools
- **Action for now**: Build to WCAG 2.2 AA (required for EAA compliance), monitor WCAG 3.0 developments for long-term planning
- Do NOT delay current compliance waiting for WCAG 3.0

**Why It Matters**:
- Legal requirements (ADA, EAA, ACA)
- Improves user experience for all visitors
- Expands audience reach
- Increasingly important for SEO

**Key Requirements**:
- Perceivable: Information must be presentable in ways users can perceive
- Operable: Interface components must be operable by users
- Understandable: Information and interface must be understandable
- Robust: Content must be robust enough to be interpreted by assistive technologies

**New WCAG 2.2 Success Criteria**:
- Focus Not Obscured (Minimum/Enhanced)
- Focus Appearance
- Dragging Movements
- Target Size (Minimum)
- Consistent Help
- Redundant Entry
- Accessible Authentication (Minimum/Enhanced)

**Implementation**:
- Alt text for images
- Keyboard navigation support
- Color contrast ratios (4.5:1 for normal text)
- Form labels and error messages
- Skip navigation links
- ARIA landmarks and roles
- Larger touch targets (44x44px minimum for mobile)

---

## 9. Implementation Checklist

### Pre-Launch Checklist

**Technical**:
- [ ] HTTPS properly configured with HSTS
- [ ] SSL certificate valid and monitored
- [ ] No mixed content warnings
- [ ] Core Web Vitals passing (LCP < 2.0s best practice / ≤2.5s official, FCP < 1.5s, INP < 150ms, CLS < 0.08 best practice / ≤0.1 official, SFR ≥ 90%)
- [ ] Mobile-friendly and responsive
- [ ] XML sitemap submitted to search engines
- [ ] Robots.txt configured correctly
- [ ] Canonical tags implemented
- [ ] Structured data (Schema markup) added
- [ ] `proxy.ts` used instead of deprecated `middleware.ts` (Next.js 16+)
- [ ] React Compiler explicitly enabled if memoization optimization is desired (`reactCompiler: true`)
- [ ] llms.txt file added to guide AI systems
- [ ] AI crawlers (GPTBot, ClaudeBot, PerplexityBot) not blocked in robots.txt
- [ ] Cache Components enabled for hybrid static/dynamic pages

**Content**:
- [ ] Clear value proposition above the fold
- [ ] Conversion paths defined and obvious
- [ ] Social proof near decision points
- [ ] Trust signals visible
- [ ] Content accurate and up-to-date
- [ ] Blog/content strategy in place
- [ ] Meta titles and descriptions optimized

**Analytics**:
- [ ] Analytics tracking installed
- [ ] Conversion tracking configured
- [ ] Goals and events set up
- [ ] UTM parameter standards defined
- [ ] Privacy compliance (GDPR, CCPA) addressed
- [ ] AI Share of Voice baseline established (Semrush AI Toolkit or equivalent)
- [ ] GA4 data-driven attribution model confirmed as active

**Security**:
- [ ] MFA enabled for admin access
- [ ] Security headers configured
- [ ] WAF active
- [ ] Malware scanning enabled
- [ ] Backup and recovery plan tested

**Accessibility**:
- [ ] WCAG 2.2 AA compliance confirmed (EAA-required for EU markets)
- [ ] WCAG 3.0 Working Draft reviewed for forward-planning (not yet enforceable)
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast validated
- [ ] Larger touch targets (44x44px minimum for mobile) implemented

### Ongoing Maintenance

**Weekly**:
- Check Google Search Console for issues
- Monitor uptime and performance
- Review security alerts

**Monthly**:
- Run malware scan
- Review analytics and conversion data
- Update content as needed
- Check SSL certificate expiration

**Quarterly**:
- Full performance audit
- Competitor analysis
- Conversion rate optimization review
- Security audit

---

## 10. Recommended Tech Stack (2026)

### For Small Business Marketing Sites

**Framework**: Next.js 16.2+ with App Router
**Styling**: Tailwind CSS v4
**Language**: TypeScript 5.1+
**CMS**: Sanity or Contentful (if content editors are non-technical)
**Hosting**: Vercel or Netlify
**Analytics**: Vercel Analytics or Google Analytics 4
**Forms**: Resend or Formspree
**Images**: Next.js Image optimization
**Key Features**: Cache Components, React Compiler support

### For Enterprise/Complex Marketing Sites

**Framework**: Next.js 16.2+ with App Router
**Styling**: Tailwind CSS v4 + custom design system
**Language**: TypeScript 5.1+
**CMS**: Contentful (Salesforce-bound), Sanity, or Hygraph (with custom content models) - prioritize MCP support for AI workflows
**CDN**: Cloudflare
**Analytics**: Server-side tagging (GTM Server-Side) + multiple tools
**Personalization**: AI-powered personalization platforms
**Search**: Algolia or site search
**A/B Testing**: VWO or Optimizely with AI predictive testing
**GEO**: AI Share of Voice tracking tools (Semrush AI Toolkit, Profound.ai, Otterly.ai)
**Security**: Secret scanning (GitHub native or similar) for MCP-connected tools

### For Agency/Portfolio Sites

**Framework**: Next.js 16.2+ with App Router
**Styling**: Tailwind CSS + Framer Motion
**Language**: TypeScript 5.1+
**i18n**: next-intl (for multilingual)
**Animations**: Framer Motion + Lenis (smooth scroll)
**Components**: Radix UI + shadcn/ui
**Forms**: React Hook Form + Zod
**Email**: Resend
**Hosting**: Vercel or Railway
**Key Features**: Dynamic OG images, multilingual support, accessibility-first

---

## 11. Key Takeaways

### Technical Implementation
1. **Next.js 16.2.7 with App Router** is the current standard (400% faster dev startup, Cache Components, React Compiler opt-in)
2. **Breaking change**: `middleware.ts` renamed to `proxy.ts` in Next.js 16
3. **Headless CMS** architecture is preferred for multi-channel needs and marketing teams
4. **Component-based, section-driven** architecture enables flexible page building
5. **Performance optimization** (Core Web Vitals) is critical for SEO and conversions
6. **TypeScript 5.1+ and Tailwind CSS v4** are universal across modern templates
7. **Updated Core Web Vitals thresholds**: Google official (LCP ≤2.5s, CLS ≤0.1) vs best practice targets (LCP <2.0s, CLS <0.08)
8. **New SFR metric** (Smooth Frame Rate ≥90%) for animation and scroll performance

### Marketing Strategy
1. **Brand clarity** must precede marketing investment
2. **Customer segmentation** is more effective than trying to appeal to everyone
3. **Content modeling** should focus on reusable blocks/sections
4. **Search intent** matters more than individual keywords
5. **GEO (Generative Engine Optimization)** is now critical: AI search up 527%, traditional search down 40%
6. **AEO (Answer Engine Optimization)** focuses on Q&A formats for AI extraction
7. **AI-driven search** optimization requires structured content and clear headings
8. **Entity authority** through earned media is critical for AI citations
9. **25% of Google searches** now trigger AI Overviews; ChatGPT holds 87% of AI referral traffic

### Conversion Optimization
1. **Above-the-fold clarity** is critical (3-second rule)
2. **Social proof** should be placed near decision points
3. **Mobile optimization** is essential (79%+ traffic, but 2x lower conversion rates)
4. **Form friction** reduction has high ROI
5. **Copy simplicity** (5th-7th grade level) delivers 514% conversion improvement (directional data)
6. **AI personalization** delivers up to 40% conversion lift (top-decile results)
7. **Test structural elements** (pricing, value proposition) before cosmetic changes
8. **Global average conversion rate**: 2.35% across all industries
9. **Only 12-15% of A/B tests** produce statistically significant lift
10. **CRO ROI**: $223 return per dollar invested, 5x more efficient than new traffic acquisition

### Security & Performance
1. **HTTPS is mandatory** but proper configuration matters (TLS 1.3, HSTS, no mixed content)
2. **Core Web Vitals** are ranking factors and conversion drivers (updated 2026 thresholds)
3. **Security headers** (CSP, HSTS) are trust signals for both Google and LLMs
4. **Mobile performance** is a primary ranking factor
5. **Site-wide Core Web Vitals scoring** (March 2026 update) means slow pages affect entire domain
6. **Monitoring** must be continuous, not one-time

### Analytics & Measurement
1. **Quality data matters more than volume** in privacy-first era
2. **Server-side tagging** is the primary technical response to cookie deprecation
3. **AI-powered attribution** helps fill gaps from cookie deprecation
4. **GA4 data-driven attribution** is the default and recommended starting point
5. **Focus on business metrics** (CAC, LTV, ROAS) over vanity metrics
6. **Multi-touch attribution** is required for complex customer journeys
7. **Conversion rate optimization** is the highest-ROI marketing activity
8. **AI Share of Voice** is the new KPI alongside traditional rankings (tracks brand mentions in AI-generated answers)

---

## 12. Resources & References

### Repositories
- SaaSiaGreen Next.js 16 Template: https://github.com/administrakt0r/SaaSiaGreen-nextjs16-template
- Business Landing Page Template: https://github.com/darkmage208/business-landing-page-template
- NOVA Template: https://github.com/MohamedDjoudir/landing-page-template-3
- Verve: https://github.com/Shreyas-29/verve
- NOVA Agency: https://github.com/timur123-star/Landing-page-for-an-agency
- ButterCMS Marketing Site: https://github.com/ButterCMS/buttercms-marketing-site-nextjs-react

### Documentation
- Next.js Documentation: https://nextjs.org/docs
- Next.js 16.2.7 Release: https://x.com/nextjs/status/2052489312944759202
- Next.js 16 Upgrade Guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Tailwind CSS: https://tailwindcss.com/docs
- Web Content Accessibility Guidelines (WCAG 2.2): https://www.w3.org/TR/WCAG22/
- WCAG 3.0 Working Draft: https://www.w3.org/TR/wcag-3.0/
- GEO Guide: https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142
- GEO Benchmarks 2026: https://presenceai.app/blog/2026-geo-benchmarks-ai-search-traffic-statistics
- State of GEO Q1 2026: https://www.superlines.io/articles/the-state-of-geo-in-q1-2026/
- Core Web Vitals: https://web.dev/vitals/
- Core Web Vitals Update 2026: https://webvitals.tools/blog/google-core-web-vitals-update-2026/
- Headless CMS AI Comparison: https://lushbinary.com/blog/best-headless-cms-ai-era-comparison/

### Tools
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights: https://pagespeed.web.dev/
- Google Search Console: https://search.google.com/search-console
- GTmetrix: https://gtmetrix.com/

---

*Research compiled July 2026. Sources include industry blogs, documentation, GitHub repositories, and best practice guides from leading digital marketing agencies and SEO professionals.*
