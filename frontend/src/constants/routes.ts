/**
 * Centralized Route Map for Ambica Industries Web Portal
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_CATEGORY: (category: string) => `/products/${category}`,
  PRODUCT_DETAIL: (category: string, slug: string) => `/products/${category}/${slug}`,
  INDUSTRY: '/industry',
  WHY_US: '/why-choose-us',
  RND: '/r&d',
  CONTACT: '/contact',
  ENQUIRY: '/enquiry',
  BLOGS: '/blogs',
  BLOG_DETAIL: (slug: string) => `/blogs/${slug}`,
  ADMIN: {
    ROOT: '/admin',
    LOGIN: '/admin/login',
    DASHBOARD: '/admin',
  },
  LEGAL: {
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_OF_SERVICE: '/termsof-service',
  },
} as const;

export default ROUTES;
