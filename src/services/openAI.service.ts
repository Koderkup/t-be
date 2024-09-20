import { BadRequestException, Injectable } from '@nestjs/common';
import prompts from '@root/constants/gptPrompts';
import { ProductItemForRecommendation } from '@root/types/productItem/types';
import OpenAI from 'openai';

type GeneratedRecommendations = {
  productItemId: string;
  recommendationsIds: string[];
}[];

@Injectable()
export class OpenAIService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateAllRecommendations(
    products: ProductItemForRecommendation[],
  ): Promise<GeneratedRecommendations> {
    const batchSize = 8;
    let allRecommendations: GeneratedRecommendations = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const recommendations = await this.generateRecommendationsForBatch(batch);
      allRecommendations = allRecommendations.concat(recommendations);
    }

    return allRecommendations;
  }

  async generateRecommendationsForBatch(
    products: ProductItemForRecommendation[],
  ): Promise<GeneratedRecommendations> {
    const completion = await this.openAI.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompts.recommendations + JSON.stringify(products),
      max_tokens: 1500,
      temperature: 0.5,
    });

    const response = completion.choices[0].text.trim();

    try {
      const parsed = JSON.parse(response);
      return parsed;
    } catch (error) {
      throw new BadRequestException(
        'Failed to parse recommendations from AI response',
      );
    }
  }

  async generateAssistantAnswer(commonInfo: string, userMessage: string) {
    const completion = await this.openAI.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `${prompts.assistants} ${commonInfo}. There is user question: ${userMessage}. Return answer.`,
      max_tokens: 100,
    });

    return completion.choices[0].text;
  }
}
