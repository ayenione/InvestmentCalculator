import { CurrencyInput, Slider, Toggle } from '../../common';
import { formatPercent } from '../../../utils/formatters';
import type { LoanInputs as LoanInputsType } from '../../../types';

interface LoanInputsProps {
  inputs: LoanInputsType;
  onChange: (inputs: LoanInputsType) => void;
}

export function LoanInputs({ inputs, onChange }: LoanInputsProps) {
  const updateField = <K extends keyof LoanInputsType>(
    field: K,
    value: LoanInputsType[K]
  ) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <div className="space-y-6">
      <CurrencyInput
        label="Loan Amount / Home Price"
        value={inputs.loanAmount}
        min={0}
        max={10000000}
        onChange={(value) => updateField('loanAmount', value)}
        hint="Total purchase price or loan amount"
      />

      <div>
        <Toggle
          label="Down Payment Type"
          options={[
            { value: 'amount', label: 'Amount ($)' },
            { value: 'percent', label: 'Percent (%)' },
          ]}
          value={inputs.downPaymentType}
          onChange={(value) =>
            updateField('downPaymentType', value as 'amount' | 'percent')
          }
        />
        <div className="mt-3">
          {inputs.downPaymentType === 'amount' ? (
            <CurrencyInput
              value={inputs.downPayment}
              min={0}
              max={inputs.loanAmount}
              onChange={(value) => updateField('downPayment', value)}
            />
          ) : (
            <Slider
              value={inputs.downPayment}
              min={0}
              max={100}
              step={1}
              onChange={(value) => updateField('downPayment', value)}
              formatValue={(v) => `${v}%`}
            />
          )}
        </div>
      </div>

      <Slider
        label="Interest Rate"
        value={inputs.interestRate}
        min={0}
        max={15}
        step={0.125}
        onChange={(value) => updateField('interestRate', value)}
        formatValue={(v) => formatPercent(v)}
        hint="Annual interest rate"
      />

      <Slider
        label="Loan Term"
        value={inputs.loanTermYears}
        min={1}
        max={30}
        step={1}
        onChange={(value) => updateField('loanTermYears', value)}
        formatValue={(v) => `${v} ${v === 1 ? 'year' : 'years'}`}
        hint="Length of the loan (1-30 years)"
      />

      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Optional: Escrow Costs (Annual)
        </p>

        <div className="space-y-4">
          <CurrencyInput
            label="Property Tax"
            value={inputs.propertyTax || 0}
            min={0}
            max={100000}
            onChange={(value) => updateField('propertyTax', value)}
          />

          <CurrencyInput
            label="Home Insurance"
            value={inputs.insurance || 0}
            min={0}
            max={50000}
            onChange={(value) => updateField('insurance', value)}
          />

          <CurrencyInput
            label="PMI (if applicable)"
            value={inputs.pmi || 0}
            min={0}
            max={10000}
            onChange={(value) => updateField('pmi', value)}
          />
        </div>
      </div>
    </div>
  );
}
