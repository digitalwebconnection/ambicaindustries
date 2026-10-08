import SEO from "../../components/common/SEO";
import { seoConfig } from "../../data/seoData";
import { createBreadcrumbSchema } from "../../utils/seoSchemas";
import AboutHero from "./sections/AboutHero";
import AboutQuote from "./sections/AboutQuote";
import AboutBentoStats from "./sections/AboutBentoStats";
import AboutStory from "./sections/AboutStory";
import AboutCTA from "./sections/AboutCTA";
import AboutTeamExpertise from "./sections/AboutTeamExpertise";
import Faqs from "../../components/shared/Faqs";
import { aboutFaqs } from "../../data/faq";

export default function About() {
  return (
    <>
      <SEO
        title={seoConfig.about.title}
        description={seoConfig.about.description}
        keywords={seoConfig.about.keywords}
        canonical={seoConfig.about.canonical}
        schema={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ])}
      />
      {/* Hero Section */}
      <AboutHero />

      {/* Quote Section */}
      <AboutQuote />

      {/* Impact Numbers Bento Section */}
      <AboutBentoStats />

      {/* Company History / Our Story */}
      <AboutStory />

      {/* CTA Section */}
      <AboutCTA />

      {/* Team Expertise */}
      <AboutTeamExpertise />

      {/* FAQs Section */}
      <Faqs faqs={aboutFaqs} />
    </>
  );
}
