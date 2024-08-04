import { SurveyType } from '@prisma/client';
import { number, z } from 'zod';

export const surveySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(
    z.object({
      id: z.number(),
      type: z.enum([
        SurveyType.RADIO,
        SurveyType.SHORT_ANSWER,
        SurveyType.MULTIPLE_CHOICE,
      ]),
      text: z.string(),
      answers: z.array(z.object({ id: number(), text: z.string() })),
    })
  ),
});

export type Survey = z.infer<typeof surveySchema>;
