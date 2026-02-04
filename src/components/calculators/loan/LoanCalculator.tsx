import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../common';
import { AmortizationChart, BreakdownPieChart } from '../../charts';
import { SavedScenarios, SaveScenarioModal } from '../../scenarios';
import { LoanInputs } from './LoanInputs';
import { LoanResults } from './LoanResults';
import { AmortizationTable } from './AmortizationTable';
import { calculateLoan, generateAmortizationSchedule } from '../../../utils/calculations';
import { saveScenario } from '../../../utils/scenarios';
import { useDebounce } from '../../../hooks';
import type { LoanInputs as LoanInputsType, AnyScenario } from '../../../types';

const defaultInputs: LoanInputsType = {
  loanAmount: 350000,
  downPayment: 20,
  downPaymentType: 'percent',
  interestRate: 6.5,
  loanTermYears: 30,
  propertyTax: 4200,
  insurance: 1800,
  pmi: 0,
};

export function LoanCalculator() {
  const [inputs, setInputs] = useState<LoanInputsType>(defaultInputs);
  const [amortizationGroupBy, setAmortizationGroupBy] = useState<'monthly' | 'yearly'>('yearly');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [scenarioRefreshKey, setScenarioRefreshKey] = useState(0);
  const debouncedInputs = useDebounce(inputs, 150);

  const result = useMemo(
    () => calculateLoan(debouncedInputs),
    [debouncedInputs]
  );

  const amortizationSchedule = useMemo(
    () => generateAmortizationSchedule(debouncedInputs, amortizationGroupBy),
    [debouncedInputs, amortizationGroupBy]
  );

  const yearlySchedule = useMemo(
    () => generateAmortizationSchedule(debouncedInputs, 'yearly'),
    [debouncedInputs]
  );

  const pieData = useMemo(() => {
    const monthlyPropertyTax = (debouncedInputs.propertyTax || 0) / 12;
    const monthlyInsurance = (debouncedInputs.insurance || 0) / 12;
    const monthlyPMI = (debouncedInputs.pmi || 0) / 12;

    return [
      {
        name: 'Principal & Interest',
        value: result.monthlyPaymentPI,
        color: '#6366f1',
      },
      {
        name: 'Property Tax',
        value: monthlyPropertyTax,
        color: '#f59e0b',
      },
      {
        name: 'Insurance',
        value: monthlyInsurance,
        color: '#10b981',
      },
      {
        name: 'PMI',
        value: monthlyPMI,
        color: '#ec4899',
      },
    ].filter((item) => item.value > 0);
  }, [debouncedInputs, result]);

  const handleSave = useCallback((name: string) => {
    saveScenario(name, 'loan', inputs);
    setScenarioRefreshKey((k) => k + 1);
  }, [inputs]);

  const handleLoadScenario = useCallback((scenario: AnyScenario) => {
    if (scenario.type === 'loan') {
      setInputs(scenario.inputs as LoanInputsType);
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
            Loan Calculator
          </h1>
          <p className="text-gray-600">
            Calculate monthly payments and see the full amortization schedule for your mortgage.
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
            Loan Details
          </h2>
          <SavedScenarios
            type="loan"
            onLoad={handleLoadScenario}
            refreshKey={scenarioRefreshKey}
          />
          <LoanInputs inputs={inputs} onChange={setInputs} />
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Payment Summary
            </h2>
            <LoanResults result={result} />
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hover={false}>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Payment Over Time
              </h2>
              <AmortizationChart data={yearlySchedule} />
            </Card>

            <Card hover={false}>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Monthly Payment Breakdown
              </h2>
              <BreakdownPieChart data={pieData} />
            </Card>
          </div>

          {/* Amortization Table */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Amortization Schedule
            </h2>
            <AmortizationTable
              schedule={amortizationSchedule}
              groupBy={amortizationGroupBy}
              onGroupByChange={setAmortizationGroupBy}
            />
          </Card>
        </div>
      </div>

      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        defaultName={`Loan ${new Date().toLocaleDateString()}`}
      />
    </div>
  );
}
