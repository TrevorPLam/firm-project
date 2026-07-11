import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-2 text-4xl font-bold">Page Not Found</h1>
        <p className="text-foreground/60 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark inline-block rounded-lg px-6 py-3 font-medium text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
