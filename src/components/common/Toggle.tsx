import { motion } from 'framer-motion';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Toggle({
  options,
  value,
  onChange,
  label,
  className = '',
}: ToggleProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative inline-flex bg-gray-100 rounded-xl p-1">
        <motion.div
          className="absolute top-1 bottom-1 bg-white rounded-lg shadow-md"
          initial={false}
          animate={{
            left: `calc(${(100 / options.length) * selectedIndex}% + 4px)`,
            width: `calc(${100 / options.length}% - 8px)`,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              relative z-10 px-4 py-2 text-sm font-medium rounded-lg
              transition-colors duration-200
              ${
                value === option.value
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
