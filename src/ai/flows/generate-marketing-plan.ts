// src/ai/flows/generate-marketing-plan.ts
'use server';

/**
 * @fileOverview Generates a personalized marketing plan based on user input.
 *
 * - generateMarketingPlan - A function that handles the marketing plan generation process.
 * - GenerateMarketingPlanInput - The input type for the generateMarketingPlan function.
 * - GenerateMarketingPlanOutput - The return type for the generateMarketingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingPlanInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A description of the business, including its products or services, target audience, and unique selling points.'),
  budget: z.number().describe('The marketing budget in USD.'),
  timeline: z.number().describe('The timeline for the marketing plan in days.'),
});
export type GenerateMarketingPlanInput = z.infer<typeof GenerateMarketingPlanInputSchema>;

const GenerateMarketingPlanOutputSchema = z.object({
  marketingPlan: z.string().describe('A detailed marketing plan tailored to the business.'),
});
export type GenerateMarketingPlanOutput = z.infer<typeof GenerateMarketingPlanOutputSchema>;

export async function generateMarketingPlan(input: GenerateMarketingPlanInput): Promise<GenerateMarketingPlanOutput> {
  return generateMarketingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingPlanPrompt',
  input: {schema: GenerateMarketingPlanInputSchema},
  output: {schema: GenerateMarketingPlanOutputSchema},
  prompt: `You are an expert marketing consultant. Based on the business description, budget, and timeline provided, generate a comprehensive marketing plan. The plan should include specific strategies, tactics, and measurable goals.

Business Description: {{{businessDescription}}}
Budget: {{{budget}}} USD
Timeline: {{{timeline}}} days`,
});

const generateMarketingPlanFlow = ai.defineFlow(
  {
    name: 'generateMarketingPlanFlow',
    inputSchema: GenerateMarketingPlanInputSchema,
    outputSchema: GenerateMarketingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
