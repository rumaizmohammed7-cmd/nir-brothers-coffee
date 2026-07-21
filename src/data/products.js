// Mock Product Data for NIR Brothers Coffee
import filterCoffeeImg from '../assets/images/filter_coffee.jpg';
import strongBlendImg from '../assets/images/strong_blend.jpg';
import premiumBlendImg from '../assets/images/premium_blend.jpg';
import chicoryCoffeeImg from '../assets/images/chicory_coffee.jpg';

const DEFAULT_PRODUCTS = [
  {
    id: 'nir-filter-coffee',
    name: 'South Indian Filter Coffee',
    tagline: 'Born in Mudigere. Crafted for Coffee Lovers.',
    description: "We proudly source our coffee from Mudigere, a region celebrated for its rich aroma, premium beans, and world-class coffee plantations. Blended with 20% high-quality chicory to deliver a strong, heavy-bodied cup with a lingering, rich aroma.",
    price: 349,
    rating: 4.8,
    reviewsCount: 124,
    image: filterCoffeeImg,
    category: 'Filter',
    blend: 'Chicory Blend (80:20)',
    weight: '250g',
    intensity: 4,
    inStock: true,
    tags: ['Best Seller', 'Traditional', 'Heavy Body'],
    specifications: {
      origin: 'Mudigere, Karnataka, India',
      roastLevel: 'Medium-Dark Roast',
      process: 'Washed & Sun-Dried',
      grindOption: 'Traditional Filter Fine',
    }
  },
  {
    id: 'nir-strong-blend',
    name: 'NIR Strong Blend (Dark Roast)',
    tagline: 'Real Taste. Intense Espresso.',
    description: 'Engineered for coffee lovers who crave a bold, punchy flavor profile. A careful selection of high-elevation Robusta beans blended with premium Arabica, roasted to a dark, glossy finish. Notes of dark cacao, roasted hazelnut, and a thick, velvet crema.',
    price: 399,
    rating: 4.9,
    reviewsCount: 88,
    image: strongBlendImg,
    category: 'Espresso',
    blend: 'Arabica-Robusta (60:40)',
    weight: '250g',
    intensity: 5,
    inStock: true,
    tags: ['Dark Roast', 'Bold', 'Espresso Blend'],
    specifications: {
      origin: 'Chikkamaglore, India',
      roastLevel: 'Dark Roast (Vienna style)',
      process: 'Washed & Pulp-Natural',
      grindOption: 'Whole Beans / Fine Espresso',
    }
  },
  {
    id: 'nir-premium-blend',
    name: 'NIR Premium Blend (Medium Roast)',
    tagline: 'Luxury Crema. Sweet Caramel Notes.',
    description: 'A 100% single-origin Arabica blend sourced from family estates in the Western Ghats. Roasted to a perfect medium profile to accentuate natural sweetness, floral acidity, and notes of milk chocolate and sweet citrus. Extremely smooth and balanced.',
    price: 449,
    rating: 4.7,
    reviewsCount: 156,
    image: premiumBlendImg,
    category: 'Single Origin',
    blend: '100% Arabica',
    weight: '250g',
    intensity: 3,
    inStock: true,
    tags: ['Single Origin', 'Medium Roast', 'Smooth'],
    specifications: {
      origin: 'Talagur, Chikkamaglore, India',
      roastLevel: 'Medium Roast',
      process: 'Honey Processed',
      grindOption: 'Whole Beans / Medium Grind',
    }
  },
  {
    id: 'nir-chicory-coffee',
    name: 'NIR Herbal Chicory Coffee',
    tagline: 'Real Connection. Natural Wellness.',
    description: 'A soothing, caffeine-reduced blend combining premium shade-grown Arabica with 40% organic roasted French chicory root. Designed for a prebiotic-rich, digestion-friendly cup that retains full-bodied roasted coffee characteristics. Notes of earthy caramel and woody nuttiness.',
    price: 329,
    rating: 4.6,
    reviewsCount: 42,
    image: chicoryCoffeeImg,
    category: 'Filter',
    blend: 'Chicory Blend (60:40)',
    weight: '250g',
    intensity: 2,
    inStock: true,
    tags: ['Low Caffeine', 'Prebiotic', 'Organic Sourced'],
    specifications: {
      origin: 'Mudigere, Chikkamaglore, India & France',
      roastLevel: 'Medium Roast',
      process: 'Washed Coffee & Dried Chicory',
      grindOption: 'Medium-Fine Filter Grind',
    }
  },
  {
    id: 'nir-cold-brew',
    name: 'NIR Cold Brew Bold Blend',
    tagline: 'Slow Steeped. Low Acid.',
    description: 'Specially coarse-ground blend of Arabica beans roasted with a unique low-temperature profile. Perfect for slow steeping in cold water. Delivers an ultra-smooth, naturally sweet, chocolatey cold brew with zero bitterness.',
    price: 429,
    rating: 4.8,
    reviewsCount: 65,
    image: strongBlendImg, // Reusing strong blend image for consistency
    category: 'Single Origin',
    blend: '100% Arabica',
    weight: '500g',
    intensity: 3,
    inStock: true,
    tags: ['Cold Brew', 'Smooth', 'Summer Pick'],
    specifications: {
      origin: 'Shevaroy Hills, India',
      roastLevel: 'Medium-Dark Roast',
      process: 'Natural Processed',
      grindOption: 'Coarse Grind',
    }
  },
  {
    id: 'nir-hazelnut-fusion',
    name: 'Hazelnut Infusion Coffee',
    tagline: 'Aromatics. Creamy Nutty Accent.',
    description: 'Premium Arabica coffee infused with organic hazelnut extracts during the roasting process. Fills your room with a heavenly nutty aroma and provides a buttery, creamy profile that pairs wonderfully with warm milk.',
    price: 379,
    rating: 4.5,
    reviewsCount: 78,
    image: premiumBlendImg, // Reusing premium blend image for consistency
    category: 'Flavored',
    blend: '100% Arabica',
    weight: '250g',
    intensity: 3,
    inStock: true,
    tags: ['Flavored', 'Aromatic', 'Hazelnut'],
    specifications: {
      origin: 'Chikkamaglore Estate, India',
      roastLevel: 'Medium Roast',
      process: 'Washed + Natural Flavor Infusion',
      grindOption: 'Medium-Fine Grind',
    }
  }
];

export const products = JSON.parse(localStorage.getItem('nir_products') || 'null') || DEFAULT_PRODUCTS;
export const getProductById = (id) => products.find(p => p.id === id);
