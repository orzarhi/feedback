import { notFound } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/db';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const survey = await db.survey.findMany({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,
      questions: {
        select: {
          text: true,
          answers: {
            select: {
              text: true,
            },
          },
        },
      },
    },
  });
  console.log('🚀 ~ Page ~ survey:', survey);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Customer Satisfaction Survey - {survey[0].title}
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Help us improve our products and services by sharing your feedback.
        </p>
      </div>
      <form className="mt-8 space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="satisfaction">
            How satisfied are you with our products and services?
          </Label>
          <Select name="satisfaction">
            <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very-satisfied">Very Satisfied</SelectItem>
              <SelectItem value="satisfied">Satisfied</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
              <SelectItem value="very-dissatisfied">Very Dissatisfied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback">
            What do you like most about our products and services?
          </Label>
          <Textarea
            id="feedback"
            name="feedback"
            rows={4}
            placeholder="Enter your feedback"
            className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label>What features would you like to see in the future?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input type="checkbox" id="feature1" name="features[]" value="feature1" />
              <Label htmlFor="feature1">Feature 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="feature2"
                name="features[]"
                value="feature2"
                className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary"
              />
              <Label htmlFor="feature2">Feature 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="feature3" name="features[]" value="feature3" />
              <Label htmlFor="feature3">Feature 3</Label>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Progress: 4 of 5 questions answered
          </div>
          <Button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
          >
            Submit Survey
          </Button>
        </div>
      </form>
    </div>
  );
}
