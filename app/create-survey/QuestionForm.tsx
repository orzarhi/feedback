'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Survey } from '@/lib/validation';
import { Trash2, X } from 'lucide-react';
import { Control, FieldValues, useFieldArray, UseFormRegister } from 'react-hook-form';

interface QuestionFormProps {
  control: Control<Survey>;
  register: UseFormRegister<Survey>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
  errors: FieldValues;
}

export const QuestionForm = ({
  control,
  register,
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

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label htmlFor={`question-${questionIndex}`}>
            Question {questionIndex + 1}
          </Label>
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
          onClick={() => removeQuestion(questionIndex)}
        >
          <X className="size-5 text-red-500" />
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
              onClick={() => removeAnswer(answerIndex)}
            >
              <Trash2 className="size-5 text-red-500" />
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
