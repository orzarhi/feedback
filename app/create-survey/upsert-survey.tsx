'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Survey, surveySchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SurveyType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type SurveyTypeEdit } from '../edit-survey/page';
import { createSurvey } from './actions';
import { DatePicker } from './date-picker';
import { QuestionForm } from './question-form';
import { updateSurvey } from '../edit-survey/actions';

interface UpsertSurveyProps {
  survey?: SurveyTypeEdit;
  isEdit?: boolean;
}

export const UpsertSurvey = ({ survey, isEdit }: UpsertSurveyProps) => {
  const [surveyType, setSurveyType] = useState<keyof typeof SurveyType>('DEFINES_ALONE');

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: isEdit ? survey?.title : '',
      dueDate: isEdit ? survey?.dueDate : null,
      description: isEdit ? survey?.description : ('' as string | undefined),
      questions:
        isEdit && survey?.questions
          ? survey.questions.map((question) => ({
              id: question.id,
              text: question.text,
              questionType: question.questionType,
              answers: question.answers.map((answer) => ({
                id: answer.id,
                text: answer.text,
              })),
            }))
          : [
              {
                id: 0,
                text: '',
                questionType: 'SINGLE_CHOICE',
                answers: [
                  { id: 0, text: '' },
                  { id: 1, text: '' },
                ],
              },
            ],
    },
    resolver: zodResolver(surveySchema),
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const { mutate: update, isPending: isPendingUpdate } = useMutation({
    mutationKey: ['update-survey'],
    mutationFn: updateSurvey,
    onSuccess: () => {
      router.push(`/dashboard`);
      toast.success('Survey updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating survey:', error.message);
      toast.error(error.message ?? 'Something went wrong. Please try again later.');
    },
  });

  const { mutate: create, isPending: isPendingCreate } = useMutation({
    mutationKey: ['create-survey'],
    mutationFn: createSurvey,
    onSuccess: () => {
      router.push(`/dashboard`);
      reset();
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6, x: 0.5 },
      });
      toast.success('Survey created successfully.');
    },
    onError: (error) => {
      console.error('Error creating survey:', error.message);
      toast.error(error.message ?? 'Something went wrong. Please try again later.');
    },
  });

  const isPending = isEdit ? isPendingUpdate : isPendingCreate;
  console.log(errors);
  const onSubmit = (data: Survey) => {
    const payload = {
      ...data,
      surveyType,
    };

    if (isEdit) {
      update({ ...payload, surveyId: survey?.id });
      return;
    }

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
        <div>
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
        <div className="flex flex-col space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker setValue={setValue} watch={watch} errors={errors} />
        </div>
        <div>
          <Label>Questions</Label>
          <div className="mt-1 space-y-4 border-b-2 border-b-zinc-100 dark:border-b-zinc-900">
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
                  questionType: 'SINGLE_CHOICE',
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
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            loadingText={isEdit ? 'Updating' : 'Creating'}
          >
            {isEdit ? 'Update Survey' : 'Create Survey'}
          </Button>
        </div>
      </div>
    </form>
  );
};
