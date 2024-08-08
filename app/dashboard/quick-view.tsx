import { ResponsiveDialog } from '@/components/responsive-dialog';
import { format } from 'date-fns';
import React, { Dispatch, SetStateAction } from 'react';
import { SurveyResponse } from './survey-table';

interface QuickViewProps {
  response: SurveyResponse;
  quickView: boolean;
  setQuickView: Dispatch<SetStateAction<boolean>>;
}

export const QuickView = ({ response, quickView, setQuickView }: QuickViewProps) => {
  const groupedAnswers = response.answers.reduce((acc, cur) => {
    if (!acc[cur.question.text]) {
      acc[cur.question.text] = [];
    }
    acc[cur.question.text].push(cur.answer.text);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <ResponsiveDialog
      title={`Survey Response`}
      description={`${response.user.email} | ${format(
        response.createdAt,
        'dd/MM/yyyy HH:mm:ss'
      )}`}
      isOpen={quickView}
      setIsOpen={setQuickView}
    >
      {Object.entries(groupedAnswers).map(([question, answers], index) => (
        <div key={index} className="flex flex-col mt-4">
          <span className="text-muted-foreground">
            {index + 1}. {question}:
          </span>
          {answers.map((answer, answerIndex) => (
            <strong key={answerIndex} className="">
              - {answer}
            </strong>
          ))}
        </div>
      ))}
    </ResponsiveDialog>
  );
};
