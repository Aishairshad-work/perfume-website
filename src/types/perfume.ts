export type FragranceGender = 'Women' | 'Men' | 'Unisex';
export type FragranceType = 'Eau de Parfum' | 'Concentré Roll-On' | 'Parfum Extrait';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  type: FragranceType;
  gender: FragranceGender;
  volume: string;
  price: number; // in USD
  pricePKR: number; // in PKR matching real reference starting from Rs 1200 / 1900
  originalPrice?: number;
  originalPricePKR?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  story: string;
  notes: FragranceNotes;
  accords: string[];
  longevity: string;
  sillage: string;
  ingredients: string[];
  inStock: boolean;
  featured?: boolean;
  heroProduct?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  linkText: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fragranceName: string;
}
