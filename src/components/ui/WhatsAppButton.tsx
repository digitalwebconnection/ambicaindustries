import { siteConfig } from '../../data/siteConfig';

const WHATSAPP_ICON = 'https://www.ambicaindustry.com/images/whatsapp.webp';

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <img src={WHATSAPP_ICON} alt="WhatsApp" className="w-full h-full" loading="lazy" />
    </a>
  );
}
