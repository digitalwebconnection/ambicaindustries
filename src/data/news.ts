import imgNews1 from '../assets/images/hero/dyeing-fabrics-colorful-vats.jpg';
import imgNews2 from '../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.jpg';
import imgNews3 from '../assets/images/hero/rows-colorful-dye-vats-industrial-factory.jpg';

export interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

export const newsItems: NewsItem[] = [
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: imgNews1,
  },
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: imgNews2,
  },
  {
    date: 'August 12, 2019',
    title: 'BIGGEST MANUFACTURER FOR DYES IN INDIA',
    excerpt:
      'We also have our all acid black series dyes batch ready to dispatch for our clients.',
    author: 'hukum',
    image: imgNews3,
  },
];
