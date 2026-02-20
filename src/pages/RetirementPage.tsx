import { Link } from 'react-router-dom';
import { RetirementCalculator } from '../components/calculators';
import { LearnMoreSection, JsonLd } from '../components/common';
import { usePageMeta } from '../hooks';

export function RetirementPage() {
  usePageMeta({
    title: 'Retirement Planner - Savings & Projections | TheFinCalculator',
    description: 'Plan your retirement with savings projections, Monte Carlo simulations, and milestone tracking.',
    url: '/retirement',
  });

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Retirement Planner',
        url: 'https://thefincalculator.com/retirement',
        description: 'Plan your retirement with savings projections, Monte Carlo simulations, and milestone tracking.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }} />
      <RetirementCalculator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LearnMoreSection title="Understanding Retirement Planning">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How This Planner Works</h3>
          <p className="mb-4">
            Our Retirement Planner projects your savings through two phases: the accumulation phase
            (from now until retirement) and the distribution phase (during retirement). It calculates
            how your savings grow with regular contributions and compound returns, then models
            withdrawals during retirement to show whether your money will last through your target
            life expectancy.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Retirement Planning Concepts</h3>
          <p className="mb-4">
            The most important factor in retirement planning is time. Starting early gives your
            investments decades to compound, dramatically reducing how much you need to save each
            month. Someone who starts saving $300/month at 25 will accumulate far more than someone
            saving $600/month starting at 40, despite contributing less total money.
          </p>
          <p className="mb-4">
            Inflation is another critical factor. At 3% annual inflation, the cost of living roughly
            doubles every 24 years. This means if you need $4,000/month today, you'll need about
            $8,000/month in 24 years to maintain the same lifestyle. Our planner accounts for
            inflation in its projections so you get a realistic picture of your future needs.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Using This Planner</h3>
          <p className="mb-4">
            Use a conservative expected return rate (6-7% for a balanced portfolio) and a realistic
            inflation rate (2.5-3.5%). Include any expected Social Security benefits to reduce the
            amount your savings need to cover. Try different retirement ages to see how working a few
            extra years can significantly improve your financial security.
          </p>
          <p>
            Want to learn more?{' '}
            <Link to="/learn/retirement-planning-basics" className="text-primary-600 hover:text-primary-700 underline">
              Read our retirement planning basics guide
            </Link>{' '}
            or learn about{' '}
            <Link to="/learn/understanding-inflation" className="text-primary-600 hover:text-primary-700 underline">
              how inflation affects your retirement savings
            </Link>.
          </p>
        </LearnMoreSection>
      </div>
    </>
  );
}
