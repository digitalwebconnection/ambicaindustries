
import { motion } from "framer-motion";

export default function TermsOfService() {
    const termsOfService = {
        title: "Terms of Service",
        lastUpdated: "22 September 2026",

        intro: {
            title: "Welcome to Ambica Industry",
            description:
                "These Terms of Service govern your use of the Ambica Industry website and the information, products, and services made available through it.",
        },

        sections: [
            {
                id: 1,
                title: "About Ambica Industry",
                content:
                    "Ambica Industry is engaged in the manufacturing and supply of dyes and color solutions for various industrial applications, including textile, paper, leather, wood, and other industries.",
            },
            {
                id: 2,
                title: "Use of Our Website",
                content:
                    "You agree to use this website only for lawful purposes and in a manner that does not violate applicable laws, infringe third-party rights, attempt unauthorized access, interfere with website security, or misuse website content.",
            },
            {
                id: 3,
                title: "Product Information",
                content:
                    "We make reasonable efforts to ensure that product descriptions, technical information, applications, and other content published on our website are accurate and up to date. Product suitability may vary depending on application requirements, manufacturing processes, material composition, processing conditions, and performance specifications.",
            },
            {
                id: 4,
                title: "Product Samples and Specifications",
                content:
                    "Product samples, shades, technical information, and specifications are provided to assist customers in determining suitability. Customers should conduct appropriate application and compatibility tests before full-scale production.",
            },
            {
                id: 5,
                title: "Orders and Quotations",
                content:
                    "Any quotation, price indication, product availability, or delivery timeline provided through the website is subject to confirmation by Ambica Industry. An enquiry submitted through the website does not automatically constitute an accepted order.",
            },
            {
                id: 6,
                title: "Pricing and Availability",
                content:
                    "Product prices, availability, minimum order quantities, packaging, and delivery conditions may vary depending on the product, quantity, destination, and commercial agreement.",
            },
            {
                id: 7,
                title: "Intellectual Property",
                content:
                    "All website content, including text, logos, images, graphics, product information, designs, page layouts, branding, and other materials, is owned by or licensed to Ambica Industry unless otherwise stated.",
            },
            {
                id: 8,
                title: "Third-Party Links",
                content:
                    "Our website may contain links to third-party websites or services. Ambica Industry does not control and is not responsible for the content, availability, security, or practices of third-party websites.",
            },
            {
                id: 9,
                title: "Website Accuracy",
                content:
                    "We aim to maintain accurate and reliable information on our website. However, information may occasionally contain errors, omissions, or become outdated. Ambica Industry reserves the right to update or modify website content.",
            },
            {
                id: 10,
                title: "Limitation of Liability",
                content:
                    "To the extent permitted by applicable law, Ambica Industry shall not be responsible for losses or damages arising from reliance solely on general information published on this website.",
            },
            {
                id: 11,
                title: "Confidentiality of Enquiries",
                content:
                    "Information submitted through our enquiry or contact forms may be used to respond to requests, provide product information, prepare quotations, and communicate regarding potential business requirements.",
            },
            {
                id: 12,
                title: "Changes to These Terms",
                content:
                    "Ambica Industry may update these Terms of Service from time to time. The updated version will be published on this page with a revised Last Updated date.",
            },
            {
                id: 13,
                title: "Governing Law",
                content:
                    "These Terms of Service shall be governed by the applicable laws of India. Any disputes shall be subject to the jurisdiction agreed upon in the applicable commercial agreement or the appropriate courts having jurisdiction.",
            },
            {
                id: 14,
                title: "Contact Us",
                content:
                    "If you have questions regarding these Terms of Service or our products and services, please contact Ambica Industry through the contact information provided on our website.",
            },
        ],
    };

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10  p-6 md:p-10"
                >
                    <h1 className="text-3xl font-black tracking-tight text-accent-red md:text-5xl">
                        {termsOfService.title}
                    </h1>

                    <p className="mt-3 text-sm text-slate-500 md:text-base">
                        Last Revised: {termsOfService.lastUpdated}
                    </p>

                    <p className="mt-3 max-w-4xl text-base leading-7 tracking-wide text-slate-600 md:text-lg">
                        {termsOfService.intro.description}
                    </p>
                </motion.div>

                <div className="max-w-4xl space-y-8">
                    {termsOfService.sections.map((section) => (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="border-b border-slate-200  p-6 "
                        >
                            <h2 className="text-xl font-bold text-primary md:text-2xl">
                                {section.id}. {section.title}
                            </h2>

                            <p className="mt-3 text-base leading-7 tracking-wide text-slate-600">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>
            </div>
        </section>
    );
}

