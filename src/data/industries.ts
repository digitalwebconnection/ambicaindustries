import imgApparel from '../assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.jpg';
import imgHome from '../assets/images/hero/vibrant-dyeing-bleaching-linen-fabric-factory.jpg';
import imgTech from '../assets/images/hero/dyeing-textiles-factory-colorful-process.jpg';
import imgPaperPkg from '../assets/images/hero/generative-ai-huge-paper-rolls-placed-warehouse-waiting-use.jpg';
import imgPrinting from '../assets/images/hero/close-up-white-paper.jpg';
import imgTissue from '../assets/images/hero/full-frame-shot-multi-colored-paper.jpg';
import imgNonWoven from '../assets/images/hero/colorful-yarn-bins-textile-factory.jpg';
import imgSpecialty from '../assets/images/hero/close-up-row-paint-cans-with-different-colors.jpg';
import imgCustomerCustomOrders from '../assets/images/industries/customer-custom-orders.jpg';
import imgCustomerDesignersBrands from '../assets/images/industries/customer-designers-brands.jpg';
import imgCustomerTextileMills from '../assets/images/industries/customer-textile-mills.jpg';
import imgCustomerPaperProducers from '../assets/images/industries/customer-paper-producers.jpg';
import imgCustomerChemicalDistributors from '../assets/images/industries/customer-chemical-distributors.jpg';
import imgCustomerBulkBuyers from '../assets/images/industries/customer-bulk-buyers.jpg';

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


export interface IndustryCustomers {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const customerTypes: IndustryCustomers[] = [
  {
    id: 1,
    title: "Small & Custom Orders",
    description:
      "Flexible solutions for smaller quantities, specialized requirements, and unique color applications.",
    image: imgCustomerCustomOrders,
  },
  {
    id: 2,
    title: "Designers & Brands",
    description:
      "Reliable dyes and color solutions for designers, fashion brands, and product developers seeking consistent results.",
    image: imgCustomerDesignersBrands,
  },
  {
    id: 3,
    title: "Textile Mills",
    description:
      "Consistent, scalable dye solutions designed to support the production needs of textile mills and manufacturers.",
    image: imgCustomerTextileMills,
  },
  {
    id: 4,
    title: "Paper Producers",
    description:
      "Precision color solutions for paper and pulp manufacturers requiring uniform shades and dependable performance.",
    image: imgCustomerPaperProducers,
  },
  {
    id: 5,
    title: "Chemical Distributors",
    description:
      "Reliable product supply and consistent quality for distributors serving diverse industrial customers.",
    image: imgCustomerChemicalDistributors,
  },
  {
    id: 6,
    title: "Large Bulk Buyers",
    description:
      "Efficient supply support for high-volume requirements, helping businesses maintain continuity across production cycles.",
    image: imgCustomerBulkBuyers,
  },
];



export interface ProductApplication {
  name: string;
  material: string;
  applications: string;
  description: string;
}

export const productMapping: ProductApplication[] = [
  {
    name: "Acid Dyes",
    material: "Wool · Silk · Nylon",
    applications: "Apparel, fashion textiles & specialty fabrics",
    description:
      "Vibrant and consistent color solutions for protein and polyamide fibers.",
  },
  {
    name: "Direct Dyes",
    material: "Cotton · Viscose · Cellulose",
    applications: "Garments, home furnishings & everyday textiles",
    description:
      "Reliable coloration for a wide range of cellulose-based materials.",
  },
  {
    name: "Reactive Dyes",
    material: "Cotton · Cellulosic Fibers",
    applications: "Apparel, denim & home textiles",
    description:
      "Designed for strong fixation and durable shades across textile applications.",
  },
  {
    name: "Leather Dyes",
    material: "Leather",
    applications: "Footwear, accessories & upholstery",
    description:
      "Consistent coloration for leather tanning, finishing and manufacturing.",
  },
  {
    name: "Wood Dyes",
    material: "Natural & Engineered Wood",
    applications: "Furniture, flooring & interior surfaces",
    description:
      "Color solutions that enhance wood surfaces while preserving their character.",
  },
  
];

export const legacyProductMapping: ProductApplication[] = [
  {
    name: "Food & Lake Colors",
    material: "Food · Pharmaceutical · Cosmetics",
    applications: "Specialized coloring applications",
    description:
      "Controlled color solutions developed for specific non-textile applications.",
  },
];

