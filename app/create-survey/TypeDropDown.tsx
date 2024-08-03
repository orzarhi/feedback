'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { SurveyType } from '@prisma/client';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type survey = keyof typeof SurveyType;

const LABEL_MAP: Record<survey, string> = {
  CHECKBOX: 'Checkbox',
  MULTIPLE_CHOICE: 'Multiple Choice',
  SHORT_ANSWER: 'Short Answer',
};

interface TypeDropDownProps {
  surveyType: survey;
  setSurveyType: Dispatch<SetStateAction<survey>>;
}

export const TypeDropDown = ({ surveyType, setSurveyType }: TypeDropDownProps) => {
  return (
    <Select value={surveyType} onValueChange={(value) => setSurveyType(value as survey)}>
      <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
        <SelectValue placeholder="Select survey type" />
        {/* <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" /> */}
      </SelectTrigger>
      <SelectContent className="p-0">
        {Object.keys(SurveyType).map((type) => (
          <SelectItem
            key={type}
            value={type}
          >
            {/* <Check
              className={cn(
                'mr-2 size-4 text-primary',
                surveyType === type ? 'opacity-100' : 'opacity-0'
              )}
            /> */}
            {LABEL_MAP[type as survey]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
