import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../../hooks';
import { JsonLd } from '../../components/common';
import { getArticleBySlug } from './articleData';

const categoryConfig: Record<string, { gradient: string; iconBg: string; accent: string; icon: React.ReactNode }> = {
  Investing: {
    gradient: 'from-primary-600 via-primary-700 to-purple-700',
    iconBg: 'bg-white/10',
    accent: 'border-primary-500',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  Economics: {
    gradient: 'from-amber-500 via-orange-500 to-orange-600',
    iconBg: 'bg-white/10',
    accent: 'border-amber-500',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  Retirement: {
    gradient: 'from-emerald-500 via-teal-500 to-teal-600',
    iconBg: 'bg-white/10',
    accent: 'border-emerald-500',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  Loans: {
    gradient: 'from-rose-500 via-pink-500 to-pink-600',
    iconBg: 'bg-white/10',
    accent: 'border-rose-500',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  Saving: {
    gradient: 'from-blue-500 via-blue-600 to-cyan-600',
    iconBg: 'bg-white/10',
    accent: 'border-blue-500',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
};

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  usePageMeta({
    title: article ? `${article.title} | TheFinCalculator` : 'Article Not Found | TheFinCalculator',
    description: article?.description || '',
    url: article ? `/learn/${article.slug}` : '/learn',
  });

  if (!article) {
    return <Navigate to="/learn" replace />;
  }

  const config = categoryConfig[article.category] ?? categoryConfig.Investing;

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.datePublished,
        dateModified: article.datePublished,
        url: `https://thefincalculator.com/learn/${article.slug}`,
        author: {
          '@type': 'Organization',
          name: 'TheFinCalculator',
          url: 'https://thefincalculator.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TheFinCalculator',
          url: 'https://thefincalculator.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://thefincalculator.com/learn/${article.slug}`,
        },
      }} />

      {/* Colorful Hero Banner */}
      <div className={`bg-gradient-to-br ${config.gradient} text-white relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white opacity-5" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white opacity-5" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white opacity-5" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-white/70">
            <Link to="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/90">{article.category}</span>
          </nav>

          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-white/70">{article.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mb-6">{article.description}</p>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>By <strong className="text-white font-semibold">TheFinCalculator Team</strong></span>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(article.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Large category icon */}
            <div className={`hidden md:flex flex-shrink-0 w-24 h-24 ${config.iconBg} rounded-2xl items-center justify-center text-white/30 p-5`}>
              {config.icon}
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <article className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* Article Content */}
            <div className="article-content">
              {renderMarkdown(article.content, config.accent)}
            </div>

            {/* Related Calculator CTA */}
            <div className={`mt-12 p-6 bg-gradient-to-r ${config.gradient} rounded-xl`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">Try it yourself</h3>
                  <p className="text-white/80 text-sm">
                    Use our {article.relatedCalculator} to apply what you've learned.
                  </p>
                </div>
                <Link
                  to={article.relatedCalculatorPath}
                  className="inline-flex items-center px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-200 whitespace-nowrap border border-white/30"
                >
                  Open {article.relatedCalculator}
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          {/* Back to Articles */}
          <div className="mt-8 text-center">
            <Link
              to="/learn"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="text-gray-900 font-semibold">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function renderMarkdown(markdown: string, accentClass: string): React.ReactNode[] {
  const lines = markdown.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === '') {
      i++;
      continue;
    }

    // H2 — with colored left border accent
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className={`text-xl font-bold text-gray-900 mt-10 mb-4 pl-4 border-l-4 ${accentClass}`}>
          {trimmedLine.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-gray-900 mt-8 mb-3">
          {trimmedLine.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote — rendered as a colorful callout box
    if (trimmedLine.startsWith('> ')) {
      const calloutLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        calloutLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <div key={key++} className="my-6 flex gap-4 p-5 bg-primary-50 border border-primary-100 rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-primary-900 font-medium leading-relaxed">
            {renderInlineFormatting(calloutLines.join(' '))}
          </p>
        </div>
      );
      continue;
    }

    // Table
    if (trimmedLine.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      const parseRow = (row: string) =>
        row.split('|').filter((c) => c.trim()).map((c) => c.trim());

      const headerCells = parseRow(tableLines[0]);
      const bodyRows = tableLines.slice(2).map(parseRow);

      elements.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">
                    {renderInlineFormatting(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-600 border-b border-gray-100">
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (trimmedLine.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 ml-6 space-y-2 list-disc">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-600 leading-relaxed pl-1">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(trimmedLine)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-4 ml-6 space-y-2 list-decimal">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-600 leading-relaxed pl-1">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('> ') &&
      !lines[i].trim().startsWith('|') &&
      !/^\d+\. /.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={key++} className="text-gray-600 leading-relaxed mb-4">
          {renderInlineFormatting(paragraphLines.join(' '))}
        </p>
      );
    }
  }

  return elements;
}
