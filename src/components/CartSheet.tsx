'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, Trash2, Plus, Minus, ChefHat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { getRecipeSuggestionsFromCart } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Skeleton } from './ui/skeleton';

export function CartSheet() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGetSuggestions = () => {
    startTransition(async () => {
      const itemNames = cartItems.map((item) => item.name);
      if (itemNames.length > 0) {
        const result = await getRecipeSuggestionsFromCart(itemNames);
        setSuggestions(result);
        setShowSuggestions(true);
      }
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-0"
              >
                {cartCount}
              </Badge>
            )}
            <span className="sr-only">Open shopping cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <Separator />
          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4 pr-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <SheetFooter className="mt-4">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between font-bold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleGetSuggestions}
                    disabled={isPending}
                    variant="outline"
                  >
                    <ChefHat className="mr-2 h-4 w-4" />
                    {isPending ? 'Getting ideas...' : 'Get Recipe Ideas'}
                  </Button>
                  <Button
                    asChild
                    onClick={() => setOpen(false)}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Your cart is empty.
              </p>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recipe Suggestions</AlertDialogTitle>
            <AlertDialogDescription>
              Based on the items in your cart, here are a few recipe ideas!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-60 overflow-y-auto">
            {isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <ul className="list-disc space-y-2 pl-5">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
