"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination, Stats } from "react-instantsearch";
import Link from "next/link";

const searchClient =
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
    ? algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
      )
    : null;

interface HitProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hit: any;
}

function Hit({ hit }: HitProps) {
  return (
    <Link
      href={hit.url}
      className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
              {hit.type}
            </span>
            {hit.category && (
              <span className="text-xs text-gray-500">{hit.category}</span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            <Highlight attribute="title" hit={hit} />
          </h3>
          <p className="text-gray-600 line-clamp-2 mb-3">
            <Highlight attribute="description" hit={hit} />
          </p>
          {(hit.author || hit.client || hit.date) && (
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {hit.author && <span>By {hit.author}</span>}
              {hit.client && <span>Client: {hit.client}</span>}
              {hit.date && <span>{hit.date}</span>}
              {hit.readTime && <span> • {hit.readTime}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  if (!searchClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Search</h1>
            <p className="text-gray-600">Search is not configured. Please add Algolia credentials to your environment variables.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search</h1>
          <p className="text-gray-600">Search our blog posts, portfolio case studies, and pages.</p>
        </div>

        <InstantSearch
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          searchClient={searchClient as any}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "content"}
        >
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="font-semibold mb-4">Filter by Type</h2>
                <RefinementList
                  attribute="type"
                  limit={10}
                  classNames={{
                    root: "space-y-2",
                    item: "flex items-center gap-2",
                    label: "text-sm text-gray-700 cursor-pointer",
                    checkbox: "rounded border-gray-300 text-primary focus:ring-primary",
                    count: "text-xs text-gray-500",
                  }}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <SearchBox
                  placeholder="Search for content..."
                  classNames={{
                    root: "relative",
                    form: "relative",
                    input:
                      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg",
                    submit: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                    reset: "hidden",
                  }}
                />
                <div className="mt-4 text-sm text-gray-600">
                  <Stats />
                </div>
              </div>

              <div className="space-y-4">
                <Hits hitComponent={Hit} />
              </div>

              <div className="mt-8 flex justify-center">
                <Pagination
                  classNames={{
                    root: "flex items-center gap-2",
                    item: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors",
                    selectedItem: "px-4 py-2 border border-primary bg-primary text-white rounded",
                    disabledItem: "px-4 py-2 border border-gray-200 text-gray-400 rounded cursor-not-allowed",
                  }}
                />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
