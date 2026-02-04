import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../common';
import { GrowthChart, BreakdownPieChart } from '../../charts';
import { SavedScenarios, SaveScenarioModal } from '../../scenarios';
import { InvestmentInputs } from './InvestmentInputs';
import { InvestmentResults } from './InvestmentResults';
import { calculateInvestment, generateGrowthData } from '../../../utils/calculations';
import { saveScenario } from '../../../utils/scenarios';
import { useDebounce } from '../../../hooks';
import type { InvestmentInputs as InvestmentInputsType, AnyScenario } from '../../../types';

const defaultInputs: InvestmentInputsType = {
  initialInvestment: 10000,
  monthlyContribution: 500,
  annualInterestRate: 7,
  investmentPeriodYears: 15,
  compoundFrequency: 'monthly',
};

export function InvestmentCalculator() {
  const [inputs, setInputs] = useState<InvestmentInputsType>(defaultInputs);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [scenarioRefreshKey, setScenarioRefreshKey] = useState(0);
  const debouncedInputs = useDebounce(inputs, 150);

  const result = useMemo(
    () => calculateInvestment(debouncedInputs),
    [debouncedInputs]
  );

  const growthData = useMemo(
    () => generateGrowthData(debouncedInputs),
    [debouncedInputs]
  );

  const pieData = useMemo(
    () => [
      {
        name: 'Initial Investment',
        value: debouncedInputs.initialInvestment,
        color: '#6366f1',
      },
      {
        name: 'Contributions',
        value: result.totalContributions - debouncedInputs.initialInvestment,
        color: '#8b5cf6',
      },
      {
        name: 'Interest Earned',
        value: result.totalInterest,
        color: '#10b981',
      },
    ],
    [debouncedInputs.initialInvestment, result]
  );

  const handleSave = useCallback((name: string) => {
    saveScenario(name, 'investment', inputs);
    setScenarioRefreshKey((k) => k + 1);
  }, [inputs]);

  const handleLoadScenario = useCallback((scenario: AnyScenario) => {
    if (scenario.type === 'investment') {
      setInputs(scenario.inputs as InvestmentInputsType);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investment Calculator
          </h1>
          <p className="text-gray-600">
            Calculate compound interest and see how your investments can grow over time.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => setIsSaveModalOpen(true)}
          leftIcon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          }
        >
          Save Scenario
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <Card className="lg:col-span-1" hover={false}>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Investment Details
          </h2>
          <SavedScenarios
            type="investment"
            onLoad={handleLoadScenario}
            refreshKey={scenarioRefreshKey}
          />
          <InvestmentInputs inputs={inputs} onChange={setInputs} />
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Projected Results
            </h2>
            <InvestmentResults result={result} />
          </Card>

          {/* Growth Chart */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Growth Over Time
            </h2>
            <GrowthChart data={growthData} />
          </Card>

          {/* Breakdown Chart */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Final Balance Breakdown
            </h2>
            <BreakdownPieChart data={pieData} />
          </Card>
        </div>
      </div>

      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        defaultName={`Investment ${new Date().toLocaleDateString()}`}
      />
    </div>
  );
}
