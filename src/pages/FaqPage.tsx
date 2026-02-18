import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks';
import { Accordion } from '../components/common';

const generalFaq = [
  {
    question: 'What is TheFinCalculator?',
    answer: (
      <p>
        TheFinCalculator is a free online platform offering financial calculators and educational
        resources. Our tools help you plan investments, estimate loan payments, project retirement
        savings, and understand the impact of inflation on your money. All calculations run directly
        in your browser — no account or sign-up required.
      </p>
    ),
  },
  {
    question: 'Is TheFinCalculator completely free to use?',
    answer: (
      <p>
        Yes, all of our calculators and educational content are completely free to use. We support
        the site through non-intrusive advertising. There are no premium tiers, hidden fees, or
        locked features.
      </p>
    ),
  },
  {
    question: 'Is my financial data safe?',
    answer: (
      <p>
        Absolutely. All calculation data is stored locally on your device using your browser's local
        storage. Your financial information never leaves your computer and is never transmitted to
        our servers. You can clear your saved data at any time by clearing your browser's local storage.
      </p>
    ),
  },
  {
    question: 'Can I save my calculations?',
    answer: (
      <p>
        Yes! Each calculator includes a "Save Scenario" feature that stores your inputs locally on
        your device. You can save multiple scenarios, compare them side by side, and even export them
        as JSON files for backup. Your saved scenarios persist between visits as long as you don't
        clear your browser data.
      </p>
    ),
  },
  {
    question: 'Should I use these calculators to make financial decisions?',
    answer: (
      <p>
        Our calculators are designed for educational and informational purposes. They provide estimates
        based on mathematical formulas and the inputs you provide. For important financial decisions,
        we always recommend consulting with a qualified financial advisor who can consider your full
        financial picture, tax situation, and individual circumstances.
      </p>
    ),
  },
];

