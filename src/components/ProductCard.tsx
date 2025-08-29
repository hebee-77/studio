'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={`${product.category} ${product.name.split(' ')[1]}`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 font-headline text-lg leading-tight">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
