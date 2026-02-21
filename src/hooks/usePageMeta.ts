import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  url?: string;
}

const BASE_URL = 'https://thefincalculator.com';
const DEFAULT_TITLE = 'TheFinCalculator - Smart Financial Planning Tools';
const DEFAULT_DESCRIPTION =
  'Free financial calculators for investments, loans, mortgages, retirement planning, and inflation. Make smarter money decisions with real-time calculations and visual charts.';

function setMetaTag(selector: string, attribute: string, value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

export function usePageMeta({ title, description, url }: PageMeta) {
  useEffect(() => {
    const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    document.title = title;

    // Standard meta
    setMetaTag('meta[name="description"]', 'content', description);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', fullUrl);

    // Twitter Card
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('meta[name="description"]', 'content', DEFAULT_DESCRIPTION);
      setMetaTag('meta[property="og:title"]', 'content', DEFAULT_TITLE);
      setMetaTag('meta[property="og:description"]', 'content', DEFAULT_DESCRIPTION);
      setMetaTag('meta[property="og:url"]', 'content', BASE_URL);
      setMetaTag('meta[name="twitter:title"]', 'content', DEFAULT_TITLE);
      setMetaTag('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION);
      if (canonical) {
        canonical.setAttribute('href', BASE_URL);
      }
    };
  }, [title, description, url]);
}
