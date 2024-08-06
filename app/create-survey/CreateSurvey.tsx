//@ts-nocheck
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Survey } from '@/lib/validation';
import { SurveyType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createSurvey } from './actions';
import { QuestionForm } from './QuestionForm';
import { TypeSelector } from './TypeSelector';
import { wait } from '@/lib/utils';

export const CreateSurvey = () => {
  const [surveyType, setSurveyType] = useState<keyof typeof SurveyType>('DEFINES_ALONE');

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '' as string | undefined,
      questions: [
        {
          id: 0,
          text: '',
          answers: [
            { id: 0, text: '' },
            { id: 1, text: '' },
          ],
        },
      ],
    },
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: createSurvey,
    onSuccess: async ({ surveyId }) => {
      router.push(`/survey?id=${surveyId}`);
      reset();
      await wait(600);
      toast.success('Survey created successfully');
    },
    onError: (error) => {
      console.error('Error creating survey:', error.message);
      toast.error('Something went wrong. Please try again later.');
    },
  });

  const onSubmit = (data: Survey) => {
    const payload = {
      ...data,
      surveyType,
    };

    create(payload);
  };

  return (
    <form
      className="max-w-4xl mx-auto px-2 py-8 sm:px-6 lg:px-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Survey Title</Label>
          <div className="mt-1">
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter a title for your survey"
            />
            {errors.title && (
              <span className="error_message">{errors.title.message}</span>
            )}
          </div>
        </div>
        <div className="">
          <Label>Questions</Label>
          <div className="mt-1 space-y-4">
            {questions.map((question, questionIndex) => (
              <QuestionForm
                key={question.id}
                control={control}
                register={register}
                setValue={setValue}
                questionIndex={questionIndex}
                removeQuestion={removeQuestion}
                errors={errors}
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                appendQuestion({
                  id: questions.length,
                  text: '',
                  answers: [
                    { id: 0, text: '' },
                    { id: 1, text: '' },
                  ],
                })
              }
            >
              Add Question
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <Label>Survey Type</Label>
          <TypeSelector surveyType={surveyType} setSurveyType={setSurveyType} />
          <p className="text-xs text-muted-foreground">
            You can change the type for all the questions together here.
          </p>
          <p className="text-xs font-semibold text-muted-foreground">
            {' '}
            If you choose different types, don&apos;t refer to me.
          </p>
        </div>

        <div className="mt-6">
          <Label htmlFor="description">Survey Description (optional)</Label>
          <div className="mt-1">
            <Textarea
              id="description"
              {...register('description')}
              rows={3}
              placeholder="Enter a description for your survey"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            loadingText="Submitting"
          >
            Submit Survey
          </Button>
        </div>
      </div>
    </form>
  );
};
