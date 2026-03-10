import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function InstructorInput({ label, children }: FieldProps) {
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden my-2">

      <span className="bg-orange-100 flex items-center text-sm px-2 py-2 border-r border-gray-300 whitespace-nowrap">
        {label}
      </span>

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}