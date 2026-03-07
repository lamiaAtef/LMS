export interface Quiz {
    _id: string,
    code: string,
    title:string,
    status: "closed" | "open",
    group: string,
    schadule: string
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
<<<<<<< HEAD
=======
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
>>>>>>> origin/feature/Mayada

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
<<<<<<< HEAD

=======
export interface CreateGroupPayload {
  name: string;
  students: string[];
}
>>>>>>> origin/feature/Mayada
export interface InfoCardProps {
    image: string;
    title: string;
    subtitle: string;
    status?: string;
<<<<<<< HEAD
    numberStudents?: number;
    link: string;
    className?: string;
    linkClassName?: string;
    arrowClassName?: string;
=======
    link: string;
    className?: string;
>>>>>>> origin/feature/Mayada
  }