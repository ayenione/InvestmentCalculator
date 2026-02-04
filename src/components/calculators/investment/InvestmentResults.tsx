import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import type { InvestmentResult } from '../../../types';

interface InvestmentResultsProps {
  result: InvestmentResult;
}

export function InvestmentResults({ result }: InvestmentResultsProps) {
  const stats = [
    {
      label: 'Future Value',
      value: formatCurrency(result.futureValue),
      color: 'from-primary-500 to-purple-500',
      highlight: true,
    },
    {
      label: 'Total Contributions',
      value: formatCurrency(result.totalContributions),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Total Interest Earned',
      value: formatCurrency(result.totalInterest),
      color: 'from-emerald-500 to-green-500',
    },
    {
      label: 'Effective Annual Rate',
      value: formatPercent(result.effectiveAnnualRate),
      color: 'from-amber-500 to-orange-500',
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
          </div>
        </motion.div>
      ))}
    </div>
  );
}
