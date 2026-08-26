import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/components/shop/CartContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Boutique — Mode & accessoires",
    template: "%s — Boutique",
  },
  description:
    "Boutique en ligne de mode et accessoires : catalogue, panier, commande en paiement à la livraison.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Boutique",
    title: "Boutique — Mode & accessoires",
    description:
      "Boutique en ligne de mode et accessoires : catalogue, panier, commande en paiement à la livraison.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
