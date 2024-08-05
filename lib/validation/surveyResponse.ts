import { Satisfaction } from '@prisma/client';
import { z } from 'zod';

export const surveyResponseSchema = z.object({
  feedback: z.string().optional(),
  satisfaction: z.enum([
    Satisfaction.DISSATISFIED,
    Satisfaction.NEUTRAL,
    Satisfaction.SATISFIED,
    Satisfaction.VERY_DISSATISFIED,
    Satisfaction.VERY_SATISFIED,
  ]),
  questions: z.array(
    z.object({
      questionId: z.number(),
      answer: z.array(
        z.object({
          answerId: z.number(),
          text: z.string(),
        })
      ),
    })
  ),
});

export type SurveyResponse = z.infer<typeof surveyResponseSchema>;
