type Answer = {
  id: number;
  text: string;
};

type Question = {
  id: number;
  text: string;
  answers: Answer[];
};

export type FormValues = {
  title: string;
  questions: Question[];
};
