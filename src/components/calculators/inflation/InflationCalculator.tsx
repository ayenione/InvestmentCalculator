import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../common';
import { InflationChart } from '../../charts';
import { SavedScenarios, SaveScenarioModal } from '../../scenarios';
import { InflationInputs } from './InflationInputs';
import { InflationResults } from './InflationResults';
import { calculateInflation } from '../../../utils/calculations';
import { saveScenario } from '../../../utils/scenarios';
import { useDebounce } from '../../../hooks';
import type { InflationInputs as InflationInputsType, AnyScenario } from '../../../types';

const currentYear = new Date().getFullYear();

const defaultInputs: InflationInputsType = {
  startingAmount: 100000,
  startYear: currentYear,
  endYear: currentYear + 20,
  inflationRate: 3,
};

export function InflationCalculator() {
  const [inputs, setInputs] = useState<InflationInputsType>(defaultInputs);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [scenarioRefreshKey, setScenarioRefreshKey] = useState(0);
  const debouncedInputs = useDebounce(inputs, 150);

  const result = useMemo(
    () => calculateInflation(debouncedInputs),
    [debouncedInputs]
  );

  const handleSave = useCallback((name: string) => {
    saveScenario(name, 'inflation', inputs);
    setScenarioRefreshKey((k) => k + 1);
  }, [inputs]);

  const handleLoadScenario = useCallback((scenario: AnyScenario) => {
    if (scenario.type === 'inflation') {
      setInputs(scenario.inputs as InflationInputsType);
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
            Inflation Calculator
          </h1>
          <p className="text-gray-600">
            See how inflation affects purchasing power over time.
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
            Calculate Inflation
          </h2>
          <SavedScenarios
            type="inflation"
            onLoad={handleLoadScenario}
            refreshKey={scenarioRefreshKey}
          />
          <InflationInputs inputs={inputs} onChange={setInputs} />
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Inflation Impact
            </h2>
            <InflationResults result={result} inputs={debouncedInputs} />
          </Card>

          {/* Chart */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Purchasing Power Over Time
            </h2>
            <InflationChart data={result.yearlyBreakdown} />
          </Card>

          {/* Year by Year Breakdown */}
          <Card hover={false}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Year-by-Year Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">
                      Nominal Value
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">
                      Purchasing Power
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">
                      % of Original
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.slice(0, 20).map((row, index) => (
                    <motion.tr
                      key={row.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {row.year}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        ${row.value.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-amber-600 font-medium">
                        ${row.purchasingPower.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {((row.purchasingPower / debouncedInputs.startingAmount) * 100).toFixed(1)}%
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {result.yearlyBreakdown.length > 20 && (
                <p className="text-center text-gray-500 text-sm py-4">
                  Showing first 20 years
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        defaultName={`Inflation ${new Date().toLocaleDateString()}`}
      />
    </div>
  );
}
