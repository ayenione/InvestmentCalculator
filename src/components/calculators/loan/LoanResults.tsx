import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { LoanResult } from '../../../types';

interface LoanResultsProps {
  result: LoanResult;
}

export function LoanResults({ result }: LoanResultsProps) {
  const stats = [
    {
      label: 'Monthly Payment (P&I)',
      value: formatCurrency(result.monthlyPaymentPI, { maximumFractionDigits: 2 }),
      color: 'from-primary-500 to-purple-500',
      highlight: true,
    },
    {
      label: 'Total Monthly Payment',
      value: formatCurrency(result.totalMonthlyPayment, { maximumFractionDigits: 2 }),
      color: 'from-blue-500 to-cyan-500',
      subtitle: 'Including taxes & insurance',
    },
    {
      label: 'Principal Amount',
      value: formatCurrency(result.principalAmount),
      color: 'from-emerald-500 to-green-500',
    },
    {
      label: 'Total Interest',
      value: formatCurrency(result.totalInterest),
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Total Cost of Loan',
      value: formatCurrency(result.totalCost),
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            relative overflow-hidden rounded-2xl p-6
            ${stat.highlight ? 'sm:col-span-2' : ''}
          `}
        >
          <div
            className={`
              absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10
            `}
          />
          <div className="relative">
            <p className="text-sm font-medium text-gray-600 mb-1">
              {stat.label}
            </p>
            <p
              className={`
                font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent
                ${stat.highlight ? 'text-4xl' : 'text-2xl'}
              `}
            >
              {stat.value}
            </p>
            {stat.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
