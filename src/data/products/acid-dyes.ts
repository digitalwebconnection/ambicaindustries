import type { ProductCategory } from '@/types';
import acidDyesImg from '@/assets/images/products/high-angle-pigmented-cloth-with-natural-colors.webp';

export const acidDyesCategory: ProductCategory = {
  name: 'Acid Dyes',
  slug: 'acid-dyes',
  image: acidDyesImg,
  description:
    'Premium acid dyes for wool, silk, nylon and other protein fibers. Available in a wide spectrum of vibrant colors with excellent fastness properties.',
  subProducts: [
    { name: 'Acid Black Dyes', slug: 'acid-black-dyes' },
    { name: 'Acid Violet Dyes', slug: 'acid-violet-dyes' },
    { name: 'Acid Blue Dyes', slug: 'acid-blue-dyes' },
    { name: 'Acid Brown Dyes', slug: 'acid-brown-dyes' },
    { name: 'Acid Red Dyes', slug: 'acid-red-dyes' },
    { name: 'Acid Yellow Dyes', slug: 'acid-yellow-dyes' },
  ],
};
