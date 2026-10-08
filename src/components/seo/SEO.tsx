import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/siteConfig';

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
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : DEFAULT_TITLE;

  const canonicalUrl = canonical
    ? `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : undefined;

  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data / JSON-LD */}
      {schemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
