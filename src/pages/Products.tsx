import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import { productCategories } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Products() {
  return (
    <>
      <Breadcrumb title="Our Products" items={[{ label: 'Products' }]} />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1210px] mx-auto px-4">
          <div className="space-y-16">
            {productCategories.map((category, i) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
              >
                {/* Product Image + Name */}
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link
                    to={`/products/${category.slug}`}
                    className="group block rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative overflow-hidden h-[280px]">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <span className="text-white font-semibold text-sm bg-accent-red px-6 py-2 rounded-full flex items-center gap-2">
                          View More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                    <div className="p-5 bg-white text-center">
                      <h3 className="text-xl font-bold text-primary-dark group-hover:text-accent-red transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* Description + Sub-products */}
                <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">{category.name}</h3>
                  <p className="text-gray-text mb-6 leading-relaxed">{category.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.subProducts.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/products/${category.slug}/${sub.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary hover:text-white transition-all duration-300 group/sub"
                      >
                        <ArrowRight
                          size={14}
                          className="text-accent-red group-hover/sub:text-white shrink-0"
                        />
                        <span className="text-sm font-medium">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
