"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";

// Date de fin de la campagne — à ajuster selon la promo en cours.
const PROMO_END = new Date("2026-09-07T23:59:59");

function getTimeLeft() {
  const diff = Math.max(0, PROMO_END.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function PromoCountdownBanner() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "jours", value: time?.days },
    { label: "heures", value: time?.hours },
    { label: "min", value: time?.minutes },
    { label: "sec", value: time?.seconds },
  ];

  return (
    <section className="mx-auto mt-6 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-accent-dark via-accent to-accent-dark px-6 py-8 text-white sm:px-10">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur">
              <Percent size={12} />
              Offre limitée
            </span>
            <h2 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">
              Soldes de fin d&apos;été — jusqu&apos;à -20%
            </h2>
            <p className="mt-1.5 text-sm text-white/80">
              Sur une sélection d&apos;articles. Paiement à la livraison, comme toujours.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex w-14 flex-col items-center rounded-xl bg-white/15 py-2 backdrop-blur"
                >
                  <span className="font-display text-xl font-semibold tabular-nums">
                    {u.value === undefined ? "--" : pad(u.value)}
                  </span>
                  <span className="text-[10px] tracking-wide text-white/70 uppercase">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/boutique"
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-accent-dark transition-transform hover:scale-[1.02] sm:flex"
            >
              En profiter
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
