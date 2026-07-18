"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { SearchHit } from "@/lib/search-data";
import { getAllSearchableContent } from "@/lib/search-data";
import { Link } from "@/i18n/navigation";

interface SearchBarProps {
  locale: string;
  onClose?: () => void;
}

export function SearchBar({ locale, onClose }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState<SearchHit[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      getAllSearchableContent(locale)
        .then((data) => setSearchData(data))
        .catch((error) => console.error("Failed to load search data:", error));
    }
  }, [isOpen, locale]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return searchData.filter(
      (hit) =>
        hit.title.toLowerCase().includes(lowerQuery) ||
        hit.description.toLowerCase().includes(lowerQuery) ||
        hit.category?.toLowerCase().includes(lowerQuery) ||
        hit.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [searchData, query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-foreground transition-colors"
        aria-label="Search"
        aria-expanded={isOpen}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredResults.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {query ? "No results found" : "Type to search..."}
              </div>
            ) : (
              filteredResults.map((hit) => (
                <Link
                  key={hit.objectID}
                  href={hit.url}
                  className="block p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded capitalize">
                          {hit.type}
                        </span>
                        {hit.category && (
                          <span className="text-xs text-gray-500">{hit.category}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{hit.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{hit.description}</p>
                      {(hit.author || hit.client || hit.date) && (
                        <div className="mt-2 text-xs text-gray-500">
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
      )}
    </div>
  );
}
