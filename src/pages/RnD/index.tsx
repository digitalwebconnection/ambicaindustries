import RnDHero from "./sections/RnDHero";
import RnDSection from "../../components/shared/RnDSection";
import RnDProcess from "./sections/RnDProcess";
import Faqs from "../../components/shared/Faqs";
import { rndFaqs } from "../../data/faq";
import RnDQuality from "./sections/RnDQuality";
import RnDExpertise from "./sections/RnDExpertise";

export default function RnD() {
  return (
    <>
      <RnDHero />
      <RnDProcess />
      <RnDExpertise />
      <RnDQuality />
      <RnDSection />
      <Faqs faqs={rndFaqs} />
    </>
  );
}
