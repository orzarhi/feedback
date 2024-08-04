'use server';

import { db } from '@/db';
import { Survey } from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SurveyType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createSurvey = async (data: Survey & { surveyType: keyof typeof SurveyType }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error('Invalid user data');
  }

  const existingSurvey = await db.survey.findFirst({
    where: {
      userId: user.id,
      title: data.title,
    },
  });

  if (existingSurvey) {
    throw new Error('Survey with this title already exists');
  }

  const createSurvey = await db.$transaction(async (prisma) => {
    const createdSurvey = await prisma.survey.create({
      data: {
        title: data.title,
        description: data?.description,
        surveyType: data.surveyType,
        userId: user.id,
      },
    });

    await Promise.all(
      data.questions.map((question) =>
        prisma.question.create({
          data: {
            text: question.text,
            questionType: question.questionType,
            surveyId: createdSurvey.id,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.text,
              })),
            },
          },
        })
      )
    );

    return createdSurvey;
  });

  if (!createSurvey) {
    throw new Error('Failed to create survey');
  }

  return { success: true, surveyId: createSurvey.id };
};
