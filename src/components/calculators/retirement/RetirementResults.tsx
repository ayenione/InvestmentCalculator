import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import type { RetirementResult } from '../../../types';

interface RetirementResultsProps {
  result: RetirementResult;
}

export function RetirementResults({ result }: RetirementResultsProps) {
  const isOnTrack = result.savingsGap <= 0;

  const stats = [
    {
      label: 'Projected Savings at Retirement',
      value: formatCurrency(result.projectedSavings, { compact: true }),
      color: 'from-primary-500 to-purple-500',
      highlight: true,
    },
    {
      label: 'Required Savings',
      value: formatCurrency(result.requiredSavings, { compact: true }),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: isOnTrack ? 'Surplus' : 'Savings Gap',
      value: formatCurrency(Math.abs(result.savingsGap), { compact: true }),
      color: isOnTrack ? 'from-emerald-500 to-green-500' : 'from-rose-500 to-red-500',
      prefix: isOnTrack ? '+' : '-',
    },
    {
      label: 'Monthly Income at Retirement',
      value: formatCurrency(result.monthlyIncomeAtRetirement),
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Success Rate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">
              Success Rate (Monte Carlo)
            </p>
            <p className="text-4xl font-bold text-white">
              {formatPercent(result.successRate)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Probability of not running out of money
            </p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#374151"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke={result.successRate >= 80 ? '#10b981' : result.successRate >= 50 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${result.successRate * 2.51} 251`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${
                result.successRate >= 80 ? 'text-emerald-400' :
                result.successRate >= 50 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {result.successRate.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
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
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}
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
                {stat.prefix}{stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
