import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { UpsertSurvey } from '../create-survey/upsert-survey';
import { QuestionType, SurveyType } from '@prisma/client';

export type SurveyTypeEdit = {
  id: string;
  title: string;
  surveyType: SurveyType | null;
  description: string | null;
  dueDate: Date | null;
  createdAt: Date;
  questions: {
    id: string;
    text: string;
    questionType: QuestionType | null;
    answers: {
      id: string;
      text: string;
    }[];
  }[];
};

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    return notFound();
  }

  const survey = await db.survey.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      surveyType: true,
      description: true,
      dueDate: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          text: true,
          questionType: true,
          answers: {
            select: {
              id: true,
              text: true,
            },
          },
        },
      },
    },
  });

  if (!survey || !survey.questions) {
    return notFound();
  }

  return <UpsertSurvey survey={survey} isEdit={true} />;
}
