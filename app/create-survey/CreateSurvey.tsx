'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Survey } from '@/lib/validation';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { createSurvey } from './actions';
import { QuestionForm } from './QuestionForm';

export const CreateSurvey = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
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
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error creating survey:', error);
      alert('Failed to create survey. Please try again.');
    },
  });

  const onSubmit = (data: Survey) => {
    create(data);
  };

  return (
    <form
      className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
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
          <Label>Questions</Label>
          <div className="mt-1 space-y-4">
            {questions.map((question, questionIndex) => (
              <QuestionForm
                key={question.id}
                control={control}
                register={register}
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
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Survey'}
          </Button>
        </div>
      </div>
    </form>
  );
};
