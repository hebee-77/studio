'use server';
/**
 * @fileOverview Provides recipe suggestions based on the items in the user's cart.
 *
 * - recipeSuggestionsBasedOnCart - A function that generates recipe suggestions based on cart items.
 * - RecipeSuggestionsBasedOnCartInput - The input type for the recipeSuggestionsBasedOnCart function.
 * - RecipeSuggestionsBasedOnCartOutput - The return type for the recipeSuggestionsBasedOnCart function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionsBasedOnCartInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('List of items currently in the shopping cart.'),
});
export type RecipeSuggestionsBasedOnCartInput = z.infer<
  typeof RecipeSuggestionsBasedOnCartInputSchema
>;

const RecipeSuggestionsBasedOnCartOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('Recipe suggestions based on the cart items.'),
});
export type RecipeSuggestionsBasedOnCartOutput = z.infer<
  typeof RecipeSuggestionsBasedOnCartOutputSchema
>;

export async function recipeSuggestionsBasedOnCart(
  input: RecipeSuggestionsBasedOnCartInput
): Promise<RecipeSuggestionsBasedOnCartOutput> {
  return recipeSuggestionsBasedOnCartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeSuggestionsBasedOnCartPrompt',
  input: {schema: RecipeSuggestionsBasedOnCartInputSchema},
  output: {schema: RecipeSuggestionsBasedOnCartOutputSchema},
  prompt: `You are a recipe suggestion AI. Given the following list of items in the user's cart, suggest some recipes that the user can make with these items.

Cart Items:
{{#each cartItems}}- {{this}}
{{/each}}

Suggestions:`,
});

const recipeSuggestionsBasedOnCartFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionsBasedOnCartFlow',
    inputSchema: RecipeSuggestionsBasedOnCartInputSchema,
    outputSchema: RecipeSuggestionsBasedOnCartOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
