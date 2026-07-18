// Local portfolio adapter implementation
// DDD: Adapter implements the portfolio content port using local data
// Deep module: delegates to portfolio-data, keeps implementation private

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getAllSlugs,
  type CaseStudy as LocalCaseStudy,
  type CaseStudySummary as LocalCaseStudySummary,
  type CaseStudyResult as LocalCaseStudyResult,
  type CaseStudyTestimonial as LocalCaseStudyTestimonial,
} from "../portfolio-data";
import type {
  PortfolioContentPort,
  CaseStudySummary,
  CaseStudyDetail,
  CaseStudyResult,
  CaseStudyTestimonial,
} from "../content-port";

/**
 * Map local case study result to port result
 */
function mapResult(result: LocalCaseStudyResult): CaseStudyResult {
  return {
    metric: result.metric,
    label: result.label,
  };
}

/**
 * Map local case study testimonial to port testimonial
 */
function mapTestimonial(
  testimonial: LocalCaseStudyTestimonial,
): CaseStudyTestimonial {
  return {
    quote: testimonial.quote,
    author: testimonial.author,
    role: testimonial.role,
  };
}

/**
 * Map local case study summary to port summary
 */
function mapSummary(summary: LocalCaseStudySummary): CaseStudySummary {
  return {
    id: summary.id,
    slug: summary.slug,
    title: summary.title,
    category: summary.category,
    client: summary.client,
    description: summary.description,
    results: summary.results,
    tags: summary.tags,
  };
}

/**
 * Map local case study to port detail
 */
function mapDetail(study: LocalCaseStudy): CaseStudyDetail {
  return {
    id: study.id,
    slug: study.slug,
    title: study.title,
    category: study.category,
    client: study.client,
    clientLogo: study.clientLogo,
    description: study.description,
    overview: study.overview,
    challenge: study.challenge,
    solution: study.solution,
    results: study.results.map(mapResult),
    testimonial: mapTestimonial(study.testimonial),
    tags: study.tags,
    timeline: study.timeline,
    technologies: study.technologies,
  };
}

/**
 * Local portfolio adapter implements PortfolioContentPort
 * Delegates to existing portfolio-data module
 */
class LocalPortfolioAdapter implements PortfolioContentPort {
  async getAllSummaries(): Promise<CaseStudySummary[]> {
    const localSummaries = getAllCaseStudies();
    return localSummaries.map(mapSummary);
  }

  async getBySlug(slug: string): Promise<CaseStudyDetail | undefined> {
    const localStudy = getCaseStudyBySlug(slug);
    return localStudy ? mapDetail(localStudy) : undefined;
  }

  async getAllSlugs(): Promise<string[]> {
    return getAllSlugs();
  }
}

/**
 * Factory function to create the local portfolio adapter
 * Returns the port interface for dependency injection
 */
export function createLocalPortfolioAdapter(): PortfolioContentPort {
  return new LocalPortfolioAdapter();
}
