"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from '@/i18n/navigation';
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
          hit.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Search</h1>
            <p className="text-gray-600">Loading search index...</p>
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

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Filter by Type</h2>
              <div className="space-y-2">
                {Object.entries(typeCounts).map(([type, count]) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <input
                type="text"
                placeholder="Search for content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
              <div className="mt-4 text-sm text-gray-600">
                {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
              </div>
            </div>

            <div className="space-y-4">
              {filteredResults.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <p className="text-gray-600">No results found for "{query}"</p>
                </div>
              ) : (
                filteredResults.map((hit) => (
                  <Link
                    key={hit.objectID}
                    href={hit.url}
                    className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded capitalize">
                            {hit.type}
                          </span>
                          {hit.category && (
                            <span className="text-xs text-gray-500">{hit.category}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{hit.title}</h3>
                        <p className="text-gray-600 line-clamp-2 mb-3">{hit.description}</p>
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
