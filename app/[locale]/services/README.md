# Services Page

Services overview page.

## Purpose

Comprehensive description of all services offered including web design, SEO, and analytics with detailed feature lists and process information.

## Route

- **Path**: `/services` (localized: `/en/services`, `/es/services`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Page title and introduction
- **Web Design & Development** - Service details, features, and process
- **SEO Optimization** - Service details, features, and strategy
- **Analytics & Insights** - Service details, features, and metrics tracked
- **CTA** - Contact call-to-action

## Service Details

### Web Design & Development
- Custom UI/UX design
- Responsive development
- Performance optimization
- Accessibility compliance
- CMS integration
- E-commerce solutions
- Maintenance and support

### SEO Optimization
- Comprehensive audit and strategy
- Keyword research
- On-page optimization
- Technical SEO
- Content strategy
- Local SEO
- Performance tracking

### Analytics & Insights
- GA4 and GTM setup
- Custom dashboards
- Conversion tracking
- User behavior analysis
- Performance reports
- A/B testing
- ROI measurement

## Features

- Breadcrumb structured data (schema.org)
- Scroll reveal animations
- Internationalization support
- SEO metadata with locale alternates
- Service process visualizations
- Dynamic OpenGraph image generation (`opengraph-image.tsx`)

## Notes

Services content is currently hardcoded in the component. Future versions may move to CMS for easier updates and dynamic service management.

The `opengraph-image.tsx` file generates a dynamic OG image (1200x630) with the Elevate Digital brand, "Our Services" title, and the three service categories.
