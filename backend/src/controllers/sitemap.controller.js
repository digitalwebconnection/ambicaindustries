import Blog from '../models/Blog.js';

const BASE_URL = process.env.CLIENT_URL?.split(',')[0]?.replace(/\/$/, '') || 'https://www.ambicaindustry.com';

// Static base routes of Ambica Industries
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/r&d', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/enquiry', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

export const getSitemapXml = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Fetch published blogs
    const blogs = await Blog.find({ isPublished: true, isDeleted: { $ne: true } })
      .select('slug updatedAt createdAt')
      .lean()
      .catch(() => []);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Routes
    for (const route of STATIC_ROUTES) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // 2. Published Blog Articles
    for (const blog of blogs) {
      const lastmod = (blog.updatedAt || blog.createdAt ? new Date(blog.updatedAt || blog.createdAt).toISOString() : new Date().toISOString()).split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/blogs/${blog.slug}</loc>\n`;
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
