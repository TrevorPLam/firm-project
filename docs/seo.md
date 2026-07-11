# SEO Documentation

This document covers SEO strategies, AI crawler permissions, and Generative Engine Optimization (GEO) for the Elevate Digital marketing site.

## Table of Contents

- [AI Crawler Permissions](#ai-crawler-permissions)
- [Generative Engine Optimization (GEO)](#generative-engine-optimization-geo)
- [llms.txt File](#llms-txt-file)
- [AI Crawler Testing](#ai-crawler-testing)
- [GEO Monitoring](#geo-monitoring)
- [AI Share of Voice Tracking](#ai-share-of-voice-tracking)
- [Related Resources](#related-resources)

---

## AI Crawler Permissions

### Overview

As of 2026, AI crawlers have become a critical discovery channel for marketing sites. Our robots.txt configuration explicitly allows major AI crawlers to index our content for AI search answers while maintaining control over training vs search crawlers.

### Current AI Crawler Configuration

Our production robots.txt includes the following AI crawler permissions:

#### OpenAI Crawlers
- **GPTBot**: Training crawler - allows content in future GPT model training
- **OAI-SearchBot**: ChatGPT Search crawler - enables citations in ChatGPT Search
- **ChatGPT-User**: User-initiated fetcher - allows users to fetch specific pages

#### Anthropic Crawlers
- **ClaudeBot**: Training crawler - allows content in Claude model training
- **Claude-SearchBot**: Claude web search crawler - enables citations in Claude search
- **Claude-User**: User-initiated fetcher - allows users to fetch specific pages

#### Perplexity Crawlers
- **PerplexityBot**: Search index crawler - enables citations in Perplexity answers

#### Google AI Training
- **Google-Extended**: Training-only crawler - allows Gemini training
  - **Important**: Blocking this does NOT affect Google Search rankings

#### Common Crawl
- **CCBot**: Common Crawl crawler - allows content in public web archive
  - This indirectly allows training for many open-source models

#### Blocked Crawlers
- **Bytespider**: ByteDance crawler with history of robots.txt non-compliance
  - Blocked due to documented non-compliance with robots.txt standards

### Rationale for Allow Strategy

For a marketing site like Elevate Digital, we prioritize AI visibility over training control because:

1. **Business Model Dependency**: Our business model depends on being cited in AI answers
2. **GEO Benefits**: AI citations drive high-intent traffic and brand visibility
3. **Competitive Advantage**: Most competitors still block AI crawlers, creating opportunity
4. **Training Trade-off**: Content training is acceptable for the visibility benefits

### Environment-Based Configuration

- **Production**: All AI crawlers explicitly allowed (except non-compliant Bytespider)
- **Non-production**: All crawlers blocked to prevent indexing of staging/preview content

---

## Generative Engine Optimization (GEO)

### What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing content for AI-powered search engines like ChatGPT, Claude, Perplexity, and Google AI Overviews. Unlike traditional SEO which optimizes for ten-blue-links search, GEO focuses on making content cite-worthy and easily understood by AI systems.

### GEO Strategy for Elevate Digital

#### Content Structure
- Clear, authoritative content on services and case studies
- Structured data and schema markup where applicable
- Comprehensive service descriptions with clear value propositions
- Case studies with measurable results and client outcomes

#### Content Quality Signals
- Original, high-quality content that provides unique insights
- Clear attribution and authorship information
- Up-to-date information and current best practices
- Comprehensive coverage of topics within our domain

#### Technical Implementation
- Properly configured robots.txt for AI crawler access
- Semantic HTML structure for better content understanding
- Fast page load times and good Core Web Vitals
- Mobile-responsive design

### GEO vs Traditional SEO

| Aspect | Traditional SEO | GEO |
|--------|----------------|-----|
| Target | Google, Bing search results | ChatGPT, Claude, Perplexity answers |
| Optimization | Keywords, backlinks, technical SEO | Content quality, clarity, authority |
| Citation Format | Blue links with snippets | Inline citations in AI responses |
| Measurement | Search rankings, organic traffic | AI citation frequency, referral traffic |

---

## llms.txt File

### What is llms.txt?

llms.txt is a standardized Markdown file at the root of a domain (`/llms.txt`) that provides AI systems with a curated overview of a website's most important content. Proposed by Jeremy Howard of Answer.AI in 2024, it's designed for Business-to-Agent (B2A) interactions - helping AI agents understand and navigate your content effectively.

### Purpose

Unlike sitemaps (which list all pages for search engines) or robots.txt (which controls crawler access), llms.txt provides:

- **Curated content map**: Highlights the most important pages and resources
- **Context for AI systems**: Helps LLMs understand your site structure and purpose
- **B2A optimization**: Enables AI agents to find and cite your content accurately
- **Inference-time usage**: Primarily used when users explicitly request information about your brand

### Our llms.txt Structure

Our llms.txt file follows the 2026 specification with these sections:

#### H1 Header
- Site name: "Elevate Digital"

#### Blockquote Summary
- One-sentence description of what Elevate Digital is and who it's for
- Additional context about our approach and differentiators

#### H2 Sections
- **Core Services**: Links to service pages (SEO, PPC, content, web development)
- **Portfolio & Case Studies**: Client work and success stories
- **About & Company**: Company information, team, pricing
- **Resources & Blog**: Blog content and educational resources
- **Legal & Policies**: Privacy policy, terms of service
- **Contact & Support**: Contact form and newsletter signup
- **Technical & SEO**: Sitemap, robots.txt, and technical documentation

#### Optional Section
- Internal documentation (SEO, security, rate limiting docs)
- Lower-priority resources that AI agents can skip under context pressure

### Link Format

All links follow the exact specification format:
```markdown
- [Page Title](https://elevatedigital.com/page): One-line description of content and when to fetch it.
```

### How AI Systems Use llms.txt

1. **Content Discovery**: AI agents fetch llms.txt to understand site structure
2. **Context Building**: Use the curated links to build context about your brand
3. **Citation Accuracy**: Reference the correct pages when answering user questions
4. **Priority Handling**: Skip "Optional" sections when context is limited

### When to Update llms.txt

Update llms.txt when:
- Adding new major service offerings or pages
- Restructuring the website navigation
- Publishing significant case studies or portfolio pieces
- Adding important documentation or resources
- Changing pricing models or contact methods
- Annually for comprehensive review

### Validation

To validate your llms.txt file:

1. **Accessibility**: Ensure it's available at `https://elevatedigital.com/llms.txt`
2. **Format**: Verify proper Markdown structure (H1, blockquote, H2 sections)
3. **Links**: Check all links are valid and return 200 status
4. **Descriptions**: Ensure each link has a clear, one-line description
5. **Parsing**: Test with AI systems to ensure they can parse correctly

### Best Practices

- **Keep it concise**: Focus on the most important pages
- **Clear descriptions**: Each link should explain when an agent should fetch it
- **Logical grouping**: Use H2 sections to group related content
- **Use Optional wisely**: Put secondary information in the Optional section
- **Update regularly**: Keep llms.txt in sync with site changes
- **Test with AI**: Verify AI systems can understand and use your llms.txt

### Related Resources

- [llms.txt Specification](https://llmstxt.org/) - Official specification and examples
- [LLMs.txt in 2026: The Full Guide](https://limy.ai/blog/llms.txt-in-2026-the-full-guide) - Comprehensive guide on B2A optimization
- [llmstxt.site](https://llmstxt.site/) - Directory of llms.txt files on the web

---

## AI Crawler Testing

### Testing AI Crawler Access

To verify AI crawlers can access your site, test with curl using specific user-agent strings:

#### Test GPTBot Access
```bash
curl -A "GPTBot/1.3" https://elevatedigital.com/robots.txt
```

#### Test OAI-SearchBot Access
```bash
curl -A "OAI-SearchBot/1.0" https://elevatedigital.com/robots.txt
```

#### Test ClaudeBot Access
```bash
curl -A "ClaudeBot" https://elevatedigital.com/robots.txt
```

#### Test PerplexityBot Access
```bash
curl -A "PerplexityBot" https://elevatedigital.com/robots.txt
```

### Validation Checklist

- [ ] robots.txt is accessible at `/robots.txt`
- [ ] AI crawlers are not blocked in robots.txt
- [ ] Production environment has correct AI crawler rules
- [ ] Staging/preview environments block all crawlers
- [ ] No conflicting CDN-level AI crawler rules
- [ ] Sitemap is referenced in robots.txt

---

## GEO Monitoring

### Metrics to Track

#### Citation Metrics
- Frequency of citations in ChatGPT Search
- Frequency of citations in Claude web search
- Frequency of citations in Perplexity answers
- Citation quality (position in response, context)

#### Traffic Metrics
- Referral traffic from AI platforms
- Engagement metrics from AI-referred traffic
- Conversion rates from AI-referred traffic

#### Content Performance
- Which pages are most frequently cited
- Which content topics perform best in AI answers
- Content gaps vs competitor AI citations

### Monitoring Tools

- **Google Search Console**: Traditional SEO metrics
- **AI Platform Analytics**: When available from platforms
- **Referral Traffic Analysis**: GA4 referral reports
- **Manual Citation Checks**: Regular searches in AI platforms

### Optimization Cycle

1. **Audit**: Check current AI citation performance
2. **Identify Gaps**: Find content not being cited but should be
3. **Optimize**: Improve content clarity and authority
4. **Monitor**: Track citation changes over time
5. **Iterate**: Continuously refine GEO strategy

---

## AI Share of Voice Tracking

### What is AI Share of Voice?

AI Share of Voice (AI SOV) measures how often your brand is mentioned or cited in AI-powered search engines like ChatGPT, Claude, Perplexity, Google AI Overviews, and other answer engines. Unlike traditional Share of Voice which measures visibility in search results, AI SOV tracks your brand's presence in AI-generated responses.

### Why Track AI Share of Voice?

As of 2026, AI search has become a critical discovery channel:

- **94% of CMOs** plan to increase AI visibility spend (Conductor State of AEO/GEO 2026)
- **12% of digital budgets** are now allocated to AI visibility by enterprises
- **4-5x higher conversion rates** from AI search visitors vs traditional organic search
- **72 billion messages/month** processed by ChatGPT alone
- **$5 trillion projected** in agentic commerce by 2030 (McKinsey)

Tracking AI SOV helps you:
- Understand your brand's visibility in AI answers
- Identify competitor AI citation strategies
- Measure the impact of GEO optimization efforts
- Justify AI visibility investments to stakeholders
- Optimize content for AI citation patterns

### AI Share of Voice Tracking Tools

The AI visibility tools market raised $300M+ in funding between 2025-2026. Here are the leading platforms:

#### Enterprise Platforms

**Profound** (Category Leader)
- Funding: $155M, $1B valuation (Series C, February 2026)
- Customers: 10% of Fortune 500 (Target, Walmart, Ramp, MongoDB, Figma)
- Features: Answer Engine Insights, Agent Analytics, Conversation Explorer, AI-optimized content generation
- Pricing: Lite from $499/month, Enterprise $30K-$100K+ annually
- Best for: Fortune 500 marketing teams with established budgets

**Peec AI** (Fastest-Growing Challenger)
- Funding: $29M, $4M+ ARR in 10 months
- Customers: 1,300+ (Chanel, Axel Springer, ElevenLabs, Wix)
- Features: Brand mention monitoring across ChatGPT, Perplexity, Claude, Gemini, AI Overviews
- Pricing: Starter €75/month, Pro €169/month, Enterprise from €424/month
- Best for: Mid-market B2B and consumer brands, GDPR-native data handling

#### Mid-Market & SMB Platforms

**Otterly.AI** (Most Accessible)
- Founded: 2023, bootstrapped or small seed funding
- Features: Brand mention tracking across ChatGPT, Gemini, Copilot, Perplexity
- Pricing: From $29/month (lowest credible entry point)
- Best for: Solo marketers, agencies, SMBs starting AI visibility monitoring

**Semrush AI Visibility Toolkit** (Legacy SEO Platform)
- Features: AI SOV tracking bolted onto existing Semrush platform
- Pricing: $99/month (bundled with Semrush subscription)
- Best for: Teams already using Semrush who want AI SOV data layered on existing reports

**Ahrefs AI Visibility** (Legacy SEO Platform)
- Features: AI citation tracking integrated with Ahrefs suite
- Pricing: Starting at $29/month (Ahrefs Starter)
- Best for: Teams already using Ahrefs for SEO

#### Other Notable Platforms

- **Bluefish**: Enterprise-focused, well-funded
- **Scrunch AI**: Enterprise-focused, well-funded
- **AthenaHQ**: $95/month first month, $295/month thereafter
- **HubSpot AEO Grader**: Free grader + $50/month monitoring, bundled with HubSpot
- **Rankscale, Rankshift**: Budget challengers with broadest engine coverage

### Tool Selection Guide

| Company Size | Recommended Tool | Rationale |
|--------------|------------------|-----------|
| Fortune 500 | Profound | Enterprise features, named customers, board-ready reporting |
| Mid-Market B2B | Peec AI | Strong analytics without enterprise pricing, GDPR-native |
| SMB / Solo | Otterly.AI | Lowest entry point ($29/month), monitoring-focused |
| Existing Semrush Users | Semrush AI Toolkit | Bundled with existing contract, familiar interface |
| Existing Ahrefs Users | Ahrefs AI Visibility | Bundled with existing contract, familiar interface |
| HubSpot Users | HubSpot AEO Grader | Free grader + bundled monitoring |

### AI Share of Voice Metrics to Track

#### Primary Metrics
- **Citation Frequency**: How often your brand appears in AI answers
- **Citation Position**: Where your brand appears in AI responses (first mention, middle, end)
- **Citation Context**: Quality of context around your brand mention
- **Competitor Comparison**: Your AI SOV vs competitors in your category
- **Platform Coverage**: Presence across different AI platforms (ChatGPT, Claude, Perplexity, etc.)

#### Secondary Metrics
- **Sentiment Analysis**: Positive vs negative brand mentions in AI answers
- **Source Attribution**: Which of your pages are most frequently cited
- **Prompt Coverage**: Which user prompts trigger your brand mentions
- **Trend Analysis**: Changes in AI SOV over time

#### Conversion Metrics
- **Referral Traffic**: Visitors from AI platforms to your site
- **Conversion Rate**: Conversion rate from AI-referred traffic
- **Engagement Metrics**: Time on site, pages per session from AI traffic

### Baseline Establishment Process

Before optimizing AI SOV, establish a baseline:

1. **Select Tracking Tool**: Choose platform based on company size and budget
2. **Define Prompts**: Identify 20-50 key prompts relevant to your business
3. **Identify Competitors**: List 5-10 primary competitors for comparison
4. **Run Initial Report**: Generate baseline AI SOV report
5. **Document Metrics**: Record baseline citation frequency, position, and sentiment
6. **Save Report**: Export and save baseline report for future comparison

### Monitoring Cadence

Recommended monitoring frequency:

- **Weekly**: Citation alerts and significant changes
- **Monthly**: Full AI SOV report and trend analysis
- **Quarterly**: Competitive analysis and strategy review
- **Annually**: Tool evaluation and vendor selection review

### Optimization Recommendations

Based on AI SOV data, optimize for better visibility:

#### Content Optimization
- **Citation Gaps**: Identify topics where competitors are cited but you're not
- **Content Clarity**: Improve content that's cited but with poor context
- **Authority Signals**: Add authorship, dates, and credentials to cited content
- **Structured Data**: Implement schema markup to help AI understand content

#### Technical Optimization
- **Page Speed**: Ensure cited pages load quickly (Core Web Vitals)
- **Mobile Optimization**: Ensure cited pages work well on mobile
- **Accessibility**: Make cited pages accessible to all users
- **Canonical URLs**: Ensure proper canonicalization to avoid duplicate content issues

#### Strategic Optimization
- **Keyword-Intent Alignment**: Align content with actual user prompts
- **Competitive Analysis**: Learn from competitors' citation patterns
- **Platform-Specific**: Optimize for platforms where you have low visibility
- **Content Expansion**: Create content for topics with high prompt volume but low citation

### Reporting Template

Monthly AI SOV Report should include:

```
## AI Share of Voice Report - [Month Year]

### Executive Summary
- Overall AI SOV: X% (up/down Y% from last month)
- Citation frequency: X mentions (up/down Y%)
- Top performing platform: [Platform]
- Key insights: [2-3 bullet points]

### Platform Breakdown
- ChatGPT: X citations (Y% change)
- Claude: X citations (Y% change)
- Perplexity: X citations (Y% change)
- Google AI Overviews: X citations (Y% change)

### Competitive Analysis
- Your brand: X% AI SOV
- Competitor A: Y% AI SOV
- Competitor B: Z% AI SOV

### Top Cited Pages
1. [Page URL] - X citations
2. [Page URL] - Y citations
3. [Page URL] - Z citations

### Citation Gaps
- [Topic]: Competitors cited, you are not
- [Topic]: Competitors cited, you are not

### Action Items
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]
```

### Integration with Existing SEO

AI SOV tracking should complement, not replace, traditional SEO:

- **Unified Reporting**: Combine AI SOV metrics with traditional SEO metrics
- **Shared KPIs**: Include AI SOV in overall marketing KPIs
- **Cross-Functional**: Coordinate SEO, content, and marketing teams on AI optimization
- **Budget Allocation**: Allocate budget based on combined SEO + AI SOV performance

### Common Mistakes

- **No Baseline**: Optimizing without establishing baseline metrics
- **Wrong Tool**: Choosing enterprise tools for SMB needs (or vice versa)
- **Ignoring Context**: Focusing on citation frequency without citation quality
- **No Action**: Tracking metrics without acting on insights
- **Platform Overload**: Trying to optimize for too many platforms at once
- **Competitor Blindness**: Not tracking competitor AI SOV strategies

### Related Tasks

- P2-004-01: Select AI Tracking Tool (HUMAN)
- P2-004-02: Establish AI Share of Voice Baseline (HUMAN)
- P2-004-03: Update SEO Documentation (AGENT - completed)
- P2-004-04: Set Up Monitoring Schedule (HUMAN)
- P2-004-05: Conduct First Monthly Review (HUMAN)

---

## Related Resources

### Internal Documentation
- [Marketing Site Research 2026](./marketing-site-research-2026.md) - Comprehensive research on marketing site best practices
- [Security Documentation](./security.md) - Security headers and configurations
- [Rate Limiting Documentation](./rate-limiting.md) - Rate limiting implementation

### External Resources
- [OpenAI Bot Documentation](https://platform.openai.com/docs/bots) - Official OpenAI crawler documentation
- [Anthropic Crawler Documentation](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) - Anthropic crawler information
- [Google AI Crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers) - Google crawler documentation
- [llms.txt Specification](https://llmstxt.org/) - Standard for AI-readable content summaries

### Research Articles
- [AI bots robots.txt guide: GPTBot, ClaudeBot | Soar Agency](https://www.soar.sh/blog/ai-bots-robots-txt-guide)
- [Robots.txt & AI Crawlers in 2026: The Full Guide](https://dataimpulse.com/blog/robots-txt-ai-crawlers/)
- [AI Crawler Access Control: The 2026 Decision Matrix](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix)

---

## Maintenance

### When to Update This Document

- When adding new AI crawler rules to robots.txt
- When changing GEO strategy or crawler permissions
- When new major AI crawlers are introduced
- When monitoring reveals significant citation changes
- When updating llms.txt structure or content
- Annually for comprehensive review

### Related Tasks

- P0-003: Configure AI Crawler Permissions (completed)
- P0-004: Create llms.txt File (completed)
