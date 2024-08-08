import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Ghost } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SurveyTable } from './survey-table';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    return notFound();
  }

  const surveys = await db.survey.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      dueDate: true,
      description: true,
      createdAt: true,
      response: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              imageUrl: true,
            },
          },
          answers: {
            include: {
              question: {
                select: {
                  id: true,
                  text: true,
                },
              },
              answer: {
                select: {
                  id: true,
                  text: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  const [userCount, surveyCount] = await Promise.all([
    db.user.count(),
    db.survey.count(),
  ]);

  const SURVEY_GOAL = 50;
  const USERS_GOAL = 100;

  if (!surveys || !surveys.length) {
    return (
      <div className="flex min-h-screen w-full mt-4">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-16">
            <div className="grid gap-4 sm:grid-cols-2 m-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Surveys</CardDescription>
                  <CardTitle className="text-4xl">{surveyCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {SURVEY_GOAL} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={surveyCount} />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Users</CardDescription>
                  <CardTitle className="text-4xl">{userCount - 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {USERS_GOAL} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={userCount - 1} />
                </CardFooter>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Ghost className="size-8 text-muted-foreground my-2 animate-bounce" />
              <p className="text-muted-foreground text-lg text-center">
                You haven&apos;t created any surveys yet.
              </p>
              <Link
                href="/create-survey"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'lg',
                })}
              >
                Create a survey
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full mt-4 ">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:mx-1 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Surveys</CardDescription>
                <CardTitle className="text-4xl">{surveyCount}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">of {SURVEY_GOAL} goal</div>
              </CardContent>
              <CardFooter>
                <Progress value={surveyCount} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Users</CardDescription>
                <CardTitle className="text-4xl">{userCount - 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">of {USERS_GOAL} goal</div>
              </CardContent>
              <CardFooter>
                <Progress value={userCount} />
              </CardFooter>
            </Card>
          </div>
          <SurveyTable surveys={surveys} surveyCount={surveyCount} />
        </div>
      </div>
    </div>
  );
}
