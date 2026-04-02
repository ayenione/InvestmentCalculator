import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks';

export function ContactPage() {
  usePageMeta({
    title: 'Contact Us | TheFinCalculator',
    description: 'Get in touch with TheFinCalculator. Send us feedback, report a bug, or ask a question about our free financial calculators.',
    url: '/contact',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-10">
            Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Email</h2>
                <p className="text-gray-600 mb-1">The fastest way to reach us:</p>
                <a
                  href="mailto:hello@thefincalculator.com"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  hello@thefincalculator.com
                </a>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">What We Can Help With</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    Bug reports or calculation errors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    Feature requests or calculator suggestions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    Questions about how our tools work
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    General feedback or content suggestions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    Partnership or advertising inquiries
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h2>
                <p className="text-gray-600">
                  We aim to respond to all inquiries within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Note panel */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Before You Write</h2>
              <p className="text-gray-600 text-sm">
                You may find a quick answer in our resources:
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/faq" className="text-primary-600 hover:text-primary-700 font-medium">
                    FAQ
                  </a>
                  <span className="text-gray-600"> — answers to common questions about our calculators</span>
                </li>
                <li>
                  <a href="/learn" className="text-primary-600 hover:text-primary-700 font-medium">
                    Learn
                  </a>
                  <span className="text-gray-600"> — in-depth articles on personal finance topics</span>
                </li>
                <li>
                  <a href="/about" className="text-primary-600 hover:text-primary-700 font-medium">
                    About
                  </a>
                  <span className="text-gray-600"> — information about TheFinCalculator and our mission</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-xs">
                  Please note: TheFinCalculator provides financial education tools only. We are not
                  licensed financial advisors and cannot provide personalized financial advice.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
