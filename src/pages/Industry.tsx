import Faqs from "../components/sections/Faqs";
import HeroIndsutry from "../components/sections/HeroIndusrty";
import IndustriesServed from "../components/sections/IndustriesServed";
import IndustryCTA from "../components/sections/IndustryCTA";
import IndustryCustomers from "../components/sections/IndustryCustomers";
import ProductToIndustry from "../components/sections/ProductToIndsustry";
import { industriesFaqs } from "../data/faq";



export default function Industry(){
    return(
        <>
            <HeroIndsutry/>
            <IndustryCustomers/>
            <ProductToIndustry/>
            <IndustriesServed/>
            <IndustryCTA/>
            <Faqs faqs={industriesFaqs}/>

        </>
    )
}