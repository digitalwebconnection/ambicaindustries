import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    
    const sections = [
      {
        title: "1. Introduction",
        content:
          'Ambica Industry ("we", "our", "us") is committed to protecting the privacy and personal information of our website visitors, customers, business partners, and other stakeholders. This Privacy Policy explains how we collect, use, store, protect, and disclose information when you visit our website, request product information, contact our team, or engage with our services.',
      },
      {
        title: "2. Information We Collect",
        content:
          'We may collect personal information that you provide voluntarily, such as your name, company name, email address, phone number, address, product requirements, and other inquiry-related details. We may also gather non-personal information automatically, including your IP address, browser type, device information, page views, referral sources, and browsing patterns through cookies and similar tracking technologies to improve website performance and user experience.',
      },
      {
        title: "3. How We Use Your Information",
        content:
          'The information we collect is used to respond to enquiries, provide quotations, process product requests, support customer service, improve our website and marketing communications, and maintain business relationships. We may also use your information to communicate updates, share relevant product information, and comply with legal, contractual, and operational obligations associated with our business activities.',
      },
      {
        title: "4. Cookies and Tracking Technologies",
        content:
          'Our website uses cookies, web beacons, and other tracking technologies to understand how visitors interact with our site, remember preferences, and improve browsing efficiency. Cookies may help us analyze traffic, optimize page performance, and offer a more relevant experience. You may set your browser to reject or manage cookies; however, some features of the website may not function properly if cookies are disabled.',
      },
      {
        title: "5. Sharing and Disclosure of Information",
        content:
          'We do not sell your personal information. However, we may share information with trusted third-party service providers who help us operate our website, manage communications, process orders, perform analytics, or provide business support services, subject to confidentiality obligations. We may also disclose information when required by law, court order, regulatory authority, fraud prevention needs, or to protect our rights, property, or the safety of our customers and employees.',
      },
      {
        title: "6. Data Security",
        content:
          'We take reasonable steps to secure personal information using administrative, technical, and organizational safeguards appropriate to the sensitivity of the data. This includes secure storage practices, limited access controls, and internal procedures designed to reduce the risk of loss, misuse, unauthorized access, or disclosure. While we strive to protect your information, no transmission over the internet or electronic storage system is completely secure, and we cannot guarantee absolute security in all circumstances.',
      },
      {
        title: "7. Data Retention",
        content:
          'We retain personal information only for as long as necessary to fulfill the purpose for which it was collected, meet legal obligations, resolve disputes, and enforce our agreements. When information is no longer required, we securely delete or anonymize it in accordance with our internal retention policies and applicable law.',
      },
      {
        title: "8. Your Rights and Choices",
        content:
          'Depending on your location, you may have the right to request access to, correction of, deletion of, or restriction of processing of your personal information, as well as the right to object to some processing and withdraw consent where applicable. If you wish to exercise these rights or update your communication preferences, please contact us using the details provided below. We will review and respond to valid requests in accordance with applicable law.',
      },
      {
        title: "9. Third-Party Links",
        content:
          'Our website may contain links to third-party websites, social media pages, or external resources for convenience or informational purposes. We are not responsible for the privacy practices, content, or security of those external sites and encourage you to review their privacy notices before submitting any personal information to them.',
      },
      {
        title: "10. International Business and Export Communications",
        content:
          'As a manufacturer and exporter serving customers across markets, we may process information related to international trade, product specifications, shipment requirements, or commercial discussions. We handle this information with confidentiality and care, and we may transfer data to service providers or business contacts in compliance with applicable data protection standards and legal requirements.',
      },
      {
        title: "11. Changes to This Privacy Policy",
        content:
          'We may revise this Privacy Policy from time to time to reflect changes in our business practices, legal obligations, or website functionality. Any updated version will be posted on this page with a revised "Last Revised" date. We encourage you to review this policy periodically to stay informed about how we process information.',
      },
      {
        title: "12. Contact Us",
        content:
          'If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at ambicaindustries331@gmail.com, or reach us through our website and communication channels. You may also contact us by phone at +91 99244 41544 or visit our office at L-331/6, B/h Lions School, Phase-I, G.I.D.C., Naroda, Ahmedabad - 382330, Gujarat, India.',
      },
    ];
 

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10   md:p-10"
        >
          <h1 className="text-3xl font-black tracking-tight text-accent-red md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500 md:text-base">
            Last Revised: 22 sep' 2026
          </p>
          <p className="mt-3 max-w-4xl  text-base leading-7 text-slate-600 md:text-lg tracking-wide">
            At Ambica Industry, we value the trust you place in us. This policy explains how we collect, use, and protect personal information when you interact with our website, request information, or work with us on product and business requirements.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl">
          {sections.map((section, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className=" p-5  md:p-7 border-b border-slate-200 pb-3"
            >
              <h2 className="mb-3 text-xl font-bold text-primary-dark md:text-2xl">
                {section.title}
              </h2>
              <p className="text-base leading-7 text-slate-600">{section.content}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}