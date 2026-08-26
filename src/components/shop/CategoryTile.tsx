import Link from "next/link";
import { ArrowRight, ImageOff } from "lucide-react";

interface CategoryTileData {
  slug: string;
  name: string;
  image: string | null;
  count: number;
}

export function CategoryTile({ category }: { category: CategoryTileData }) {
  return (
    <Link
      href={`/boutique?categorie=${category.slug}`}
      className="group relative block aspect-4/5 overflow-hidden rounded-3xl bg-surface-hover"
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
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
    </Link>
  );
}
