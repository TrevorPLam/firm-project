// Content migration script for Sanity CMS
// Reads existing content from TypeScript files and migrates to Sanity
// Run with: npx tsx scripts/migrate-content.ts

import { createClient } from 'next-sanity';
import { getAllPosts } from '../app/lib/blog-data';
import { getAllCaseStudies } from '../app/lib/portfolio-data';

// ============================================
// Sanity Client Configuration
// ============================================

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01' as const,
  useCdn: false as const,
};

const clientConfig = process.env.SANITY_API_WRITE_TOKEN
  ? { ...config, token: process.env.SANITY_API_WRITE_TOKEN }
  : config;

const client = createClient(clientConfig);

// ============================================
// Migration Functions
// ============================================

/**
 * Migrate blog posts to Sanity
 */
async function migrateBlogPosts() {
  console.log('📝 Migrating blog posts...');

  const posts = getAllPosts();
  let successCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    try {
      const fullPost = (await import('../app/lib/blog-data')).getPostBySlug(post.slug);
      
      if (!fullPost) {
        console.warn(`⚠️  Blog post not found: ${post.slug}`);
        continue;
      }

      const sanityDoc = {
        _type: 'blogPost',
        _id: `blog-${post.id}`,
        title: fullPost.title,
        slug: {
          _type: 'slug',
          current: fullPost.slug,
        },
        excerpt: fullPost.excerpt,
        category: fullPost.category,
        date: fullPost.date,
        readTime: fullPost.readTime,
        author: {
          _type: 'blogAuthor',
          name: fullPost.author.name,
          role: fullPost.author.role,
        },
        content: fullPost.content,
        tags: fullPost.tags,
        publishedAt: new Date().toISOString(),
      };

      await client.createOrReplace(sanityDoc);
      console.log(`✅ Migrated blog post: ${fullPost.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to migrate blog post: ${post.slug}`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Blog posts: ${successCount} succeeded, ${errorCount} failed`);
  return { successCount, errorCount };
}

/**
 * Migrate case studies to Sanity
 */
async function migrateCaseStudies() {
  console.log('📁 Migrating case studies...');

  const studies = getAllCaseStudies();
  let successCount = 0;
  let errorCount = 0;

  for (const study of studies) {
    try {
      const fullStudy = (await import('../app/lib/portfolio-data')).getCaseStudyBySlug(study.slug);
      
      if (!fullStudy) {
        console.warn(`⚠️  Case study not found: ${study.slug}`);
        continue;
      }

      const sanityDoc = {
        _type: 'caseStudy',
        _id: `case-${study.id}`,
        title: fullStudy.title,
        slug: {
          _type: 'slug',
          current: fullStudy.slug,
        },
        category: fullStudy.category,
        client: fullStudy.client,
        description: fullStudy.description,
        overview: fullStudy.overview,
        challenge: fullStudy.challenge,
        solution: fullStudy.solution,
        results: fullStudy.results,
        testimonial: fullStudy.testimonial,
        tags: fullStudy.tags,
        timeline: fullStudy.timeline,
        technologies: fullStudy.technologies,
        publishedAt: new Date().toISOString(),
      };

      await client.createOrReplace(sanityDoc);
      console.log(`✅ Migrated case study: ${fullStudy.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to migrate case study: ${study.slug}`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Case studies: ${successCount} succeeded, ${errorCount} failed`);
  return { successCount, errorCount };
}

// ============================================
// Main Migration Function
// ============================================

async function main() {
  console.log('🚀 Starting content migration to Sanity CMS...\n');

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
    process.exit(1);
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN is not set');
    process.exit(1);
  }

  try {
    // Migrate blog posts
    const blogResults = await migrateBlogPosts();
    console.log('');

    // Migrate case studies
    const caseStudyResults = await migrateCaseStudies();
    console.log('');

    // Summary
    const totalSuccess = blogResults.successCount + caseStudyResults.successCount;
    const totalError = blogResults.errorCount + caseStudyResults.errorCount;

    console.log('========================================');
    console.log('📈 Migration Summary');
    console.log('========================================');
    console.log(`Total succeeded: ${totalSuccess}`);
    console.log(`Total failed: ${totalError}`);
    console.log('========================================\n');

    if (totalError > 0) {
      console.warn('⚠️  Some migrations failed. Please review the errors above.');
      process.exit(1);
    } else {
      console.log('✅ Migration completed successfully!');
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
main();
