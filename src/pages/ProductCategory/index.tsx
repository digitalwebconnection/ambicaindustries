import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/common/SEO';
import { productCategories, getLegacyProductRedirect } from '../../data/products';
import { createBreadcrumbSchema, createProductSchema } from '../../utils/seoSchemas';
import CategoryHero from './sections/CategoryHero';
import CategoryOverview from './sections/CategoryOverview';
import CategorySubProducts from './sections/CategorySubProducts';
import SubProductHero from './sections/SubProductHero';
import SubProductContent from './sections/SubProductContent';

export default function ProductCategory() {
  const { category, slug } = useParams<{ category: string; slug?: string }>();

  // Check for legacy/deprecated category or sub-product deep links (e.g., food-lake-colors)
  const legacyRedirect = getLegacyProductRedirect(category, slug);
  if (legacyRedirect) {
    return <Navigate to={legacyRedirect} replace />;
  }

  const cat = productCategories.find((c) => c.slug === category);

  if (!cat) {
    return (
      <>
        <SEO title="Product Not Found | Ambica Industry" noindex={true} />
        <Breadcrumb
          title="Product Not Found"
          items={[{ label: 'Products', href: '/products' }, { label: 'Not Found' }]}
        />
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Product category not found</h2>
          <Link to="/products" className="gradient-btn inline-block">
            View All Products
          </Link>
        </section>
      </>
    );
  }

  // If slug is provided, show sub-product page
  const subProduct = slug ? cat.subProducts.find((s) => s.slug === slug) : null;

  if (slug && !subProduct) {
    return (
      <>
        <SEO title="Sub-Product Not Found | Ambica Industry" noindex={true} />
        <Breadcrumb
          title="Product Not Found"
          items={[
            { label: 'Products', href: '/products' },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: 'Not Found' },
          ]}
        />
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Sub-product not found</h2>
          <Link to={`/products/${cat.slug}`} className="gradient-btn inline-block">
            Back to {cat.name}
          </Link>
        </section>
      </>
    );
  }

  // Sub-product page
  if (subProduct) {
    const subTitle = `${subProduct.name} - ${cat.name} | Ambica Industry`;
    const subDesc = `High-purity ${subProduct.name} from Ambica Industry. Manufactured for superior color yield, fastness and technical reliability under ${cat.name}. Request technical data & quote.`;
    const subCanonical = `/products/${cat.slug}/${subProduct.slug}`;
    const subKeywords = `${subProduct.name}, ${cat.name}, industrial ${subProduct.name}, buy ${subProduct.name}, Ambica Industry dyes`;

    return (
      <div className="bg-gray-50 min-h-screen">
        <SEO
          title={subTitle}
          description={subDesc}
          keywords={subKeywords}
          canonical={subCanonical}
          ogType="product"
          schema={[
            createBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Products', url: '/products' },
              { name: cat.name, url: `/products/${cat.slug}` },
              { name: subProduct.name, url: subCanonical },
            ]),
            createProductSchema({
              name: subProduct.name,
              description: subDesc,
              category: cat.name,
              url: subCanonical,
              image: cat.image,
            }),
          ]}
        />

        {/* Cover Photo Hero for Sub-Products */}
        <SubProductHero cat={cat} subProduct={subProduct} />

        {/* Detailed Editorial Content & Technical Specs */}
        <SubProductContent cat={cat} subProduct={subProduct} slug={slug} />
      </div>
    );
  }

  // Main Category page
  const catTitle = `${cat.name} Manufacturer & Exporter in India | Ambica Industry`;
  const catCanonical = `/products/${cat.slug}`;
  const catKeywords = `${cat.name}, ${cat.name} manufacturer, ${cat.name} exporter India, ${cat.subProducts.map((s) => s.name).join(', ')}, Ambica Industry`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={catTitle}
        description={cat.description}
        keywords={catKeywords}
        canonical={catCanonical}
        ogType="product"
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
            { name: cat.name, url: catCanonical },
          ]),
          createProductSchema({
            name: cat.name,
            description: cat.description,
            category: 'Industrial Dyes',
            url: catCanonical,
            image: cat.image,
          }),
        ]}
      />

      {/* Category Hero Section */}
      <CategoryHero cat={cat} />

      {/* Editorial Overview & Intelligence */}
      <CategoryOverview cat={cat} />

      {/* Available Sub-Product Lines & CTA */}
      <CategorySubProducts cat={cat} />
    </div>
  );
}
