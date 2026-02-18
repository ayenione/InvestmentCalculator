import { Link } from 'react-router-dom';
import { InvestmentCalculator } from '../components/calculators';
import { LearnMoreSection } from '../components/common';
import { usePageMeta } from '../hooks';

export function InvestmentPage() {
  usePageMeta({
    title: 'Investment Calculator - Compound Interest & Growth | TheFinCalculator',
    description: 'Calculate compound interest and see how your investments grow over time with our free investment calculator.',
  });

  return (
    <>
      <InvestmentCalculator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LearnMoreSection title="Understanding Investment Growth & Compound Interest">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How This Calculator Works</h3>
          <p className="mb-4">
            Our Investment Calculator uses the compound interest formula to project how your money
            grows over time. You provide your initial investment, regular monthly contributions,
            expected annual return rate, and investment time horizon. The calculator then shows you
            the total future value of your investment, broken down into your contributions and the
            interest earned.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">The Power of Compound Interest</h3>
          <p className="mb-4">
            Compound interest is often called the "eighth wonder of the world" because of its
            extraordinary ability to grow wealth over time. Unlike simple interest, which only earns
            returns on your original principal, compound interest earns returns on your entire
            balance — including previously earned interest. This creates an exponential growth curve
            that becomes increasingly powerful the longer you invest.
          </p>
          <p className="mb-4">
            For example, $10,000 invested at 8% annual return grows to approximately $21,600 in 10
            years, $46,600 in 20 years, and $100,600 in 30 years. Notice how the growth accelerates —
            you gain $11,600 in the first decade but over $54,000 in the third decade. This is the
            compounding effect in action.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Using This Calculator</h3>
          <p className="mb-4">
            For a realistic projection, use historical average returns: the S&P 500 has averaged about
            10% annually before inflation (roughly 7% after inflation). Be conservative in your
            estimates — it's better to be pleasantly surprised than disappointed. Try adjusting the
            compounding frequency to see how monthly vs. annual compounding affects your results.
          </p>
          <p>
            Want to learn more?{' '}
            <Link to="/learn/compound-interest" className="text-primary-600 hover:text-primary-700 underline">
              Read our guide on how compound interest works
            </Link>{' '}
            or explore{' '}
            <Link to="/learn/investment-strategies-beginners" className="text-primary-600 hover:text-primary-700 underline">
              investment strategies for beginners
            </Link>.
          </p>
        </LearnMoreSection>
      </div>
    </>
  );
}
