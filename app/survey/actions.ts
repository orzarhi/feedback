'use server';

import { db } from '@/db';
import { SurveyResponse } from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const saveSurveyResponse = async (
  data: SurveyResponse & {
    surveyId: string;
  }
) => {
  console.log('data!',data)
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error('Invalid user data');
  }

  const answerResponsesData = data.questions.flatMap((question) =>
    question.answer.map((answer) => ({
      question: { connect: { id: question.questionId.toString() } },
      answer: { connect: { id: answer.answerId?.toString() } },
      text: answer.text,
    }))
  );

  const surveyResponse = await db.surveyResponse.create({
    data: {
      surveyId: data.surveyId,
      userId: user.id,
      feedback: data?.feedback,
      satisfaction: data.satisfaction,
      answers: {
        create: answerResponsesData,
      },
    },
  });

  if (!surveyResponse) {
    throw new Error('Failed to save survey response');
  }
  
  revalidatePath('/dashboard');
  
  return { success: true };
};

