export interface Industry {
  name: string;
  description: string;
  image: string;
}

const IMG = 'https://www.shreeumiyaint.com/images';

export const industries: Industry[] = [
  {
    name: 'Apparel & Fashion',
    description:
      'Our premium dyes deliver vibrant, wash-fast colors for clothing, knitwear, and high-end fashion garments.',
    image: `${IMG}/industries-img-1.webp`,
  },
  {
    name: 'Home Textiles',
    description:
      'Specialized colorants for bedding, towels, curtains, and upholstery, ensuring long-lasting vibrancy and durability.',
    image: `${IMG}/industries-img-2.webp`,
  },
  {
    name: 'Technical Textiles',
    description:
      'High-performance dyes engineered for automotive fabrics, medical textiles, and industrial applications.',
    image: `${IMG}/industries-img-3.webp`,
  },
  {
    name: 'Paper Packaging',
    description:
      'Eco-friendly dyes for corrugated boxes, paper bags, and kraft paper, enhancing brand presentation.',
    image: `${IMG}/industries-img-4.webp`,
  },
  {
    name: 'Printing Paper',
    description:
      'High-affinity dyes for fine paper, bond paper, and specialty writing paper with exceptional color evenness.',
    image: `${IMG}/industries-img-5.webp`,
  },
  {
    name: 'Tissue & Towel',
    description:
      'Safe, vibrant, and bleed-resistant dyes specifically formulated for the tissue and hygiene paper industry.',
    image: `${IMG}/industries-img-6.webp`,
  },
  {
    name: 'Non-Woven Fabrics',
    description:
      'Advanced color solutions for synthetic and natural non-woven materials used in medical and consumer goods.',
    image: `${IMG}/industries-img-7.webp`,
  },
  {
    name: 'Specialty Paper',
    description:
      'Custom color matching for decorative paper, laminate paper, and wallpaper manufacturing.',
    image: `${IMG}/industries-img-8.webp`,
  },
];
