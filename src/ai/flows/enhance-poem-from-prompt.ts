// src/ai/flows/enhance-poem-from-prompt.ts
'use server';

/**
 * @fileOverview Enhances an existing poem based on a user-provided prompt.
 *
 * - enhancePoem - A function that takes an existing poem and a refinement prompt as input and returns an enhanced poem.
 * - EnhancePoemInput - The input type for the enhancePoem function.
 * - EnhancePoemOutput - The return type for the enhancePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePoemInputSchema = z.object({
  existingPoem: z.string().describe('The existing poem to enhance.'),
  refinementPrompt: z.string().describe('A prompt to guide the refinement of the poem.'),
});
export type EnhancePoemInput = z.infer<typeof EnhancePoemInputSchema>;

const EnhancePoemOutputSchema = z.object({
  enhancedPoem: z.string().describe('The enhanced poem.'),
});
export type EnhancePoemOutput = z.infer<typeof EnhancePoemOutputSchema>;

export async function enhancePoem(input: EnhancePoemInput): Promise<EnhancePoemOutput> {
  return enhancePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhancePoemPrompt',
  input: {schema: EnhancePoemInputSchema},
  output: {schema: EnhancePoemOutputSchema},
  prompt: `You are a poet assisting in refining existing poems. A user has provided an initial poem and a prompt to guide its refinement. Your task is to enhance the poem based on the prompt, while preserving the original poem\'s essence and style.

Original Poem: {{{existingPoem}}}

Refinement Prompt: {{{refinementPrompt}}}

Enhanced Poem:`,  
});

const enhancePoemFlow = ai.defineFlow(
  {
    name: 'enhancePoemFlow',
    inputSchema: EnhancePoemInputSchema,
    outputSchema: EnhancePoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
