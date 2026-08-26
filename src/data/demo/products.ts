// Seed data for prisma/seed.ts — `order` is assigned at seed time (array index).
// Photos : Wikimedia Commons (licences libres), URLs vérifiées avant intégration.
export const demoCategories = [
  {
    id: "cat-femme",
    name: "Femme",
    slug: "femme",
    products: [
      {
        id: "prod-robe-imprimee",
        slug: "robe-imprimee-estivale",
        name: "Robe Imprimée Estivale",
        description:
          "Robe légère à motifs, coupe fluide, idéale pour les journées chaudes. Tissu respirant, doublure intérieure.",
        price: 4500,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/3/37/Assorted_Women%27s_Dresses_with_Different_Patterns_and_Colors.jpg",
        ],
        sizes: ["S", "M", "L"],
        stock: 12,
        featured: true,
      },
      {
        id: "prod-chemisier-jupe",
        slug: "chemisier-jupe-taille-haute",
        name: "Chemisier & Jupe Taille Haute",
        description:
          "Ensemble chemisier ample et jupe taille haute, parfait pour un look bureau ou sortie. Coloris bleu intemporel.",
        price: 3200,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/0/03/Woman_wearing_blue_blouse_and_wool_mini_skirt.jpg",
        ],
        sizes: ["S", "M", "L"],
        stock: 8,
        featured: false,
      },
      {
        id: "prod-blazer-femme",
        slug: "blazer-tailleur-femme",
        name: "Blazer Tailleur Femme",
        description:
          "Blazer structuré coupe cintrée, pour un style professionnel affirmé. Se porte seul ou sur une chemise.",
        price: 5800,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/6/69/Woman_in_typical_Office_Lady_attire_%2820240518160421%29.jpg",
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 6,
        featured: false,
      },
    ],
  },
  {
    id: "cat-homme",
    name: "Homme",
    slug: "homme",
    products: [
      {
        id: "prod-costume-cravate",
        slug: "costume-chemise-cravate",
        name: "Costume Chemise Cravate",
        description:
          "Ensemble complet veste, chemise et cravate assortie, coupe slim. Pour un rendu impeccable en toute occasion.",
        price: 7200,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/e/e5/Slim_man_wearing_a_jacket%2C_shirt_and_tie_%281486185%29.jpg",
        ],
        sizes: ["M", "L", "XL"],
        stock: 5,
        featured: true,
      },
      {
        id: "prod-chemise-decontractee",
        slug: "chemise-decontractee-homme",
        name: "Chemise Décontractée Homme",
        description:
          "Chemise surchemise casual, à associer avec un jean pour un style décontracté et soigné au quotidien.",
        price: 2900,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Man_wearing_green_shirt-jacket%2C_blue_jeans_and_desert_boots_01.jpg",
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 10,
        featured: false,
      },
      {
        id: "prod-veste-blazer-homme",
        slug: "veste-blazer-homme",
        name: "Veste Blazer Homme",
        description:
          "Veste blazer ajustée, coupe moderne, à porter sur une chemise pour un look business casual réussi.",
        price: 6500,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/6/61/Slim_man_wearing_a_jacket%2C_shirt_and_tie_%281486180%29.jpg",
        ],
        sizes: ["M", "L", "XL"],
        stock: 7,
        featured: false,
      },
    ],
  },
  {
    id: "cat-accessoires",
    name: "Accessoires",
    slug: "accessoires",
    products: [
      {
        id: "prod-sac-a-main",
        slug: "sac-a-main-cuir",
        name: "Sac à Main Cuir",
        description:
          "Sac à main en cuir, compartiments intérieurs multiples, bandoulière ajustable. Un essentiel du quotidien.",
        price: 3800,
        images: ["https://upload.wikimedia.org/wikipedia/commons/e/e5/Black_handbag.jpg"],
        sizes: [],
        stock: 15,
        featured: true,
      },
      {
        id: "prod-montre-classique",
        slug: "montre-classique",
        name: "Montre Classique",
        description:
          "Montre au design épuré, bracelet ajustable, mouvement précis. S'accorde avec toutes les tenues.",
        price: 4200,
        images: ["https://upload.wikimedia.org/wikipedia/commons/5/57/Watch_photo.jpg"],
        sizes: [],
        stock: 9,
        featured: false,
      },
      {
        id: "prod-ceinture-cuir",
        slug: "ceinture-en-cuir",
        name: "Ceinture en Cuir",
        description: "Ceinture en cuir véritable, boucle métallique, disponible en plusieurs tailles.",
        price: 1500,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/c/c5/DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg",
        ],
        sizes: ["S", "M", "L"],
        stock: 20,
        featured: false,
      },
    ],
  },
];
