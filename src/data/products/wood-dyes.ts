import type { ProductCategory } from '@/types';
import woodDyesImg from '@/assets/images/products/person-varnishing-wood-with-big-brush.webp';

export const woodDyesCategory: ProductCategory = {
  name: 'Wood Dyes',
  slug: 'wood-dyes',
  image: woodDyesImg,
  description:
    'Wood stain dyes for furniture, flooring, and wood finishing applications. Rich, natural-looking colors.',
  subProducts: [
    { name: 'Wood Stain Dyes', slug: 'wood-stain-dyes' },
  ],
};
