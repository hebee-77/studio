'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { products as allProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const categories = [
  'All',
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];
const dietaryOptions = [
  'All',
  ...Array.from(new Set(allProducts.flatMap((p) => p.dietary))),
];
const prepTypes = [
  'All',
  ...Array.from(new Set(allProducts.map((p) => p.prep_type))),
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [dietary, setDietary] = useState('All');
  const [prepType, setPrepType] = useState('All');

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      return (
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (category === 'All' || product.category === category) &&
        (dietary === 'All' || product.dietary.includes(dietary)) &&
        (prepType === 'All' || product.prep_type === prepType)
      );
    });
  }, [searchTerm, category, dietary, prepType]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          Discover Our Crispy Goodness
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Wholesome, dehydrated foods for a healthy lifestyle.
        </p>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Input
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dietary} onValueChange={setDietary}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Dietary Needs" />
          </SelectTrigger>
          <SelectContent>
            {dietaryOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={prepType} onValueChange={setPrepType}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Preparation" />
          </SelectTrigger>
          <SelectContent>
            {prepTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
    </div>
  );
}
