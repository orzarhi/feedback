import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { notFound, redirect } from 'next/navigation';
import { SurveyForm } from './SurveyForm';
import { SaveToLocalStorage } from '@/components/SaveToLocalStorage';

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
    return <SaveToLocalStorage storageKey="surveyId" value={id} />;
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

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4x">{survey.title}</h1>
        <p className="text-muted-foreground md:text-xl">{survey.description}</p>
        <p className="text-muted-foreground text-md">
          {format(survey.createdAt, 'MMMM dd, yyyy')}
        </p>
      </div>
      {/* @ts-expect-error*/}
      <SurveyForm survey={survey} />
    </div>
  );
}
