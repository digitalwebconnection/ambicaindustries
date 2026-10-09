import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-loaded page components for optimal bundle code-splitting
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Industry = lazy(() => import('@/pages/Industry'));
const RnD = lazy(() => import('@/pages/RnD'));
const WhyUs = lazy(() => import('@/pages/WhyUs'));
const Products = lazy(() => import('@/pages/Products'));
const Contact = lazy(() => import('@/pages/Contact'));
const ProductCategory = lazy(() => import('@/pages/ProductCategory'));
const Enquiry = lazy(() => import('@/pages/Enquiry'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/**
 * Loading fallback spinner during route transitions
 */
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-3 border-slate-200 border-t-accent-red rounded-full animate-spin" />
    </div>
  );
}

/*
 * Application Routes
 * 
 * NOTE ON CONTACT vs ENQUIRY:
 * - /contact: General corporate contact, location address, map, phone/email, and customer service.
 * - /enquiry: Dedicated global export quotation & bulk supply order form with country selector,
 *   international shipping context, and business inquiry schema.
 *   Both are retained as distinct conversion funnels for domestic vs international clients.
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/why-choose-us" element={<WhyUs />} />
        <Route path="/r&d" element={<RnD />} />

        {/* Legacy redirects for removed categories to prevent broken deep links */}
        <Route path="/products/food-lake-colors" element={<Navigate to="/products" replace />} />
        <Route path="/products/food-lake-colors/:slug" element={<Navigate to="/products" replace />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:slug" element={<ProductCategory />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsof-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
