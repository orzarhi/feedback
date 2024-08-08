'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const deleteSurvey = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error('Invalid user data');
  }

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    throw new Error('Unauthorized');
  }

  const surveyExists = await db.survey.findUnique({
    where: { id },
  });

  if (!surveyExists) {
    throw new Error('Survey not found');
  }
  await db.answerResponse.deleteMany({
    where: {
      surveyResponse: {
        surveyId: id,
      },
    },
  });

  // Delete all survey responses related to the survey
  await db.surveyResponse.deleteMany({
    where: {
      surveyId: id,
    },
  });

  // Delete all answers related to questions in the survey
  await db.answer.deleteMany({
    where: {
      question: {
        surveyId: id,
      },
    },
  });

  // Delete all questions related to the survey
  await db.question.deleteMany({
    where: {
      surveyId: id,
    },
  });

  // Finally, delete the survey itself
  await db.survey.delete({
    where: { id },
  });

  revalidatePath('/dashboard');

  return { success: true };
};
