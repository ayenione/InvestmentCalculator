import { LoanCalculator } from '../components/calculators';
import { usePageMeta } from '../hooks';

export function LoanPage() {
  usePageMeta({
    title: 'Loan Calculator - Mortgage Payments & Amortization | TheFinCalculator',
    description: 'Calculate monthly mortgage and loan payments, view amortization schedules, and compare loan options.',
  });

  return <LoanCalculator />;
}
