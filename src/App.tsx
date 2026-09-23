import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
// import WhyChooseUs from './components/sections/WhyChooseUs';

// Lazy load non-critical pages for faster initial load
const About = lazy(() => import('./pages/About'));
const Industry = lazy(() => import('./pages/Industry'))
const RnD = lazy(() => import('./pages/RnD'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const ProductCategory = lazy(() => import('./pages/ProductCategory'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-3 border-slate-200 border-t-[#D30202] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/industry" element={<Industry/>} />
          <Route path="/why-choose-us" element={<WhyUs/>} />
          <Route path="/rnd" element={<RnD/>} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:slug" element={<ProductCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsof-service" element={<TermsOfService />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
