"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { navTaxonomy } from "@/data/nav-taxonomy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { itemCount } = useCart();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSlug(slug);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenSlug(null), 180);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Boutique<span className="text-accent">.</span>
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm text-muted sm:flex"
          onMouseLeave={scheduleClose}
        >
          <Link href="/boutique" className="rounded-full px-3 py-2 transition-colors hover:text-foreground">
            Boutique
          </Link>

          {navTaxonomy.map((cat) => (
            <div key={cat.slug} className="relative" onMouseEnter={() => openMenu(cat.slug)}>
              <Link
                href={`/boutique?categorie=${cat.slug}`}
                className="flex items-center gap-1 rounded-full px-3 py-2 transition-colors hover:text-foreground"
              >
                {cat.label}
                <ChevronDown
                  size={13}
                  className={cn("transition-transform", openSlug === cat.slug && "rotate-180")}
                />
              </Link>

              <AnimatePresence>
                {openSlug === cat.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 z-40 mt-2 w-[min(90vw,640px)] -translate-x-1/2 rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-foreground/10"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {cat.groups.map((group) => (
                        <div key={group.label}>
                          <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">
                            {group.label}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {group.items.map((item) => (
                              <li key={item.tag}>
                                <Link
                                  href={`/boutique?categorie=${cat.slug}&type=${item.tag}`}
                                  className="text-sm text-muted transition-colors hover:text-accent-dark"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/boutique?categorie=${cat.slug}`}
                      className="mt-5 inline-block text-xs font-medium text-accent hover:underline"
                    >
                      Voir tout « {cat.label} »
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <Link
          href="/panier"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:border-border-hover"
          aria-label="Panier"
        >
          <ShoppingBag size={16} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
