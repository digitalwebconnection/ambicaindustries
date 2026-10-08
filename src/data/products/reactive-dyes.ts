import type { ProductCategory } from '@/types';
import reactiveDyesImg from '@/assets/images/products/stained-brush-with-paint.webp';

export const reactiveDyesCategory: ProductCategory = {
  name: 'Reactive Dyes',
  slug: 'reactive-dyes',
  image: reactiveDyesImg,
  description:
    'Superior reactive dyes for cotton and cellulosic fibers. Brilliant shades with outstanding wash and light fastness.',
  subProducts: [
    { name: 'Reactive Cold Dyes', slug: 'reactive-cold-dyes' },
    { name: 'Reactive HE Dyes', slug: 'reactive-he-dyes' },
    { name: 'Reactive Hot Dyes', slug: 'reactive-hot-dyes' },
    { name: 'Reactive ME Dyes', slug: 'reactive-me-dyes' },
    { name: 'Reactive Vinyl Sulphone Base Dyes', slug: 'reactive-vinyl-sulphone-base-dyes' },
  ],
};
