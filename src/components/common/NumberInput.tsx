import { forwardRef, useCallback, useState, useEffect } from 'react';

interface NumberInputProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
  prefix?: string;
  suffix?: string;
  error?: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      value,
      min = 0,
      max = Infinity,
      step = 1,
      onChange,
      formatValue,
      parseValue,
      prefix,
      suffix,
      error,
      hint,
      className = '',
      disabled = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value.toString());

    // Sync inputValue with value prop when not focused
    useEffect(() => {
      if (!isFocused) {
        setInputValue(formatValue ? formatValue(value) : value.toString());
      }
    }, [value, isFocused, formatValue]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      setInputValue(value.toString());
    }, [value]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      const parsed = parseValue
        ? parseValue(inputValue)
        : parseFloat(inputValue.replace(/[^0-9.-]/g, ''));
      const clamped = Math.max(min, Math.min(max, isNaN(parsed) ? 0 : parsed));
      onChange(clamped);
      setInputValue(formatValue ? formatValue(clamped) : clamped.toString());
    }, [inputValue, min, max, onChange, formatValue, parseValue]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // Also update live if it's a valid number
        const parsed = parseValue
          ? parseValue(newValue)
          : parseFloat(newValue.replace(/[^0-9.-]/g, ''));
        if (!isNaN(parsed)) {
          const clamped = Math.max(min, Math.min(max, parsed));
          onChange(clamped);
        }
      },
      [min, max, onChange, parseValue]
    );

    const increment = useCallback(() => {
      const newValue = Math.min(max, value + step);
      onChange(newValue);
      setInputValue(newValue.toString());
    }, [value, step, max, onChange]);

    const decrement = useCallback(() => {
      const newValue = Math.max(min, value - step);
      onChange(newValue);
      setInputValue(newValue.toString());
    }, [value, step, min, onChange]);

    const displayValue = isFocused ? inputValue : value.toString();

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || value <= min}
            className="
              absolute left-2 z-10
              w-7 h-7 flex items-center justify-center
              rounded-lg bg-gray-100 text-gray-600
              hover:bg-gray-200 hover:text-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-150
            "
            aria-label="Decrease"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <div className="relative flex-1">
            {prefix && (
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                {prefix}
              </span>
            )}
            <input
              ref={ref}
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={`
                w-full px-10 py-2.5 text-center
                bg-gray-50 border-2 rounded-xl
                text-gray-900 font-medium text-base
                transition-all duration-200
                outline-none
                ${prefix ? 'pl-14' : ''}
                ${suffix ? 'pr-14' : ''}
                ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            />
            {suffix && (
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                {suffix}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={increment}
            disabled={disabled || value >= max}
            className="
              absolute right-2 z-10
              w-7 h-7 flex items-center justify-center
              rounded-lg bg-gray-100 text-gray-600
              hover:bg-gray-200 hover:text-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-150
            "
            aria-label="Increase"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
