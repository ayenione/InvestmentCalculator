import { CurrencyInput, Slider, Select } from '../../common';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import type { InvestmentInputs as InvestmentInputsType, CompoundFrequency } from '../../../types';

interface InvestmentInputsProps {
  inputs: InvestmentInputsType;
  onChange: (inputs: InvestmentInputsType) => void;
}

const compoundOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
];

export function InvestmentInputs({ inputs, onChange }: InvestmentInputsProps) {
  const updateField = <K extends keyof InvestmentInputsType>(
    field: K,
    value: InvestmentInputsType[K]
  ) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <div className="space-y-6">
      <CurrencyInput
        label="Initial Investment"
        value={inputs.initialInvestment}
        min={0}
        max={10000000}
        onChange={(value) => updateField('initialInvestment', value)}
        hint="The amount you're starting with"
      />

      <CurrencyInput
        label="Monthly Contribution"
        value={inputs.monthlyContribution}
        min={0}
        max={100000}
        onChange={(value) => updateField('monthlyContribution', value)}
        hint="Amount you'll add each month"
      />

      <Slider
        label="Annual Interest Rate"
        value={inputs.annualInterestRate}
        min={0}
        max={20}
        step={0.1}
        onChange={(value) => updateField('annualInterestRate', value)}
        formatValue={(v) => formatPercent(v)}
        hint="Expected annual return on investment"
      />

      <Slider
        label="Investment Period"
        value={inputs.investmentPeriodYears}
        min={1}
        max={50}
        step={1}
        onChange={(value) => updateField('investmentPeriodYears', value)}
        formatValue={(v) => `${v} years`}
        hint="How long you plan to invest"
      />

      <Select
        label="Compound Frequency"
        options={compoundOptions}
        value={inputs.compoundFrequency}
        onChange={(value) => updateField('compoundFrequency', value as CompoundFrequency)}
        hint="How often interest is calculated"
      />
    </div>
  );
}
