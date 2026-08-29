import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { CartProvider } from "@/components/shop/CartContext";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HOODR. — Hoodies premium",
    template: "%s — HOODR.",
  },
  description:
    "Hoodies premium pour homme et femme. Catalogue, panier, commande en paiement à la livraison.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "HOODR.",
    title: "HOODR. — Hoodies premium",
    description:
      "Hoodies premium pour homme et femme. Catalogue, panier, commande en paiement à la livraison.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${anton.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
