import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import { productCategories } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function ProductCategory() {
  const { category, slug } = useParams<{ category: string; slug?: string }>();

  const cat = productCategories.find((c) => c.slug === category);

  if (!cat) {
    return (
      <>
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
    return (
      <>
        <Breadcrumb
          title={subProduct.name}
          items={[
            { label: 'Products', href: '/products' },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: subProduct.name },
          ]}
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1210px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="rounded-2xl overflow-hidden shadow-card mb-8">
                  <img src={cat.image} alt={subProduct.name} className="w-full h-[400px] object-cover" />
                </div>
                <h2 className="text-3xl font-bold text-primary-dark mb-4">{subProduct.name}</h2>
                <p className="text-gray-text leading-relaxed mb-6">
                  Our {subProduct.name} are manufactured using premium quality raw materials and
                  advanced manufacturing processes. These dyes offer excellent color fastness, high
                  purity, and consistent quality for various industrial applications.
                </p>
                <p className="text-gray-text leading-relaxed mb-6">
                  Available in various grades and packaging options to meet your specific
                  requirements. Contact us for detailed specifications, pricing, and samples.
                </p>
                <Link to="/enquiry" className="gradient-btn inline-block">
                  Request a Quote
                </Link>
              </motion.div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-primary-dark mb-4">
                    Other {cat.name}
                  </h3>
                  <div className="space-y-2">
                    {cat.subProducts.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/products/${cat.slug}/${sub.slug}`}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          sub.slug === slug
                            ? 'bg-primary text-white'
                            : 'bg-white hover:bg-primary hover:text-white'
                        }`}
                      >
                        <ArrowRight size={14} className="shrink-0" />
                        <span className="text-sm font-medium">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-primary to-accent-pink rounded-2xl p-6 text-white text-center">
                  <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                  <p className="text-white/80 text-sm mb-4">Contact our team for custom solutions</p>
                  <Link
                    to="/contact"
                    className="inline-block bg-white text-primary font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-accent-gold hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Category page
  return (
    <>
      <Breadcrumb
        title={cat.name}
        items={[
          { label: 'Products', href: '/products' },
          { label: cat.name },
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1210px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-card mb-8">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-primary-dark mb-4">{cat.name}</h2>
              <p className="text-gray-text leading-relaxed mb-8">{cat.description}</p>

              <h3 className="text-xl font-bold text-primary-dark mb-4">Sub Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.subProducts.map((sub, i) => (
                  <motion.div
                    key={sub.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/products/${cat.slug}/${sub.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm"
                    >
                      <ArrowRight
                        size={14}
                        className="text-accent-red group-hover:text-white shrink-0"
                      />
                      <span className="font-medium">{sub.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-primary-dark mb-4">All Product Categories</h3>
                <div className="space-y-2">
                  {productCategories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/products/${c.slug}`}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        c.slug === category
                          ? 'bg-primary text-white'
                          : 'bg-white hover:bg-primary hover:text-white'
                      }`}
                    >
                      <ArrowRight size={14} className="shrink-0" />
                      <span className="text-sm font-medium">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
