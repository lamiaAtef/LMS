import { InputHTMLAttributes } from "react";


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  error?: FieldError;
}

export default function InputField({
  label,
  id,
  icon,
  error,
  ...rest
}: InputFieldProps) {
  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-200"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className={`flex items-center rounded-xl border px-3 py-2 transition 
        ${
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-600 focus-within:ring-2 focus-within:ring-blue-500"
        }`}
      >
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}

        <input
          id={id}
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-500"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}