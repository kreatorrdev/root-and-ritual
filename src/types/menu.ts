export type Category = "All" | "Small plates" | "Mains" | "Something sweet" | "Café";
export type Dietary = "All vegetarian" | "Vegan" | "Gluten-free";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "All">;
  vegan: boolean;
  glutenFree: boolean;
  ingredients: string[];
  allergens: string[];
  image: { sheet: "food" | "cafe" | "ingredient"; index: number };
  featured?: boolean;
};
