import { Link } from 'react-router-dom';
import { LoanCalculator } from '../components/calculators';
import { LearnMoreSection, JsonLd } from '../components/common';
import { usePageMeta } from '../hooks';

export function LoanPage() {
  usePageMeta({
    title: 'Loan Calculator - Mortgage Payments & Amortization | TheFinCalculator',
    description: 'Calculate monthly mortgage and loan payments, view amortization schedules, and compare loan options.',
    url: '/loan',
  });

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Loan Calculator',
        url: 'https://thefincalculator.com/loan',
        description: 'Calculate monthly mortgage and loan payments, view amortization schedules, and compare loan options.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }} />
      <LoanCalculator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LearnMoreSection title="Understanding Loans & Amortization">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How This Calculator Works</h3>
          <p className="mb-4">
            Our Loan Calculator computes your monthly payment using the standard amortization formula
            for fixed-rate loans. Enter the loan amount, down payment, interest rate, and loan term to
            see your estimated monthly payment, total interest paid, and total cost of the loan. The
            calculator also generates a full amortization schedule showing exactly how each payment is
            split between principal and interest.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How Amortization Works</h3>
          <p className="mb-4">
            With a fixed-rate loan, your monthly payment stays the same throughout the loan term, but
            the portion going to interest versus principal changes dramatically. In the early years,
            most of your payment covers interest. As you pay down the balance, more goes toward
            principal. For a typical 30-year mortgage, you won't reach a 50/50 split until roughly
            halfway through the term.
          </p>
          <p className="mb-4">
            This is why making extra payments early in a loan's life has such a big impact — each
            extra dollar goes directly to reducing the principal, which reduces the interest charged
            on all future payments. Even rounding up your payment by $100/month can shave years off
            your mortgage and save tens of thousands in interest.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Comparing Loan Options</h3>
          <p className="mb-4">
            Use the save scenario feature to compare different loan options side by side. Try varying
            the interest rate, loan term, or down payment amount to see how each factor affects your
            total cost. A shorter loan term means higher monthly payments but significantly less
            interest paid overall.
          </p>
          <p>
            Want to learn more?{' '}
            <Link to="/learn/how-loan-amortization-works" className="text-primary-600 hover:text-primary-700 underline">
              Read our guide on how loan amortization works
            </Link>.
          </p>
        </LearnMoreSection>
      </div>
    </>
  );
}
