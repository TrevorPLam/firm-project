# Analytics Documentation

This document outlines the analytics implementation for the Elevate Digital marketing site, including GA4 configuration, attribution models, conversion tracking, and best practices for 2026.

## Overview

The site uses Google Analytics 4 (GA4) for tracking user behavior, conversions, and marketing performance. Analytics are implemented through a client-side component that loads Google Analytics and provides helper functions for custom event tracking.

## GA4 Configuration

### Environment Variables

The following environment variables are required for analytics:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-measurement-id
NEXT_PUBLIC_GA_CONVERSION_ID=your-google-ads-conversion-id
```

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your GA4 property measurement ID (format: G-XXXXXXXXXX)
- `NEXT_PUBLIC_GA_CONVERSION_ID`: Google Ads conversion ID for tracking ad conversions (optional)

### Implementation Details

Analytics are implemented in `app/components/analytics.tsx`:

- **Component**: Client-side React component that loads GA4 scripts
- **Strategy**: Uses Next.js `Script` component with `afterInteractive` strategy
- **Initialization**: Loads gtag.js and configures GA4 measurement ID
- **Event Tracking**: Provides helper functions for custom event tracking

## Attribution Model

### Current Configuration

**Status**: Data-driven attribution (default in GA4)

Data-driven attribution is the recommended attribution model for GA4 in 2026. It uses machine learning to distribute conversion credit across touchpoints based on their actual contribution to conversions.

### Data-Driven Attribution Requirements

For data-driven attribution to work effectively, your property must meet these thresholds:

- **400+ conversions** for the specific key event within the lookback window
- **20,000+ total conversions** across all events within the lookback window

If these thresholds are not met, GA4 will silently fall back to last-click attribution. Always verify using the Model Comparison report.

### Verification Steps

To verify data-driven attribution is active:

1. Log into GA4 admin console
2. Navigate to **Admin > Property > Attribution Settings**
3. Confirm "Data-driven attribution" is selected in the Reporting attribution model section
4. Set appropriate lookback windows (typically 30-90 days depending on sales cycle)
5. Use the **Model Comparison report** (Advertising > Model Comparison) to verify data-driven attribution is producing different results than last-click

### Per-Conversion Attribution (Advanced)

GA4 supports per-conversion attribution settings that allow different attribution models and lookback windows for each key event:

- **Location**: Advertising > Conversion Management (not Admin > Attribution Settings)
- **Configuration**: Set attribution model and lookback window per key event
- **Recommended Lookback Windows**:
  - 7 days: Acquisition events (first_visit, first_open)
  - 30 days: Quick-conversion events (signups, downloads)
  - 60 days: Mid-cycle events (leads, trials)
  - 90 days: Long-cycle events (purchases, enterprise deals)

### Attribution Model Comparison

| Model                  | Description                                               | Best For                                                 |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Data-Driven            | ML-based, distributes credit based on actual contribution | Multi-channel journeys with sufficient conversion volume |
| Last Click             | All credit to last touchpoint before conversion           | Simple journeys, low conversion volume                   |
| Google Paid Last Click | All credit to last Google Ads click                       | Google Ads-focused reporting                             |

## Conversion Tracking

### Tracked Conversions

The site currently tracks the following conversions:

1. **Contact Form Submission**
   - Event: `form_submission`
   - Parameters: `form_type: "contact"`, `success: true/false`
   - Trigger: URL parameter `?success=true` or `?error=true`

2. **Newsletter Subscription**
   - Event: `newsletter_signup` (to be implemented)
   - Parameters: `success: true/false`

3. **Google Ads Conversions**
   - Event: `conversion`
   - Trigger: Contact form submission with GA_CONVERSION_ID configured
   - Conversion label: `contact_form`

### Custom Event Tracking

The analytics component provides helper functions for tracking custom events:

```typescript
// Track custom events
trackEvent(eventName: string, parameters?: GtagEventParams)

// Track page views
trackPageView(url: string)

// Track conversions
trackConversion(conversionId: string, value?: number)

// Track CTA clicks
trackCTAClick(ctaName: string, location: string)

// Track service views
trackServiceView(serviceName: string)

