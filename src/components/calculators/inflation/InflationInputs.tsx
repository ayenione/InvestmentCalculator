import { CurrencyInput, Slider, NumberInput } from '../../common';
import { formatPercent } from '../../../utils/formatters';
import type { InflationInputs as InflationInputsType } from '../../../types';

interface InflationInputsProps {
  inputs: InflationInputsType;
  onChange: (inputs: InflationInputsType) => void;
}

export function InflationInputs({ inputs, onChange }: InflationInputsProps) {
  const updateField = <K extends keyof InflationInputsType>(
    field: K,
    value: InflationInputsType[K]
  ) => {
    onChange({ ...inputs, [field]: value });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <CurrencyInput
        label="Amount"
        value={inputs.startingAmount}
        min={0}
        max={100000000}
        onChange={(value) => updateField('startingAmount', value)}
        hint="The dollar amount to analyze"
      />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Start Year"
          value={inputs.startYear}
          min={1900}
          max={currentYear + 50}
          onChange={(value) => updateField('startYear', value)}
        />
        <NumberInput
          label="End Year"
          value={inputs.endYear}
          min={1900}
          max={currentYear + 50}
          onChange={(value) => updateField('endYear', value)}
        />
      </div>

      <Slider
        label="Annual Inflation Rate"
        value={inputs.inflationRate}
        min={0}
        max={15}
        step={0.5}
        onChange={(value) => updateField('inflationRate', value)}
        formatValue={(v) => formatPercent(v)}
        hint="Historical US average is around 3%"
      />

      {/* Quick presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Low (2%)', value: 2 },
            { label: 'Average (3%)', value: 3 },
            { label: 'High (5%)', value: 5 },
            { label: 'Very High (8%)', value: 8 },
          ].map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => updateField('inflationRate', preset.value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-lg
                transition-colors duration-150
                ${
                  inputs.inflationRate === preset.value
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                }
              `}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
