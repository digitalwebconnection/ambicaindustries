import imgApparel from '../assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.jpg';
import imgHome from '../assets/images/hero/vibrant-dyeing-bleaching-linen-fabric-factory.jpg';
import imgTech from '../assets/images/hero/dyeing-textiles-factory-colorful-process.jpg';
import imgPaperPkg from '../assets/images/hero/generative-ai-huge-paper-rolls-placed-warehouse-waiting-use.jpg';
import imgPrinting from '../assets/images/hero/close-up-white-paper.jpg';
import imgTissue from '../assets/images/hero/full-frame-shot-multi-colored-paper.jpg';
import imgNonWoven from '../assets/images/hero/colorful-yarn-bins-textile-factory.jpg';
import imgSpecialty from '../assets/images/hero/close-up-row-paint-cans-with-different-colors.jpg';

export interface Industry {
  name: string;
  description: string;
  image: string;
}

export const industries: Industry[] = [
  {
    name: 'Apparel & Fashion',
    description:
      'Our premium dyes deliver vibrant, wash-fast colors for clothing, knitwear, and high-end fashion garments.',
    image: imgApparel,
  },
  {
    name: 'Home Textiles',
    description:
      'Specialized colorants for bedding, towels, curtains, and upholstery, ensuring long-lasting vibrancy and durability.',
    image: imgHome,
  },
  {
    name: 'Technical Textiles',
    description:
      'High-performance dyes engineered for automotive fabrics, medical textiles, and industrial applications.',
    image: imgTech,
  },
  {
    name: 'Paper Packaging',
    description:
      'Eco-friendly dyes for corrugated boxes, paper bags, and kraft paper, enhancing brand presentation.',
    image: imgPaperPkg,
  },
  {
    name: 'Printing Paper',
    description:
      'High-affinity dyes for fine paper, bond paper, and specialty writing paper with exceptional color evenness.',
    image: imgPrinting,
  },
  {
    name: 'Tissue & Towel',
    description:
      'Safe, vibrant, and bleed-resistant dyes specifically formulated for the tissue and hygiene paper industry.',
    image: imgTissue,
  },
  {
    name: 'Non-Woven Fabrics',
    description:
      'Advanced color solutions for synthetic and natural non-woven materials used in medical and consumer goods.',
    image: imgNonWoven,
  },
  {
    name: 'Specialty Paper',
    description:
      'Custom color matching for decorative paper, laminate paper, and wallpaper manufacturing.',
    image: imgSpecialty,
  },
];
