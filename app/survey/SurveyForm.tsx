'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { QuestionType, Survey } from '@prisma/client';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Satisfaction } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { saveSurveyResponse } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SurveyResponse } from '@/lib/validation';

type SatisfactionType = keyof typeof Satisfaction;

type FormData = {
  feedback?: string;
  satisfaction: SatisfactionType;
  [key: `question-${number}`]: string;
  [key: `question-${number}-answer-${number}`]: boolean;
};

const formatSubmissionData = (data: FormData, survey: SurveyFormProps['survey']) => {
  return {
    feedback: data.feedback,
    satisfaction: data.satisfaction,
    questions: survey.questions.map((question) => {
      const questionId = question.id;
      if (question.questionType === 'SINGLE_CHOICE') {
        const selectedAnswer = question.answers.find(
          (answer) => answer.text === data[`question-${questionId}`]
        );
        return {
          questionId,
          answer: selectedAnswer
            ? [{ answerId: selectedAnswer.id, text: selectedAnswer.text }]
            : [],
        };
      } else if (question.questionType === 'MULTIPLE_CHOICE') {
        const selectedAnswers = question.answers
          .filter((answer) => data[`question-${questionId}-answer-${answer.id}`])
          .map((answer) => ({ answerId: answer.id, text: answer.text }));
        return { questionId, answer: selectedAnswers };
      } else if (question.questionType === 'SHORT_ANSWER') {
        return {
          questionId,
          answer: [{ answerId: null, text: data[`question-${questionId}`] }],
        };
      }
      return { questionId, answer: [] };
    }),
  };
};

interface SurveyFormProps {
  survey: Survey & {
    questions: {
      id: number;
      text: string;
      questionType: QuestionType;
      answers: {
        id: number;
        text: string;
      }[];
    }[];
  };
}

const LABEL_MAP: Record<Satisfaction, string> = {
  VERY_SATISFIED: 'Very Satisfied',
  SATISFIED: 'Satisfied',
  NEUTRAL: 'Neutral',
  DISSATISFIED: 'Dissatisfied',
  VERY_DISSATISFIED: 'Very Dissatisfied',
};

export const SurveyForm = ({ survey }: SurveyFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutate: save, isPending } = useMutation({
    mutationFn: saveSurveyResponse,
    onSuccess: () => {
      toast.success('Thank you, Survey response saved successfully');
      router.push('/');
    },
    onError: (error) => {
      console.error('Error creating survey:', error.message);
      toast.error('Something went wrong. Please try again later.');
    },
  });

  const onSubmit = useCallback(
    (data: SurveyResponse) => {
      const formattedData = formatSubmissionData(data, survey);

      const payload = {
        surveyId: survey.id,
        ...formattedData,
      };

      // @ts-expect-error
      save(payload);
    },
    [survey, save]
  );

  return (
    // @ts-expect-error
    <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {survey.questions.map((question, index) => (
          <div key={question.id} className="space-y-2">
            {index + 1}.{' '}
            <Label htmlFor={`question-${question.id}`}>{question.text}</Label>
            {question.questionType === 'SINGLE_CHOICE' && (
              <>
                <Controller
                  name={`question-${question.id}`}
                  control={control}
                  // rules={{ required: 'Answer is required' }}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={answer.text}
                            id={`question-${question.id}-answer-${answer.id}`}
                          />
                          <Label htmlFor={`question-${question.id}-answer-${answer.id}`}>
                            {answer.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors[`question-${question.id}`] && (
                  <p className="error_message">
                    {errors[`question-${question.id}`]?.message?.toString()}
                  </p>
                )}
              </>
            )}
            <div className="space-y-2">
              {question.questionType === 'MULTIPLE_CHOICE' &&
                question.answers.map((answer) => (
                  <div key={answer.id} className="flex items-center space-x-2">
                    <Controller
                      name={`question-${question.id}-answer-${answer.id}`}
                      control={control}
                      //rules={{ required: 'Answer is required' }}
                      render={({ field }) => (
                        <Checkbox
                          id={`question-${question.id}-answer-${answer.id}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`question-${question.id}-answer-${answer.id}`}>
                      {answer.text}
                    </Label>
                  </div>
                ))}
              {errors[`question-${question.id}`] && (
                <p className="error_message">
                  {errors[`question-${question.id}`]?.message?.toString()}
                </p>
              )}
            </div>
            {question.questionType === 'SHORT_ANSWER' && (
              <>
                <Input
                  id={`question-${question.id}`}
                  {...register(`question-${question.id}`)}
                  placeholder="Enter your answer"
                />
                {errors[`question-${question.id}`] && (
                  <p className="error_message">
                    {errors[`question-${question.id}`]?.message?.toString()}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="satisfaction">
          How satisfied are you with our product and services?
        </Label>
        <Controller
          name="satisfaction"
          control={control}
          rules={{ required: 'Satisfaction is required' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Satisfaction).map((key) => (
                  <SelectItem key={key} value={key}>
                    {LABEL_MAP[key as Satisfaction]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.satisfaction && (
          <p className="error_message">{errors?.satisfaction?.message?.toString()}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="feedback">
          What do you like most about our products and services? (optional)
        </Label>
        <Textarea
          id="feedback"
          rows={4}
          placeholder="Enter your feedback"
          {...register('feedback')}
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        loadingText="Saving"
      >
        Save
      </Button>
    </form>
  );
};
