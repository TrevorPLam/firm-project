# Contact Page

Contact form and information page.

## Purpose

Provides contact form for inquiries and displays contact information including email, phone, location, and response time.

## Route

- **Path**: `/contact` (localized: `/en/contact`, `/es/contact`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Page title and introduction
- **Contact Form** - Name, email, company, service, budget, message fields
- **Contact Information** - Email, phone, location, response time

## Form Features

- Server-side validation with Zod
- Rate limiting via Upstash Redis
- Email delivery via Resend
- Honeypot field for bot detection
- HTML escaping for XSS prevention
- PII protection (no sensitive data logging)

## Contact Information

- **Email**: hello@elevatedigital.com
- **Phone**: +1 (234) 567-890
- **Location**: San Francisco, CA (remote available)
- **Response Time**: Within 24 hours

## Features

- Breadcrumb structured data (schema.org)
- Scroll reveal animations
- Internationalization support
- SEO metadata with locale alternates
- Form validation and error handling

## Notes

Form submission handled by Server Action in `app/actions/contact.ts` with security best practices.
