import RnDHero from "../components/sections/RnDHero";
import RnDSection from "../components/sections/RnDSection";
import RnDProcess from "../components/sections/RnDProcess"
import Faqs from "../components/sections/Faqs";
import { rndFaqs } from "../data/faq";
import RnDQuality from "../components/sections/RnDQuality";
import RnDExpertise from "../components/sections/RnDExpertise";

export default function(){
    return(
        <>
        <RnDHero/>
        <RnDProcess/>
        <RnDExpertise/>
        <RnDQuality/>
        <RnDSection/>
        <Faqs faqs={rndFaqs}/>
        </>
    )
}