'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Survey } from '@/lib/validation';
import { SurveyType } from '@prisma/client';
import { Check, Ellipsis, Trash2, X } from 'lucide-react';
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  useWatch
} from 'react-hook-form';

type survey = keyof typeof SurveyType;

const LABEL_MAP: Record<survey, string> = {
  RADIO: 'Radio',
  MULTIPLE_CHOICE: 'Multiple Choice',
  SHORT_ANSWER: 'Short Answer',
};

interface QuestionFormProps {
  control: Control<Survey>;
  register: UseFormRegister<Survey>;
  setValue: UseFormSetValue<Survey>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
  errors: FieldValues;
}

export const QuestionForm = ({
  control,
  register,
  setValue,
  questionIndex,
  removeQuestion,
  errors,
}: QuestionFormProps) => {
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const watchedQuestionType = useWatch({
    control,
    name: `questions.${questionIndex}.questionType`,
    defaultValue: 'RADIO',
  });

  return (
    <div className="shadow-sm rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Label htmlFor={`question-${questionIndex}`}>
              Question {questionIndex + 1}{' '}
              <span className="text-zinc-400 dark:text-zinc-600">
                (Type: {LABEL_MAP[watchedQuestionType as survey]})
              </span>
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <Ellipsis className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <DropdownMenuItem
                  disabled
                  className="flex items-center p-2.5 cursor-default"
                >
                  <Label className="text-sm">Question type</Label>
                </DropdownMenuItem>
                {Object.keys(SurveyType).map((type) => (
                  <DropdownMenuItem
                    key={type}
                    className={cn(
                      'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
                      {
                        'bg-zinc-200 dark:bg-zinc-700': watchedQuestionType === type,
                      }
                    )}
                    onClick={() =>
                      setValue(`questions.${questionIndex}.questionType`, type as survey)
                    }
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4 text-primary',
                        watchedQuestionType === type ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {LABEL_MAP[type as survey]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-1">
            <Input
              {...register(`questions.${questionIndex}.text`, {
                required: 'Question is required',
              })}
              placeholder="Enter your question"
            />
            {errors.questions?.[questionIndex]?.text && (
              <span className="error_message">
                {errors.questions[questionIndex].text.message}
              </span>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="link"
          className="mt-auto"
          size="icon"
          onClick={() => removeQuestion(questionIndex)}
        >
          <X className="size-5 text-red-500/80 hover:text-red-500" />
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        {answers.map((answer, answerIndex) => (
          <div key={answer.id} className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor={`answer-${questionIndex}-${answerIndex}`}>
                Answer {answerIndex + 1}
              </Label>
              <div className="mt-1">
                <Input
                  {...register(`questions.${questionIndex}.answers.${answerIndex}.text`, {
                    required: 'Answer is required',
                  })}
                  placeholder="Enter an answer"
                />
                {errors.questions?.[questionIndex]?.answers?.[answerIndex]?.text && (
                  <span className="error_message">
                    {errors.questions[questionIndex].answers[answerIndex].text.message}
                  </span>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="link"
              className="mt-auto"
              size="icon"
              onClick={() => removeAnswer(answerIndex)}
            >
              <Trash2 className="size-5 text-red-500/80 hover:text-red-500" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          onClick={() => appendAnswer({ id: answers.length, text: '' })}
        >
          Add Answer
        </Button>
      </div>
    </div>
  );
};
