import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import Faqs from '@/components/shared/Faqs';
import HeroIndustry from "./sections/HeroIndustry";
import IndustriesServed from '@/components/shared/IndustriesServed';
import IndustryCTA from "./sections/IndustryCTA";
import IndustryCustomers from "./sections/IndustryCustomers";
import ProductToIndustry from "@/components/shared/ProductToIndustry";
import { industriesFaqs } from '@/data/faq';

export default function Industry() {
  return (
    <>
      <SEO
        title={seoConfig.industry.title}
        description={seoConfig.industry.description}
        keywords={seoConfig.industry.keywords}
        canonical={seoConfig.industry.canonical}
        schema={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries Served", url: "/industry" },
        ])}
      />
      <HeroIndustry />
      <IndustryCustomers />
      <ProductToIndustry />
      <IndustriesServed />
      <IndustryCTA />
      <Faqs faqs={industriesFaqs} />
    </>
  );
}
