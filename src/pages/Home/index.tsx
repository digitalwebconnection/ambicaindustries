import HeroBanner from './sections/HeroBanner';
import AboutPreview from './sections/AboutPreview';
import ProductsGrid from './sections/ProductsGrid';
import IndustriesServed from './sections/IndustriesServed';
import RnDSection from './sections/RnDSection';
import NewsSection from './sections/NewsSection';
import WhyChooseUs from './sections/WhyChooseUs';
import HomeContactSection from './sections/HomeContactSection';
import Faqs from '../../components/shared/Faqs';
import { homeFaqs } from '../../data/faq';

export default function Home() {
  return (
    <>
      <div ><HeroBanner /></div>
      <div ><AboutPreview /></div>
      <div ><ProductsGrid /></div>
      <div ><IndustriesServed /></div>
      <div ><RnDSection /></div>
      <div ><NewsSection /></div>
      <div ><WhyChooseUs /></div>
      <HomeContactSection />
      <div ><Faqs faqs={homeFaqs} /></div>
    </>
  );
}
