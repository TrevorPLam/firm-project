"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";

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
      className="block p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
              {hit.type}
            </span>
            {hit.category && (
              <span className="text-xs text-gray-500">{hit.category}</span>
            )}
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            <Highlight attribute="title" hit={hit} />
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            <Highlight attribute="description" hit={hit} />
          </p>
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
  );
}

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  if (!searchClient) {
    return (
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-foreground transition-colors"
          aria-label="Search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <p className="text-sm text-gray-500">Search is not configured. Please add Algolia credentials.</p>
          </div>
        )}
      </div>
    );
  }

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
          <InstantSearch
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            searchClient={searchClient as any}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "content"}
          >
            <div className="p-4 border-b">
              <SearchBox
                placeholder="Search..."
                autoFocus
                classNames={{
                  root: "relative",
                  form: "relative",
                  input:
                    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                  submit: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400",
                  reset: "hidden",
                }}
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              <Hits hitComponent={Hit} />
            </div>
          </InstantSearch>
        </div>
      )}
    </div>
  );
}
