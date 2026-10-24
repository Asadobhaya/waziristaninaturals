import { BusinessContact } from '../config/business';

export type Language = 'en' | 'ur';

export interface CartItem {
  id: string; // unique identifier: `${productId}_${variantId || 'standard'}`
  productId: string;
  variantId?: string;
  productName: string;
  productNameUrdu: string;
  variantSize?: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  isDeliveryFree: boolean;
  bundleDiscount: number;
  isBundleDiscountActive: boolean;
  total: number;
  deliveryStatusText: string;
  deliveryStatusTextUrdu: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  preferredContactId: string; // 'nabeel' | 'asad'
}

export interface OrderSubmissionPayload {
  customer: CustomerDetails;
  items: CartItem[];
  totals: CartTotals;
  contact: BusinessContact;
}
