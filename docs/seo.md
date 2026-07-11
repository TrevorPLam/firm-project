# SEO Documentation

This document covers SEO strategies, AI crawler permissions, and Generative Engine Optimization (GEO) for the Elevate Digital marketing site.

## Table of Contents

- [AI Crawler Permissions](#ai-crawler-permissions)
- [Generative Engine Optimization (GEO)](#generative-engine-optimization-geo)
- [AI Crawler Testing](#ai-crawler-testing)
- [GEO Monitoring](#geo-monitoring)
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
- Annually for comprehensive review

### Related Tasks

- P0-003: Configure AI Crawler Permissions (this task)
- P0-004: Create llms.txt File (follows this task)
