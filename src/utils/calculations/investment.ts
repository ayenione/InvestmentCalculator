import type {
  InvestmentInputs,
  InvestmentResult,
  InvestmentGrowthDataPoint,
  CompoundFrequency,
} from '../../types';

const getPeriodsPerYear = (frequency: CompoundFrequency): number => {
  switch (frequency) {
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'annually':
      return 1;
  }
};

export function calculateInvestment(inputs: InvestmentInputs): InvestmentResult {
  const {
    initialInvestment,
    monthlyContribution,
    annualInterestRate,
    investmentPeriodYears,
    compoundFrequency,
  } = inputs;

  const periodsPerYear = getPeriodsPerYear(compoundFrequency);
  const totalPeriods = investmentPeriodYears * periodsPerYear;
  const periodicRate = annualInterestRate / 100 / periodsPerYear;

  // Contributions per compounding period
  const contributionsPerPeriod = compoundFrequency === 'monthly'
    ? monthlyContribution
    : compoundFrequency === 'quarterly'
      ? monthlyContribution * 3
      : monthlyContribution * 12;

  // Future value of initial investment: P * (1 + r)^n
  const fvInitial = initialInvestment * Math.pow(1 + periodicRate, totalPeriods);

  // Future value of periodic contributions (annuity due - assuming start of period)
  // FV = PMT * [((1 + r)^n - 1) / r] * (1 + r)
  let fvContributions = 0;
  if (periodicRate > 0) {
    fvContributions =
      contributionsPerPeriod *
      ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate) *
      (1 + periodicRate);
  } else {
    fvContributions = contributionsPerPeriod * totalPeriods;
  }

  const futureValue = fvInitial + fvContributions;
  const totalContributions =
    initialInvestment + monthlyContribution * 12 * investmentPeriodYears;
  const totalInterest = futureValue - totalContributions;

  // Effective Annual Rate: (1 + r/n)^n - 1
  const effectiveAnnualRate =
    (Math.pow(1 + annualInterestRate / 100 / periodsPerYear, periodsPerYear) - 1) * 100;

  return {
    futureValue,
    totalContributions,
    totalInterest,
    effectiveAnnualRate,
  };
}

export function generateGrowthData(
  inputs: InvestmentInputs
): InvestmentGrowthDataPoint[] {
  const {
    initialInvestment,
    monthlyContribution,
    annualInterestRate,
    investmentPeriodYears,
    compoundFrequency,
  } = inputs;

  const data: InvestmentGrowthDataPoint[] = [];
  const periodsPerYear = getPeriodsPerYear(compoundFrequency);
  const periodicRate = annualInterestRate / 100 / periodsPerYear;

  const contributionsPerPeriod = compoundFrequency === 'monthly'
    ? monthlyContribution
    : compoundFrequency === 'quarterly'
      ? monthlyContribution * 3
      : monthlyContribution * 12;

  // Initial point
  data.push({
    year: 0,
    principal: initialInvestment,
    contributions: 0,
    interest: 0,
    total: initialInvestment,
  });

  let balance = initialInvestment;
  let totalContributions = 0;
  let totalInterest = 0;

  for (let year = 1; year <= investmentPeriodYears; year++) {
    const periodsInYear = periodsPerYear;

    for (let period = 0; period < periodsInYear; period++) {
      // Add contribution at start of period
      balance += contributionsPerPeriod;
      totalContributions += contributionsPerPeriod;

      // Apply interest
      const periodInterest = balance * periodicRate;
      balance += periodInterest;
      totalInterest += periodInterest;
    }

    data.push({
      year,
      principal: initialInvestment,
      contributions: totalContributions,
      interest: totalInterest,
      total: balance,
    });
  }

  return data;
}

export function calculateFutureValueAtYear(
  inputs: InvestmentInputs,
  targetYear: number
): number {
  const modifiedInputs = {
    ...inputs,
    investmentPeriodYears: targetYear,
  };
  return calculateInvestment(modifiedInputs).futureValue;
}
