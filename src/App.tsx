import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/layout';
import {
  HomePage,
  InvestmentPage,
  LoanPage,
  RetirementPage,
  InflationPage,
  PrivacyPage,
  TermsPage,
  FaqPage,
  LearnPage,
  ArticlePage,
} from './pages';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/loan" element={<LoanPage />} />
            <Route path="/retirement" element={<RetirementPage />} />
            <Route path="/inflation" element={<InflationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:slug" element={<ArticlePage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
