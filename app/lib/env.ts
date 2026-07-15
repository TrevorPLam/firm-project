import * as z from 'zod';

/**
 * Environment variable validation using Zod.
 * This module provides type-safe access to environment variables with validation.
 * Server variables are validated at module load time to fail fast on misconfiguration.
 */

// Public environment variables (exposed to browser via NEXT_PUBLIC_ prefix)
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('https://elevateddigital.com'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().trim().optional(),
  NEXT_PUBLIC_GA_CONVERSION_ID: z.string().trim().optional(),
  NEXT_PUBLIC_GA_CONVERSION_LABEL: z.string().trim().optional(),
  NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: z.string().trim().optional(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string().trim().optional(),
  NEXT_PUBLIC_ALGOLIA_INDEX_NAME: z.string().trim().default('content'),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().trim().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().trim().default('production'),
});

// Server environment variables (not exposed to browser)
const serverEnvSchema = z.object({
  // Indexing control
  ALLOW_INDEXING: z.enum(['true', 'false']).optional(),

  // Email service (Resend)
  RESEND_API_KEY: z.string().trim().optional(),
  CONTACT_EMAIL_TO: z.email().default('contact@elevatedigital.com'),
  RESEND_AUDIENCE_ID: z.string().trim().optional(),

  // Rate limiting (Upstash Redis)
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().optional(),

  // CMS (Sanity)
  SANITY_API_READ_TOKEN: z.string().trim().optional(),

  // Feature flags
  ENABLE_REACT_COMPILER: z.enum(['true', 'false']).optional(),

  // Platform detection
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
});

// Validate public env (always available)
let _publicEnv: z.infer<typeof publicEnvSchema> | null = null;

export function getPublicEnv() {
  if (_publicEnv === null) {
    _publicEnv = publicEnvSchema.parse(process.env);
  }
  return _publicEnv;
}

// Reset cache for testing (not exported in production)
export function resetEnvCache() {
  _publicEnv = null;
  _serverEnv = null;
}

// Validate server env (server-side only)
let _serverEnv: z.infer<typeof serverEnvSchema> | null = null;

export function getServerEnv() {
  if (_serverEnv === null) {
    _serverEnv = serverEnvSchema.parse(process.env);
  }
  return _serverEnv;
}

// Production validation helper - throws if required production secrets are missing
export function validateProductionEnv() {
  const env = getServerEnv();
  const errors: string[] = [];
  
  // In production, Resend API key is required for email functionality
  if (env.NODE_ENV === 'production' && !env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is required in production for email functionality');
  }
  
  if (errors.length > 0) {
    throw new Error(`Production environment validation failed:\n${errors.join('\n')}`);
  }
}

// Type-safe getters for commonly used env vars
export function getSiteUrl(): string {
  return getPublicEnv().NEXT_PUBLIC_SITE_URL;
}

export function getResendApiKey(): string | undefined {
  return getServerEnv().RESEND_API_KEY;
}

export function getContactEmailTo(): string {
  return getServerEnv().CONTACT_EMAIL_TO;
}

export function getResendAudienceId(): string | undefined {
  return getServerEnv().RESEND_AUDIENCE_ID;
}

export function getGaMeasurementId(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_GA_MEASUREMENT_ID;
}

export function getGaConversionId(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_GA_CONVERSION_ID;
}

export function getGaConversionLabel(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_GA_CONVERSION_LABEL;
}

export function getAlgoliaApplicationId(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_ALGOLIA_APPLICATION_ID;
}

export function getAlgoliaSearchApiKey(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
}

export function getAlgoliaIndexName(): string {
  return getPublicEnv().NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
}

export function getSanityProjectId(): string | undefined {
  return getPublicEnv().NEXT_PUBLIC_SANITY_PROJECT_ID;
}

export function getSanityDataset(): string {
  return getPublicEnv().NEXT_PUBLIC_SANITY_DATASET;
}

export function getSanityApiReadToken(): string | undefined {
  return getServerEnv().SANITY_API_READ_TOKEN;
}

export function getUpstashRedisRestUrl(): string | undefined {
  return getServerEnv().UPSTASH_REDIS_REST_URL;
}

export function getUpstashRedisRestToken(): string | undefined {
  return getServerEnv().UPSTASH_REDIS_REST_TOKEN;
}

export function isReactCompilerEnabled(): boolean {
  return getServerEnv().ENABLE_REACT_COMPILER === 'true';
}

export function isProduction(): boolean {
  return getServerEnv().NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return getServerEnv().NODE_ENV === 'development';
}

export function isTest(): boolean {
  return getServerEnv().NODE_ENV === 'test';
}
