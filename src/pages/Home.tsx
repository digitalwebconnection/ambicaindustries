import HeroBanner from '../components/sections/HeroBanner';
import AboutPreview from '../components/sections/AboutPreview';
import ProductsGrid from '../components/sections/ProductsGrid';
import IndustriesServed from '../components/sections/IndustriesServed';
import RnDSection from '../components/sections/RnDSection';
import NewsSection from '../components/sections/NewsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import HomeContactSection from '../components/sections/HomeContactSection';
import Faqs from '../components/sections/Faqs';
import { homeFaqs } from "../data/faq";

export default function Home() {
  return (
    <>
      <div id="home"><HeroBanner /></div>
      <div id="about"><AboutPreview /></div>
      <div id="products"><ProductsGrid /></div>
      <div id="industries"><IndustriesServed /></div>
      <div id="r-and-d"><RnDSection /></div>
      <div id="news"><NewsSection /></div>
      <div id="why-choose-us"><WhyChooseUs /></div>
      <HomeContactSection />
      <div id="faq"><Faqs faqs={homeFaqs} /></div>
    </>
  );
}
