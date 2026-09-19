import Faqs from "../components/sections/Faqs";
import { whyUsFaqs } from "../data/faq";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import HeroWhyUs from "../components/sections/HeroWhyUs";

export default function WhyUs () {
    return(
        <section>
            <HeroWhyUs/>
            <WhyChooseUs/>
            <Faqs faqs={whyUsFaqs} />

        </section>
    )
}                               