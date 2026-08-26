import { Navbar } from "@/components/shop/Navbar";
import { Footer } from "@/components/shop/Footer";
import { PromoBanner } from "@/components/shop/PromoBanner";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
