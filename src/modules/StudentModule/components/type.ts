// type to question
export type QuestionType = {
    _id: string;
    question: string;
    answers: string[];
  };
  

export type SubmitAnswer = {
question: string; // question id
answer: string;  // "A"|"B"|"c"|"D" 
};

export type ResultState = {
    quizTitle: string;
    score: number;
    total: number;
};