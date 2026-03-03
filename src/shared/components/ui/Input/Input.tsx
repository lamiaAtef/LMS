import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: any;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", type, label, error, icon, endIcon, onEndIconClick, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            className={`
              flex h-12 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#C5D86D]-500 focus:border-transparent
              disabled:cursor-not-allowed disabled:opacity-50
              ${icon ? "pl-10" : ""}
              ${endIcon ? "pr-10" : ""}
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
            {...props}
          />

          {endIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {endIcon}
            </button>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };