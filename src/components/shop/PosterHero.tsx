"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDA } from "@/lib/utils";

export interface HeroProduct {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

function cutoutSrc(image: string) {
  return image.replace("/hoodies/", "/hoodies/cutout/").replace(/\.jpe?g$/i, ".png");
}

function RotatingBadge() {
  return (
    <div className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 sm:h-[620px] sm:w-[620px]">
      <svg viewBox="0 0 440 440" className="h-full w-full overflow-visible">
        <defs>
          <path id="badge-ellipse" d="M 220,220 m -200,0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0" />
        </defs>
        <text
          className="fill-accent"
          fontSize="13"
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

function TiltStage({ product }: { product: HeroProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), springConfig);
  const glowX = useTransform(mx, [-0.5, 0.5], [-30, 30]);
  const glowY = useTransform(my, [-0.5, 0.5], [-30, 30]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1600 }}
      className="relative mx-auto flex w-full max-w-[520px] items-center justify-center py-10 sm:py-6"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[100px] sm:h-[480px] sm:w-[480px]"
      />

      <RotatingBadge />

      <motion.div
        key={product.slug}
        initial={{ opacity: 0, y: 30, rotateY: -18 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -16, 0], rotateZ: [-1.5, 1.5, -1.5] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cutoutSrc(product.image)}
            alt={product.name}
            className="relative h-[300px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)] select-none sm:h-[420px] lg:h-[480px]"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      <span
        style={{ transform: "translateZ(60px)" }}
        className="absolute top-4 right-2 flex h-16 w-16 rotate-6 items-center justify-center rounded-full border border-accent/40 bg-surface text-center text-[9px] leading-tight font-semibold tracking-wide text-accent uppercase shadow-lg shadow-black/40 sm:top-2 sm:right-4"
      >
        EST.
        <br />
        2024
      </span>
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
        className="font-display pointer-events-none absolute -top-10 left-1/2 w-full -translate-x-1/2 text-center text-[26vw] leading-none text-foreground/[0.05] select-none sm:text-[16vw]"
      >
        HOODR
      </p>

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-10 sm:pt-20">
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

        <div className="mt-6 grid items-center gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              {product.category} · N°{String(active + 1).padStart(2, "0")}
            </p>
            <h1 className="font-display mt-2 text-6xl leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              HOODIE
            </h1>
            <p className="font-display -mt-1 text-xl tracking-widest text-accent sm:text-2xl">
              PREMIUM QUALITY
            </p>
            <p className="mx-auto mt-5 max-w-sm text-sm text-muted lg:mx-0">
              {product.name}
            </p>
            <p className="mt-1 text-lg text-accent">{formatDA(product.price)}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
              <div className="mt-8 flex justify-center gap-3 lg:justify-start">
                {products.map((p, i) => (
                  <button
                    key={p.slug}
                    onClick={() => setActive(i)}
                    className={`h-12 w-12 overflow-hidden rounded-full border-2 transition-all ${
                      i === active
                        ? "border-accent scale-110"
                        : "border-border opacity-60 hover:opacity-100"
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

          <div className="order-1 lg:order-2">
            <TiltStage product={product} />
          </div>
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
