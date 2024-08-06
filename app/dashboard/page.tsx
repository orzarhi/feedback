import { CopyLink } from '@/components/CopyLink';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { Eye, Ghost } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/lib/utils';
import React from 'react';
import { SurveyTable } from './SurveyTable';

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

  if (!surveys || !surveys.length) {
    return (
      <div className="flex min-h-screen w-full bg-muted/40 mt-4">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col items-center justify-center">
              <Ghost className="size-8 text-muted-foreground my-2 animate-bounce" />
              <p className="text-muted-foreground text-lg">
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
  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2000;

  return (
    <div className="flex min-h-screen w-full mt-4">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">{formatPrice(100)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(50 * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">{formatPrice(30)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(50 * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div> 
          <SurveyTable surveys={surveys} /> 
        </div>
      </div>
    </div>
  );
}
