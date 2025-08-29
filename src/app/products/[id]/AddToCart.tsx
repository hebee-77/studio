'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <Button
      onClick={() => addToCart(product)}
      size="lg"
      className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