// Track portfolio clicks
trackPortfolioClick(caseStudyTitle: string)
```

### Conversion Funnel Setup

The recommended conversion funnel for this site:

1. **Awareness**: Page views, service views, portfolio clicks
2. **Interest**: CTA clicks, newsletter signups
3. **Consideration**: Contact form views
4. **Conversion**: Contact form submissions

## Events Being Tracked

### Standard Events

- `page_view`: Automatic page view tracking
- `form_submission`: Contact form submissions
- `conversion`: Google Ads conversions

### Custom Events

- `cta_click`: CTA button clicks with CTA name and location
- `service_view`: Service page views with service name
- `portfolio_click`: Portfolio case study clicks with case study title

### Recommended Additional Events

Consider adding these events for more comprehensive tracking:

- `scroll_depth`: Track how far users scroll on key pages
- `video_play`: Track video engagement (if videos are added)
- `download`: Track file downloads (case studies, whitepapers)
- `newsletter_signup`: Newsletter subscription events
- `search`: Site search queries (if search is implemented)

## Custom Dimensions/Metrics

### Recommended Custom Dimensions

For better analytics insights, consider setting up these custom dimensions:

- **Customer Lifecycle Stage**: new, returning, lapsed
- **Content Category**: For blog posts and portfolio items
- **Traffic Source at Session Start**: Distinct from last-click source
- **Experiment Variant**: For CRO testing

### Recommended Custom Metrics

- **Engagement Time**: Time spent on page
- **Scroll Depth**: Maximum scroll percentage
- **Video Watch Time**: For video content

## Reporting Dashboard Locations

### Key GA4 Reports

1. **Real-time Report**: Monitor current user activity
2. **Engagement > Events**: View all tracked events
3. **Advertising > Conversion Paths**: Analyze user journeys
4. **Advertising > Model Comparison**: Compare attribution models
5. **Explore > Funnel Exploration**: Analyze conversion funnels
6. **Explore > Path Exploration**: Understand user paths

### Recommended Custom Reports

1. **Contact Form Funnel**: Track form view → start → submit → success
2. **Service Performance**: Compare service page performance
3. **Portfolio Engagement**: Track portfolio views and clicks
4. **CTA Performance**: Analyze CTA click-through rates by location

## Best Practices

### Data Quality

1. **UTM Parameter Discipline**: Maintain consistent UTM parameter naming
2. **Event Naming**: Use consistent, descriptive event names
3. **Parameter Structure**: Use snake_case for parameter names
4. **Conversion Validation**: Regularly verify conversion tracking is working

### Privacy and Compliance

1. **Cookie Consent**: Ensure proper cookie consent mechanisms
2. **Data Retention**: Configure appropriate data retention settings
3. **User Deletion**: Provide mechanism for users to request data deletion
4. **IP Anonymization**: Consider IP anonymization for privacy

### Server-Side Tracking (Recommended)

As of 2026, server-side tracking is recommended for accurate analytics:

- **Why**: Browser privacy changes (iOS 14+, cookie restrictions) reduce client-side tracking accuracy
- **Benefit**: Recovers 30-60% of conversion data lost to privacy measures
- **Implementation**: Use Google Tag Manager Server-Side container
- **Priority**: P1-001 (Server-Side Tagging) covers this implementation

### Attribution Best Practices

1. **Verify Model**: Regularly verify data-driven attribution is active using Model Comparison
2. **Check Volume**: Ensure sufficient conversion volume for data-driven attribution
3. **Match Windows**: Set lookback windows to match actual sales cycle
4. **Cross-Reference**: Use GA4 as one input among several, not sole source of truth
5. **Wait for Data**: GA4 can lag 24-48 hours; avoid premature decisions

### Common Mistakes to Avoid

1. **Assuming Attribution Model**: Always verify which attribution model is active
2. **Ignoring Data Requirements**: Data-driven attribution requires sufficient conversion volume
3. **Trusting Single Source**: Cross-reference GA4 with business-level metrics
4. **Acting on Incomplete Data**: Wait 24-48 hours for data to populate before making decisions
5. **Dirty UTM Parameters**: Maintain consistent UTM parameter naming conventions

## Testing and Validation

### Conversion Tracking Testing

To test conversion tracking:

1. Submit test contact form
2. Subscribe to newsletter with test email
3. Verify events appear in GA4 real-time reports
4. Check conversion funnel setup
5. Document any discrepancies

### Analytics Validation Checklist

- [ ] GA4 measurement ID is correctly configured
- [ ] Events are firing correctly
- [ ] Conversions are being tracked
- [ ] Attribution model is verified as data-driven
- [ ] Lookback windows match sales cycle
- [ ] Custom events are properly named
- [ ] UTM parameters are consistent
- [ ] Real-time reports show expected activity
- [ ] Conversion funnels are set up
- [ ] Model comparison shows data-driven attribution is active

## Monitoring and Maintenance

### Regular Tasks

1. **Weekly**: Check real-time reports for anomalies
2. **Monthly**: Review conversion tracking accuracy
3. **Quarterly**: Verify attribution model settings
4. **Quarterly**: Review and update event tracking
5. **Annually**: Audit entire analytics setup

### Alerts to Set Up

1. **Conversion Drop**: Alert if conversions drop below threshold
2. **Event Tracking Failure**: Alert if key events stop firing
3. **Traffic Anomalies**: Alert for unusual traffic patterns
4. **Data Quality Issues**: Alert for spam or bot traffic

## Integration with Other Tools

### Google Ads

- Conversion tracking integrated via GA_CONVERSION_ID
- Use Google Ads conversions for bid optimization
- Cross-reference GA4 attribution with Google Ads reporting

### Google Tag Manager

- Consider migrating to GTM for more flexible tag management
- GTM Server-Side recommended for 2026 (see P1-001)

### BigQuery Export

- Consider exporting GA4 data to BigQuery for advanced analysis
- Enables cohort analysis, LTV modeling, custom SQL queries
- Free for most GA4 properties

## Next Steps

### Immediate (P0)

- [ ] Verify GA4 data-driven attribution is active in admin console
- [ ] Document current attribution model settings
- [ ] Test conversion tracking with real submissions
- [ ] Set up conversion funnel in GA4 Explore

### Short-term (P1)

- [ ] Implement server-side tagging (P1-001)
- [ ] Add recommended custom events
- [ ] Set up custom dimensions
- [ ] Create custom reports and dashboards

### Long-term (P2)

- [ ] Export GA4 data to BigQuery
- [ ] Implement advanced attribution modeling
- [ ] Set up marketing mix modeling
- [ ] Integrate with CRM for closed-loop reporting

## Resources

- [GA4 Attribution Settings](https://support.google.com/analytics/answer/16291112)
- [Data-Driven Attribution Guide](https://saasanalytics.io/data-driven-attribution-how-it-works-benefits-when-to-use-it/)
- [GA4 Attribution Best Practices 2026](https://growwithba.com/blog/ga4-attribution-2026)
- [Per-Conversion Attribution Settings](https://www.1clickreport.com/blog/ga4-per-conversion-attribution-settings-2026)

## Changelog

- **2026-07-11**: Initial analytics documentation created
  - Documented current GA4 implementation
  - Added data-driven attribution verification steps
  - Outlined conversion tracking setup
  - Added best practices and monitoring guidelines
