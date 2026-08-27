import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium',
  'Turkey', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Vietnam',
  'Indonesia', 'Thailand', 'China', 'Japan', 'South Korea',
  'Brazil', 'Mexico', 'South Africa', 'Nigeria', 'Kenya',
  'UAE', 'Saudi Arabia', 'Egypt', 'Other',
];

export default function Enquiry() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Breadcrumb title="Enquiry" items={[{ label: 'Enquiry' }]} />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[800px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-card p-8 md:p-12"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary-dark mb-3">Thank You!</h2>
                <p className="text-gray-text">Your enquiry has been submitted successfully. We will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 gradient-btn"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary-dark text-center mb-8">
                  Send Us Your Enquiry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-name" className="block text-sm font-medium text-body-text mb-1.5">
                        Name *
                      </label>
                      <input
                        id="enq-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="enq-company" className="block text-sm font-medium text-body-text mb-1.5">
                        Company
                      </label>
                      <input
                        id="enq-company"
                        type="text"
                        placeholder="Company Name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-email" className="block text-sm font-medium text-body-text mb-1.5">
                        Email *
                      </label>
                      <input
                        id="enq-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="enq-phone" className="block text-sm font-medium text-body-text mb-1.5">
                        Phone *
                      </label>
                      <input
                        id="enq-phone"
                        type="tel"
                        required
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-city" className="block text-sm font-medium text-body-text mb-1.5">
                        City
                      </label>
                      <input
                        id="enq-city"
                        type="text"
                        placeholder="Your City"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="enq-country" className="block text-sm font-medium text-body-text mb-1.5">
                        Country
                      </label>
                      <select
                        id="enq-country"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enq-message" className="block text-sm font-medium text-body-text mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="enq-message"
                      rows={5}
                      required
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button type="submit" className="gradient-btn flex-1 py-3 text-sm">
                      Submit Enquiry
                    </button>
                    <button
                      type="reset"
                      className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-text font-semibold text-sm hover:border-accent-red hover:text-accent-red transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
