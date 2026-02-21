import { Link } from 'react-router-dom';
import { InflationCalculator } from '../components/calculators';
import { LearnMoreSection, JsonLd } from '../components/common';
import { usePageMeta } from '../hooks';

export function InflationPage() {
  usePageMeta({
    title: 'Inflation Calculator - Purchasing Power Over Time | TheFinCalculator',
    description: 'See how inflation affects purchasing power and compare the value of money across different time periods.',
    url: '/inflation',
  });

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Inflation Calculator',
        url: 'https://thefincalculator.com/inflation',
        description: 'See how inflation affects purchasing power and compare the value of money across different time periods.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }} />
      <InflationCalculator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LearnMoreSection title="Understanding Inflation & Purchasing Power">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How This Calculator Works</h3>
          <p className="mb-4">
            Our Inflation Calculator shows how the purchasing power of money changes over time due to
            inflation. Enter a dollar amount, a start year, an end year, and an assumed inflation rate
            to see how much that amount would be worth in future (or past) dollars. The chart
            visualizes the growing gap between nominal value and real purchasing power.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Inflation Matters</h3>
          <p className="mb-4">
            Inflation is the silent eroder of wealth. At a seemingly modest 3% annual inflation rate,
            prices double roughly every 24 years. This means $100,000 in savings today will only buy
            about $50,000 worth of goods and services in 24 years if it doesn't grow. Over a 30-year
            retirement, inflation can reduce your purchasing power by more than half.
          </p>
          <p className="mb-4">
            This is why simply saving money in a checking account or under a mattress is actually
            losing money in real terms. To maintain or grow your wealth, your investments need to earn
            returns that outpace inflation. Historically, stocks have returned about 7% after
            inflation, while bonds have returned about 2%, and cash savings have barely kept pace.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Using Inflation in Financial Planning</h3>
          <p className="mb-4">
            When planning for future expenses like retirement, education, or a home purchase, always
            factor in inflation. If college costs $40,000/year today and your child will start in 15
            years, at 3% inflation that same education will cost about $62,000/year. Our calculator
            helps you project these future costs accurately.
          </p>
          <p>
            Want to learn more?{' '}
            <Link to="/learn/understanding-inflation" className="text-primary-600 hover:text-primary-700 underline">
              Read our guide on understanding inflation
            </Link>{' '}
            or learn about{' '}
            <Link to="/learn/rule-of-72" className="text-primary-600 hover:text-primary-700 underline">
              the Rule of 72 for quick calculations
            </Link>.
          </p>
        </LearnMoreSection>
      </div>
    </>
  );
}
