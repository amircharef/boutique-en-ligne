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
    body: "Commande reçue en 2 jours, exactement comme sur les photos. Le paiement à la livraison m'a mise en confiance direct.",
  },
  {
    name: "Yacine B.",
    city: "Oran",
    rating: 5,
    body: "Le costume est impeccable, la coupe est parfaite. Le suivi de commande en temps réel c'est vraiment pratique.",
  },
  {
    name: "Amira C.",
    city: "Constantine",
    rating: 4,
    body: "Très bon rapport qualité-prix. Le sac est encore plus beau en vrai. Je recommande.",
  },
  {
    name: "Sofiane K.",
    city: "Annaba",
    rating: 5,
    body: "Deuxième commande cette année. Le service client répond vite et l'échange de taille s'est fait sans souci.",
  },
  {
    name: "Meriem T.",
    city: "Sétif",
    rating: 5,
    body: "Livraison rapide, emballage soigné. La robe correspond parfaitement à la description.",
  },
];
