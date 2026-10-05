import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Lazy load non-critical pages for faster initial load
const About = lazy(() => import('./pages/About'));
const Industry = lazy(() => import('./pages/Industry'))
const RnD = lazy(() => import('./pages/RnD'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductCategory = lazy(() => import('./pages/ProductCategory'));
const Enquiry = lazy(() => import('./pages/Enquiry'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-3 border-slate-200 border-t-accent-red rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/industry" element={<Industry/>} />
            <Route path="/why-choose-us" element={<WhyUs/>} />
            <Route path="/r&d" element={<RnD/>} />
            {/* Legacy redirects for removed categories to prevent broken deep links */}
            <Route path="/products/food-lake-colors" element={<Navigate to="/products" replace />} />
            <Route path="/products/food-lake-colors/:slug" element={<Navigate to="/products" replace />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:slug" element={<ProductCategory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/termsof-service" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </Layout>
    </ReactLenis>
  );
}
