import { siteConfig } from '@/data/siteConfig';

/**
 * Single Source of Truth for Ambica Industries Contact & Company Coordinates
 */
export const CONTACT_INFO = {
  COMPANY_NAME: siteConfig.name,
  TAGLINE: siteConfig.tagline,
  ESTABLISHED_YEAR: siteConfig.established,
  EMAIL: siteConfig.email,
  WEBSITE: siteConfig.website,
  WHATSAPP_URL: siteConfig.whatsapp,

  PHONES: {
    LANDLINE: siteConfig.phone.landline,
    SHAILESH: siteConfig.phone.shailesh,
    SAMIR: siteConfig.phone.samir,
    DISPLAY_PRIMARY: siteConfig.phone.shailesh.fullNumber,
  },

  OFFICE_ADDRESS: {
    FULL: siteConfig.addresses.office.text,
    MAP_URL: siteConfig.addresses.office.mapUrl,
    LOCALITY: 'Phase-I, G.I.D.C., Naroda',
    CITY: 'Ahmedabad',
    POSTAL_CODE: '382330',
    STATE: 'Gujarat',
    COUNTRY: 'India',
    GEO: siteConfig.geo,
  },

  SOCIAL: siteConfig.social,
};

export default CONTACT_INFO;
