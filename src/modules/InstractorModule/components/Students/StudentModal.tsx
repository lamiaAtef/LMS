import type { Student } from "../../type";

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  studentImgs: string[];
  studentIndex: number; // نضيف الـ index هنا
}

export default function StudentModal({ student, isOpen, onClose, studentImgs, studentIndex }: StudentModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3">
          <h2 className="text-xl font-bold">Student Details</h2>
          <button
            className="text-2xl font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
            onClick={onClose}>
            X
          </button>
        </div>

        {/* Border with shadow */}
        <div className="border-t border-gray-300 shadow-sm"></div>

        {/* Content */}
        <div className="px-6 py-5">
          <img
            src={studentImgs[studentIndex % studentImgs.length]} 
            alt="student"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-center mb-2">{student.first_name} {student.last_name}</h2>
          <p className="mb-1"><strong>Email:</strong> {student.email}</p>
          <p className="mb-1"><strong>Group:</strong> {student.group?.name || "No Group"}</p>
          <p className="mb-1"><strong>Status:</strong> {student.status}</p>
          <p className="mb-2"><strong>Average Score:</strong> {Math.round(Number(student.avg_score) || 0)}</p>
        </div>
      </div>
    </div>
  );
}