import SEO from "../../components/common/SEO";
import { seoConfig } from "../../data/seoData";
import { organizationSchema, createBreadcrumbSchema } from "../../utils/seoSchemas";
import ContactForm from "./sections/ContactForm";
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
