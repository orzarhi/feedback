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
import { Survey } from '@prisma/client';

interface SurveyFormProps {
  survey: Survey & {
    questions: {
      id: number;
      text: string;
      questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
      answers: {
        id: number;
        text: string;
      }[];
    }[];
  };
}

export const SurveyForm = ({ survey }: SurveyFormProps) => {
  return (
    <form className="mt-8 space-y-8">
      <div className="space-y-4">
        {survey.questions.map((question, index) => (
          <div key={question.id} className="space-y-2">
            {index + 1}. <Label htmlFor={`question-${index}`}>{question.text}</Label>
            {question.questionType === 'SINGLE_CHOICE' ? (
              <RadioGroup key={index} name={`question-${index}`}>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answer.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={answer.text}
                      id={`question-${index}-answer-${answerIndex}`}
                    />
                    <Label htmlFor={`question-${index}-answer-${answerIndex}`}>
                      {answer.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              question.answers.map((answer, answerIndex) => {
                if (question.questionType === 'SHORT_ANSWER') {
                  return (
                    <Input
                      key={answerIndex}
                      id={`question-${index}-answer-${answerIndex}`}
                      name={`question-${index}`}
                      placeholder={answer.text}
                    />
                  );
                } else if (question.questionType === 'MULTIPLE_CHOICE') {
                  return (
                    <div key={answerIndex} className="flex items-center space-x-2">
                      <Checkbox
                        id={`question-${index}-answer-${answerIndex}`}
                        name={`question-${index}`}
                        value={answer.text}
                      />
                      <Label htmlFor={`question-${index}-answer-${answerIndex}`}>
                        {answer.text}
                      </Label>
                    </div>
                  );
                }
              })
            )}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="satisfaction">
          How satisfied are you with our product and services?
        </Label>
        <Select name="satisfaction">
          <SelectTrigger className="w-full rounded-md border-input bg-background flex justify-between items-center px-3 py-2 text-foreground shadow-sm">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very-dissatisfied">Very Dissatisfied</SelectItem>
            <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="satisfied">Satisfied</SelectItem>
            <SelectItem value="very-satisfied">Very Satisfied</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="feedback">
          What do you like most about our products and services? (optional)
        </Label>
        <Textarea
          id="feedback"
          name="feedback"
          rows={4}
          placeholder="Enter your feedback"
        />
      </div>
    </form>
  );
};
