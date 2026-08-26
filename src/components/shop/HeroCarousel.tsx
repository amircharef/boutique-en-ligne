"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

const AUTOPLAY_MS = 5500;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <section
      className="relative mx-auto mt-6 max-w-6xl px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-surface-hover shadow-xl shadow-foreground/5 sm:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-lg px-8 sm:px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <p className="font-mono text-xs tracking-widest text-accent uppercase">
                  {slide.eyebrow}
                </p>
                <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-sm text-white/80 sm:text-base">{slide.subtitle}</p>
                <Link
                  href={slide.ctaHref}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {slide.ctaLabel}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="Précédent"
              className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label="Suivant"
              className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à la diapositive ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
