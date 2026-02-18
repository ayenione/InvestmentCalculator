import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../../hooks';
import { getArticleBySlug } from './articleData';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  usePageMeta({
    title: article ? `${article.title} | TheFinCalculator` : 'Article Not Found | TheFinCalculator',
    description: article?.description || '',
  });

  if (!article) {
    return <Navigate to="/learn" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
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
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-table:text-sm"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
            />

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

function markdownToHtml(markdown: string): string {
  return markdown
    .trim()
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\| *(.+) *\|$/gm, (match) => {
      const cells = match
        .split('|')
        .filter((c) => c.trim())
        .map((c) => c.trim());
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
      const rows = match.trim().split('\n');
      // Check if second row is a separator row
      if (rows.length > 1 && /^<tr>(<td>[-:]+<\/td>)+<\/tr>$/.test(rows[1])) {
        const header = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
        const body = rows.slice(2).join('\n');
        return `<table><thead>${header}</thead><tbody>${body}</tbody></table>`;
      }
      return `<table><tbody>${match}</tbody></table>`;
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/^(?!<[hultop])(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return match;
    })
    .replace(/(?:^|\n)(?!<[hultop])([^<\n].+?)(?=\n|$)/g, (match) => {
      const trimmed = match.trim();
      if (trimmed.startsWith('<') || trimmed === '') return match;
      return `<p>${trimmed}</p>`;
    })
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<(h[23]|ul|ol|table|li)/g, '<$1')
    .replace(/<\/(h[23]|ul|ol|table|li)>\s*<\/p>/g, '</$1>');
}
