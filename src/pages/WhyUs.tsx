import Faqs from "../components/sections/Faqs";
import { whyUsFaqs } from "../data/faq";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import HeroWhyUs from "../components/sections/HeroWhyUs";
import WhyUsDifference from "../components/sections/WhyUsDifference";
import WhyUsNumbers from "../components/sections/WhyUsNumbers";
import Testimonials from "../components/sections/Testimonials";

export default function WhyUs () {
    return(
        <section>
            <HeroWhyUs/>
            <WhyUsDifference/>
            <WhyUsNumbers/>
            <WhyChooseUs/>
            <Testimonials/>
            <Faqs faqs={whyUsFaqs} />

        </section>
    )
}                               