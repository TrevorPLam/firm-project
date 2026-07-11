export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium h-6 w-24 animate-pulse" />
            </div>
            <div className="mb-6 h-16 w-3/4 animate-pulse bg-foreground/10 rounded" />
            <div className="mb-8 h-8 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <div className="h-8 w-8 animate-pulse bg-foreground/10 rounded" />
                <div className="h-6 w-32 animate-pulse bg-foreground/10 rounded" />
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
                <div className="mb-2 h-12 w-16 mx-auto animate-pulse bg-primary/20 rounded" />
                <div className="h-4 w-20 mx-auto animate-pulse bg-foreground/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-12 w-1/2 animate-pulse bg-foreground/10 rounded" />
          <div className="space-y-4">
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="h-6 w-3/4 animate-pulse bg-foreground/10 rounded" />
          </div>
        </div>
      </section>

      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-12 w-1/2 animate-pulse bg-foreground/10 rounded" />
          <div className="space-y-4">
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-12 w-1/2 animate-pulse bg-foreground/10 rounded" />
          <div className="space-y-4">
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            <div className="h-6 w-3/4 animate-pulse bg-foreground/10 rounded" />
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-12 w-1/2 animate-pulse bg-foreground/10 rounded" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 animate-pulse bg-foreground/10 rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8 md:p-12">
            <div className="mb-6 h-12 w-12 animate-pulse bg-primary/20 rounded" />
            <div className="mb-6 space-y-3">
              <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
              <div className="h-6 w-full animate-pulse bg-foreground/10 rounded" />
            </div>
            <div>
              <div className="mb-2 h-6 w-32 animate-pulse bg-foreground/10 rounded" />
              <div className="h-4 w-40 animate-pulse bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-12 w-1/2 animate-pulse bg-foreground/10 rounded" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 animate-pulse bg-foreground/10 rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 h-12 w-3/4 mx-auto animate-pulse bg-foreground/10 rounded" />
          <div className="mb-8 h-6 w-1/2 mx-auto animate-pulse bg-foreground/10 rounded" />
          <div className="h-12 w-48 mx-auto animate-pulse bg-primary/20 rounded-full" />
        </div>
      </section>
    </div>
  );
}
