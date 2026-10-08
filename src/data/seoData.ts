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
      'Contact Ambica Industry for product inquiries, shade cards, custom orders, or sample requests. Visit our facility at Phase-I, G.I.D.C., Naroda, Ahmedabad, or speak with our technical team today.',
    keywords:
      'Contact Ambica Industry, Naroda GIDC dye factory address, dye manufacturer phone number, request dye samples, Ambica Industry email',
    canonical: '/contact',
  },
  enquiry: {
    title: 'Request a Quote & Product Samples | Ambica Industry',
    description:
      'Submit your detailed product requirements, target shades, specifications, and volume for custom quotation, technical data sheets (TDS), and sample dispatches from Ambica Industry.',
    keywords:
      'Request dye quote, bulk dye inquiry, chemical sample request, dye price quotation India, Ambica Industry enquiry',
    canonical: '/enquiry',
  },
  privacyPolicy: {
    title: 'Privacy Policy | Ambica Industry',
    description:
      'Read the official privacy policy of Ambica Industry regarding how we collect, protect, and handle client information, business communications, and website inquiries.',
    keywords: 'Privacy policy, data protection, Ambica Industry privacy',
    canonical: '/privacy-policy',
  },
  termsOfService: {
    title: 'Terms of Service | Ambica Industry',
    description:
      'Read the terms and conditions governing the use of the Ambica Industry website, product documentation, commercial terms, and customer engagements.',
    keywords: 'Terms of service, terms and conditions, Ambica Industry terms',
    canonical: '/termsof-service',
  },
};
