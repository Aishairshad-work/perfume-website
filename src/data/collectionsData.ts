import { CollectionItem } from '../types/perfume';

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'women',
    title: 'Women',
    tagline: 'Embrace Elegance',
    description: 'Enchanting floral accords, velvety Bulgarian rose, and luminous amber crafted for captivating grace.',
    image: '/assets/product1.png',
    productCount: 4,
    linkText: 'SHOP WOMEN'
  },
  {
    id: 'men',
    title: 'Men',
    tagline: 'Unleash Confidence',
    description: 'Dynamic marine salts, smoky cedarwood, and magnetic Italian bergamot that announce your presence.',
    image: '/assets/hero-3.png',
    productCount: 5,
    linkText: 'SHOP MEN'
  },
  {
    id: 'unisex',
    title: 'Unisex',
    tagline: 'For Every Mood',
    description: 'Rare aged oud, warm spices, and golden resinous accords designed without boundaries.',
    image: '/assets/hero-1.png',
    productCount: 6,
    linkText: 'SHOP UNISEX'
  },
  {
    id: 'bestsellers',
    title: 'Best Sellers',
    tagline: 'Customer Favorites',
    description: 'Our most sought-after iconic creations celebrated by connoisseurs across the globe.',
    image: '/assets/hero-2.png',
    productCount: 6,
    linkText: 'EXPLORE ICONS'
  }
];
