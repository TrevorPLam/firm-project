# About Page

Company information and mission page.

## Purpose

Displays the company's story, mission, values, process, and key statistics to build trust with potential clients.

## Route

- **Path**: `/about` (localized: `/en/about`, `/es/about`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Page title and introduction
- **Our Story** - Company history and background with key statistics
- **Our Mission** - Core values (Excellence, Innovation, Partnership)
- **Our Process** - Four-step methodology (Discovery, Strategy, Execution, Optimization)
- **CTA** - Contact call-to-action

## Features

- Breadcrumb structured data (schema.org)
- Scroll reveal animations
- Internationalization support
- SEO metadata with locale alternates
- Custom Open Graph image generation (`opengraph-image.tsx`)

## Key Statistics Displayed

- 150+ Projects Delivered
- 98% Client Satisfaction
- 5+ Years Experience
- 24/7 Support Available

## Notes

Page uses the `ScrollReveal` component for animations and generates breadcrumb schema for SEO.
