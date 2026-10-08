import type { ProductCategory } from '@/types';
import leatherDyesImg from '@/assets/images/products/close-up-engraving-art-tools.webp';

export const leatherDyesCategory: ProductCategory = {
  name: 'Leather Dyes',
  slug: 'leather-dyes',
  image: leatherDyesImg,
  description:
    'Specialized dyes for leather tanning and finishing. Deep penetration with uniform shade and excellent fastness.',
  subProducts: [
    { name: 'Leather Applicable Dyes', slug: 'leather-applicable-dyes' },
  ],
};
