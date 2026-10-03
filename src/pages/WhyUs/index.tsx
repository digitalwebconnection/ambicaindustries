import Faqs from "../../components/shared/Faqs";
import { whyUsFaqs } from "../../data/faq";
import WhyChooseUs from "../../components/shared/WhyChooseUs";
import HeroWhyUs from "./sections/HeroWhyUs";
import WhyUsDifference from "./sections/WhyUsDifference";
import WhyUsNumbers from "./sections/WhyUsNumbers";
import Testimonials from "./sections/Testimonials";

export default function WhyUs() {
  return (
    <section>
      <HeroWhyUs />
      <WhyUsDifference />
      <WhyUsNumbers />
      <WhyChooseUs />
      <Testimonials />
      <Faqs faqs={whyUsFaqs} />
    </section>
  );
}
