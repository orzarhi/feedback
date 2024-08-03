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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-52 flex justify-between items-center"
        >
          {LABEL_MAP[surveyType]}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(SurveyType).map((type) => (
          <DropdownMenuItem
            key={type}
            className={cn(
              'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
              {
                'bg-zinc-200 dark:bg-zinc-700': surveyType === type,
              }
            )}
            onClick={() => setSurveyType(type as survey)}
          >
            <Check
              className={cn(
                'mr-2 size-4 text-primary',
                surveyType === type ? 'opacity-100' : 'opacity-0'
              )}
            />
            {LABEL_MAP[type as survey]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
