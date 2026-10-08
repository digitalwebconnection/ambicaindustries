import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import ProductsHero from './sections/ProductsHero';
import ProductsList from './sections/ProductsList';
import Faqs from '@/components/shared/Faqs';
import { productsFaqs } from '@/data/faq';

export default function Products() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={seoConfig.products.title}
        description={seoConfig.products.description}
        keywords={seoConfig.products.keywords}
        canonical={seoConfig.products.canonical}
        schema={createBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
        ])}
      />
      {/* Hero Section */}
      <ProductsHero />

      {/* Product Categories Catalog */}
      <ProductsList />

      {/* FAQs Section */}
      <Faqs faqs={productsFaqs} />
    </div>
  );
}
