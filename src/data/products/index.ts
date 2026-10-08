import type { ProductCategory } from '@/types';
import { acidDyesCategory } from './acid-dyes';
import { directDyesCategory } from './direct-dyes';
import { reactiveDyesCategory } from './reactive-dyes';
import { leatherDyesCategory } from './leather-dyes';
import { woodDyesCategory } from './wood-dyes';

export * from '@/types/product';
export * from './legacy';
export { acidDyesCategory } from './acid-dyes';
export { directDyesCategory } from './direct-dyes';
export { reactiveDyesCategory } from './reactive-dyes';
export { leatherDyesCategory } from './leather-dyes';
export { woodDyesCategory } from './wood-dyes';

export const productCategories: ProductCategory[] = [
  acidDyesCategory,
  directDyesCategory,
  reactiveDyesCategory,
  leatherDyesCategory,
  woodDyesCategory,
];
