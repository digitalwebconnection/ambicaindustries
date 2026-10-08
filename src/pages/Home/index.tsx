import SEO from '../../components/common/SEO';
import { seoConfig } from '../../data/seoData';
import { organizationSchema, websiteSchema } from '../../utils/seoSchemas';
import HeroBanner from './sections/HeroBanner';
import AboutPreview from './sections/AboutPreview';
import ProductsGrid from './sections/ProductsGrid';
import IndustriesServed from './sections/IndustriesServed';
import RnDSection from './sections/RnDSection';
import NewsSection from './sections/NewsSection';
import WhyChooseUs from './sections/WhyChooseUs';
// import HomeContactSection from './sections/HomeContactSection';
import Faqs from '../../components/shared/Faqs';
import { homeFaqs } from '../../data/faq';

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
      <div ><AboutPreview /></div>
      <div ><ProductsGrid /></div>
      <div ><IndustriesServed /></div>
      <div ><RnDSection /></div>
      <div ><NewsSection /></div>
      <div ><WhyChooseUs /></div>
      {/* <HomeContactSection /> */}
      <div ><Faqs faqs={homeFaqs} /></div>
    </>
  );
}
