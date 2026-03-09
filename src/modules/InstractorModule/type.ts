export interface Quiz {
    _id: string,
    code: string,
    title:string,
    status?: "closed" | "open",
    group: string,
    schadule: string
    questions_number: number,
    description?:string,
    duration?:string,
    score_per_question?:number,

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
