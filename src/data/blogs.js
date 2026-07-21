// Mock Blog Posts for NIR Brothers Coffee
import farmImg from '../assets/images/about_farm.jpg';
import roastImg from '../assets/images/roasting_process.jpg';
import heritageImg from '../assets/images/story_heritage.jpg';

export const blogs = [
  {
    id: 'art-of-filter-coffee',
    title: 'The Sacred Ritual of South Indian Filter Coffee',
    excerpt: 'Diving deep into the traditional brewing technique, history, and secrets to pouring the perfect frothy tumbler of filter coffee.',
    image: heritageImg,
    category: 'Heritage',
    date: 'July 15, 2026',
    readTime: '5 min read',
    author: 'Noushad NIR',
    content: 'South Indian Filter Coffee is not just a beverage; it is a morning ritual, a sensory alarm, and a symbol of warm hospitality. The secret lies in the brass filter, the temperature of the water, and the aeration technique—locally known as throwing the coffee...'
  },
  {
    id: 'roast-profiles-demystified',
    title: 'From Green Bean to Dark Roast: Understanding Roast Profiles',
    excerpt: 'A comprehensive guide on how roasting changes the chemical structure, acidity, body, and taste notes of coffee beans.',
    image: roastImg,
    category: 'Roasting',
    date: 'July 08, 2026',
    readTime: '7 min read',
    author: 'Irsad NIR',
    content: 'Roasting coffee is a beautiful marriage of science and art. During roasting, sugars, proteins, and acids undergo complex reactions (like the Maillard reaction) that develop flavor compounds. A medium roast retains origin-specific floral and fruity notes, while a dark roast highlights rich roasted bitterness...'
  },
  {
    id: 'sustainable-coffee-farming',
    title: 'Shade-Grown and Eco-Friendly: Sourcing from the Western Ghats',
    excerpt: 'How shade-grown plantations conserve local biodiversity, protect soil health, and result in superior slow-matured coffee beans.',
    image: farmImg,
    category: 'Farming',
    date: 'June 28, 2026',
    readTime: '6 min read',
    author: 'Ananya Roy (Sourcing Lead)',
    content: 'Our coffee grows in harmony with nature. Nestled under dense forest canopies in Mudigere and Talagur, Chikkamaglore, NIR Brothers coffee plants thrive alongside wild cardamom, pepper vines, and orange trees. This shade-grown environment slows down cherry ripening, allowing beans to develop complex, deep sugar profiles...'
  }
];
