import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftAddon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3
              bg-gray-50 border-2 rounded-xl
              text-gray-900 placeholder-gray-400
              transition-all duration-200
              outline-none
              ${leftAddon ? 'pl-10' : ''}
              ${rightAddon ? 'pr-10' : ''}
              ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100'
              }
              ${className}
            `}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {rightAddon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
