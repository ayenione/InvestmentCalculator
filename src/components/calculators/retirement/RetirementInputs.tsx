import { CurrencyInput, Slider, NumberInput } from '../../common';
import { formatPercent } from '../../../utils/formatters';
import type { RetirementInputs as RetirementInputsType } from '../../../types';

interface RetirementInputsProps {
  inputs: RetirementInputsType;
  onChange: (inputs: RetirementInputsType) => void;
}

export function RetirementInputs({ inputs, onChange }: RetirementInputsProps) {
  const updateField = <K extends keyof RetirementInputsType>(
    field: K,
    value: RetirementInputsType[K]
  ) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Current Age"
          value={inputs.currentAge}
          min={18}
          max={80}
          onChange={(value) => updateField('currentAge', value)}
        />
        <NumberInput
          label="Retirement Age"
          value={inputs.retirementAge}
          min={inputs.currentAge + 1}
          max={85}
          onChange={(value) => updateField('retirementAge', value)}
        />
      </div>
      <NumberInput
        label="Life Expectancy"
        value={inputs.lifeExpectancy}
        min={inputs.retirementAge + 1}
        max={110}
        onChange={(value) => updateField('lifeExpectancy', value)}
      />

      <CurrencyInput
        label="Current Savings"
        value={inputs.currentSavings}
        min={0}
        max={50000000}
        onChange={(value) => updateField('currentSavings', value)}
        hint="Total retirement savings you have now"
      />

      <CurrencyInput
        label="Monthly Contribution"
        value={inputs.monthlyContribution}
        min={0}
        max={100000}
        onChange={(value) => updateField('monthlyContribution', value)}
        hint="How much you'll save each month"
      />

      <Slider
        label="Expected Annual Return"
        value={inputs.expectedReturn}
        min={1}
        max={12}
        step={0.5}
        onChange={(value) => updateField('expectedReturn', value)}
        formatValue={(v) => formatPercent(v)}
        hint="Average expected return on investments"
      />

      <Slider
        label="Inflation Rate"
        value={inputs.inflationRate}
        min={0}
        max={8}
        step={0.5}
        onChange={(value) => updateField('inflationRate', value)}
        formatValue={(v) => formatPercent(v)}
        hint="Expected average inflation"
      />

      <CurrencyInput
        label="Desired Monthly Income"
        value={inputs.desiredMonthlyIncome}
        min={0}
        max={100000}
        onChange={(value) => updateField('desiredMonthlyIncome', value)}
        hint="Monthly income needed in retirement (today's dollars)"
      />

      <CurrencyInput
        label="Social Security (Monthly)"
        value={inputs.socialSecurity || 0}
        min={0}
        max={10000}
        onChange={(value) => updateField('socialSecurity', value)}
        hint="Expected monthly Social Security benefit"
      />
    </div>
  );
}
