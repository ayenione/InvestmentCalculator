import { InflationCalculator } from '../components/calculators';
import { usePageMeta } from '../hooks';

export function InflationPage() {
  usePageMeta({
    title: 'Inflation Calculator - Purchasing Power Over Time | TheFinCalculator',
    description: 'See how inflation affects purchasing power and compare the value of money across different time periods.',
  });

  return <InflationCalculator />;
}
