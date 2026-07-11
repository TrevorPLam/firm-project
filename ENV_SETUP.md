# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Google Ads Conversion Tracking
NEXT_PUBLIC_GA_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GA_CONVERSION_LABEL=conversion_label

# Optional: Other analytics services
# NEXT_PUBLIC_HOTJAR_ID=XXXXXX
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Getting Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new account or select an existing one
3. Create a new property (GA4)
4. Go to Admin > Data Streams > Web
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Conversion Tracking Setup

For Google Ads conversion tracking:
1. Go to [Google Ads](https://ads.google.com/)
2. Tools & Settings > Conversions
3. Create a new conversion action
4. Copy the Conversion ID and Label
