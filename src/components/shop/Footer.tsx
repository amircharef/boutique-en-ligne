export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center text-sm text-subtle sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-base font-semibold text-foreground">
          Boutique<span className="text-accent">.</span>
        </p>
        <p>Paiement à la livraison · Livraison partout en Algérie</p>
      </div>
    </footer>
  );
}
