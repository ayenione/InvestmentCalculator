import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks';

export function AboutPage() {
  usePageMeta({
    title: 'About TheFinCalculator | Free Financial Planning Tools',
    description: 'Learn about TheFinCalculator — free, browser-based financial calculators for investments, loans, retirement, and inflation. No sign-up required.',
    url: '/about',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About TheFinCalculator</h1>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Do</h2>
              <p className="text-gray-600">
                TheFinCalculator is a free, browser-based suite of financial planning tools designed
                to help everyday people make smarter decisions about their money. Our calculators
                cover investments, loans, retirement planning, and inflation — all without requiring
                an account, sign-up, or any personal information.
              </p>
              <p className="text-gray-600 mt-4">
                Every calculation runs entirely in your browser. Your financial data never leaves
                your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Tools</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/investment" className="text-primary-600 hover:text-primary-700 font-medium">
                    Investment Calculator
                  </Link>
                  <span className="text-gray-600"> — Project how your investments grow with compound interest over time.</span>
                </li>
                <li>
                  <Link to="/loan" className="text-primary-600 hover:text-primary-700 font-medium">
                    Loan Calculator
                  </Link>
                  <span className="text-gray-600"> — Calculate monthly payments and view full amortization schedules.</span>
                </li>
                <li>
                  <Link to="/retirement" className="text-primary-600 hover:text-primary-700 font-medium">
                    Retirement Planner
                  </Link>
                  <span className="text-gray-600"> — Model your retirement savings across accumulation and withdrawal phases.</span>
                </li>
                <li>
                  <Link to="/inflation" className="text-primary-600 hover:text-primary-700 font-medium">
                    Inflation Calculator
                  </Link>
                  <span className="text-gray-600"> — See how inflation erodes purchasing power over any time period.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                Financial planning tools shouldn't be locked behind paywalls or require you to hand
                over your personal data. We built TheFinCalculator to give everyone access to
                clear, accurate, and easy-to-use financial calculators — completely free.
              </p>
              <p className="text-gray-600 mt-4">
                Alongside the calculators, our{' '}
                <Link to="/learn" className="text-primary-600 hover:text-primary-700 underline">
                  Learn section
                </Link>{' '}
                provides plain-English articles on personal finance topics like compound interest,
                retirement planning, loan amortization, and more.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-600">
                TheFinCalculator is for informational and educational purposes only. Our tools
                provide estimates based on the inputs you supply and standard financial formulas.
                They are not a substitute for professional financial advice. For important financial
                decisions, please consult a qualified financial advisor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-600">
                Have a question, feedback, or found a bug? We'd love to hear from you.
              </p>
              <p className="text-gray-600 mt-2">
                Email us at:{' '}
                <a
                  href="mailto:hello@thefincalculator.com"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  hello@thefincalculator.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
