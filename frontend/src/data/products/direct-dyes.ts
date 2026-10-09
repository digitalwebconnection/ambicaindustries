import type { ProductCategory } from '@/types';
import directDyesImg from '@/assets/images/products/different-bright-dry-colors-containers.webp';

export const directDyesCategory: ProductCategory = {
  name: 'Direct Dyes',
  slug: 'direct-dyes',
  image: directDyesImg,
  description:
    'High-quality direct dyes for cotton, viscose, and cellulose fibers. Excellent color yield with good washing fastness.',
  subProducts: [
    { name: 'Sunfast & Non-Benzidine Direct Dyes', slug: 'sunfast-non-benzidine-direct-dyes' },
    { name: 'Non-Benzidine Direct Dyes', slug: 'non-benzidine-direct-dyes' },
  ],
};
