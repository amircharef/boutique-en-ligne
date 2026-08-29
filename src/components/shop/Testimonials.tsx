import { Star } from "lucide-react";
import { testimonials } from "@/data/demo/testimonials";
import { Reveal } from "@/components/shop/Reveal";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-display text-2xl">Ce qu&apos;ils en pensent</h2>
        <p className="mt-2 text-muted">Des clients partout en Algérie, livrés et satisfaits.</p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <Reveal key={t.name} delay={Math.min(i * 0.06, 0.3)}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    size={14}
                    fill={star < t.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm text-muted">« {t.body} »</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent-dark">
                  {t.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-subtle">{t.city}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
