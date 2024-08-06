'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

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

//   const surveyExists = await db.survey.findUnique({
//     where: { id },
//     include: {
//       questions: {
//         include: {
//           answers: true,
//           answerResponses: true,
//         },
//       },
//       response: {
//         include: {
//           answers: true,
//         },
//       },
//     },
//   });

//   if (!surveyExists) {
//     throw new Error('Survey not found');
//   }
};
