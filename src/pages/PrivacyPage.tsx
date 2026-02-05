import { motion } from 'framer-motion';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600">
                TheFinCalculator ("we", "our", or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information
                when you visit our website thefincalculator.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information in the following ways:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Local Storage Data:</strong> When you save calculation scenarios,
                  this data is stored locally on your device using browser local storage.
                  This data never leaves your device.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect anonymous usage statistics
                  through analytics services to improve our calculators.
                </li>
                <li>
                  <strong>Cookies:</strong> We and our advertising partners may use cookies
                  to personalize ads and analyze traffic.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Advertising</h2>
              <p className="text-gray-600 mb-4">
                We use Google AdSense to display advertisements on our website. Google may use
                cookies to serve ads based on your prior visits to our website or other websites.
                You can opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Google Ads Settings
                </a>.
              </p>
              <p className="text-gray-600">
                For more information about how Google uses data, please visit{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  How Google uses data when you use our partners' sites or apps
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and maintain our financial calculators</li>
                <li>To improve user experience based on usage patterns</li>
                <li>To display relevant advertisements</li>
                <li>To analyze website traffic and usage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600">
                Your calculation data is stored locally on your device and is not transmitted
                to our servers. We do not collect or store any personal financial information
                you enter into our calculators.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Clear your browser's local storage to delete all saved scenarios</li>
                <li>Opt out of personalized advertising</li>
                <li>Disable cookies in your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600">
                Our website is not intended for children under 13 years of age. We do not
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new Privacy Policy on this page and updating the
                "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us
                through our website.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
