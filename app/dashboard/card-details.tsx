import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CardDetailsProps {
  surveyCount: number;
  userCount: number;
}

export const CardDetails = ({ surveyCount, userCount }: CardDetailsProps) => {
  const SURVEY_GOAL = 50;
  const USERS_GOAL = 100;

  return (
    <>
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
          <CardDescription>Users (not including me)</CardDescription>
          <CardTitle className="text-4xl">{userCount - 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">of {USERS_GOAL} goal</div>
        </CardContent>
        <CardFooter>
          <Progress value={userCount - 1} />
        </CardFooter>
      </Card>
    </>
  );
};
