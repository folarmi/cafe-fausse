export type MenuItem = {
  name: string;
  desc: string;
  price: number;
};

export type MenuSection = {
  category: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    category: "Starters",
    items: [
      {
        name: "Bruschetta",
        desc: "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
        price: 8.5,
      },
      {
        name: "Caesar Salad",
        desc: "Crisp romaine with homemade Caesar dressing",
        price: 9.0,
      },
    ],
  },
  {
    category: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        desc: "Served with lemon butter sauce and seasonal vegetables",
        price: 22.0,
      },
      {
        name: "Ribeye Steak",
        desc: "12 oz prime cut with garlic mashed potatoes",
        price: 28.0,
      },
      {
        name: "Vegetable Risotto",
        desc: "Creamy Arborio rice with wild mushrooms",
        price: 18.0,
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Tiramisu",
        desc: "Classic Italian dessert with mascarpone",
        price: 7.5,
      },
      {
        name: "Cheesecake",
        desc: "Creamy cheesecake with berry compote",
        price: 7.0,
      },
    ],
  },
  {
    category: "Beverages",
    items: [
      {
        name: "Red Wine (Glass)",
        desc: "A selection of Italian reds",
        price: 10.0,
      },
      { name: "White Wine (Glass)", desc: "Crisp and refreshing", price: 9.0 },
      { name: "Craft Beer", desc: "Local artisan brews", price: 6.0 },
      { name: "Espresso", desc: "Strong and aromatic", price: 3.0 },
    ],
  },
];

export const fmt = (n: number) => `$${n.toFixed(2)}`;
