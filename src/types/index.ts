// Product-related types
export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  popularity?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
  isPreorder?: boolean;
  colors?: { id: string; name: string; hex: string; }[];
}

export interface ProductFeature {
  name: string;
  value: string;
}

export interface ProductOption {
  id: string;
  name: string;
  color: string;
}

export interface ProductReview {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
}

// User-related types
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

// Order-related types
export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

// Authentication-related types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  agreement: boolean;
}

// UI-related types
export interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  productRestock: boolean;
}

// Component props types
export interface FilterPanelProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

export interface FilterState {
  discount: boolean;
  preorder: boolean;
  inStock: boolean;
  priceRange: [number, number];
  brands: string[];
  connectionType: string[];
  lighting: string[];
  interface: string[];
}

export interface ProductCardProps {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
} 