'use server';

/**
 * @fileOverview Generates recipe suggestions based on recently viewed items.
 *
 * - getRecipeSuggestions - A function that generates recipe suggestions.
 * - RecipeSuggestionsInput - The input type for the getRecipeSuggestions function.
 * - RecipeSuggestionsOutput - The return type for the getRecipeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionsInputSchema = z.object({
  viewedItems: z
    .array(z.string())
    .describe('A list of recently viewed dehydrated food items.'),
});
export type RecipeSuggestionsInput = z.infer<typeof RecipeSuggestionsInputSchema>;

const RecipeSuggestionsOutputSchema = z.object({
  recipes: z.array(z.string()).describe('A list of recipe suggestions.'),
});
export type RecipeSuggestionsOutput = z.infer<typeof RecipeSuggestionsOutputSchema>;

export async function getRecipeSuggestions(input: RecipeSuggestionsInput): Promise<RecipeSuggestionsOutput> {
  return recipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeSuggestionsPrompt',
  input: {schema: RecipeSuggestionsInputSchema},
  output: {schema: RecipeSuggestionsOutputSchema},
  prompt: `You are a recipe suggestion expert. Based on the items a user has recently viewed, suggest some recipes.

Recently viewed items: {{viewedItems}}

Recipes:`,
});

const recipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionsFlow',
    inputSchema: RecipeSuggestionsInputSchema,
    outputSchema: RecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
