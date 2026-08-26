"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";

interface CategoryTileData {
  slug: string;
  name: string;
  image: string | null;
  count: number;
}

const subLinks: Record<string, { label: string; type: string }[]> = {
  homme: [
    { label: "Vêtements", type: "jeans" },
    { label: "Chaussures", type: "baskets" },
    { label: "Accessoires", type: "montres" },
  ],
  femme: [
    { label: "Vêtements", type: "robes" },
    { label: "Chaussures", type: "escarpins" },
    { label: "Accessoires", type: "sacs" },
  ],
  accessoires: [
    { label: "Sacs", type: "sacs" },
    { label: "Montres", type: "montres" },
    { label: "Ceintures", type: "ceintures" },
  ],
};

export function CategoryTile({ category }: { category: CategoryTileData }) {
  const [hovered, setHovered] = useState(false);
  const links = subLinks[category.slug] ?? [];

  return (
    <div
      className="group relative aspect-4/5 overflow-hidden rounded-3xl bg-surface-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/boutique?categorie=${category.slug}`} className="absolute inset-0 z-0 block">
        {category.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-subtle">
            <ImageOff size={32} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
      </Link>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-5">
        <div>
          <p className="font-display text-xl font-semibold text-white">{category.name}</p>
          <p className="text-xs text-white/70">
            {category.count} article{category.count > 1 ? "s" : ""}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/25">
          <ArrowRight size={16} />
        </span>
      </div>

      <AnimatePresence>
        {hovered && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 bg-black/55 p-6 backdrop-blur-sm"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="w-full max-w-[200px]"
              >
                <Link
                  href={`/boutique?categorie=${category.slug}&type=${link.type}`}
                  className="block w-full rounded-full bg-white/95 py-2.5 text-center text-xs font-medium text-foreground shadow-lg transition-colors hover:bg-accent hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
