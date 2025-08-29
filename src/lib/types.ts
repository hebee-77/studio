export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Fruit' | 'Vegetable' | 'Meal' | 'Snack';
  dietary: ('Vegan' | 'Gluten-Free' | 'Organic')[];
  prep_type: 'Ready-to-eat' | 'Needs rehydration';
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: string;
    fat: string;
    carbohydrates: string;
  };
  instructions: string;
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}
