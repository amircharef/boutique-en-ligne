export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  body: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lina M.",
    city: "Alger",
    rating: 5,
    body: "Le hoodie oversize est encore mieux en vrai. Matière épaisse, ça vaut largement le prix. Livré en 2 jours.",
  },
  {
    name: "Yacine B.",
    city: "Oran",
    rating: 5,
    body: "J'ai pris le print Mont Rouge, l'impression est nickel et la coupe tombe bien. Paiement à la livraison, aucun stress.",
  },
  {
    name: "Amira C.",
    city: "Constantine",
    rating: 4,
    body: "Le hoodie lapin est trop mignon, exactement comme sur les photos. Juste la capuche un peu grande pour moi.",
  },
  {
    name: "Sofiane K.",
    city: "Annaba",
    rating: 5,
    body: "Deuxième commande. Le zippé chiné est devenu mon préféré pour l'automne. Service client réactif.",
  },
  {
    name: "Meriem T.",
    city: "Sétif",
    rating: 5,
    body: "Le cocooning kaki porte bien son nom, je ne l'enlève plus. Emballage soigné, livraison rapide.",
  },
];
