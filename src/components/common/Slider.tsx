import { InputHTMLAttributes, forwardRef, useCallback } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  showValue?: boolean;
  hint?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      value,
      min,
      max,
      step = 1,
      onChange,
      formatValue,
      showValue = true,
      hint,
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value));
      },
      [onChange]
    );

    const displayValue = formatValue ? formatValue(value) : value.toString();

    return (
      <div className={`w-full ${className}`}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-3">
            {label && (
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {displayValue}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleChange}
            className="
              w-full h-2 rounded-full appearance-none cursor-pointer
              bg-gray-200
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-primary-500
              [&::-webkit-slider-thumb]:to-primary-600
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-primary-500/30
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gradient-to-r
              [&::-moz-range-thumb]:from-primary-500
              [&::-moz-range-thumb]:to-primary-600
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:cursor-pointer
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary-500
              focus-visible:ring-offset-2
            "
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #8b5cf6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
            {...props}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-gray-400">
            {formatValue ? formatValue(min) : min}
          </span>
          <span className="text-xs text-gray-400">
            {formatValue ? formatValue(max) : max}
          </span>
        </div>
        {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
