import { useState, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FieldError from '@/components/ui/FieldError';
import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import { siteConfig } from '@/data/siteConfig';
import { validateStandardField } from '@/utils/validation';

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium',
  'Turkey', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Vietnam',
  'Indonesia', 'Thailand', 'China', 'Japan', 'South Korea',
  'Brazil', 'Mexico', 'South Africa', 'Nigeria', 'Kenya',
  'UAE', 'Saudi Arabia', 'Egypt', 'Other',
];

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | null => {
    return validateStandardField(name, value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] || errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next[name] = err;
        else delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[name] = err;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fieldsToValidate = ['name', 'company', 'email', 'phone', 'city', 'country', 'message'] as const;
    const nextErrors: Record<string, string> = {};

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) nextErrors[f] = err;
    });

    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = fieldsToValidate.find((f) => nextErrors[f]);
      if (firstInvalid && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = new FormData();
      payload.append('access_key', siteConfig.web3FormsAccessKey);
      payload.append(
        'subject',
        `New B2B Export Enquiry from ${formData.name} (${formData.country || 'International'}) - Ambica Industry`
      );
      payload.append('from_name', 'Ambica Industry Website');
      payload.append('name', formData.name);
      payload.append('company', formData.company || 'Not specified');
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('city', formData.city || 'Not specified');
      payload.append('country', formData.country || 'Not specified');
      payload.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          message: '',
        });
        setTouched({});
      } else {
        setIsSubmitting(false);
        setSubmitError(data.message || 'Failed to submit enquiry. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setIsSubmitting(false);
      setSubmitError('Failed to submit enquiry. Please check your internet connection and try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      message: '',
    });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitted(false);
    setSubmitError('');
  };

  const getInputClass = (fieldName: string) =>
    `w-full px-4 py-3 border rounded-xl outline-none transition-all text-[16px] sm:text-sm ${
      errors[fieldName]
        ? 'border-red-500 bg-red-50/40 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-red-200 focus:border-red-500'
        : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
    }`;

  return (
    <>
      <SEO
        title={seoConfig.enquiry.title}
        description={seoConfig.enquiry.description}
        keywords={seoConfig.enquiry.keywords}
        canonical={seoConfig.enquiry.canonical}
        schema={createBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Enquiry', url: '/enquiry' },
        ])}
      />
      <Breadcrumb title="Enquiry" items={[{ label: 'Enquiry' }]} />

      <section className="py-10 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-200 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-card p-5 sm:p-8 md:p-12"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary-dark mb-3">Thank You!</h2>
                <p className="text-gray-text max-w-md mx-auto">
                  Your enquiry has been submitted successfully. Our team will review your requirements and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 gradient-btn cursor-pointer inline-flex items-center gap-2"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary-dark text-center mb-2">
                  Send Us Your Enquiry
                </h2>
                <p className="text-xs text-gray-text text-center mb-8">
                  Please share your product and application details for a personalized solution and quotation.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-name" className="block text-sm font-medium text-body-text mb-1.5">
                        Name <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="enq-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your Name"
                        aria-invalid={!!errors.name}
                        className={getInputClass('name')}
                      />
                      <FieldError error={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="enq-company" className="block text-sm font-medium text-body-text mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="enq-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Company Name"
                        aria-invalid={!!errors.company}
                        className={getInputClass('company')}
                      />
                      <FieldError error={errors.company} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-email" className="block text-sm font-medium text-body-text mb-1.5">
                        Email Address <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="enq-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                        className={getInputClass('email')}
                      />
                      <FieldError error={errors.email} />
                    </div>
                    <div>
                      <label htmlFor="enq-phone" className="block text-sm font-medium text-body-text mb-1.5">
                        Phone / Mobile <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="enq-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 90000 00000"
                        aria-invalid={!!errors.phone}
                        className={getInputClass('phone')}
                      />
                      <FieldError error={errors.phone} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="enq-city" className="block text-sm font-medium text-body-text mb-1.5">
                        City
                      </label>
                      <input
                        id="enq-city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your City"
                        aria-invalid={!!errors.city}
                        className={getInputClass('city')}
                      />
                      <FieldError error={errors.city} />
                    </div>
                    <div>
                      <label htmlFor="enq-country" className="block text-sm font-medium text-body-text mb-1.5">
                        Country <span className="text-accent-red">*</span>
                      </label>
                      <select
                        id="enq-country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.country}
                        className={`${getInputClass('country')} bg-white`}
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <FieldError error={errors.country} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="enq-message" className="block text-sm font-medium text-body-text">
                        Message / Requirements <span className="text-accent-red">*</span>
                      </label>
                      <span className="text-[11px] text-gray-text">
                        {formData.message.length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="enq-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your requirements, target product, industry, or quantity..."
                      aria-invalid={!!errors.message}
                      className={`${getInputClass('message')} resize-none`}
                    />
                    <FieldError error={errors.message} />
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                      <span className="leading-relaxed">{submitError}</span>
                    </div>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gradient-btn flex-1 py-3 text-sm cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-text font-semibold text-sm hover:border-accent-red hover:text-accent-red transition-colors cursor-pointer"
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

