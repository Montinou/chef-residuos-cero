export type IngredientStatus = 'active' | 'consumed' | 'discarded';

export interface Ingredient {
  id: number;
  user_id: string;
  name: string;
  expiry_date: string; // ISO date string
  quantity: string;
  status: IngredientStatus;
  created_at?: string;
}

export interface Recipe {
  id: number;
  user_id: string;
  title: string;
  content: string;
  ingredients_used: string[];
  saved: boolean;
  created_at?: string;
}

export interface UserStats {
  user_id: string;
  money_saved: number;
  food_rescued_count: number;
  last_updated?: string;
}
