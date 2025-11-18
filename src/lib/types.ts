// Tipos do aplicativo Padrão Color

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  image: string;
  customizable: boolean;
  options?: ProductOption[];
  tags: string[];
  popular?: boolean;
  new?: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'select' | 'number' | 'color' | 'upload';
  required: boolean;
  choices?: { label: string; value: string; priceModifier?: number }[];
  min?: number;
  max?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  customization?: Record<string, any>;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'printing' | 'shipping' | 'delivered';
  total: number;
  items: CartItem[];
  trackingCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'individual' | 'business';
  loyaltyPoints: number;
  favoriteProducts: string[];
  savedDesigns: SavedDesign[];
}

export interface SavedDesign {
  id: string;
  productId: string;
  name: string;
  customization: Record<string, any>;
  thumbnail: string;
  createdAt: string;
}

export interface AIRecommendation {
  productId: string;
  reason: string;
  confidence: number;
}