const calculatorFaq = [
  {
    question: 'How does the Investment Calculator work?',
    answer: (
      <div>
        <p className="mb-3">
          The <Link to="/investment" className="text-primary-600 hover:text-primary-700 underline">Investment Calculator</Link> uses
          the compound interest formula to project how your money grows over time. You enter your
          initial investment, monthly contributions, expected annual return rate, and time horizon.
        </p>
        <p>
          The calculator shows you the total future value, how much comes from your contributions
          versus interest earned, and a year-by-year breakdown chart. You can also adjust the
          compounding frequency (monthly, quarterly, or annually) to see how it affects your returns.
        </p>
      </div>
    ),
  },
  {
    question: 'How does the Loan Calculator work?',
    answer: (
      <div>
        <p className="mb-3">
          The <Link to="/loan" className="text-primary-600 hover:text-primary-700 underline">Loan Calculator</Link> computes
          your monthly payment, total interest paid, and total cost for any fixed-rate loan. Enter the
          loan amount, down payment, interest rate, and loan term to get instant results.
        </p>
        <p>
          It also generates a full amortization schedule showing exactly how each payment is split
          between principal and interest over the life of the loan. For mortgages, you can optionally
          include property tax, insurance, and PMI estimates.
        </p>
      </div>
    ),
  },
  {
    question: 'How does the Retirement Planner work?',
    answer: (
      <div>
        <p className="mb-3">
          The <Link to="/retirement" className="text-primary-600 hover:text-primary-700 underline">Retirement Planner</Link> projects
          your retirement savings through two phases: the accumulation phase (while you're saving)
          and the retirement phase (while you're withdrawing).
        </p>
        <p>
          Enter your current age, target retirement age, current savings, monthly contributions,
          expected return rate, and desired retirement income. The planner accounts for inflation and
          can include Social Security income. It shows whether your savings will last through
          retirement and tracks key milestones along the way.
        </p>
      </div>
    ),
  },
  {
    question: 'How does the Inflation Calculator work?',
    answer: (
      <div>
        <p className="mb-3">
          The <Link to="/inflation" className="text-primary-600 hover:text-primary-700 underline">Inflation Calculator</Link> shows
          how inflation erodes purchasing power over time. Enter an amount, a start year, an end year,
          and an inflation rate to see what that amount would be worth in future (or past) dollars.
        </p>
        <p>
          For example, you can see what $100 from 2000 would buy in 2025, or how much you'll need in
          2040 to have the same purchasing power as $50,000 today. The chart visualizes the growing
          gap between nominal value and real purchasing power.
        </p>
      </div>
    ),
  },
  {
    question: 'What does "compounding frequency" mean?',
    answer: (
      <p>
        Compounding frequency refers to how often interest is calculated and added to your balance.
        With monthly compounding, interest is calculated 12 times per year. With quarterly compounding,
        it's 4 times per year. With annual compounding, it's once per year. More frequent compounding
        results in slightly higher returns because you earn interest on previously earned interest sooner.
        Most savings accounts and investments use daily or monthly compounding.
      </p>
    ),
  },
];

const conceptFaq = [
  {
    question: 'What is compound interest?',
    answer: (
      <div>
        <p className="mb-3">
          Compound interest is interest calculated on both the initial principal and the accumulated
          interest from previous periods. Unlike simple interest (which is calculated only on the
          principal), compound interest causes your money to grow exponentially over time.
        </p>
        <p>
          For example, if you invest $1,000 at 10% annual interest, after year one you have $1,100.
          In year two, you earn 10% on $1,100 (not just the original $1,000), giving you $1,210. This
          "interest on interest" effect becomes increasingly powerful over longer time periods, which is
          why starting to invest early is so beneficial.
        </p>
        <p className="mt-3">
          <Link to="/learn/compound-interest" className="text-primary-600 hover:text-primary-700 underline">
            Read our full guide on compound interest →
          </Link>
        </p>
      </div>
    ),
  },
  {
    question: 'What is amortization?',
    answer: (
      <div>
        <p className="mb-3">
          Amortization is the process of spreading a loan into a series of fixed payments over time.
          Each payment covers both interest and principal. In the early years of a loan, most of your
          payment goes toward interest. Over time, as the balance decreases, more of each payment goes
          toward the principal.
        </p>
        <p>
          An amortization schedule shows exactly how much of each payment goes to interest versus
          principal, and the remaining balance after each payment. This is useful for understanding the
          true cost of a mortgage or car loan.
        </p>
        <p className="mt-3">
          <Link to="/learn/how-loan-amortization-works" className="text-primary-600 hover:text-primary-700 underline">
            Learn more about loan amortization →
          </Link>
        </p>
      </div>
    ),
  },
  {
    question: 'What is inflation and why does it matter?',
    answer: (
      <div>
        <p className="mb-3">
          Inflation is the rate at which the general level of prices for goods and services rises over
          time, reducing your purchasing power. When inflation is 3%, something that costs $100 today
          will cost about $103 next year.
        </p>
        <p>
          Inflation matters for financial planning because it means your money buys less over time. If
          your savings earn 2% but inflation is 3%, you're actually losing purchasing power. This is why
          it's important to invest in assets that outpace inflation, especially for long-term goals like
          retirement.
        </p>
        <p className="mt-3">
          <Link to="/learn/understanding-inflation" className="text-primary-600 hover:text-primary-700 underline">
            Read our guide on understanding inflation →
          </Link>
        </p>
      </div>
    ),
  },
  {
    question: 'What is the Rule of 72?',
    answer: (
      <div>
        <p className="mb-3">
          The Rule of 72 is a quick mental math shortcut to estimate how long it takes for an investment
          to double at a given annual return rate. Simply divide 72 by the annual interest rate. For
          example, at 8% annual return, your money doubles in approximately 72 ÷ 8 = 9 years.
        </p>
        <p>
          It also works in reverse: if you want your money to double in 6 years, you'd need a return
          of about 72 ÷ 6 = 12% per year. While it's an approximation, it's remarkably accurate for
          rates between 2% and 20%.
        </p>
        <p className="mt-3">
          <Link to="/learn/rule-of-72" className="text-primary-600 hover:text-primary-700 underline">
            Read our full explanation of the Rule of 72 →
          </Link>
        </p>
      </div>
    ),
  },
  {
    question: 'What is the difference between SIP and lump sum investing?',
    answer: (
      <div>
        <p className="mb-3">
          A Systematic Investment Plan (SIP) involves investing a fixed amount at regular intervals
          (e.g., monthly), while lump sum investing means putting a large amount of money into an
          investment all at once.
        </p>
        <p>
          SIP benefits from dollar-cost averaging — you buy more shares when prices are low and fewer
          when prices are high, which can reduce the impact of market volatility. Lump sum investing,
          on the other hand, gives your entire amount more time in the market, which historically tends
          to produce higher returns. The best approach depends on your financial situation and risk tolerance.
        </p>
        <p className="mt-3">
          <Link to="/learn/sip-vs-lump-sum" className="text-primary-600 hover:text-primary-700 underline">
            Read our SIP vs Lump Sum comparison →
          </Link>
        </p>
      </div>
    ),
  },
];

export function FaqPage() {
  usePageMeta({
    title: 'Frequently Asked Questions | TheFinCalculator',
    description: 'Find answers to common questions about our financial calculators, how to use them, and key financial concepts like compound interest, amortization, and inflation.',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our calculators and financial concepts.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">General</h2>
            <Accordion items={generalFaq} />
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Using Our Calculators</h2>
            <Accordion items={calculatorFaq} />
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Financial Concepts</h2>
            <Accordion items={conceptFaq} />
          </section>

          <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Explore our educational articles for in-depth explanations of financial topics.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Articles
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
