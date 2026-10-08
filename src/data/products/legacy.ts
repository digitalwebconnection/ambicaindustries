import type { LegacyProductCategory } from '@/types';

// Legacy redirect map for discontinued or reorganised product categories and sub-products
export const legacyProductRedirects: Record<string, string> = {
  'food-lake-colors': '/products',
  'food-colors': '/products',
  'lake-colors': '/products',
};

// Deprecated/legacy category metadata kept to support inbound links and search indexers
export const legacyProductCategories: LegacyProductCategory[] = [
  {
    name: 'Food & Lake Color',
    slug: 'food-lake-colors',
    redirectTo: '/products',
    description:
      'FDA-approved food colors and lake colors for food, pharmaceutical, and cosmetic industries.',
    subProducts: [
      { name: 'Food Colors', slug: 'food-colors' },
      { name: 'Lake Colors', slug: 'lake-colors' },
    ],
  },
];

/**
 * Checks if a given slug is a known discontinued/legacy category or sub-product.
 */
export const isLegacyProductSlug = (slug?: string): boolean => {
  if (!slug) return false;
  return Boolean(legacyProductRedirects[slug]);
};

/**
 * Resolves the redirect destination URL for legacy/deprecated category and sub-product routes.
 */
export const getLegacyProductRedirect = (category?: string, subSlug?: string): string | null => {
  if (subSlug && legacyProductRedirects[subSlug]) {
    return legacyProductRedirects[subSlug];
  }
  if (category && legacyProductRedirects[category]) {
    return legacyProductRedirects[category];
  }
  return null;
};
