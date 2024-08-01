'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { createSurvey } from './actions';
import { useState } from 'react';

export const CreateSurvey = () => {
  const [questions, setQuestions] = useState([{ id: 1, answers: [{ id: 1 }, { id: 2 }] }]);

  const addQuestion = () => {
    const newQuestionId = questions.length + 1;
    setQuestions([...questions, { id: newQuestionId, answers: [{ id: 1 }, { id: 2 }] }]);
  };

  const addAnswer = (questionId:number) => {
    setQuestions(questions.map(question => 
      question.id === questionId 
        ? { ...question, answers: [...question.answers, { id: question.answers.length + 1 }] }
        : question
    ));
  };

  const removeQuestion = (questionId:number) => {
    setQuestions(questions.filter(question => question.id !== questionId)
      .map((question, index) => ({ ...question, id: index + 1 })));
  };

  const removeAnswer = (questionId:number, answerId:number) => {
    setQuestions(questions.map(question => 
      question.id === questionId 
        ? { 
            ...question, 
            answers: question.answers
              .filter(answer => answer.id !== answerId)
              .map((answer, index) => ({ ...answer, id: index + 1 }))
          }
        : question
    ));
  };

  return (
    <form
      className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
      action={createSurvey}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Survey Title</Label>
          <div className="mt-1">
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title for your survey"
            />
          </div>
        </div>
        <div>
          <Label>Questions</Label>
          <div className="mt-1 space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="bg-white shadow-sm rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor={`question-${question.id}`}>Question {question.id}</Label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        id={`question-${question.id}`}
                        name={`question-${question.id}`}
                        placeholder="Enter your question"
                      />
                    </div>
                  </div>
                  <Button variant="link" className="mt-auto" onClick={() => removeQuestion(question.id)}>
                    <Trash2 className="size-5 text-red-500" />
                  </Button>
                </div>
                <div className="mt-4 space-y-4">
                  {question.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label htmlFor={`answer-${question.id}-${answer.id}`}>Answer {answer.id}</Label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            id={`answer-${question.id}-${answer.id}`}
                            name={`answer-${question.id}-${answer.id}`}
                            placeholder="Enter an answer"
                          />
                        </div>
                      </div>
                      <Button variant="link" className="mt-auto" onClick={() => removeAnswer(question.id, answer.id)}>
                        <Trash2 className="size-5 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" onClick={() => addAnswer(question.id)}>Add Answer</Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" onClick={addQuestion}>Add Question</Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Survey</Button>
        </div>
      </div>
    </form>
  );
};