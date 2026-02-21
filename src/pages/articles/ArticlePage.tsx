import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../../hooks';
import { JsonLd } from '../../components/common';
import { getArticleBySlug } from './articleData';

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `https://thefincalculator.com/learn/${article.slug}`,
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link to="/learn" className="text-primary-600 hover:text-primary-700">
              Learn
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{article.title}</span>
          </nav>

          <article className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600">{article.description}</p>
            </div>

            {/* Article Content */}
            <div className="article-content">
              {renderMarkdown(article.content)}
            </div>

            {/* Related Calculator CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Try it yourself</h3>
                  <p className="text-gray-600 text-sm">
                    Use our {article.relatedCalculator} to apply what you've learned.
                  </p>
                </div>
                <Link
                  to={article.relatedCalculatorPath}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
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

function renderMarkdown(markdown: string): React.ReactNode[] {
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

    // H2
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-gray-900 mt-10 mb-4">
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
      // Skip separator row (index 1)
      const bodyRows = tableLines.slice(2).map(parseRow);

      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg">
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

    // Paragraph — collect consecutive non-empty, non-special lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('- ') &&
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
