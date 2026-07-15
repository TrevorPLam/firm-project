# Marketing Repository Guide  
### Operating Standards for Website, Content, SEO, Analytics, Maintenance, and Client Delivery

**Primary purpose:** Define one repeatable, secure, measurable standard for how the firm creates, manages, publishes, measures, maintains, and hands over marketing websites and associated services.

**Secondary purposes:**

- Establish a source of truth for agency strategy, reusable assets, client records, technical implementation, and operating procedures.
- Make delivery repeatable as the firm adds clients, contractors, employees, websites, locales, and service lines.
- Make quality auditable through explicit evidence rather than verbal assurance.
- Protect client assets, credentials, data, reputation, and continuity.
- Allow the current technical repository to become a reusable platform or starter kit rather than a one-off website.

## Guide Audience

Write every section for a defined reader. This prevents the guide from becoming too technical for clients or too vague for delivery staff.

| Audience | What they need from the guide |
|---|---|
| Founder / firm leadership | Service standards, risk management, ownership, commercial boundaries, scalability |
| Strategist / account lead | Client discovery, approvals, messaging, scope, reporting, renewals |
| Designer / content creator | Brand standards, content workflow, accessibility requirements, publishing process |
| Developer | Architecture, security, environments, testing, releases, monitoring, maintenance |
| SEO specialist | Content inventory, technical SEO QA, schema, localization, redirects, reporting |
| Analytics specialist | Measurement plan, event taxonomy, consent, dashboards, data quality |
| Contractor | Clear boundaries, access procedures, contribution rules, approval requirements |
| Client stakeholder | What the firm needs from them, review checkpoints, ownership, handover expectations |
| Future operations hire | How the complete system functions and where authoritative information lives |

## Organization Model

The guide should have **three layers**, each serving a different need.

### Layer 1: Executive operating model

This is the concise, readable front portion of the guide. It explains:

- What the repository is.
- What it governs.
- What “done,” “approved,” “published,” and “maintained” mean.
- Who owns which decisions.
- How a client engagement moves from onboarding to offboarding.
- What non-negotiable quality standards apply.

This portion should be understandable to a client-facing strategist or new hire without requiring them to understand Next.js, CI/CD, or CMS schema design.

### Layer 2: Functional standards

This is the practical playbook. Organize it by disciplines and recurring business outcomes:

- Brand and positioning
- Content and CMS
- Website delivery
- SEO and GEO
- Analytics and attribution
- CRO
- Security and privacy
- Accessibility
- Operations and maintenance
- Reporting and client success

Each section explains policy, process, required artifacts, responsibilities, quality gates, and evidence.

### Layer 3: Technical and operational reference

This is where implementation detail belongs:

- Architecture diagrams
- Environment variables
- CMS schema references
- Event taxonomy
- Structured data inventory
- Testing matrix
- Release procedures
- Incident response
- Vendor inventory
- Templates and checklists
- Architecture decision records

The README remains a technical onboarding document for the code repository. The Marketing Repository Guide should link to it, but it should not duplicate every command, dependency, or implementation detail.

## Information Architecture

Use the following top-level document structure.

```text
Marketing Repository Guide
|
├── Part I — Foundation
├── Part II — Governance and Repository Management
├── Part III — Agency Strategy and Service Delivery
├── Part IV — Website and Content Platform
├── Part V — Marketing Operations
├── Part VI — Quality, Security, and Compliance
├── Part VII — Release, Maintenance, and Client Operations
├── Part VIII — Technical Reference Architecture
├── Part IX — Templates, Checklists, and Registers
└── Appendices
```

This order is intentional:

1. Define the business purpose before tools.
2. Establish ownership and governance before workflows.
3. Explain service delivery before implementation.
4. Define marketing operations before analytics dashboards.
5. Define quality standards before release processes.
6. Put detailed technical reference material after the operating model.
7. Keep reusable templates at the end for practical use.

## Part I: Foundation

### 1. Guide Charter

This opening section establishes the guide itself as a controlled operational document.

Subtopics:

- Guide purpose and desired outcomes
- Scope: agency brand, internal operations, client delivery, client websites, complementary services
- Out of scope: legal advice, client-specific contracts, credentials, personal notes, raw work-in-progress
- Intended audiences
- Definitions and terminology
- Source-of-truth hierarchy
- Document owner
- Version number, effective date, review date, and change history
- How exceptions are requested and recorded

