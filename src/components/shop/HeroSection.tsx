"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { formatDA } from "@/lib/utils";

interface HeroProduct {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const trustItems = [
  { icon: Truck, label: "Livraison 48h" },
  { icon: ShieldCheck, label: "Paiement à la livraison" },
  { icon: RotateCcw, label: "Échange facile" },
];

export function HeroSection({ product }: { product: HeroProduct | null }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-widest text-accent uppercase"
          >
            Nouvelle collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mx-auto mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl lg:mx-0"
          >
            Des pièces qui durent, un style qui te ressemble
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-lg text-muted lg:mx-0"
          >
            Mode et accessoires sélectionnés avec soin, livrés chez toi partout en Algérie —
            paiement à la livraison.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Découvrir la boutique
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/boutique?categorie=femme"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-border-hover hover:bg-surface"
            >
              Nouveautés Femme
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted lg:justify-start"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon size={14} className="text-accent" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {product && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] bg-surface-hover shadow-2xl shadow-foreground/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur sm:block"
            >
              <p className="font-mono text-[10px] tracking-wide text-subtle uppercase">
                {product.category}
              </p>
              <p className="font-display mt-0.5 text-sm font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-accent-dark">{formatDA(product.price)}</p>
            </motion.div>

            <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium tracking-wide text-accent-dark uppercase backdrop-blur">
              Populaire
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
