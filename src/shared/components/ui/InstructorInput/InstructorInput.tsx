import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function InstructorInput({ label, children }: FieldProps) {
  return (
    <div className="relative w-full">

      {/* label badge */}
    <span className="absolute left-1 top-1/2 -translate-y-1/2 
      bg-[#FFEDDF] text-sm px-8 font-bold py-2 inline-block rounded-md ">
        {label}
      
      </span>

      {children}

    </div>
  );
}