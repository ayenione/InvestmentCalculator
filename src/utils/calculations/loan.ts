import type { LoanInputs, LoanResult, AmortizationEntry } from '../../types';

export function calculateLoan(inputs: LoanInputs): LoanResult {
  const {
    loanAmount,
    downPayment,
    downPaymentType,
    interestRate,
    loanTermYears,
    propertyTax = 0,
    insurance = 0,
    pmi = 0,
  } = inputs;

  // Calculate actual down payment amount
  const downPaymentAmount =
    downPaymentType === 'percent'
      ? (loanAmount * downPayment) / 100
      : downPayment;

  const principalAmount = loanAmount - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPaymentPI: number;

  if (monthlyRate === 0) {
    monthlyPaymentPI = principalAmount / totalPayments;
  } else {
    monthlyPaymentPI =
      (principalAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  // Calculate monthly escrow amounts
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyPMI = pmi / 12;

  const totalMonthlyPayment =
    monthlyPaymentPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

  const totalInterest = monthlyPaymentPI * totalPayments - principalAmount;
  const totalCost =
    totalMonthlyPayment * totalPayments + downPaymentAmount;

  return {
    monthlyPaymentPI,
    totalMonthlyPayment,
    totalInterest,
    totalCost,
    principalAmount,
  };
}

export function generateAmortizationSchedule(
  inputs: LoanInputs,
  groupBy: 'monthly' | 'yearly' = 'yearly'
): AmortizationEntry[] {
  const {
    loanAmount,
    downPayment,
    downPaymentType,
    interestRate,
    loanTermYears,
  } = inputs;

  const downPaymentAmount =
    downPaymentType === 'percent'
      ? (loanAmount * downPayment) / 100
      : downPayment;

  const principalAmount = loanAmount - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principalAmount / totalPayments;
  } else {
    monthlyPayment =
      (principalAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  const schedule: AmortizationEntry[] = [];
  let balance = principalAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  if (groupBy === 'monthly') {
    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;

      schedule.push({
        period: month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        totalInterest: totalInterestPaid,
        totalPrincipal: totalPrincipalPaid,
      });
    }
  } else {
    for (let year = 1; year <= loanTermYears; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      let yearlyPayment = 0;

      for (let month = 0; month < 12; month++) {
        if (balance <= 0) break;

        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
        balance -= principalPayment;
        totalInterestPaid += interestPayment;
        totalPrincipalPaid += principalPayment;

        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        yearlyPayment += monthlyPayment;
      }

      schedule.push({
        period: year,
        payment: yearlyPayment,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, balance),
        totalInterest: totalInterestPaid,
        totalPrincipal: totalPrincipalPaid,
      });
    }
  }

  return schedule;
}

export function calculateExtraPaymentSavings(
  inputs: LoanInputs,
  extraMonthlyPayment: number
): { monthsSaved: number; interestSaved: number } {
  const {
    loanAmount,
    downPayment,
    downPaymentType,
    interestRate,
    loanTermYears,
  } = inputs;

  const downPaymentAmount =
    downPaymentType === 'percent'
      ? (loanAmount * downPayment) / 100
      : downPayment;

  const principalAmount = loanAmount - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principalAmount / totalPayments;
  } else {
    monthlyPayment =
      (principalAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  // Calculate with extra payment
  let balance = principalAmount;
  let totalInterestWithExtra = 0;
  let monthsWithExtra = 0;

  while (balance > 0 && monthsWithExtra < totalPayments) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(
      monthlyPayment + extraMonthlyPayment - interestPayment,
      balance
    );
    balance -= principalPayment;
    totalInterestWithExtra += interestPayment;
    monthsWithExtra++;
  }

  // Calculate without extra payment
  const originalTotalInterest =
    monthlyPayment * totalPayments - principalAmount;

  return {
    monthsSaved: totalPayments - monthsWithExtra,
    interestSaved: originalTotalInterest - totalInterestWithExtra,
  };
}

export function generateAmortizationCSV(schedule: AmortizationEntry[]): string {
  const headers = [
    'Period',
    'Payment',
    'Principal',
    'Interest',
    'Balance',
    'Total Interest',
    'Total Principal',
  ];

  const rows = schedule.map((entry) => [
    entry.period,
    entry.payment.toFixed(2),
    entry.principal.toFixed(2),
    entry.interest.toFixed(2),
    entry.balance.toFixed(2),
    entry.totalInterest.toFixed(2),
    entry.totalPrincipal.toFixed(2),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
