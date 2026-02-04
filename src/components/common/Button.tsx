import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: `bg-gradient-to-r from-primary-500 to-primary-600 text-white
            shadow-lg shadow-primary-500/25
            hover:from-primary-600 hover:to-primary-700
            hover:shadow-xl hover:shadow-primary-500/30
            focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`,
  secondary: `bg-white text-primary-600 border-2 border-primary-200
              hover:bg-primary-50 hover:border-primary-300
              focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`,
  ghost: `bg-transparent text-gray-600 hover:bg-gray-100
          focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
  danger: `bg-gradient-to-r from-red-500 to-red-600 text-white
           shadow-lg shadow-red-500/25
           hover:from-red-600 hover:to-red-700
           focus:ring-2 focus:ring-red-500 focus:ring-offset-2`,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      children,
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-semibold rounded-xl
          transition-all duration-200
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
