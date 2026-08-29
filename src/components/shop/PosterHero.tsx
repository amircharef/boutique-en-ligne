"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDA } from "@/lib/utils";

export interface HeroProduct {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

function RotatingBadge() {
  return (
    <div className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[320px] -translate-x-1/2 -translate-y-1/2 sm:h-[540px] sm:w-[410px]">
      <svg viewBox="0 0 320 420" className="h-full w-full overflow-visible">
        <defs>
          <path id="badge-ellipse" d="M 160,210 m -150,0 a 150,200 0 1,1 300,0 a 150,200 0 1,1 -300,0" />
        </defs>
        <text
          className="fill-accent"
          fontSize="12"
          letterSpacing="3"
          fontFamily="var(--font-sans)"
          fontWeight="600"
        >
          <textPath href="#badge-ellipse" startOffset="0%">
            ✦ PREMIUM HOODIE ✦ NOUVELLE COLLECTION ✦ PREMIUM HOODIE ✦ NOUVELLE COLLECTION
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export function PosterHero({ products }: { products: HeroProduct[] }) {
  const [active, setActive] = useState(0);
  const product = products[active];
  if (!product) return null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-surface to-background">
      <p
        aria-hidden="true"
        className="font-display pointer-events-none absolute -top-6 left-1/2 w-full -translate-x-1/2 text-center text-[26vw] leading-none text-foreground/[0.06] select-none sm:text-[18vw]"
      >
        HOODR
      </p>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 pt-14 pb-10 sm:pt-20">
        <div className="flex items-start justify-between text-[11px] tracking-widest text-muted uppercase">
          <span className="flex items-center gap-1.5">
            <span className="text-accent">+</span> D-14 · nouvelle collection
          </span>
          <span
            className="hidden [writing-mode:vertical-rl] sm:block"
            style={{ letterSpacing: "0.3em" }}
          >
            NEW ARRIVAL
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-md py-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[90px] sm:h-[460px] sm:w-[460px]"
          />

          <RotatingBadge />

          <motion.div
            key={product.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-3/4 w-[230px] overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:w-[290px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/30" />
          </motion.div>

          <span className="absolute top-2 right-2 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-surface text-center text-[9px] leading-tight font-semibold tracking-wide text-accent uppercase shadow-lg shadow-black/40">
            EST.
            <br />
            2024
          </span>
        </div>

        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {product.category}
          </p>
          <h1 className="font-display mt-2 text-5xl tracking-tight text-foreground sm:text-6xl">
            HOODIE
          </h1>
          <p className="font-display -mt-1 text-xl tracking-widest text-accent sm:text-2xl">
            PREMIUM QUALITY
          </p>
          <p className="mx-auto mt-4 max-w-sm text-sm text-muted">{product.name}</p>
          <p className="mt-1 text-lg text-accent">{formatDA(product.price)}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/boutique/${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Découvrir ce hoodie
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface"
            >
              Tout le catalogue
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {products.length > 1 && (
            <div className="mt-8 flex justify-center gap-3">
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setActive(i)}
                  className={`h-12 w-12 overflow-hidden rounded-full border-2 transition-all ${
                    i === active ? "border-accent scale-110" : "border-border opacity-60 hover:opacity-100"
                  }`}
                  aria-label={p.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-2 border-t border-border py-2 font-mono text-[10px] tracking-widest text-subtle uppercase">
        <span className="flex gap-px" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="bg-foreground/60"
              style={{ width: i % 3 === 0 ? 2 : 1, height: 14 }}
            />
          ))}
        </span>
        2025 collection · hoodr.
      </div>
    </section>
  );
}
