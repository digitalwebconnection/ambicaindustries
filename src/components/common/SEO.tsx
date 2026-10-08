import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../data/siteConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Ambica Industry | Industrial Dyes & Pigments Manufacturer India';
const DEFAULT_DESCRIPTION =
  'Ambica Industry is a premier manufacturer, supplier & exporter of high-grade Acid Dyes, Direct Dyes, Reactive Dyes, Leather Dyes, and Wood Stains based in Ahmedabad, Gujarat, India. Serving global industries since 1986.';
const DEFAULT_KEYWORDS =
  'Acid Dyes manufacturer, Direct Dyes India, Reactive Dyes supplier, Leather Dyes Ahmedabad, Wood Stain Dyes, textile dyes manufacturer, paper dyes exporter India, industrial color chemistry, Ambica Industry';
const SITE_URL = 'https://www.ambicaindustry.com';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = '/logo.png',
  ogType = 'website',
  schema,
  noindex = false,
}: SEOProps) {
  const pageTitle = title
    ? title.includes('Ambica Industry')
      ? title
      : `${title} | Ambica Industry`
    : DEFAULT_TITLE;

  const fullCanonical = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : SITE_URL;

  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteConfig.name} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
