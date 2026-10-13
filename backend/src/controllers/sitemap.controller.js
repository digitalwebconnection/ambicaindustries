import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

const BASE_URL = process.env.CLIENT_URL?.split(',')[0]?.replace(/\/$/, '') || 'https://www.ambicaindustry.com';

// 1. Core Static Pages matching frontend route configuration
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/industry', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-choose-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/r&d', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.85', changefreq: 'monthly' },
  { path: '/enquiry', priority: '0.85', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/termsof-service', priority: '0.3', changefreq: 'yearly' },
];

// 2. Product Categories & Sub-products mapped from frontend/src/data/products
const PRODUCT_DATA = [
  {
    category: 'acid-dyes',
    subProducts: [
      'acid-black-dyes',
      'acid-violet-dyes',
      'acid-blue-dyes',
      'acid-brown-dyes',
      'acid-red-dyes',
      'acid-yellow-dyes',
    ],
  },
  {
    category: 'direct-dyes',
    subProducts: [
      'sunfast-non-benzidine-direct-dyes',
      'non-benzidine-direct-dyes',
    ],
  },
  {
    category: 'reactive-dyes',
    subProducts: [
      'reactive-cold-dyes',
      'reactive-he-dyes',
      'reactive-hot-dyes',
      'reactive-me-dyes',
      'reactive-vinyl-sulphone-base-dyes',
    ],
  },
  {
    category: 'leather-dyes',
    subProducts: [
      'leather-applicable-dyes',
    ],
  },
  {
    category: 'wood-dyes',
    subProducts: [
      'wood-stain-dyes',
    ],
  },
];

/**
 * Escapes characters for strict XML compliance (& -> &amp;)
 */
const escapeXml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const getSitemapXml = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Fetch published blogs from MongoDB if connected
    let blogs = [];
    if (mongoose.connection?.readyState === 1) {
      blogs = await Blog.find({ isPublished: true, isDeleted: { $ne: true } })
        .select('slug updatedAt createdAt')
        .lean()
        .maxTimeMS(2000)
        .catch(() => []);
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Main Pages
    for (const page of STATIC_PAGES) {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${BASE_URL}${page.path}`)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // 2. Product Categories and Sub-Products
    for (const prod of PRODUCT_DATA) {
      // Category URL
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${BASE_URL}/products/${prod.category}`)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;

      // Sub-Product URLs
      for (const sub of prod.subProducts) {
        xml += `  <url>\n`;
        xml += `    <loc>${escapeXml(`${BASE_URL}/products/${prod.category}/${sub}`)}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.75</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    // 3. Dynamic Published Blog Posts
    for (const blog of blogs) {
      const dateVal = blog.updatedAt || blog.createdAt;
      const lastmod = dateVal ? new Date(dateVal).toISOString().split('T')[0] : today;
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${BASE_URL}/blogs/${blog.slug}`)}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return res.status(500).send('Error generating sitemap');
  }
};
