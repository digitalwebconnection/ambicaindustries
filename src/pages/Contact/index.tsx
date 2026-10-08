import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { organizationSchema, createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import ContactForm from "@/components/shared/ContactForm";
import HeroContactUs from "./sections/HeroContactUs";

export default function Contact() {
  return (
    <>
      <SEO
        title={seoConfig.contact.title}
        description={seoConfig.contact.description}
        keywords={seoConfig.contact.keywords}
        canonical={seoConfig.contact.canonical}
        schema={[
          organizationSchema,
          createBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact Us", url: "/contact" },
          ]),
        ]}
      />
      <HeroContactUs />
      <ContactForm />
    </>
  );
}
