import { notFound } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const { id } = params;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const survey = await db.survey.findMany({
    where: {
      id,
    },
    select: {
      title: true,
      surveyType: true,
      description: true,
      createdAt: true,
      questions: {
        select: {
          text: true,
          questionType: true,
          answers: {
            select: {
              text: true,
            },
          },
        },
      },
    },
  });

  if (!survey || !survey.length) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4x">
          {survey[0].title}
        </h1>
        <p className="text-muted-foreground md:text-xl">{survey[0].description}</p>
        <p className="text-muted-foreground text-md">
          {format(survey[0].createdAt, 'MMMM dd, yyyy')}
        </p>
      </div>
      <form className="mt-8 space-y-8">
        <div className="space-y-4">
          {survey[0].questions.map((question, index) => (
            <div key={index} className="space-y-2">
              {index + 1}. <Label htmlFor={`question-${index}`}>{question.text}</Label>
              {question.questionType === 'RADIO' ? (
                <RadioGroup key={index} name={`question-${index}`}>
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={answer.text}
                        id={`question-${index}-answer-${answerIndex}`}
                      />
                      <Label htmlFor={`question-${index}-answer-${answerIndex}`}>
                        {answer.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                question.answers.map((answer, answerIndex) => {
                  if (question.questionType === 'SHORT_ANSWER') {
                    return (
                      <Input
                        key={answerIndex}
                        id={`question-${index}-answer-${answerIndex}`}
                        name={`question-${index}`}
                        placeholder={answer.text}
                      />
                    );
                  } else if (question.questionType === 'MULTIPLE_CHOICE') {
                    return (
                      <div key={answerIndex} className="flex items-center space-x-2">
                        <Checkbox
                          id={`question-${index}-answer-${answerIndex}`}
                          name={`question-${index}`}
                          value={answer.text}
                        />
                        <Label htmlFor={`question-${index}-answer-${answerIndex}`}>
                          {answer.text}
                        </Label>
                      </div>
                    );
                  }
                })
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="satisfaction">
            How satisfied are you with our product and services?
          </Label>
          <Select name="satisfaction">
            <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very-dissatisfied">Very Dissatisfied</SelectItem>
              <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="satisfied">Satisfied</SelectItem>
              <SelectItem value="very-satisfied">Very Satisfied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback">
            What do you like most about our products and services? (optional)
          </Label>
          <Textarea
            id="feedback"
            name="feedback"
            rows={4}
            placeholder="Enter your feedback"
          />
        </div>
      </form>
    </div>
  );
}
