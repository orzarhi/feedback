'use client';

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
import { cn } from '@/lib/utils';
import { Satisfaction } from '@prisma/client';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { DropdownOptions } from './DropdownOptions';

type SurveyResponse = {
  id: string;
  feedback: string | null;
  satisfaction: Satisfaction;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    imageUrl: string | null;
  };
  answers: {
    id: string;
    question: {
      id: string;
      text: string;
    };
    answer: {
      id: string;
      text: string;
    };
  }[];
};

type Survey = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  createdAt: Date;
  response: SurveyResponse[];
  _count: {
    questions: number;
  };
};

type Surveys = Survey[];

const LABEL_MAP: Record<Satisfaction, string> = {
  VERY_SATISFIED: 'Very Satisfied',
  SATISFIED: 'Satisfied',
  NEUTRAL: 'Neutral',
  DISSATISFIED: 'Dissatisfied',
  VERY_DISSATISFIED: 'Very Dissatisfied',
};

interface SurveyTableProps {
  surveys: Surveys;
  surveyCount: number;
}

export const SurveyTable = ({ surveys, surveyCount }: SurveyTableProps) => {
  const [expandedSurveyId, setExpandedSurveyId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedSurveyId(expandedSurveyId === id ? null : id);
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent surveys.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Expand</span>
            </TableHead>
            <TableHead className="hidden sm:table-cell">Title</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Due Date</TableHead>
            <TableHead className="text-center">Questions</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.map((survey) => (
            <React.Fragment key={survey.id}>
              <TableRow>
                <TableCell
                  className={cn('', {
                    invisible: !survey.response.length,
                  })}
                >
                  <button
                    onClick={() => handleToggleExpand(survey.id)}
                    className={buttonVariants({ variant: 'link', size: 'icon' })}
                  >
                    {expandedSurveyId === survey.id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </TableCell>
                <TableCell className="font-medium hidden sm:table-cell overflow-hidden truncate w-2">
                  {survey.title}
                </TableCell>
                <TableCell className="text-center">
                  {format(survey.createdAt, 'dd/MM/yyyy')}
                  <span className="hidden sm:block">
                    {format(survey.createdAt, 'HH:mm:ss')}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {format(survey.dueDate, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell className="text-center">{survey._count.questions}</TableCell>
                <TableCell className="text-center flex sm:block">
                 <DropdownOptions surveyId={survey.id}/>
                </TableCell>
              </TableRow>
              <AnimatePresence>
                {expandedSurveyId === survey.id && (
                  <motion.tr
                    key={`expand-${survey.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell colSpan={5}>
                      <div className="p-4">
                        <h2 className="text-xl font-bold">
                          Survey Responses ({survey.response.length})
                        </h2>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>User</TableHead>
                              <TableHead>Feedback</TableHead>
                              <TableHead>Satisfaction</TableHead>
                              <TableHead>Created At</TableHead>
                              <TableHead className="hidden lg:table-cell">
                                Answers
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {survey.response.map((response) => (
                              <TableRow key={response.id}>
                                <TableCell>{response.user.email}</TableCell>
                                <TableCell className="overflow-hidden truncate w-2">
                                  {response.feedback || 'N/A'}
                                </TableCell>
                                <TableCell>{LABEL_MAP[response.satisfaction]}</TableCell>
                                <TableCell>
                                  {format(response.createdAt, 'dd/MM/yyyy')}
                                  <span className="hidden sm:block">
                                    {format(response.createdAt, 'HH:mm:ss')}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {response.answers.map((answer) => (
                                    <div key={answer.id} className="hidden lg:block">
                                      <strong className="text-muted-foreground">
                                        {answer.question.text}:
                                      </strong>{' '}
                                      {answer.answer.text}
                                    </div>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total surveys</TableCell>
            <TableCell className="text-right">{surveyCount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
