export interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

const IMG = 'https://www.shreeumiyaint.com/images';

export const newsItems: NewsItem[] = [
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: `${IMG}/new-image-1.webp`,
  },
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: `${IMG}/new-image-2.webp`,
  },
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: `${IMG}/new-image-1.webp`,
  },
];
