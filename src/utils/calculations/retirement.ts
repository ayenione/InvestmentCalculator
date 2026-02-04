import type {
  RetirementInputs,
  RetirementResult,
  RetirementProjectionPoint,
} from '../../types';

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    desiredMonthlyIncome,
    socialSecurity = 0,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const monthlyReturn = expectedReturn / 100 / 12;
  const monthsToRetirement = yearsToRetirement * 12;

  // Calculate projected savings at retirement using future value formula
  let projectedSavings = currentSavings;

  // Future value of current savings
  projectedSavings = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);

  // Future value of monthly contributions
  if (monthlyReturn > 0) {
    projectedSavings +=
      monthlyContribution *
      ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);
  } else {
    projectedSavings += monthlyContribution * monthsToRetirement;
  }

  // Calculate required savings for desired income
  // Adjust desired income for inflation to retirement
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const adjustedMonthlyIncome = desiredMonthlyIncome * inflationFactor;
  const netIncomeNeeded = Math.max(0, adjustedMonthlyIncome - socialSecurity);

  // Calculate required savings using present value of annuity
  // Assuming withdrawals during retirement with continued growth
  const monthlyRetirementReturn = (expectedReturn - inflationRate) / 100 / 12; // Real return
  const monthsInRetirement = yearsInRetirement * 12;

  let requiredSavings: number;
  if (monthlyRetirementReturn > 0) {
    // Present value of annuity formula
    requiredSavings =
      netIncomeNeeded *
      ((1 - Math.pow(1 + monthlyRetirementReturn, -monthsInRetirement)) /
        monthlyRetirementReturn);
  } else {
    requiredSavings = netIncomeNeeded * monthsInRetirement;
  }

  const savingsGap = requiredSavings - projectedSavings;

  // Calculate monthly income at retirement
  let monthlyIncomeAtRetirement: number;
  if (monthlyRetirementReturn > 0) {
    monthlyIncomeAtRetirement =
      projectedSavings /
      ((1 - Math.pow(1 + monthlyRetirementReturn, -monthsInRetirement)) /
        monthlyRetirementReturn);
  } else {
    monthlyIncomeAtRetirement = projectedSavings / monthsInRetirement;
  }
  monthlyIncomeAtRetirement += socialSecurity;

  // Monte Carlo simulation for success rate
  const successRate = runMonteCarloSimulation(inputs, 1000);

  return {
    projectedSavings,
    requiredSavings,
    savingsGap,
    successRate,
    monthlyIncomeAtRetirement,
  };
}

export function generateRetirementProjection(
  inputs: RetirementInputs
): RetirementProjectionPoint[] {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    desiredMonthlyIncome,
    socialSecurity = 0,
    inflationRate,
  } = inputs;

  const projection: RetirementProjectionPoint[] = [];
  const monthlyReturn = expectedReturn / 100 / 12;

  let balance = currentSavings;
  let totalContributions = 0;
  let totalWithdrawals = 0;

  // Calculate inflation-adjusted withdrawal
  const yearsToRetirement = retirementAge - currentAge;
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const adjustedMonthlyWithdrawal = Math.max(
    0,
    desiredMonthlyIncome * inflationFactor - socialSecurity
  );

  // Initial point
  projection.push({
    age: currentAge,
    savings: balance,
    contributions: 0,
    withdrawals: 0,
    phase: 'accumulation',
  });

  // Accumulation phase
  for (let age = currentAge + 1; age <= retirementAge; age++) {
    for (let month = 0; month < 12; month++) {
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      balance *= 1 + monthlyReturn;
    }

    projection.push({
      age,
      savings: balance,
      contributions: totalContributions,
      withdrawals: 0,
      phase: 'accumulation',
    });
  }

  // Retirement phase
  for (let age = retirementAge + 1; age <= lifeExpectancy; age++) {
    for (let month = 0; month < 12; month++) {
      if (balance > 0) {
        balance *= 1 + monthlyReturn;
        const withdrawal = Math.min(adjustedMonthlyWithdrawal, balance);
        balance -= withdrawal;
        totalWithdrawals += withdrawal;
      }
    }

    projection.push({
      age,
      savings: Math.max(0, balance),
      contributions: totalContributions,
      withdrawals: totalWithdrawals,
      phase: 'retirement',
    });
  }

  return projection;
}

function runMonteCarloSimulation(
  inputs: RetirementInputs,
  iterations: number
): number {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    desiredMonthlyIncome,
    socialSecurity = 0,
    inflationRate,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const meanMonthlyReturn = expectedReturn / 100 / 12;
  const stdDev = 0.15 / Math.sqrt(12); // ~15% annual volatility

  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const adjustedMonthlyWithdrawal = Math.max(
    0,
    desiredMonthlyIncome * inflationFactor - socialSecurity
  );

  let successes = 0;

  for (let i = 0; i < iterations; i++) {
    let balance = currentSavings;

    // Accumulation phase with randomized returns
    for (let month = 0; month < yearsToRetirement * 12; month++) {
      balance += monthlyContribution;
      const randomReturn = gaussianRandom(meanMonthlyReturn, stdDev);
      balance *= 1 + randomReturn;
    }

    // Retirement phase
    let success = true;
    for (let month = 0; month < yearsInRetirement * 12; month++) {
      const randomReturn = gaussianRandom(meanMonthlyReturn, stdDev);
      balance *= 1 + randomReturn;
      balance -= adjustedMonthlyWithdrawal;

      if (balance <= 0) {
        success = false;
        break;
      }
    }

    if (success) successes++;
  }

  return (successes / iterations) * 100;
}

function gaussianRandom(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

export function calculateMilestones(
  inputs: RetirementInputs
): { age: number; milestone: string; savings: number }[] {
  const projection = generateRetirementProjection(inputs);
  const milestones: { age: number; milestone: string; savings: number }[] = [];

  const targetAmounts = [100000, 250000, 500000, 1000000, 2000000];

  let lastMilestoneIndex = -1;

  for (const point of projection) {
    for (let i = lastMilestoneIndex + 1; i < targetAmounts.length; i++) {
      if (point.savings >= targetAmounts[i]) {
        milestones.push({
          age: point.age,
          milestone: formatMilestone(targetAmounts[i]),
          savings: point.savings,
        });
        lastMilestoneIndex = i;
      }
    }
  }

  // Add retirement milestone
  const retirementPoint = projection.find(
    (p) => p.age === inputs.retirementAge
  );
  if (retirementPoint) {
    milestones.push({
      age: inputs.retirementAge,
      milestone: 'Retirement',
      savings: retirementPoint.savings,
    });
  }

  return milestones.sort((a, b) => a.age - b.age);
}

function formatMilestone(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(0)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
}
