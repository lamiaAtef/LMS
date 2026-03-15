export interface Quiz {
    _id: string,
    code: string,
    title:string,
    status?: "closed" | "open",
    group: {},
    schadule: string
    questions_number: number,
    description?:string,
    duration?:string,
    score_per_question?:number,
    participants:any[],
    type?:[],
}

export interface Student{
    _id: string,
    first_name: string,
    last_name: string,
    email: string
    avg_score: number,
    status:string,
    group: Group
}
export interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
 export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface Group {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    max_students: number;
    students: string[];
    createdAt: string;
    updatedAt: string;
  }
export interface CreateGroupPayload {
  name: string;
  students: string[];
}

export interface InfoCardProps {
    image: string;
    title: string;
    subtitle: string;
    status?: string;
    numberStudents?: number;
    link: string;
    className?: string;
    linkClassName?: string;
    arrowClassName?: string;
    onClick?: ()=>void;

  }
  export interface Group{
     _id: string,
      name: string,
      status: string,
      instructor: string,
      students: string[],
      max_students: number,
  }
  export type GetGroupResponse = Group[];
  // Completed Quiz
  export interface COMPLETED_QUIZ {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed"; 
  instructor: string;
  group: string;
  questions_number: number;
  questions: any[]; 
  schadule: string; 
  duration: number; 
  score_per_question: number;
  type: "BE" | "FE" | "FS";
  difficulty: "easy" | "medium" | "hard"; 
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
  
}
  ///question
 export interface Question{
  title:string,
  description:string,
  difficulty:"hard"|"easy",
  _id:string
}

// Interface Result
export interface ResultResponse{
  Quiz:Quiz[],
  participant:string[],
}
export interface QuizResponse {
  closed_at: string;
  code: string;
  createdAt: string;
  description: string;
  difficulty: string;
  duration: number;
  group: string;
  instructor: string;
  questions_number: number;
  schdule: string;
  score_per_question: number;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
  schadule:string;
  __v:number;
  _id:string
}
export interface Result {
  participants: string[];
  quiz: QuizResponse;
}

