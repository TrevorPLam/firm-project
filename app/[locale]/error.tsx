"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h1 className="mb-2 text-4xl font-bold">Something went wrong</h1>
        <p className="text-foreground/60 mb-6">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-foreground/20 hover:bg-foreground/5 inline-block rounded-lg border px-6 py-3 font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
