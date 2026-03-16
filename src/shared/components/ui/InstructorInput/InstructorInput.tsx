import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function InstructorInput({ label, children }: FieldProps) {
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden">

      <span className="bg-[#FFEDDF] flex items-center text-sm px-4 py-2 border-r border-gray-300 whitespace-nowrap">
        {label}
      </span>

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}