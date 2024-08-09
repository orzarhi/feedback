import { QuestionType } from '@prisma/client';
import { z } from 'zod';

export const surveySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  dueDate: z.date(),
  questions: z.array(
    z.object({
      id: z.string(),
      questionType: z.enum([
        QuestionType.SINGLE_CHOICE,
        QuestionType.SHORT_ANSWER,
        QuestionType.MULTIPLE_CHOICE,
      ]).default(QuestionType.SINGLE_CHOICE),
      text: z.string().min(3),
      answers: z.array(z.object({ id: z.string(), text: z.string().min(1) })),
    })
  ),
});

export type Survey = z.infer<typeof surveySchema>;
