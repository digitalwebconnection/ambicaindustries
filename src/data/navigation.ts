import { productCategories } from './products';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: productCategories.map((cat) => ({
      label: cat.name,
      href: `/products/${cat.slug}`,
      children: cat.subProducts.map((sub) => ({
        label: sub.name,
        href: `/products/${cat.slug}/${sub.slug}`,
      })),
    })),
  },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Enquiry', href: '/enquiry' },
];

export const quickNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Industry', href: '/industry' },
  { label: 'R&D', href: '/rnd' },
  { label: 'Why Us', href: '/why-choose-us' },
  { label: 'Contact Us', href: '/contact' },
  // { label: 'Get a Free Sample', href: '/#quote' },
];
