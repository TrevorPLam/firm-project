import { describe, it, expect, beforeEach } from "vitest";
import {
  getPublicEnv,
  getServerEnv,
  validateProductionEnv,
  getSiteUrl,
  getResendApiKey,
  getContactEmailTo,
  getResendAudienceId,
  getGaMeasurementId,
  getAlgoliaApplicationId,
  getAlgoliaIndexName,
  getSanityDataset,
  isProduction,
  isDevelopment,
  isTest,
  isReactCompilerEnabled,
  resetEnvCache,
} from "../../lib/env";

describe("env module", () => {
  beforeEach(() => {
    // Reset env cache before each test
    resetEnvCache();
    // Clean up env vars that might interfere with tests
    // @ts-expect-error - test environment cleanup
    delete process.env.ENABLE_REACT_COMPILER;
    // Set valid defaults for tests
    process.env.CONTACT_EMAIL_TO = "test@example.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://test.com";
  });

  describe("getPublicEnv", () => {
    it("returns custom site URL when set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://custom.com";
      resetEnvCache();
      const env = getPublicEnv();
      expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://custom.com");
    });

    it("validates URL format for site URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
      resetEnvCache();
      expect(() => getPublicEnv()).toThrow();
    });

    it("returns optional GA measurement ID when set", () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-1234567890";
      resetEnvCache();
      const env = getPublicEnv();
      expect(env.NEXT_PUBLIC_GA_MEASUREMENT_ID).toBe("G-1234567890");
    });

    it("returns default Algolia index name", () => {
      process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME = "custom-index";
      resetEnvCache();
      const env = getPublicEnv();
      expect(env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME).toBe("custom-index");
    });

    it("returns default Sanity dataset", () => {
      process.env.NEXT_PUBLIC_SANITY_DATASET = "staging";
      resetEnvCache();
      const env = getPublicEnv();
      expect(env.NEXT_PUBLIC_SANITY_DATASET).toBe("staging");
    });
  });

  describe("getServerEnv", () => {
    it("returns custom contact email when set", () => {
      process.env.CONTACT_EMAIL_TO = "custom@example.com";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.CONTACT_EMAIL_TO).toBe("custom@example.com");
    });

    it("validates email format for contact email", () => {
      process.env.CONTACT_EMAIL_TO = "not-an-email";
      resetEnvCache();
      expect(() => getServerEnv()).toThrow();
    });

    it("returns Resend API key when set", () => {
      process.env.RESEND_API_KEY = "re_test_key";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.RESEND_API_KEY).toBe("re_test_key");
    });

    it("returns undefined for optional fields when not set", () => {
      // @ts-expect-error - test environment mutation
      delete process.env.RESEND_API_KEY;
      resetEnvCache();
      const env = getServerEnv();
      expect(env.RESEND_API_KEY).toBeUndefined();
    });

    it("accepts any string for audience ID", () => {
      process.env.RESEND_AUDIENCE_ID = "any-string-value";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.RESEND_AUDIENCE_ID).toBe("any-string-value");
    });

    it("validates URL format for Upstash Redis URL", () => {
      process.env.UPSTASH_REDIS_REST_URL = "not-a-url";
      resetEnvCache();
      expect(() => getServerEnv()).toThrow();
    });

    it("accepts valid URL for Upstash Redis URL", () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.UPSTASH_REDIS_REST_URL).toBe("https://test.upstash.io");
    });

    it("validates ALLOW_INDEXING enum values", () => {
      process.env.ALLOW_INDEXING = "invalid";
      resetEnvCache();
      expect(() => getServerEnv()).toThrow();
    });

    it("accepts valid ALLOW_INDEXING values", () => {
      process.env.ALLOW_INDEXING = "true";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.ALLOW_INDEXING).toBe("true");
    });

    it("validates ENABLE_REACT_COMPILER enum values", () => {
      process.env.ENABLE_REACT_COMPILER = "invalid";
      resetEnvCache();
      expect(() => getServerEnv()).toThrow();
    });

    it("accepts valid ENABLE_REACT_COMPILER values", () => {
      process.env.ENABLE_REACT_COMPILER = "true";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.ENABLE_REACT_COMPILER).toBe("true");
    });

    it("accepts valid NODE_ENV values", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "production";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.NODE_ENV).toBe("production");
    });

    it("accepts VERCEL_ENV when set", () => {
      process.env.VERCEL_ENV = "preview";
      resetEnvCache();
      const env = getServerEnv();
      expect(env.VERCEL_ENV).toBe("preview");
    });
  });

  describe("validateProductionEnv", () => {
    it("throws when RESEND_API_KEY is missing in production", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "production";
      // @ts-expect-error - test environment mutation
      delete process.env.RESEND_API_KEY;
      resetEnvCache();
      expect(() => validateProductionEnv()).toThrow(
        "RESEND_API_KEY is required in production",
      );
    });

    it("does not throw when RESEND_API_KEY is set in production", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "production";
      process.env.RESEND_API_KEY = "re_test_key";
      resetEnvCache();
      expect(() => validateProductionEnv()).not.toThrow();
    });

    it("does not throw when RESEND_API_KEY is missing in development", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      // @ts-expect-error - test environment mutation
      delete process.env.RESEND_API_KEY;
      resetEnvCache();
      expect(() => validateProductionEnv()).not.toThrow();
    });

    it("does not throw when RESEND_API_KEY is missing in test", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "test";
      // @ts-expect-error - test environment mutation
      delete process.env.RESEND_API_KEY;
      resetEnvCache();
      expect(() => validateProductionEnv()).not.toThrow();
    });
  });

  describe("type-safe getters", () => {
    it("getSiteUrl returns site URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://test.com";
      resetEnvCache();
      expect(getSiteUrl()).toBe("https://test.com");
    });

    it("getResendApiKey returns API key when set", () => {
      process.env.RESEND_API_KEY = "re_test_key";
      resetEnvCache();
      expect(getResendApiKey()).toBe("re_test_key");
    });

    it("getResendApiKey returns undefined when not set", () => {
      // @ts-expect-error - test environment mutation
      delete process.env.RESEND_API_KEY;
      resetEnvCache();
      expect(getResendApiKey()).toBeUndefined();
    });

    it("getContactEmailTo returns contact email", () => {
      process.env.CONTACT_EMAIL_TO = "test@example.com";
      resetEnvCache();
      expect(getContactEmailTo()).toBe("test@example.com");
    });

    it("getResendAudienceId returns audience ID when set", () => {
      process.env.RESEND_AUDIENCE_ID = "any-audience-id";
      resetEnvCache();
      expect(getResendAudienceId()).toBe("any-audience-id");
    });

    it("getGaMeasurementId returns GA ID when set", () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-1234567890";
      resetEnvCache();
      expect(getGaMeasurementId()).toBe("G-1234567890");
    });

    it("getAlgoliaApplicationId returns Algolia ID when set", () => {
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID = "ALGOLIA_ID";
      resetEnvCache();
      expect(getAlgoliaApplicationId()).toBe("ALGOLIA_ID");
    });

    it("getAlgoliaIndexName returns index name", () => {
      process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME = "test-index";
      resetEnvCache();
      expect(getAlgoliaIndexName()).toBe("test-index");
    });

    it("getSanityDataset returns dataset", () => {
      process.env.NEXT_PUBLIC_SANITY_DATASET = "staging";
      resetEnvCache();
      expect(getSanityDataset()).toBe("staging");
    });

    it("isReactCompilerEnabled returns true when enabled", () => {
      process.env.ENABLE_REACT_COMPILER = "true";
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      resetEnvCache();
      expect(isReactCompilerEnabled()).toBe(true);
    });

    it("isReactCompilerEnabled returns false when not enabled", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      resetEnvCache();
      expect(isReactCompilerEnabled()).toBe(false);
    });

    it("isProduction returns true in production", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "production";
      resetEnvCache();
      expect(isProduction()).toBe(true);
    });

    it("isProduction returns false in development", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      resetEnvCache();
      expect(isProduction()).toBe(false);
    });

    it("isDevelopment returns true in development", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      resetEnvCache();
      expect(isDevelopment()).toBe(true);
    });

    it("isDevelopment returns false in production", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "production";
      resetEnvCache();
      expect(isDevelopment()).toBe(false);
    });

    it("isTest returns true in test", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "test";
      resetEnvCache();
      expect(isTest()).toBe(true);
    });

    it("isTest returns false in development", () => {
      // @ts-expect-error - test environment mutation
      process.env.NODE_ENV = "development";
      resetEnvCache();
      expect(isTest()).toBe(false);
    });
  });
});
