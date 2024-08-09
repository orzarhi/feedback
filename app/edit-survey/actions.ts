'use server';

import { db } from '@/db';
import { Survey } from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const updateSurvey = async (
  data: Survey & {
    surveyId?: string;
  }
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error('Invalid user data');
  }

  const existingSurvey = await db.survey.findFirst({
    where: {
      userId: user.id,
      id: data.surveyId,
    },
  });

  if (!existingSurvey) {
    throw new Error('Survey not found');
  }

  const updateSurvey = await db.$transaction(async (prisma) => {
    const updatedSurvey = await prisma.survey.update({
      where: {
        id: data.surveyId,
      },
      data: {
        title: data.title,
        description: data?.description,
        dueDate: data.dueDate,
        userId: user.id,
      },
    });

    await Promise.all(
      data.questions.map((question) =>
        prisma.question.update({
          where: {
            id: question.id,
          },
          data: {
            text: question.text,
            questionType: question.questionType,
            answers: {
              upsert: question.answers.map((answer) => ({
                where: {
                  id: answer.id,
                },
                update: {
                  text: answer.text,
                },
                create: {
                  text: answer.text,
                },
              })),
            },
          },
        })
      )
    );
    return updatedSurvey;
  });

  if (!updateSurvey) {
    throw new Error('Error updating survey');
  }

  revalidatePath('/dashboard');

  return { success: true };
};
