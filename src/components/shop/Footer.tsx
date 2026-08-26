import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const shopLinks = [
  { label: "Accueil", href: "/" },
  { label: "Toute la boutique", href: "/boutique" },
  { label: "Femme", href: "/boutique?categorie=femme" },
  { label: "Homme", href: "/boutique?categorie=homme" },
  { label: "Accessoires", href: "/boutique?categorie=accessoires" },
];

const socials = ["Instagram", "Facebook", "TikTok"];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-foreground">
            Boutique<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Mode et accessoires sélectionnés avec soin, livrés partout en Algérie — paiement à la
            livraison.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {socials.map((label) => (
              <Link
                key={label}
                href="#"
                className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-border-hover hover:text-accent-dark"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">Boutique</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">Nous suivre</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>Nouvelle collection chaque mois</li>
            <li>Offres exclusives sur les réseaux</li>
            <li>Réponses sous 24h</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              12 rue Didouche Mourad, Alger
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-accent" />
              0555 00 11 22
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-accent" />
              contact@boutique.dz
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center text-xs text-subtle sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Boutique. Tous droits réservés.</p>
          <p>Paiement à la livraison · Livraison partout en Algérie</p>
        </div>
      </div>
    </footer>
  );
}
