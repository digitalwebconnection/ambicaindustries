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
  hidden?: boolean;
}

export interface LegacyProductCategory {
  name: string;
  slug: string;
  redirectTo: string;
  description?: string;
  subProducts?: SubProduct[];
}
