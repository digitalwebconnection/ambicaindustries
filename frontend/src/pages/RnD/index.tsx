import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import RnDHero from "./sections/RnDHero";
import RnDSection from '@/components/shared/RnDSection';
import RnDProcess from "./sections/RnDProcess";
import Faqs from '@/components/shared/Faqs';
import { rndFaqs } from '@/data/faq';
import RnDQuality from "./sections/RnDQuality";
import RnDExpertise from "./sections/RnDExpertise";

export default function RnD() {
  return (
    <>
      <SEO
        title={seoConfig.rnd.title}
        description={seoConfig.rnd.description}
        keywords={seoConfig.rnd.keywords}
        canonical={seoConfig.rnd.canonical}
        schema={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "R&D", url: "/r&d" },
        ])}
      />
      <RnDHero />
      <RnDProcess />
      <RnDExpertise />
      <RnDQuality />
      <RnDSection />
      <Faqs faqs={rndFaqs} />
    </>
  );
}
