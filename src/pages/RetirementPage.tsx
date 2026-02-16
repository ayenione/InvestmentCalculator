import { RetirementCalculator } from '../components/calculators';
import { usePageMeta } from '../hooks';

export function RetirementPage() {
  usePageMeta({
    title: 'Retirement Planner - Savings & Projections | TheFinCalculator',
    description: 'Plan your retirement with savings projections, Monte Carlo simulations, and milestone tracking.',
  });

  return <RetirementCalculator />;
}
