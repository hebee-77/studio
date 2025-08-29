'use client';

import { useEffect, useState, useTransition } from 'react';
import { getRecipeSuggestionsFromViewed } from '@/lib/actions';
import { Button } from './ui/button';
import { ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface RecipeSuggestionsProps {
  productId: string;
  productName: string;
}

const VIEWED_ITEMS_KEY = 'crispy-goodness-viewed';
const MAX_VIEWED_ITEMS = 3;

export default function RecipeSuggestions({ productId, productName }: RecipeSuggestionsProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // This runs only on the client
    const viewedItemsRaw = localStorage.getItem(VIEWED_ITEMS_KEY);
    let viewedItems: {id: string, name: string}[] = viewedItemsRaw ? JSON.parse(viewedItemsRaw) : [];
    
    // Add current item if not already in the list
    if (!viewedItems.some(item => item.id === productId)) {
      viewedItems.unshift({id: productId, name: productName});
    }

    // Keep the list at a max size
    viewedItems = viewedItems.slice(0, MAX_VIEWED_ITEMS);
    localStorage.setItem(VIEWED_ITEMS_KEY, JSON.stringify(viewedItems));

  }, [productId, productName]);

  const handleGetSuggestions = () => {
    setShowSuggestions(true);
    startTransition(async () => {
      const viewedItemsRaw = localStorage.getItem(VIEWED_ITEMS_KEY);
      const viewedItems: {id: string, name: string}[] = viewedItemsRaw ? JSON.parse(viewedItemsRaw) : [];
      const itemNames = viewedItems.map(item => item.name);
      const result = await getRecipeSuggestionsFromViewed(itemNames);
      setSuggestions(result);
    });
  };

  return (
    <div className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span>Need some inspiration?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get recipe ideas based on items you've recently viewed.
          </p>
          {!showSuggestions && (
            <Button onClick={handleGetSuggestions} variant="outline">
              Suggest Recipes
            </Button>
          )}

          {showSuggestions && (
            <div>
              <h3 className="font-semibold mb-2">Here are some ideas:</h3>
              {isPending ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                suggestions.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">Could not generate suggestions. Browse more items!</p>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