Include a short glossary for terms that can mean different things in marketing and technology:

- Repository
- System of record
- System of work
- Client workspace
- Source of truth
- Content model
- CMS
- DAM
- Measurement plan
- Event taxonomy
- Data layer
- Conversion
- Qualified lead
- Consent
- Production
- Preview
- Incident
- SLA
- GEO
- Structured data
- Accessibility conformance

### 2. Principles

State principles that guide decisions when no exact rule exists.

Recommended principles:

1. **Client ownership first** — Clients retain appropriate ownership and recoverability of domains, core data, analytics properties, Search Console, and essential business accounts.
2. **One authoritative record** — Every critical artifact has a canonical location, owner, lifecycle state, and review date.
3. **Reuse with intentional customization** — Reuse proven architecture, components, templates, and SOPs; customize only where client strategy requires it.
4. **Privacy and security by design** — Minimize data, restrict access, protect secrets, and validate external inputs.
5. **Accessibility is product quality** — Design, content, and code must support WCAG 2.2 AA as the default public-site target. WCAG 2.2 applies to web content across devices and helps address a broad range of accessibility needs. [w3](https://www.w3.org/TR/WCAG22/)
6. **Measurement serves decisions** — Collect only meaningful data, define it before implementation, and connect reporting to action.
7. **Approval is evidence-based** — Use named approvers, dates, statuses, and recorded decisions.
8. **Every release is reversible** — Every production change has an owner, validation plan, rollback approach, and release record.
9. **Publish with intent** — Every indexable page has a business purpose, owner, audience, CTA, and review cycle.
10. **Documentation is part of delivery** — A project is not complete until operational knowledge is recorded and handoff-ready.

### 3. Agency System Overview

Use a single high-level diagram and narrative:

```text
Agency Strategy
  -> Client Acquisition
  -> Client Onboarding
  -> Discovery and Planning
  -> Content, Design, and Development
  -> QA and Approval
  -> Launch
  -> Maintenance, SEO, CRO, Analytics, Reporting
  -> Renewal, Transition, or Offboarding
```

For each lifecycle stage, identify:

- Objective
- Primary owner
- Required inputs
- Required deliverables
- Approval requirements
- Exit criteria
- Repository location

## Part II: Governance

### 4. Repository Governance

This chapter defines how information is structured and controlled.

Subtopics:

- Repository scope and boundaries
- Internal versus client-specific records
- Systems of record versus systems of work
- Folder and workspace architecture
- Naming conventions
- Metadata standard
- Version-control rules
- Document lifecycle states
- Archival and deletion rules
- Search and discoverability standards
- Documentation-review cadence
- Exceptions process

### 5. Source-of-Truth Hierarchy

Explicitly state which platform is authoritative for each class of information.

| Information type | System of record | Working systems | Notes |
|---|---|---|---|
| Website source code | GitHub/GitLab repository | Local environment, pull requests | Main branch is production source baseline |
| Published website content | Sanity CMS | Editorial drafts | CMS is authoritative for current publishable content |
| Design source files | Design workspace/DAM | Design review tools | Exported files are not the canonical editable source |
| Final client approvals | Client record / project system | Email, comments, messaging | Store approval evidence centrally |
| Credentials and recovery data | Password manager | None | Never store secrets in ordinary docs |
| Marketing assets | DAM or controlled asset library | Design workspace | Define approved versus draft status |
| Analytics definitions | Versioned measurement plan | Tag manager, analytics tools | The plan defines meaning; tools execute it |
| Client performance reports | Reporting repository | Dashboard tool | Archive period-end deliverables |
| Operational incidents | Incident register | Monitoring tools, chat | Register preserves outcome and follow-up |
| Legal/contract documents | Restricted client record | E-signature platform | Access controlled by role |

### 6. Roles and Decision Rights

Include a RACI-style ownership model.

Core roles:

- Founder / executive sponsor
- Repository owner
- Account lead
- Strategist
- Content owner
- Designer
- Developer / technical owner
- SEO owner
- Analytics owner
- Security/privacy owner
- Client approver
- Contractor

Decisions to define:

- Who can publish content
- Who can approve client-facing copy
- Who can deploy production changes
- Who can grant access
- Who can change domains/DNS
- Who can alter analytics taxonomies
- Who can install third-party scripts
- Who can accept security or accessibility exceptions
- Who can close incidents
- Who can archive or delete client records

### 7. Access and Information Classification

Organize information by sensitivity:

| Classification | Examples | Access standard |
|---|---|---|
| Public | Published pages, public case studies, public guides | Open |
| Internal | SOPs, templates, roadmap, internal positioning | Team / approved contractors |
| Confidential | Client strategies, analytics reports, unpublished creative, pricing discussions | Named project members |
| Restricted | Credentials, API secrets, signed contracts, sensitive PII, security incidents | Need-to-know only |

Subtopics:

- Least-privilege access
- Client and contractor onboarding
- Access review cadence
- Contractor expiration rules
- Employee and contractor offboarding
- Password manager policy
- Public environment variable review
- Secret rotation and revocation
- Audit trail expectations

## Part III: Agency Strategy

### 8. Firm Brand and Positioning

This section creates the reusable internal strategy that informs your own site, sales process, proposals, and content.

Subtopics:

- Mission and market position
- Ideal client profile
- Geographic focus: Dallas, DFW, Texas, national, or other markets
- Target industries and exclusions
- Primary problems solved
- Differentiators
- Brand voice and tone
- Messaging hierarchy
- Offer architecture
- Proof and claims policy
- Case-study standard
- Competitive positioning
- Objection handling
- Brand asset rules

### 9. Service Catalog

Create a precise service catalog, particularly because you intend to include complimentary services.

For each service define:

- Service name
- Business outcome
- Included deliverables
- Exclusions
- Client responsibilities
- Agency responsibilities
- Tooling involved
- Required access
- Quality standards
- Reporting cadence
- Maintenance or renewal terms
- Upgrade path
- Third-party costs
- Success measures
- Scope-change process

Recommended service categories:

- Website strategy and information architecture
- Website design
- Website development
- CMS implementation
- Content migration
- Localization
- Search implementation
- Technical SEO
- On-page SEO
- Local SEO
- Analytics and conversion tracking
- Dashboarding and reporting
- Conversion-rate optimization
- Website maintenance
- Hosting and deployment support
- Content operations
- Training and handover

### 10. Complimentary Services Policy

Make this a dedicated section rather than a footnote in proposals.

Subtopics:

- What “complimentary” means
- Time, volume, request, or platform limits
- What constitutes standard maintenance
- What constitutes a project, enhancement, or change order
- Included SEO activities versus ongoing content/authority work
- Included analytics setup versus ongoing analysis and attribution work
- Included reporting versus consulting or strategic planning
- Response-time expectations
- Client dependencies and delays
- Termination and transition rules

This prevents the most common agency-scale problem: a client assumes a complimentary item is unlimited strategic support rather than a clearly bounded operational service.

## Part IV: Client Delivery

### 11. Client Onboarding

Organize onboarding as a gated process.

Subtopics:

- Contract confirmation
- Kickoff agenda
- Stakeholder and approval map
- Business discovery
- Audience and competitive research
- Service and offer understanding
- Brand-asset intake
- Legal and compliance constraints
- Domain, DNS, hosting, CMS, analytics, CRM, email, advertising, and social access
- Existing website and content audit
- Existing analytics and SEO baseline
- Data and privacy intake
- Project timeline
- Communication cadence
- Client responsibilities
- Success criteria

Required artifacts:

- Client profile
- Stakeholder directory
- Access inventory
- Discovery brief
- Brand and messaging brief
- Technical audit
- SEO baseline
- Analytics baseline
- Project plan
- Risk register
- Approval protocol

### 12. Strategy and Discovery

Subtopics:

- Business objectives
- Revenue model and lead qualification
- Audience segments
- Jobs-to-be-done
- Customer journey
- Competitive review
- Market geography
- Brand narrative
- Content opportunities
- Search-intent map
- Conversion strategy
- Measurement strategy
- Prioritized recommendations
- Assumptions and open questions

Outputs:

- Strategy brief
- Sitemap / information architecture
- Messaging framework
- Keyword and topic map
- Content inventory
- Conversion plan
- Measurement plan
- Technical architecture decision record

### 13. Content Operations

This chapter should cover both your own agency content and client content.

Subtopics:

- Content-model philosophy
- Content types: pages, services, articles, case studies, FAQs, team profiles, testimonials, legal pages
- Content briefs
- Research standards
- Voice and tone
- Claims substantiation
- SEO requirements
- Accessibility authoring rules
- Localization workflow
- Editorial review
- Client review
- Publishing
- Content refreshes
- Archival
- Content migration
- Content portability
- Content performance review

### 14. CMS Governance

Connect this directly to your Sanity implementation.

Subtopics:

- Sanity as authoritative published-content source
- Schema ownership and change management
- Typed content contracts and Zod validation
- Draft versus published data
- Preview environment
- Role-based author permissions
- Content lifecycle states
- Slug management
- Redirect-management requirements
- Rich-text sanitization
- Asset-management rules
- Image alt text and focal-point guidance
- Structured-data fields
- Translation relationship fields
- Required metadata
- Validation rules
- Webhooks and downstream indexing
- Backup/export and migration plan

### 15. Localization and Internationalization

Your README already supports English and Spanish. The guide should establish the operating standard behind that capability.

Subtopics:

- Supported locales and locale roadmap
- URL structure
- Locale detection and language switcher behavior
- Translation versus localization
- Translation-memory/tooling policy, if adopted
- Ownership and approval
- Localized keyword research
- Regional terminology
- Localized CTA and form requirements
- Translation completeness checks
- Metadata, schema, and alt-text localization
- Locale-specific legal content
- Hreflang validation
- Sitemap locale alternates
- Fallback rules
- Publishing sequence across languages

Google recommends `hreflang` annotations for language-specific URLs so it can understand localized pages as alternate versions and present the appropriate result. [developers.google](https://developers.google.com/search/docs/specialty/international/localized-versions)

### 16. Design System and UX

Subtopics:

- Brand-to-interface translation
- Design tokens
- Component library
- Responsive design
- Information hierarchy
- Navigation standard
- CTA hierarchy
- Form UX
- Trust signals
- Error and empty states
- Loading states
- Motion and reduced-motion behavior
- Accessibility-by-design requirements
- Responsive content behavior
- Image and media standards
- Design QA
- Component documentation
- Design-to-development handoff

## Part V: Website Platform

### 17. Technical Architecture

This section explains the reusable platform without duplicating the technical README.

Subtopics:

- Architecture principles
- Next.js App Router approach
- React server and client component policy
- TypeScript strictness policy
- Tailwind and design-system approach
- Domain boundaries
- Content portability layer
- CMS adapter architecture
- Search adapter architecture
- Form and email architecture
- Rate-limiting design
- CSP and nonce architecture
- Environment model
- Deployment model
- Caching strategy
- Performance strategy
- Technical decision records

Include a system-context diagram:

```text
Visitor
  -> Next.js marketing website
  -> Sanity CMS
  -> Algolia search
  -> Resend email / audience
  -> Upstash rate limiting
  -> Consent and tag layer
  -> GA4 / advertising platforms
  -> CRM and reporting systems
  -> Monitoring and error tracking
  -> Vercel deployment platform
```

### 18. Component and Code Standards

Subtopics:

- Route composition rules
- Server-component default
- Client-component exception criteria
- Component naming
- Feature versus shared components
- Error-boundary standards
- Loading-state standards
- Form architecture
- Validation strategy
- Sanitization rules
- API and Server Action patterns
- Error-handling conventions
- Logging and correlation IDs
- JSDoc criteria
- Testing obligations
- Code review expectations

### 19. Environments and Configuration

Subtopics:

- Local, CI, preview/staging, production environments
- Environment variable classification
- `NEXT_PUBLIC_*` review standard
- Client-specific versus shared configuration
- Feature flags
- Preview content
- Test email audiences
- Test analytics destinations
- Test rate-limit namespaces
- Configuration change approval
- Environment parity
- Secrets rotation
- Configuration inventory

### 20. Deployment and Release Management

Subtopics:

- Branching model
- Pull-request requirements
- Preview deployments
- Preview protection
- Client review protocol
- CI requirements
- Merge and production-deployment controls
- Release notes
- Feature flags and controlled rollout
- Database/CMS schema changes
- Content publishing coordination
- Post-deployment verification
- Rollback procedure
- Emergency change process
- Release record retention

Vercel supports protected deployment URLs and preview deployment workflows, which are appropriate for reviewing client work safely before publishing it. [vercel](https://vercel.com/docs/deployment-protection)

## Part VI: Marketing Operations

### 21. SEO Operations

Organize SEO as an ongoing operating model rather than a page-level checklist alone.

Subtopics:

- SEO principles and quality standard
- Technical SEO baseline
- Keyword research
- Topic clusters
- Search intent
- Page-to-keyword map
- Content briefs
- On-page optimization
- Internal linking
- Structured data
- Sitemap and robots management
- Canonicalization
- Indexation management
- Redirects and migrations
- Image SEO
- Local SEO
- International SEO
- Search Console operations
- Content refreshes
- SEO QA
- Reporting and insight loop
- SEO incident response

Google’s SEO documentation emphasizes technical and content fundamentals that influence search visibility, while search systems should be given clear information about the pages they crawl and index. [developers.google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

### 22. GEO and AI-Search Policy

Place this immediately after SEO, but treat it as a governed practice—not a standalone hack.

Subtopics:

- Definition and scope of GEO
- Business rationale and limitations
- AI crawler policy
- Robots directives by crawler
- Content accessibility for AI systems
- Entity clarity and organization information
- Structured data
- Author expertise and provenance
- Answer-oriented content
- Citation and claims standards
- Monitoring AI referral traffic where measurable
- Risks: overclaiming, stale content, crawler policy changes
- Review cadence
- Client opt-in and exceptions

### 23. Analytics and Measurement

This should be one of the most detailed chapters because it supports both your firm’s positioning and your complimentary analytics service.

Subtopics:

- Measurement principles
- Business objectives and KPI hierarchy
- Primary and secondary conversions
- Lead qualification model
- Event taxonomy
- Data-layer specification
- GA4 implementation
- Google Tag Manager policy, if used
- Recommended versus custom events
- UTM governance
- Attribution fields
- CRM integration and offline conversion feedback
- Consent-aware tracking
- Data-quality QA
- Dashboard definitions
- Reporting cadence
- Data retention
- PII restrictions
- Change management
- Analytics incident response

Google’s GA4 documentation requires custom event names to follow its naming rules and avoid reserved names and prefixes; this is why a formal taxonomy should be treated as a controlled contract. [developers.google](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)

### 24. Consent, Tags, and Privacy

Make this separate from analytics because it governs all third-party behavior on the site.

Subtopics:

- Privacy principles
- Consent categories
- Consent-management platform criteria
- Default consent state
- Region and jurisdiction handling
- Cookie inventory
- Tag inventory
- Tag approval process
- Third-party-script policy
- Google Consent Mode implementation
- Consent QA
- Privacy-page alignment
- Data minimization
- Data-subject request routing
- Vendor review
- Privacy incident escalation
- Record retention

Google’s Consent Mode is intended to adjust analytics and advertising data collection based on a visitor’s consent choices, making consent state a first-class implementation requirement rather than a legal-page afterthought. [developers.google](https://developers.google.com/tag-platform/security/guides/consent)

### 25. CRO and Experimentation

Subtopics:

- CRO principles
- Research inputs: analytics, search data, session insights where lawful, user feedback, sales calls
- Hypothesis template
- Experiment prioritization
- Baseline and success metrics
- Design and implementation
- Experiment QA
- Statistical/practical decision criteria
- Rollout, rollback, and learning documentation
- Personalization controls
- Avoiding dark patterns
- Experiment archive
- Interaction with SEO, accessibility, privacy, and performance

## Part VII: Quality and Assurance

### 26. Accessibility Standard

This should be a stand-alone chapter with a binding target: WCAG 2.2 AA by default.

Subtopics:

- Conformance target
- Roles and accountability
- Accessible design requirements
- Semantic HTML requirements
- Keyboard operation
- Focus management
- Forms and errors
- Color and contrast
- Headings and landmarks
- Links and button names
- Images and alternative text
- Audio/video captions and transcripts
- Motion and reduced-motion support
- Responsive zoom/reflow
- Dialogs, menus, tabs, carousels
- CMS authoring rules
- Automated testing
- Manual testing
- Assistive-technology sampling
- Defect prioritization
- Exceptions and remediation plan
- Accessibility statement

### 27. Performance Standard

Subtopics:

- Performance objectives
- Core Web Vitals
- Performance budgets
- Image optimization
- Font strategy
- Script governance
- JavaScript budgets
- Server/component strategy
- Caching
- Third-party impact
- Performance testing
- Real-user monitoring
- Release regression alerts
- Performance remediation process

### 28. Security Standard

Subtopics:

- Security principles
- Threat modeling
- OWASP ASVS baseline
- NIST SSDF alignment
- Authentication and authorization, when applicable
- Input validation
- Output encoding and sanitization
- CSP
- Security headers
- Rate limiting and anti-abuse
- Secrets management
- Dependency security
- Software supply chain
- Secret scanning
- SAST and vulnerability management
- Third-party scripts
- Logging and monitoring
- Security testing
- Vulnerability disclosure process
- Incident response
- Client notification requirements

NIST describes the SSDF as a core set of high-level secure software-development practices that can be integrated into any development lifecycle, which makes it a practical standard for your reusable agency platform. [csrc.nist](https://csrc.nist.gov/pubs/sp/800/218/final)

### 29. Testing and QA

Organize QA by risk and business outcome, not only by test framework.

Subtopics:

- QA ownership
- Test strategy
- Unit-test expectations
- Integration-test expectations
- E2E test coverage
- Browser and device matrix
- Accessibility testing
- Visual regression testing
- SEO validation
- Analytics validation
- Form and email-delivery testing
- Localization testing
- Security testing
- Performance testing
- CMS publishing QA
- Manual exploratory QA
- Defect severity definitions
- Release-blocking criteria
- QA evidence and records

## Part VIII: Operations

### 30. Monitoring and Observability

Subtopics:

- Observability goals
- Error tracking
- Uptime and synthetic checks
- Web-vitals monitoring
- Form health monitoring
- Email delivery monitoring
- CMS availability and webhook monitoring
- Algolia index freshness
- CSP violation reporting
- Rate-limit metrics
- Security alerts
- Conversion-drop monitoring
- Alert routing
- Severity levels
- Log redaction and retention
- Dashboards for operations
- Weekly operational review

### 31. Maintenance and Support

Subtopics:

- Maintenance-service definition
- Included work
- Excluded work
- Routine schedule
- CMS updates
- Dependency updates
- Security patches
- Backup validation
- Broken-link checks
- Search/indexing checks
- Accessibility regression checks
- Performance checks
- Form and integration checks
- Content-refresh support
- Ticket intake and prioritization
- SLA targets
- Escalation rules
- Maintenance reporting
- Change-order threshold

### 32. Incident Response and Recovery

Subtopics:

- Incident definition
- Severity classification
- Roles and incident commander
- Detection and triage
- Containment
- Communication
- Client notification
- Recovery
- Rollback
- Evidence preservation
- Post-incident review
- Root-cause analysis
- Corrective and preventive actions
- Incident register
- Backup and recovery testing

### 33. Reporting and Client Success

Subtopics:

- Reporting purpose
- Standard report structure
- KPI dictionary
- Data sources and limitations
- Period-over-period comparisons
- Narrative insights
- Recommendations
- Decisions requested from client
- SEO reporting
- Website performance reporting
- Lead/conversion reporting
- Maintenance reporting
- Quarterly business review
- Renewal planning
- Case-study eligibility
- Feedback collection

### 34. Client Offboarding and Handover

Subtopics:

- Offboarding triggers
- Asset and account ownership verification
- Access-transfer checklist
- CMS export
- Code and deployment handover
- Domain/DNS transfer
- Analytics and Search Console handover
- CRM/email/search tool handover
- Credential rotation
- Data retention and deletion
- Final report
- Documentation package
- Archive process
- Post-engagement access removal
- Transition-support scope

## Part IX: Technical Reference

### 35. Repository-Specific Reference

This chapter maps the guide’s policies to the actual project you provided.

Include sections for:

- Current technology stack
- Directory structure
- Core application modules
- i18n configuration
- Sanity content architecture
- Algolia search integration
- Contact and newsletter workflows
- Resend configuration
- Upstash rate-limiting controls
- CSP nonce and violation-reporting flow
- Structured-data library
- Sitemap and robots implementation
- OG image generation
- Testing setup
- CI workflow
- Deployment assumptions
- Known technical constraints, including React Compiler memory issues and cache limitations
- Technical debt register
- Planned monorepo alignment

This is where existing docs such as `docs/analytics.md`, `docs/cms.md`, `docs/cro.md`, `docs/security.md`, and `docs/seo.md` should be incorporated, linked, or superseded.

### 36. Data Flows

Include diagrams and narrative for each important data flow.

Required flows:

1. **Content publication**

```text
Author
  -> Sanity draft
  -> Internal review
  -> Client review
  -> Approved content
  -> Sanity publish
  -> Next.js render/revalidation
  -> Algolia indexing
  -> Sitemap/search availability
```

2. **Lead capture**

```text
Visitor
  -> Consent state and form interaction
  -> Client-side validation
  -> Server Action
  -> Zod validation / honeypot / rate limit
  -> Resend email and/or CRM
  -> Internal lead record
  -> Analytics conversion event
  -> Confirmation state
```

3. **Analytics**

```text
Visitor behavior
  -> Consent layer
  -> Data layer / event contract
  -> GA4 and approved destinations
  -> Dashboard
  -> CRM qualification feedback
  -> Optimization backlog
```

4. **Release**

```text
Feature branch
  -> Pull request
  -> CI validation
  -> Protected preview deployment
  -> Internal/client approval
  -> Main branch
  -> Production deployment
  -> Smoke test / monitoring
  -> Release record
```

5. **Incident**

```text
Alert or reported issue
  -> Triage
  -> Severity decision
  -> Containment
  -> Recovery / rollback
  -> Client communication
  -> Post-incident review
  -> Preventive work
```

## Part X: Templates and Registers

The guide should include reusable artifacts, not just descriptions of them.

### Core Templates

- Repository charter
- Architecture decision record
- Client discovery brief
- Client onboarding checklist
- Stakeholder and approval map
- Access inventory
- Service scope matrix
- Website strategy brief
- Sitemap and information architecture template
- Content brief
- Content inventory
- SEO audit template
- Keyword/topic map
- Redirect register
- Schema/structured-data checklist
- Measurement plan
- Event taxonomy
- Data-layer specification
- UTM convention guide
- Consent and tag inventory
- CRO hypothesis template
- Accessibility audit checklist
- Design QA checklist
- Website launch checklist
- Production smoke-test checklist
- Release notes template
- Incident report
- Maintenance report
- Client monthly report
- Client offboarding checklist
- Vendor register
- Risk register
- Technical debt register

### Core Registers

Registers are living tables or databases, not one-time documents.

| Register | Purpose | Owner | Review cadence |
|---|---|---|---|
| Client register | Client status, services, owners, renewal, risk | Account lead | Monthly |
| Asset register | Canonical brand and reusable agency assets | Brand owner | Quarterly |
| Access register | Account access, owner, sensitivity, offboarding | Operations/security owner | Monthly |
| Vendor register | Vendors, purpose, data, renewal, owner, risk | Founder/operations | Quarterly |
| Content inventory | Indexable content, owner, metadata, review date | Content/SEO owner | Monthly |
| Redirect register | Legacy URLs, destination, reason, validation | SEO/development | Per release |
| Event taxonomy | Analytics events, properties, destinations, QA | Analytics owner | Per change |
| Tag inventory | Scripts, purpose, consent, owner, data | Privacy/analytics owner | Quarterly |
| Release register | Releases, changes, approvals, rollback notes | Technical owner | Every release |
| Incident register | Incidents, severity, outcomes, corrective work | Technical/security owner | Every incident |
| Risk register | Delivery, client, data, vendor, technical risks | Account/technical owner | Monthly |
| Technical debt register | Deferred engineering work and risk | Technical owner | Monthly |
| Accessibility issue register | Defects, severity, remediation owner/date | Design/development owner | Per audit |
| SEO issue register | Crawl, index, content, schema, redirect issues | SEO owner | Monthly |

## Writing Standard

The document should be written as a **controlled policy-and-playbook system**.

Each major chapter should use this consistent format:

```text
Purpose
Scope
Principles
Definitions
Policy / Standard
Roles and Responsibilities
Required Inputs
Required Artifacts
Workflow
Quality Gates
Evidence of Completion
Exceptions
Metrics
Review Cadence
Related Documents and Templates
```

This consistency makes it usable. A developer can locate implementation requirements, a strategist can find approval rules, and an operator can identify evidence and review dates without interpreting prose.

## Document Types

Use four distinct document types. Do not mix them.

| Type | Use | Example |
|---|---|---|
| Policy | Mandatory rule or boundary | “No non-essential tracking before consent” |
| Standard | Required quality or implementation level | “Public websites target WCAG 2.2 AA” |
| Playbook / SOP | Repeatable process | “How to launch a client website” |
| Reference | Explanatory or technical details | “Sanity schema field reference” |
| Template / checklist | Repeatable execution artifact | “Production launch checklist” |
| Register | Current operational record | “Client access inventory” |
| ADR | Reasoned record of a consequential choice | “Why Sanity is the CMS platform” |

## Recommended Production Sequence

Do not write the complete guide in a single pass. Build the parts that establish operational control first.

### Phase 1: Foundation and control

1. Guide Charter
2. Principles
3. Governance and source-of-truth hierarchy
4. Roles, access, and information classification
5. Service catalog
6. Complimentary-services policy
7. Client onboarding
8. Client access inventory

### Phase 2: Website and marketing quality

9. Content operations and CMS governance
10. Localization standard
11. SEO operating manual
12. Analytics measurement plan and event taxonomy
13. Consent and tag governance
14. Accessibility standard
15. Website launch and QA checklist

### Phase 3: Operational maturity

16. CI/CD and release management
17. Security standard
18. Monitoring and incident response
19. Maintenance and support SOP
20. Reporting and client-success standard
21. Client offboarding and handover
22. Technical-reference mapping to the current Next.js repository

### Phase 4: Scale and continuous improvement

23. Vendor register
24. Risk and technical-debt registers
25. CRO experimentation playbook
26. GEO policy
27. Monorepo / multi-client platform standard
28. Architecture decision record library

## Proposed Final Table of Contents

```text
Marketing Repository Guide

Part I — Foundation
1. Guide Charter
2. Principles
3. Agency Operating Model
4. Glossary and Definitions

Part II — Governance
5. Repository Governance
6. Source-of-Truth Hierarchy
7. Information Architecture, Naming, Metadata, and Versioning
8. Roles, RACI, and Decision Rights
9. Access Control and Information Classification
10. Records, Retention, Archival, and Deletion

Part III — Agency Strategy
11. Firm Brand, Positioning, and Messaging
12. Service Catalog
13. Complimentary Services Policy
14. Sales-to-Delivery Handoff

Part IV — Client Delivery
15. Client Onboarding
16. Strategy and Discovery
17. Content Strategy and Operations
18. CMS Governance
19. Localization and Internationalization
20. Design System and UX Standards

Part V — Website Platform
21. Technical Architecture
22. Component and Code Standards
23. Environments and Configuration
24. Deployment and Release Management
25. Data Flows and Integrations

Part VI — Marketing Operations
26. SEO Operating Manual
27. GEO and AI-Search Policy
28. Analytics and Measurement Framework
29. Consent, Tag, and Privacy Governance
30. CRO and Experimentation

Part VII — Quality, Security, and Compliance
31. Accessibility Standard
32. Performance Standard
33. Security Standard
34. Testing and QA Strategy

Part VIII — Operations
35. Monitoring and Observability
36. Maintenance and Support
37. Incident Response and Recovery
38. Reporting and Client Success
39. Client Offboarding and Handover

Part IX — Reference and Governance Artifacts
40. Repository-Specific Technical Reference
41. Architecture Decision Records
42. Templates and Checklists
43. Operational Registers
44. Document Change Log
```

This organization makes the final guide useful at every maturity level: it begins with how the firm operates, becomes specific about repeatable client delivery, maps that delivery to your existing technical platform, and ends with the hands-on artifacts that make standards executable.