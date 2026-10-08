import { siteConfig } from '../data/siteConfig';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.ambicaindustry.com/#organization',
  name: siteConfig.name,
  legalName: 'Ambica Industry',
  url: 'https://www.ambicaindustry.com/',
  logo: 'https://www.ambicaindustry.com/logo.png',
  image: 'https://www.ambicaindustry.com/about-us.jpg',
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
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
    siteConfig.social.instagram,
  ],
  priceRange: '$$',
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
};

export const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `https://www.ambicaindustry.com${item.url}`,
  })),
});

export const createProductSchema = (product: {
  name: string;
  description: string;
  category: string;
  url: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  category: product.category,
  image: product.image?.startsWith('http')
    ? product.image
    : product.image
    ? `https://www.ambicaindustry.com${product.image}`
    : 'https://www.ambicaindustry.com/logo.png',
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  },
});
