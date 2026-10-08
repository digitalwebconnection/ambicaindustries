import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { organizationSchema, websiteSchema } from '@/components/seo/seoSchemas';
import HeroBanner from './sections/HeroBanner';
import AboutPreview from './sections/AboutPreview';
import ProductsGrid from '@/components/shared/ProductsGrid';
import IndustriesServed from '@/components/shared/IndustriesServed';
import RnDSection from '@/components/shared/RnDSection';
import NewsSection from './sections/NewsSection';
import WhyChooseUs from '@/components/shared/WhyChooseUs';
import Faqs from '@/components/shared/Faqs';
import { homeFaqs } from '@/data/faq';

export default function Home() {
  return (
    <>
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        canonical={seoConfig.home.canonical}
        schema={[organizationSchema, websiteSchema]}
      />
      <div><HeroBanner /></div>
      <div><AboutPreview /></div>
      <div><ProductsGrid /></div>
      <div><IndustriesServed /></div>
      <div><RnDSection /></div>
      <div><NewsSection /></div>
      <div ><WhyChooseUs /></div>
      <div ><Faqs faqs={homeFaqs} /></div>
    </>
  );
}
