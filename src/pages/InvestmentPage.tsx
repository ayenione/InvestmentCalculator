import { InvestmentCalculator } from '../components/calculators';
import { usePageMeta } from '../hooks';

export function InvestmentPage() {
  usePageMeta({
    title: 'Investment Calculator - Compound Interest & Growth | TheFinCalculator',
    description: 'Calculate compound interest and see how your investments grow over time with our free investment calculator.',
  });

  return <InvestmentCalculator />;
}
