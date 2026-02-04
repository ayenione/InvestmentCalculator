import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'default' | 'gradient' | 'bordered' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  default: 'bg-white',
  gradient: 'bg-gradient-to-br from-white to-gray-50',
  bordered: 'bg-white border-2 border-gray-200',
  elevated: 'bg-white shadow-xl',
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
  children,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : undefined}
      className={`
        rounded-2xl shadow-card
        transition-all duration-300
        ${variantStyles[variant]}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  icon,
  action,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`} {...props}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-xl bg-primary-100 text-primary-600">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardContent({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
