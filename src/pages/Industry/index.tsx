import Faqs from "../../components/shared/Faqs";
import HeroIndustry from "./sections/HeroIndustry";
import IndustriesServed from "../../components/shared/IndustriesServed";
import IndustryCTA from "./sections/IndustryCTA";
import IndustryCustomers from "./sections/IndustryCustomers";
import ProductToIndustry from "./sections/ProductToIndustry";
import { industriesFaqs } from "../../data/faq";

export default function Industry() {
  return (
    <>
      <HeroIndustry />
      <IndustryCustomers />
      <ProductToIndustry />
      <IndustriesServed />
      <IndustryCTA />
      <Faqs faqs={industriesFaqs} />
    </>
  );
}
