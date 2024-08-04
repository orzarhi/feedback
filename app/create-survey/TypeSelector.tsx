'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectionType } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type survey = keyof typeof SelectionType;

const LABEL_MAP: Record<survey, string> = {
  SINGLE_CHOICE: 'Single Choice',
  MULTIPLE_CHOICE: 'Multiple Choice',
  SHORT_ANSWER: 'Short Answer',
};


interface TypeSelectorProps {
  surveyType: survey;
  setSurveyType: Dispatch<SetStateAction<survey>>;
}

export const TypeSelector = ({ surveyType, setSurveyType }: TypeSelectorProps) => {
  return (
    <Select value={surveyType} onValueChange={(value) => setSurveyType(value as survey)}>
      <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
        <SelectValue placeholder="Select survey type" />
      </SelectTrigger>
      <SelectContent className="p-0">
        {Object.keys(SelectionType).map((type) => (
          <SelectItem key={type} value={type}>
            {LABEL_MAP[type as survey]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
