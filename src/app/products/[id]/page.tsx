import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { AddToCart } from './AddToCart';
import { Star, UserCircle2 } from 'lucide-react';
import RecipeSuggestions from '@/components/RecipeSuggestions';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={`${product.category} ${product.name.split(' ')[1]}`}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.dietary.map((d) => (
              <Badge key={d} variant="secondary">
                {d}
              </Badge>
            ))}
            <Badge variant="outline">{product.prep_type}</Badge>
          </div>
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-4 text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <AddToCart product={product} />

          <Tabs defaultValue="description" className="mt-6 w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-sm">
              <p>{product.instructions}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Ingredients:</strong> {product.ingredients.join(', ')}
                </li>
                <li>
                  <strong>Calories:</strong> {product.nutrition.calories}
                </li>
                <li>
                  <strong>Protein:</strong> {product.nutrition.protein}
                </li>
                <li>
                  <strong>Fat:</strong> {product.nutrition.fat}
                </li>
                <li>
                  <strong>Carbohydrates:</strong> {product.nutrition.carbohydrates}
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                            <CardTitle className="text-base font-medium">
                              {review.author}
                            </CardTitle>
                          </div>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>"{review.text}"</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No reviews yet.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <RecipeSuggestions productId={product.id} productName={product.name} />
    </div>
  );
}
