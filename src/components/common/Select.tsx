import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error,
      hint,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`
              w-full px-4 py-3 pr-10
              bg-gray-50 border-2 rounded-xl
              text-gray-900 font-medium
              appearance-none cursor-pointer
              transition-all duration-200
              outline-none
              ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
