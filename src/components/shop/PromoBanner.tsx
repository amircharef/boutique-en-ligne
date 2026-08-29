const messages = [
  "Livraison partout en Algérie",
  "Paiement à la livraison",
  "Hoodies premium homme & femme",
  "Échange facile sous 7 jours",
];

export function PromoBanner() {
  const items = [...messages, ...messages];

  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="animate-marquee flex w-max items-center gap-10 py-2 whitespace-nowrap">
        {items.map((message, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[11px] tracking-wide uppercase"
          >
            {message}
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
