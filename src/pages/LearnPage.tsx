import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks';
import { Card } from '../components/common';
import { articles } from './articles/articleData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Investing: { bg: 'bg-primary-100', text: 'text-primary-700' },
  Economics: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Retirement: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Loans: { bg: 'bg-rose-100', text: 'text-rose-700' },
  Saving: { bg: 'bg-blue-100', text: 'text-blue-700' },
};

export function LearnPage() {
  usePageMeta({
    title: 'Learn - Financial Education Articles | TheFinCalculator',
    description: 'Free financial education articles covering compound interest, investing, retirement planning, loans, inflation, and more.',
    url: '/learn',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-primary-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Financial Education
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
              Build your financial knowledge with our collection of easy-to-understand guides
              and articles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article) => {
              const colors = categoryColors[article.category] || categoryColors.Investing;
              return (
                <motion.div key={article.slug} variants={itemVariants}>
                  <Link to={`/learn/${article.slug}`}>
                    <Card className="h-full group cursor-pointer" variant="gradient">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400">{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
                          {article.description}
                        </p>
                        <div className="flex items-center text-primary-600 text-sm font-medium">
                          Read article
                          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
