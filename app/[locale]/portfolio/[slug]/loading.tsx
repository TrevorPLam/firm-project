export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary/10 h-6 w-24 animate-pulse rounded-full px-3 py-1 text-sm font-medium text-primary" />
            </div>
            <div className="bg-foreground/10 mb-6 h-16 w-3/4 animate-pulse rounded" />
            <div className="bg-foreground/10 mb-8 h-8 w-full animate-pulse rounded" />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-foreground/10 h-8 w-8 animate-pulse rounded" />
                <div className="bg-foreground/10 h-6 w-32 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="bg-primary/20 mx-auto mb-2 h-12 w-16 animate-pulse rounded" />
                <div className="bg-foreground/10 mx-auto h-4 w-20 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-foreground/10 mb-8 h-12 w-1/2 animate-pulse rounded" />
          <div className="space-y-4">
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            <div className="bg-foreground/10 h-6 w-3/4 animate-pulse rounded" />
          </div>
        </div>
      </section>

      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-foreground/10 mb-8 h-12 w-1/2 animate-pulse rounded" />
          <div className="space-y-4">
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-foreground/10 mb-8 h-12 w-1/2 animate-pulse rounded" />
          <div className="space-y-4">
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            <div className="bg-foreground/10 h-6 w-3/4 animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-foreground/10 mb-8 h-12 w-1/2 animate-pulse rounded" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-foreground/10 h-10 w-24 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8 md:p-12">
            <div className="bg-primary/20 mb-6 h-12 w-12 animate-pulse rounded" />
            <div className="mb-6 space-y-3">
              <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
              <div className="bg-foreground/10 h-6 w-full animate-pulse rounded" />
            </div>
            <div>
              <div className="bg-foreground/10 mb-2 h-6 w-32 animate-pulse rounded" />
              <div className="bg-foreground/10 h-4 w-40 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-foreground/10 mb-8 h-12 w-1/2 animate-pulse rounded" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-foreground/10 h-10 w-24 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-foreground/10 mx-auto mb-6 h-12 w-3/4 animate-pulse rounded" />
          <div className="bg-foreground/10 mx-auto mb-8 h-6 w-1/2 animate-pulse rounded" />
          <div className="bg-primary/20 mx-auto h-12 w-48 animate-pulse rounded-full" />
        </div>
      </section>
    </div>
  );
}
