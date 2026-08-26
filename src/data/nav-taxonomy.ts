export interface NavItem {
  label: string;
  tag: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface NavCategory {
  slug: string;
  label: string;
  groups: NavGroup[];
}

export const navTaxonomy: NavCategory[] = [
  {
    slug: "homme",
    label: "Homme",
    groups: [
      {
        label: "Vêtements",
        items: [
          { label: "Survêtements", tag: "survetements" },
          { label: "Pantalons", tag: "pantalons" },
          { label: "Sweats", tag: "sweats" },
          { label: "Jeans", tag: "jeans" },
          { label: "Chemises", tag: "chemises" },
          { label: "Costumes", tag: "costumes" },
          { label: "Blazers", tag: "blazers" },
        ],
      },
      {
        label: "Chaussures",
        items: [
          { label: "Baskets", tag: "baskets" },
          { label: "Chaussures de ville", tag: "chaussures-ville" },
          { label: "Sandales", tag: "sandales" },
        ],
      },
      {
        label: "Accessoires",
        items: [
          { label: "Sacoches", tag: "sacoches" },
          { label: "Montres", tag: "montres" },
          { label: "Casquettes", tag: "casquettes" },
          { label: "Ceintures", tag: "ceintures" },
          { label: "Bonnets", tag: "bonnets" },
        ],
      },
    ],
  },
  {
    slug: "femme",
    label: "Femme",
    groups: [
      {
        label: "Vêtements",
        items: [
          { label: "Robes", tag: "robes" },
          { label: "Jupes", tag: "jupes" },
          { label: "Chemisiers", tag: "chemisiers" },
          { label: "Blazers", tag: "blazers" },
          { label: "Pantalons", tag: "pantalons" },
          { label: "Pulls", tag: "pulls" },
        ],
      },
      {
        label: "Chaussures",
        items: [
          { label: "Escarpins", tag: "escarpins" },
          { label: "Baskets", tag: "baskets" },
          { label: "Sandales", tag: "sandales" },
          { label: "Bottes", tag: "bottes" },
        ],
      },
      {
        label: "Accessoires",
        items: [
          { label: "Sacs à main", tag: "sacs" },
          { label: "Montres", tag: "montres" },
          { label: "Bijoux", tag: "bijoux" },
          { label: "Écharpes", tag: "echarpes" },
        ],
      },
    ],
  },
  {
    slug: "accessoires",
    label: "Accessoires",
    groups: [
      {
        label: "Pour lui",
        items: [
          { label: "Sacoches", tag: "sacoches" },
          { label: "Ceintures", tag: "ceintures" },
          { label: "Casquettes", tag: "casquettes" },
        ],
      },
      {
        label: "Pour elle",
        items: [
          { label: "Sacs à main", tag: "sacs" },
          { label: "Bijoux", tag: "bijoux" },
          { label: "Écharpes", tag: "echarpes" },
        ],
      },
      {
        label: "Mixte",
        items: [
          { label: "Montres", tag: "montres" },
          { label: "Bonnets", tag: "bonnets" },
        ],
      },
    ],
  },
];
