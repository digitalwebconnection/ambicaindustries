import { siteConfig } from '@/data/siteConfig';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.ambicaindustry.com/#organization',
  name: siteConfig.name,
  legalName: 'Ambica Industry',
  url: 'https://www.ambicaindustry.com/',
  logo: 'https://www.ambicaindustry.com/logo.png',
  image: 'https://www.ambicaindustry.com/about-us.webp',
  description: siteConfig.description,
  foundingDate: '1986',
  telephone: siteConfig.phone.landline,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'L-331/6, B/h Lions School, Phase-I, G.I.D.C., Naroda',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382330',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0805,
    longitude: 72.6713,
  },
  sameAs: [
    'https://www.linkedin.com/company/ambica-industry',
    'https://digitalwebconnection.com/',
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.ambicaindustry.com/#website',
  url: 'https://www.ambicaindustry.com/',
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    '@id': 'https://www.ambicaindustry.com/#organization',
  },
  inLanguage: 'en-US',
};

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://www.ambicaindustry.com${item.url}`,
    })),
  };
}

export function createProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  slug?: string;
  category?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image
      ? (product.image.startsWith('http') ? product.image : `https://www.ambicaindustry.com${product.image}`)
      : 'https://www.ambicaindustry.com/logo.png',
    url: product.url
      ? (product.url.startsWith('http') ? product.url : `https://www.ambicaindustry.com${product.url}`)
      : (product.slug ? `https://www.ambicaindustry.com/products/${product.slug}` : undefined),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    manufacturer: {
      '@id': 'https://www.ambicaindustry.com/#organization',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}
