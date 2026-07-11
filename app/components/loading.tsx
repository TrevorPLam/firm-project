export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary/30 border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
        <p className="text-foreground/60">Loading...</p>
      </div>
    </div>
  );
}
