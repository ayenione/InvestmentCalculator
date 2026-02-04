import { motion } from 'framer-motion';
import { Button } from '../common';
import { formatCurrency } from '../../utils/formatters';
import type { AnyScenario, InvestmentInputs, LoanInputs, RetirementInputs, InflationInputs } from '../../types';

interface ScenarioCardProps {
  scenario: AnyScenario;
  onLoad: (scenario: AnyScenario) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const typeLabels: Record<AnyScenario['type'], string> = {
  investment: 'Investment',
  loan: 'Loan',
  retirement: 'Retirement',
  inflation: 'Inflation',
};

const typeColors: Record<AnyScenario['type'], string> = {
  investment: 'bg-primary-100 text-primary-700',
  loan: 'bg-emerald-100 text-emerald-700',
  retirement: 'bg-amber-100 text-amber-700',
  inflation: 'bg-rose-100 text-rose-700',
};

function getScenarioSummary(scenario: AnyScenario): string {
  switch (scenario.type) {
    case 'investment': {
      const inputs = scenario.inputs as InvestmentInputs;
      return `${formatCurrency(inputs.initialInvestment, { compact: true })} initial, ${formatCurrency(inputs.monthlyContribution, { compact: true })}/mo`;
    }
    case 'loan': {
      const inputs = scenario.inputs as LoanInputs;
      return `${formatCurrency(inputs.loanAmount, { compact: true })} loan, ${inputs.loanTermYears}yr`;
    }
    case 'retirement': {
      const inputs = scenario.inputs as RetirementInputs;
      return `Age ${inputs.currentAge} → ${inputs.retirementAge}`;
    }
    case 'inflation': {
      const inputs = scenario.inputs as InflationInputs;
      return `${inputs.startYear} → ${inputs.endYear}`;
    }
    default:
      return '';
  }
}

export function ScenarioCard({
  scenario,
  onLoad,
  onDuplicate,
  onDelete,
  isSelected,
  onSelect,
}: ScenarioCardProps) {
  const formattedDate = new Date(scenario.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        bg-white rounded-xl border-2 p-4
        transition-all duration-200
        ${isSelected ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-gray-200 hover:border-gray-300'}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[scenario.type]}`}>
              {typeLabels[scenario.type]}
            </span>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <h4 className="font-semibold text-gray-900 truncate">{scenario.name}</h4>
          <p className="text-sm text-gray-500 mt-1">{getScenarioSummary(scenario)}</p>
        </div>
        {onSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(scenario.id)}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button size="sm" onClick={() => onLoad(scenario)} className="flex-1">
          Load
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDuplicate(scenario.id)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(scenario.id)}
          className="text-red-600 hover:bg-red-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </motion.div>
  );
}
