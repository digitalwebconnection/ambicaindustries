import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import Faqs from '@/components/shared/Faqs';
import { whyUsFaqs } from '@/data/faq';
import WhyChooseUs from '@/components/shared/WhyChooseUs';
import HeroWhyUs from "./sections/HeroWhyUs";
import WhyUsDifference from "./sections/WhyUsDifference";
import WhyUsNumbers from "./sections/WhyUsNumbers";
import Testimonials from "@/components/shared/Testimonials";

export default function WhyUs() {
  return (
    <section>
      <SEO
        title={seoConfig.whyUs.title}
        description={seoConfig.whyUs.description}
        keywords={seoConfig.whyUs.keywords}
        canonical={seoConfig.whyUs.canonical}
        schema={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Why Choose Us", url: "/why-choose-us" },
        ])}
      />
      <HeroWhyUs />
      <WhyUsDifference />
      <WhyUsNumbers />
      <WhyChooseUs />
      <Testimonials />
      <Faqs faqs={whyUsFaqs} />
    </section>
  );
}
