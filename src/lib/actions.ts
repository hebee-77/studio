'use server';

import { recipeSuggestionsBasedOnCart } from '@/ai/flows/recipe-suggestions-based-on-cart';
import { getRecipeSuggestions } from '@/ai/flows/recipe-suggestions-based-on-viewed';
import { z } from 'zod';

export async function getRecipeSuggestionsFromCart(
  cartItems: string[]
): Promise<string[]> {
  try {
    const result = await recipeSuggestionsBasedOnCart({ cartItems });
    return result.suggestions;
  } catch (error) {
    console.error('Error getting recipe suggestions from cart:', error);
    return ['We could not generate suggestions at this time. Please try again later.'];
  }
}

export async function getRecipeSuggestionsFromViewed(
  viewedItems: string[]
): Promise<string[]> {
    if (viewedItems.length === 0) return [];
  try {
    const result = await getRecipeSuggestions({ viewedItems });
    return result.recipes;
  } catch (error) {
    console.error('Error getting recipe suggestions from viewed items:', error);
    return ['We could not generate suggestions at this time. Please try again later.'];
  }
}

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function handleContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }
  
  // In a real app, you'd send an email or save to a database here.
  console.log('Contact form submitted:', validatedFields.data);

  return {
    errors: {},
    message: 'Thank you for your message! We will get back to you soon.',
    success: true,
  };
}
