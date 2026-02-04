// Investment Calculator Types
export interface InvestmentInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualInterestRate: number;
  investmentPeriodYears: number;
  compoundFrequency: CompoundFrequency;
}

export type CompoundFrequency = 'monthly' | 'quarterly' | 'annually';

export interface InvestmentResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  effectiveAnnualRate: number;
}

export interface InvestmentGrowthDataPoint {
  year: number;
  principal: number;
  contributions: number;
  interest: number;
  total: number;
}

// Loan Calculator Types
export interface LoanInputs {
  loanAmount: number;
  downPayment: number;
  downPaymentType: 'amount' | 'percent';
  interestRate: number;
  loanTermYears: number;
  propertyTax?: number;
  insurance?: number;
  pmi?: number;
}

export interface LoanResult {
  monthlyPaymentPI: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  principalAmount: number;
}

export interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

// Retirement Calculator Types
export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  desiredMonthlyIncome: number;
  socialSecurity?: number;
}

export interface RetirementResult {
  projectedSavings: number;
  requiredSavings: number;
  savingsGap: number;
  successRate: number;
  monthlyIncomeAtRetirement: number;
}

export interface RetirementProjectionPoint {
  age: number;
  savings: number;
  contributions: number;
  withdrawals: number;
  phase: 'accumulation' | 'retirement';
}

// Inflation Calculator Types
export interface InflationInputs {
  startingAmount: number;
  startYear: number;
  endYear: number;
  inflationRate: number;
}

export interface InflationResult {
  futureValue: number;
  pastValue: number;
  purchasingPowerChange: number;
  yearlyBreakdown: InflationYearlyData[];
}

export interface InflationYearlyData {
  year: number;
  value: number;
  purchasingPower: number;
}

// Scenario Types
export interface Scenario<T = unknown> {
  id: string;
  name: string;
  type: 'investment' | 'loan' | 'retirement' | 'inflation';
  inputs: T;
  createdAt: string;
  updatedAt: string;
}

export type InvestmentScenario = Scenario<InvestmentInputs>;
export type LoanScenario = Scenario<LoanInputs>;
export type RetirementScenario = Scenario<RetirementInputs>;
export type InflationScenario = Scenario<InflationInputs>;

export type AnyScenario = InvestmentScenario | LoanScenario | RetirementScenario | InflationScenario;
