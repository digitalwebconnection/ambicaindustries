export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType?: 'website' | 'article' | 'product';
}

export const seoConfig: Record<string, PageSEOConfig> = {
  home: {
    title: 'Ambica Industry | Paper & Textile Dyes Manufacturers, Exporter & Suppliers in India',
    description:
      'Ambica Industry is an ISO-certified manufacturer, supplier & exporter of high-purity Acid Dyes, Direct Dyes, Reactive Dyes, Leather Dyes, and Wood Stains based in Ahmedabad, Gujarat, India. Serving textile mills, paper manufacturers & leather tanneries globally since 1986.',
    keywords:
      'Paper and Textile Dyes Manufacturers in India, Acid Dyes manufacturer in Ahmedabad, Direct Dyes exporter, Reactive Dyes supplier Gujarat, Leather Dyes, Wood Stain Dyes, dye manufacturers in Naroda GIDC, Ambica Industry',
    canonical: '/',
  },
  about: {
    title: 'About Us | 38+ Years of Industrial Color Chemistry - Ambica Industry',
    description:
      'Founded in 1986, Ambica Industry has grown into a globally trusted manufacturer and exporter of synthetic industrial dyes. Learn about our state-of-the-art Naroda plant, quality standards, and visionary leadership.',
    keywords:
      'About Ambica Industry, chemical dye manufacturer history, Shailesh Shah, Samir Shah, dyes exporter Ahmedabad, ISO certified dye manufacturer Gujarat',
    canonical: '/about',
  },
  products: {
    title: 'Our Products | High-Performance Industrial Dyes & Colorants - Ambica Industry',
    description:
      'Browse Ambica Industry’s comprehensive range of industrial dyes: Acid Dyes, Direct Dyes, Reactive Dyes, Leather Dyes, and Wood Dyes engineered for brilliant color yield, high wash-fastness, and thermal stability.',
    keywords:
      'Industrial dyes portfolio, buy Acid Dyes, Direct Dyes bulk supply, Reactive Dyes textile, Leather Dyes tanning, Wood stain colors, Ambica Industry products',
    canonical: '/products',
  },
  industry: {
    title: 'Industries Served | Textile, Paper, Leather & Wood Solutions - Ambica Industry',
    description:
      'Delivering custom color solutions and technical dye formulations across global industries: Textile processing, Paper & Pulp, Leather tanning, Inks, and Wood finishes.',
    keywords:
      'Textile dyeing solutions, paper coloration dyes, leather tannery dyes, industrial wood coating dyes, commercial dye supply, Ambica Industry industries',
    canonical: '/industry',
  },
  whyUs: {
    title: 'Why Choose Us | Consistent Quality, Custom Formulation & Rapid Delivery - Ambica Industry',
    description:
      'Discover the Ambica Industry advantage: 38+ years manufacturing legacy, strict batch-to-batch shade consistency, custom spectral matching, in-house lab testing, and global export reach across 20+ countries.',
    keywords:
      'Why choose Ambica Industry, trusted dye supplier India, batch-to-batch consistency dyes, custom color matching laboratory, reliable chemical manufacturer',
    canonical: '/why-choose-us',
  },
  rnd: {
    title: 'Research & Development | Advanced Color Science & Testing Lab - Ambica Industry',
    description:
      'Explore our modern R&D and analytical laboratory equipped with computerized spectrophotometers, fastness testing, and sustainable synthesis to ensure zero-defect dye batches.',
    keywords:
      'Dye R&D laboratory, spectrophotometer color matching, dye fastness testing lab, sustainable chemistry, custom formulation Ambica Industry',
    canonical: '/r&d',
  },
  contact: {
    title: 'Contact Us | Get in Touch with Our Technical Dye Experts - Ambica Industry',
    description:
      'Contact Ambica Industry for industrial dye inquiries, technical datasheets (TDS), safety datasheets (MSDS), free lab samples, and custom shade development.',
    keywords:
      'Contact Ambica Industry, chemical dye inquiry, buy dyes Naroda Ahmedabad, dye quotation, chemical exporters India contact',
    canonical: '/contact',
  },
  enquiry: {
    title: 'Request a Quote & Technical Enquiry - Ambica Industry',
    description:
      'Submit your technical specifications, required dye series, target quantities, and delivery location. Our chemical engineers will provide custom formulations and quotations within 24 hours.',
    keywords:
      'Dye enquiry form, request a quote dyes, bulk dye supply inquiry, Ambica Industry quotation',
    canonical: '/enquiry',
  },
  privacyPolicy: {
    title: 'Privacy Policy - Ambica Industry',
    description:
      'Learn how Ambica Industry collects, protects, and handles your personal data, customer inquiries, and browsing privacy.',
    keywords: 'Privacy policy Ambica Industry, data protection, privacy terms',
    canonical: '/privacy-policy',
  },
  termsOfService: {
    title: 'Terms of Service - Ambica Industry',
    description:
      'Review the commercial terms, product warranty disclaimers, Intellectual Property rights, and governing law for using the Ambica Industry platform.',
    keywords: 'Terms of service Ambica Industry, commercial terms, legal notice',
    canonical: '/termsof-service',
  },
  notFound: {
    title: 'Page Not Found (404) - Ambica Industry',
    description: 'The requested page could not be found. Please navigate back to Ambica Industry homepage or browse our industrial dye catalog.',
    keywords: '404 not found, page missing',
    canonical: '/404',
  },
  blogs: {
    title: 'Industry Insights & Technical Blog | Ambica Industry',
    description:
      'Stay updated with expert chemical insights, formulation guides, application techniques, and sustainable dyeing practices from Ambica Industry’s color chemistry specialists.',
    keywords:
      'dyes technical blog, textile dyeing guides, reactive dye fixation, leather acid dyes, direct dyes troubleshooting, color chemistry insights, Ambica Industry blog',
    canonical: '/blogs',
  },
};
