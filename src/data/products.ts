export interface SubProduct {
  name: string;
  slug: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
  subProducts: SubProduct[];
}

import directDyesImg from '../assets/images/products/different-bright-dry-colors-containers.jpg';
import acidDyesImg from '../assets/images/products/high-angle-pigmented-cloth-with-natural-colors.jpg';
import reactiveDyesImg from '../assets/images/products/stained-brush-with-paint.jpg';
import leatherDyesImg from '../assets/images/products/close-up-engraving-art-tools.jpg';
import woodDyesImg from '../assets/images/products/person-varnishing-wood-with-big-brush.jpg';
import foodDyesImg from '../assets/images/products/pilaf-is-cooked-pita-bread-shah-pilaf-azerbaijani-cuisine-top-view.jpg';

export const productCategories: ProductCategory[] = [
  {
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
      { name: 'Acid Orange Dyes', slug: 'acid-orange-dyes' },
      { name: 'Acid Green Dyes', slug: 'acid-green-dyes' },
    ],
  },
  {
    name: 'Direct Dyes',
    slug: 'direct-dyes',
    image: directDyesImg,
    description:
      'High-quality direct dyes for cotton, viscose, and cellulose fibers. Excellent color yield with good washing fastness.',
    subProducts: [
      { name: 'Sunfast & Non-Benzidine Direct Dyes', slug: 'sunfast-non-benzidine-direct-dyes' },
      { name: 'Non-Benzidine Direct Dyes', slug: 'non-benzidine-direct-dyes' },
    ],
  },
  {
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
  },
  {
    name: 'Leather Dyes',
    slug: 'leather-dyes',
    image: leatherDyesImg,
    description:
      'Specialized dyes for leather tanning and finishing. Deep penetration with uniform shade and excellent fastness.',
    subProducts: [
      { name: 'Leather Applicable Dyes', slug: 'leather-applicable-dyes' },
    ],
  },
  {
    name: 'Wood Dyes',
    slug: 'wood-dyes',
    image: woodDyesImg,
    description:
      'Wood stain dyes for furniture, flooring, and wood finishing applications. Rich, natural-looking colors.',
    subProducts: [
      { name: 'Wood Stain Dyes', slug: 'wood-stain-dyes' },
    ],
  },
  {
    name: 'Food & Lake Color',
    slug: 'food-lake-colors',
    image: foodDyesImg,
    description:
      'FDA-approved food colors and lake colors for food, pharmaceutical, and cosmetic industries.',
    subProducts: [
      { name: 'Food Colors', slug: 'food-colors' },
      { name: 'Lake Colors', slug: 'lake-colors' },
    ],
  }
];
