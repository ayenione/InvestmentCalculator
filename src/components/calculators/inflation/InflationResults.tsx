import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import type { InflationResult, InflationInputs } from '../../../types';

interface InflationResultsProps {
  result: InflationResult;
  inputs: InflationInputs;
}

export function InflationResults({ result, inputs }: InflationResultsProps) {
  const isFuture = inputs.endYear > inputs.startYear;
  const years = Math.abs(inputs.endYear - inputs.startYear);

  return (
    <div className="space-y-6">
      {/* Main comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary-500 to-purple-600"
        >
          <div className="relative text-white">
            <p className="text-sm font-medium opacity-80 mb-1">
              {isFuture ? `Value in ${inputs.startYear}` : `Value in ${inputs.endYear}`}
            </p>
            <p className="text-3xl font-bold">
              {formatCurrency(inputs.startingAmount)}
            </p>
            <p className="text-sm opacity-70 mt-2">
              Nominal value
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-amber-500 to-orange-600"
        >
          <div className="relative text-white">
            <p className="text-sm font-medium opacity-80 mb-1">
              {isFuture ? `Buying power in ${inputs.endYear}` : `Equivalent in ${inputs.startYear}`}
            </p>
            <p className="text-3xl font-bold">
              {formatCurrency(isFuture ? result.pastValue : result.futureValue)}
            </p>
            <p className="text-sm opacity-70 mt-2">
              {isFuture ? 'What it will buy' : 'What it was worth'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">
            Purchasing Power Change
          </p>
          <p className={`text-2xl font-bold ${
            result.purchasingPowerChange < 0 ? 'text-red-600' : 'text-emerald-600'
          }`}>
            {formatPercent(result.purchasingPowerChange)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">
            Time Period
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {years} {years === 1 ? 'year' : 'years'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">
            Value Lost to Inflation
          </p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(
              Math.abs(inputs.startingAmount - (isFuture ? result.pastValue : result.futureValue))
            )}
          </p>
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-5 bg-blue-50 border border-blue-100"
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-sm text-blue-800">
            {isFuture ? (
              <p>
                At {formatPercent(inputs.inflationRate)} annual inflation,{' '}
                <strong>{formatCurrency(inputs.startingAmount)}</strong> today will only have the
                buying power of <strong>{formatCurrency(result.pastValue)}</strong> in {inputs.endYear}.
              </p>
            ) : (
              <p>
                <strong>{formatCurrency(inputs.startingAmount)}</strong> in {inputs.startYear} had
                the same buying power as <strong>{formatCurrency(result.futureValue)}</strong> does
                today, assuming {formatPercent(inputs.inflationRate)} annual inflation.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
