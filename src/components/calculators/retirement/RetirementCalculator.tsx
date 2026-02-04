import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../common';
import { RetirementChart } from '../../charts';
import { SavedScenarios, SaveScenarioModal } from '../../scenarios';
import { RetirementInputs } from './RetirementInputs';
import { RetirementResults } from './RetirementResults';
import { MilestoneTracker } from './MilestoneTracker';
import {
  calculateRetirement,
  generateRetirementProjection,
  calculateMilestones,
} from '../../../utils/calculations';
import { saveScenario } from '../../../utils/scenarios';
import { useDebounce } from '../../../hooks';
import type { RetirementInputs as RetirementInputsType, AnyScenario } from '../../../types';

const defaultInputs: RetirementInputsType = {
  currentAge: 35,
  retirementAge: 65,
  lifeExpectancy: 90,
  currentSavings: 50000,
  monthlyContribution: 1000,
  expectedReturn: 7,
  inflationRate: 3,
  desiredMonthlyIncome: 5000,
  socialSecurity: 2000,
};

export function RetirementCalculator() {
  const [inputs, setInputs] = useState<RetirementInputsType>(defaultInputs);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [scenarioRefreshKey, setScenarioRefreshKey] = useState(0);
  const debouncedInputs = useDebounce(inputs, 150);

  const result = useMemo(
    () => calculateRetirement(debouncedInputs),
    [debouncedInputs]
  );

  const projection = useMemo(
    () => generateRetirementProjection(debouncedInputs),
    [debouncedInputs]
  );

  const milestones = useMemo(
    () => calculateMilestones(debouncedInputs),
    [debouncedInputs]
  );

  const handleSave = useCallback((name: string) => {
    saveScenario(name, 'retirement', inputs);
    setScenarioRefreshKey((k) => k + 1);
  }, [inputs]);

  const handleLoadScenario = useCallback((scenario: AnyScenario) => {
    if (scenario.type === 'retirement') {
      setInputs(scenario.inputs as RetirementInputsType);
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
            Retirement Calculator
          </h1>
          <p className="text-gray-600">
            Plan your retirement and see if you're on track to meet your goals.
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
            Your Information
          </h2>
          <SavedScenarios
            type="retirement"
            onLoad={handleLoadScenario}
            refreshKey={scenarioRefreshKey}
          />
          <RetirementInputs inputs={inputs} onChange={setInputs} />
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Retirement Outlook
            </h2>
            <RetirementResults result={result} />
          </Card>

          {/* Projection Chart */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Savings Projection
            </h2>
            <RetirementChart
              data={projection}
              retirementAge={debouncedInputs.retirementAge}
            />
          </Card>

          {/* Milestones */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Financial Milestones
            </h2>
            <MilestoneTracker
              milestones={milestones}
              currentAge={debouncedInputs.currentAge}
            />
          </Card>
        </div>
      </div>

      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        defaultName={`Retirement ${new Date().toLocaleDateString()}`}
      />
    </div>
  );
}
