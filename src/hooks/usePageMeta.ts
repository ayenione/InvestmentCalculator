import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

const DEFAULT_TITLE = 'TheFinCalculator - Smart Financial Planning Tools';
const DEFAULT_DESCRIPTION =
  'Free financial calculators for investments, loans, mortgages, retirement planning, and inflation. Make smarter money decisions with real-time calculations and visual charts.';

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDescription) {
        metaDescription.setAttribute('content', DEFAULT_DESCRIPTION);
      }
    };
  }, [title, description]);
}
