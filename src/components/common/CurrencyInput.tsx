import { forwardRef, useCallback, useState } from 'react';
import { formatCurrency, parseCurrencyInput } from '../../utils/formatters';

interface CurrencyInputProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  error?: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      label,
      value,
      min = 0,
      max = Infinity,
      onChange,
      error,
      hint,
      className = '',
      disabled = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(
      formatCurrency(value, { maximumFractionDigits: 0 })
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      setInputValue(value === 0 ? '' : value.toString());
    }, [value]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      const parsed = parseCurrencyInput(inputValue);
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(clamped);
      setInputValue(formatCurrency(clamped, { maximumFractionDigits: 0 }));
    }, [inputValue, min, max, onChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const parsed = parseCurrencyInput(newValue);
        if (!isNaN(parsed)) {
          const clamped = Math.max(min, Math.min(max, parsed));
          onChange(clamped);
        }
      },
      [min, max, onChange]
    );

    const displayValue = isFocused
      ? inputValue
      : formatCurrency(value, { maximumFractionDigits: 0 });

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            $
          </span>
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            value={displayValue.replace(/^\$/, '')}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={`
              w-full pl-8 pr-4 py-3
              bg-gray-50 border-2 rounded-xl
              text-gray-900 font-medium
              transition-all duration-200
              outline-none
              ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
