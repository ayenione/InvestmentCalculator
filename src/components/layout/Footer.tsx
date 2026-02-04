import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">FinCalc</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Free financial calculators to help you make smarter decisions about
              investments, loans, retirement, and more.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-white font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/investment"
                  className="hover:text-white transition-colors"
                >
                  Investment Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/loan"
                  className="hover:text-white transition-colors"
                >
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/retirement"
                  className="hover:text-white transition-colors"
                >
                  Retirement Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/inflation"
                  className="hover:text-white transition-colors"
                >
                  Inflation Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  Financial Tips
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  Learning Center
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  FAQ
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} FinCalc. All calculations are for
            informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
