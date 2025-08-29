import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Dehydrated Apple Slices',
    description:
      'Crisp and sweet, our dehydrated apple slices are a perfect healthy snack. Made from 100% organic apples.',
    price: 5.99,
    image: 'https://picsum.photos/600/400',
    category: 'Fruit',
    dietary: ['Organic', 'Vegan', 'Gluten-Free'],
    prep_type: 'Ready-to-eat',
    ingredients: ['Organic Apples'],
    nutrition: {
      calories: 120,
      protein: '1g',
      fat: '0g',
      carbohydrates: '25g',
    },
    instructions: 'Enjoy straight from the bag or add to your favorite cereal.',
    reviews: [
      { author: 'Jane D.', rating: 5, text: 'So delicious and convenient!' },
      { author: 'John S.', rating: 4, text: 'A bit too sweet for me, but still good.' },
    ],
  },
  {
    id: '2',
    name: 'Sun-dried Tomatoes',
    description:
      'Rich and savory sun-dried tomatoes, packed with flavor. Perfect for pasta, salads, and more.',
    price: 7.49,
    image: 'https://picsum.photos/600/400',
    category: 'Vegetable',
    dietary: ['Vegan', 'Gluten-Free'],
    prep_type: 'Needs rehydration',
    ingredients: ['Tomatoes, Salt'],
    nutrition: {
      calories: 80,
      protein: '3g',
      fat: '0.5g',
      carbohydrates: '18g',
    },
    instructions:
      'Soak in warm water for 15-20 minutes until soft. Drain and use as desired.',
    reviews: [
      {
        author: 'Chef Mario',
        rating: 5,
        text: 'Best sun-dried tomatoes I have ever used in my restaurant.',
      },
    ],
  },
  {
    id: '3',
    name: 'Backpacker\'s Lentil Stew',
    description:
      'A hearty and nutritious meal for your outdoor adventures. Just add hot water and enjoy a warm, delicious stew.',
    price: 12.99,
    image: 'https://picsum.photos/600/400',
    category: 'Meal',
    dietary: ['Vegan', 'Gluten-Free'],
    prep_type: 'Needs rehydration',
    ingredients: [
      'Dehydrated Lentils',
      'Dehydrated Carrots',
      'Dehydrated Onions',
      'Spices',
    ],
    nutrition: {
      calories: 350,
      protein: '18g',
      fat: '2g',
      carbohydrates: '65g',
    },
    instructions:
      'Add 2 cups of boiling water, stir well, cover, and let stand for 10-12 minutes.',
    reviews: [
      { author: 'Hiker Holly', rating: 5, text: 'Saved me on my last trip. Tastes amazing!' },
    ],
  },
  {
    id: '4',
    name: 'Spicy Mango Strips',
    description:
      'A tropical treat with a kick! Our spicy mango strips are chewy, sweet, and perfectly spicy.',
    price: 8.99,
    image: 'https://picsum.photos/600/400',
    category: 'Snack',
    dietary: ['Vegan', 'Gluten-Free'],
    prep_type: 'Ready-to-eat',
    ingredients: ['Mango, Cane Sugar, Chili Powder'],
    nutrition: {
      calories: 150,
      protein: '1g',
      fat: '0g',
      carbohydrates: '35g',
    },
    instructions: 'A perfect on-the-go snack to satisfy your cravings.',
    reviews: [
      { author: 'Spice Lover', rating: 5, text: 'The perfect balance of sweet and spicy.' },
      { author: 'Tom P.', rating: 4, text: 'Love them, wish they were a little less spicy though.' },
    ],
  },
  {
    id: '5',
    name: 'Organic Kale Chips',
    description:
      'A crunchy, savory snack that is actually good for you. Lightly salted and baked to perfection.',
    price: 6.99,
    image: 'https://picsum.photos/600/400',
    category: 'Snack',
    dietary: ['Organic', 'Vegan', 'Gluten-Free'],
    prep_type: 'Ready-to-eat',
    ingredients: ['Organic Kale, Olive Oil, Sea Salt'],
    nutrition: {
      calories: 90,
      protein: '4g',
      fat: '5g',
      carbohydrates: '8g',
    },
    instructions: 'Enjoy as a guilt-free alternative to potato chips.',
    reviews: [],
  },
  {
    id: '6',
    name: 'Dehydrated Mushroom Mix',
    description:
      'A versatile mix of gourmet mushrooms including shiitake, porcini, and cremini. Adds a deep, umami flavor to soups, sauces, and risottos.',
    price: 10.99,
    image: 'https://picsum.photos/600/400',
    category: 'Vegetable',
    dietary: ['Organic', 'Vegan', 'Gluten-Free'],
    prep_type: 'Needs rehydration',
    ingredients: ['Organic Shiitake Mushrooms', 'Organic Porcini Mushrooms', 'Organic Cremini Mushrooms'],
    nutrition: {
      calories: 40,
      protein: '2g',
      fat: '0g',
      carbohydrates: '8g',
    },
    instructions: 'Rehydrate in hot water for 20-30 minutes before use. Reserve the flavorful soaking liquid for your dish!',
    reviews: [
        { author: 'Gourmet Gina', rating: 5, text: 'Absolutely essential for my pantry. The flavor is incredible.'}
    ],
  },
  {
    id: '7',
    name: 'Berry Blast Fruit Leather',
    description:
      'A delicious blend of strawberries, blueberries, and raspberries, pureed and dehydrated into a fun, chewy snack.',
    price: 4.99,
    image: 'https://picsum.photos/600/400',
    category: 'Fruit',
    dietary: ['Organic', 'Vegan', 'Gluten-Free'],
    prep_type: 'Ready-to-eat',
    ingredients: ['Organic Strawberries', 'Organic Blueberries', 'Organic Raspberries', 'Apple Puree'],
    nutrition: {
      calories: 100,
      protein: '1g',
      fat: '0g',
      carbohydrates: '22g',
    },
    instructions: 'Unroll and enjoy! Perfect for lunchboxes and backpacks.',
    reviews: [
      { author: 'MomOfTwo', rating: 5, text: 'My kids love these and I love that they are healthy.'}
    ],
  },
  {
    id: '8',
    name: 'Instant Black Bean Soup',
    description:
      'A quick and easy Tex-Mex inspired black bean soup. Just add water for a flavorful and filling meal.',
    price: 9.99,
    image: 'https://picsum.photos/600/400',
    category: 'Meal',
    dietary: ['Vegan', 'Gluten-Free'],
    prep_type: 'Needs rehydration',
    ingredients: ['Dehydrated Black Beans', 'Corn', 'Bell Peppers', 'Cumin', 'Chili Powder'],
    nutrition: {
      calories: 280,
      protein: '15g',
      fat: '1.5g',
      carbohydrates: '55g',
    },
    instructions:
      'Mix with 1.5 cups of hot water, stir, and let it sit for 5 minutes. Top with cheese or avocado if desired.',
    reviews: [
      { author: 'Busy Bob', rating: 4, text: 'Great for a quick lunch at the office. A little spicy.'}
    ],
  },
];
