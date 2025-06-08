// This is an auto-generated file from Firebase Studio.

'use server';

/**
 * @fileOverview Generates a preview of a marketing plan based on business details, budget, and timeline.
 *
 * - previewMarketingPlan - A function that generates a marketing plan preview.
 * - PreviewMarketingPlanInput - The input type for the previewMarketingPlan function.
 * - PreviewMarketingPlanOutput - The return type for the previewMarketingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreviewMarketingPlanInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A brief description of the business or product.'),
  budget: z.number().describe('The marketing budget in USD.'),
  timelineDays: z
    .number()
    .describe('The timeline for the marketing plan in days.'),
});

export type PreviewMarketingPlanInput = z.infer<
  typeof PreviewMarketingPlanInputSchema
>;

const PreviewMarketingPlanOutputSchema = z.object({
  marketingPlanPreview: z
    .string()
    .describe('A preview of the generated marketing plan.'),
});

export type PreviewMarketingPlanOutput = z.infer<
  typeof PreviewMarketingPlanOutputSchema
>;

export async function previewMarketingPlan(
  input: PreviewMarketingPlanInput
): Promise<PreviewMarketingPlanOutput> {
  return previewMarketingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'previewMarketingPlanPrompt',
  input: {schema: PreviewMarketingPlanInputSchema},
  output: {schema: PreviewMarketingPlanOutputSchema},
  prompt: `You are an expert marketing consultant. Create a marketing plan preview based on the business description, budget, and timeline provided. 

Business Description: {{{businessDescription}}}
Budget: {{{budget}}} USD
Timeline: {{{timelineDays}}} days

Create a brief marketing plan preview, including potential strategies, channels, and key deliverables, formatted as a bulleted list.`,
});

const previewMarketingPlanFlow = ai.defineFlow(
  {
    name: 'previewMarketingPlanFlow',
    inputSchema: PreviewMarketingPlanInputSchema,
    outputSchema: PreviewMarketingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
