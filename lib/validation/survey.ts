import { number, z } from 'zod';

export const surveySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      answers: z.array(z.object({ id: number(), text: z.string() })),
    })
  ),
});

export type Survey = z.infer<typeof surveySchema>;
