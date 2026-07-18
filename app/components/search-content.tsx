"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import type { SearchHit } from "@/lib/search-data";
import { getAllSearchableContent } from "@/lib/search-data";

interface LocalSearchContentProps {
  locale: string;
}

export function SearchContent({ locale }: LocalSearchContentProps) {
  const [searchData, setSearchData] = useState<SearchHit[]>([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllSearchableContent(locale)
      .then((data) => {
        setSearchData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load search data:", error);
        setIsLoading(false);
      });
  }, [locale]);

  const filteredResults = useMemo(() => {
    let results = searchData;

    // Filter by type
    if (selectedType !== "all") {
      results = results.filter((hit) => hit.type === selectedType);
    }

    // Filter by query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (hit) =>
          hit.title.toLowerCase().includes(lowerQuery) ||
          hit.description.toLowerCase().includes(lowerQuery) ||
          hit.category?.toLowerCase().includes(lowerQuery) ||
          hit.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    }

    return results;
  }, [searchData, query, selectedType]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: searchData.length };
    searchData.forEach((hit) => {
      counts[hit.type] = (counts[hit.type] || 0) + 1;
    });
    return counts;
  }, [searchData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Search</h1>
            <p className="text-gray-600">Loading search index...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Search</h1>
          <p className="text-gray-600">
            Search our blog posts, portfolio case studies, and pages.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 font-semibold">Filter by Type</h2>
              <div className="space-y-2">
                {Object.entries(typeCounts).map(([type, count]) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm capitalize text-gray-700">
                      {type}
                    </span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
              <input
                type="text"
                placeholder="Search for content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="mt-4 text-sm text-gray-600">
                {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""} found
              </div>
            </div>

            <div className="space-y-4">
              {filteredResults.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                  <p className="text-gray-600">
                    No results found for "{query}"
                  </p>
                </div>
              ) : (
                filteredResults.map((hit) => (
                  <Link
                    key={hit.objectID}
                    href={hit.url}
                    className="block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="bg-primary/10 rounded px-2 py-1 text-xs font-medium capitalize text-primary">
                            {hit.type}
                          </span>
                          {hit.category && (
                            <span className="text-xs text-gray-500">
                              {hit.category}
                            </span>
                          )}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-foreground">
                          {hit.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-gray-600">
                          {hit.description}
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
