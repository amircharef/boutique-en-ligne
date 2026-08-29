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
        label: "Coupe",
        items: [
          { label: "Oversize", tag: "oversize" },
          { label: "Classique", tag: "classique" },
          { label: "Zippé", tag: "zippe" },
        ],
      },
      {
        label: "Style",
        items: [
          { label: "Uni", tag: "uni" },
          { label: "Imprimé", tag: "imprime" },
          { label: "Dos graphique", tag: "print-dos" },
        ],
      },
    ],
  },
  {
    slug: "femme",
    label: "Femme",
    groups: [
      {
        label: "Coupe",
        items: [
          { label: "Oversize", tag: "oversize" },
          { label: "Crop", tag: "crop" },
          { label: "Classique", tag: "classique" },
        ],
      },
      {
        label: "Style",
        items: [
          { label: "Uni", tag: "uni" },
          { label: "Imprimé", tag: "imprime" },
        ],
      },
    ],
  },
];
