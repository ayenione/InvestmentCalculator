import type {
  InflationInputs,
  InflationResult,
  InflationYearlyData,
} from '../../types';

export function calculateInflation(inputs: InflationInputs): InflationResult {
  const { startingAmount, startYear, endYear, inflationRate } = inputs;

  const years = endYear - startYear;
  const inflationFactor = Math.pow(1 + inflationRate / 100, Math.abs(years));

  let futureValue: number;
  let pastValue: number;

  if (years >= 0) {
    // Calculating future value (what amount will be worth in future)
    futureValue = startingAmount;
    pastValue = startingAmount / inflationFactor;
  } else {
    // Calculating past value (what amount was worth)
    futureValue = startingAmount * inflationFactor;
    pastValue = startingAmount;
  }

  // Purchasing power change (how much buying power is lost)
  const purchasingPowerChange = ((1 / inflationFactor) - 1) * 100;

  const yearlyBreakdown = generateYearlyBreakdown(inputs);

  return {
    futureValue,
    pastValue,
    purchasingPowerChange,
    yearlyBreakdown,
  };
}

function generateYearlyBreakdown(inputs: InflationInputs): InflationYearlyData[] {
  const { startingAmount, startYear, endYear, inflationRate } = inputs;
  const data: InflationYearlyData[] = [];

  const step = endYear >= startYear ? 1 : -1;
  const years = Math.abs(endYear - startYear);

  for (let i = 0; i <= years; i++) {
    const year = startYear + i * step;
    const factor = Math.pow(1 + inflationRate / 100, i);

    if (step > 0) {
      // Forward in time: same nominal value, less purchasing power
      data.push({
        year,
        value: startingAmount,
        purchasingPower: startingAmount / factor,
      });
    } else {
      // Backward in time: same nominal value, more purchasing power
      data.push({
        year,
        value: startingAmount,
        purchasingPower: startingAmount * factor,
      });
    }
  }

  return step > 0 ? data : data.reverse();
}

export function calculateEquivalentAmount(
  amount: number,
  fromYear: number,
  toYear: number,
  inflationRate: number
): number {
  const years = toYear - fromYear;
  const factor = Math.pow(1 + inflationRate / 100, years);
  return amount * factor;
}

export function calculateRealReturn(
  nominalReturn: number,
  inflationRate: number
): number {
  // Fisher equation: (1 + real) = (1 + nominal) / (1 + inflation)
  return (
    ((1 + nominalReturn / 100) / (1 + inflationRate / 100) - 1) * 100
  );
}

export function getHistoricalInflationRate(country: string = 'US'): number {
  // Historical average inflation rates
  const rates: Record<string, number> = {
    US: 3.0,
    UK: 2.5,
    EU: 2.0,
    JP: 0.5,
    CA: 2.5,
  };
  return rates[country] || 3.0;
}

export function calculatePurchasingPowerLoss(
  amount: number,
  years: number,
  inflationRate: number
): { nominalValue: number; realValue: number; lostValue: number } {
  const factor = Math.pow(1 + inflationRate / 100, years);
  const realValue = amount / factor;
  const lostValue = amount - realValue;

  return {
    nominalValue: amount,
    realValue,
    lostValue,
  };
}

export function yearsToHalvePurchasingPower(inflationRate: number): number {
  // Rule of 72 approximation
  if (inflationRate <= 0) return Infinity;
  return 72 / inflationRate;
}
