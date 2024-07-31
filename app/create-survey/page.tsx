import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, TrashIcon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Survey Title
          </Label>
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
          <Label className="block text-sm font-medium text-gray-700">
            Questions
          </Label>
          <div className="mt-1 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white shadow-sm rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label
                      htmlFor="question-1"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Question 1
                    </Label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        id="question-1"
                        name="question-1"
                        placeholder="Enter your question"
                      />
                    </div>
                  </div>
                  <Button variant="link" className="mt-auto">
                    <Trash2 className="size-5 text-red-500" />
                  </Button>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label
                        htmlFor="answer-1-1"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Answer 1
                      </Label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="answer-1-1"
                          name="answer-1-1"
                          placeholder="Enter an answer"
                        />
                      </div>
                    </div>

                    <Button variant="link" className="mt-auto">
                      <Trash2 className="size-5 text-red-500" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label
                        htmlFor="answer-1-2"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Answer 2
                      </Label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="answer-1-2"
                          name="answer-1-2"
                          placeholder="Enter an answer"
                        />
                      </div>
                    </div>
                    <Button variant="link" className="mt-auto">
                      <Trash2 className="size-5 text-red-500" />
                    </Button>
                  </div>
                  <Button variant='ghost'>Add Answer</Button>
                </div>
              </div>
            </div>
            <Button variant='ghost'>Add Question</Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Survey</Button>
        </div>
      </div>
    </div>
  );
}
