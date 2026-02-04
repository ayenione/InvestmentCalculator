import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Toggle } from '../../common';
import { formatCurrency } from '../../../utils/formatters';
import { generateAmortizationCSV } from '../../../utils/calculations';
import type { AmortizationEntry } from '../../../types';

interface AmortizationTableProps {
  schedule: AmortizationEntry[];
  groupBy: 'monthly' | 'yearly';
  onGroupByChange: (groupBy: 'monthly' | 'yearly') => void;
}

export function AmortizationTable({
  schedule,
  groupBy,
  onGroupByChange,
}: AmortizationTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? schedule : schedule.slice(0, 10);

  const handleDownloadCSV = () => {
    const csv = generateAmortizationCSV(schedule);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amortization-schedule-${groupBy}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Toggle
          options={[
            { value: 'yearly', label: 'Yearly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          value={groupBy}
          onChange={(value) => onGroupByChange(value as 'monthly' | 'yearly')}
        />
        <Button variant="secondary" size="sm" onClick={handleDownloadCSV}>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {groupBy === 'yearly' ? 'Year' : 'Month'}
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">
                Payment
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">
                Principal
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">
                Interest
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, index) => (
              <motion.tr
                key={entry.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {entry.period}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatCurrency(entry.payment, { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-right text-emerald-600 font-medium">
                  {formatCurrency(entry.principal, { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-right text-amber-600 font-medium">
                  {formatCurrency(entry.interest, { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-right text-gray-900 font-medium">
                  {formatCurrency(entry.balance, { maximumFractionDigits: 2 })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 10 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? 'Show Less'
              : `Show All ${schedule.length} ${groupBy === 'yearly' ? 'Years' : 'Months'}`}
          </Button>
        </div>
      )}
    </div>
  );
}
