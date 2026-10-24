import { getProductById } from '../config/products';
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'waziristani_cart_v1';

/**
 * Reconcile stored cart items against the authoritative product configuration.
 * Fixes any corrupted or stale prices, variants, or missing items.
 */
export function reconcileCartItems(storedItems: unknown): CartItem[] {
  if (!Array.isArray(storedItems)) {
    return [];
  }

  const validItems: CartItem[] = [];

  for (const raw of storedItems) {
    if (!raw || typeof raw !== 'object') continue;

    const productId = typeof raw.productId === 'string' ? raw.productId : '';
    const variantId = typeof raw.variantId === 'string' ? raw.variantId : undefined;
    const rawQty = Number(raw.quantity);
    const quantity = !isNaN(rawQty) && rawQty > 0 ? Math.floor(rawQty) : 1;

    const product = getProductById(productId);
    if (!product) {
      // Product no longer exists in catalog
      continue;
    }

    if (product.variants && product.variants.length > 0) {
      // Olive oil product with variants
      const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
      validItems.push({
        id: `${product.id}_${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        productName: product.name,
        productNameUrdu: product.nameUrdu,
        variantSize: variant.size,
        unitPrice: variant.price, // Always use authoritative price from config!
        quantity,
        image: product.image
      });
    } else if (product.price !== undefined) {
      // Shilajit or single price product
      validItems.push({
        id: `${product.id}_standard`,
        productId: product.id,
        variantId: undefined,
        productName: product.name,
        productNameUrdu: product.nameUrdu,
        variantSize: undefined,
        unitPrice: product.price, // Authoritative price!
        quantity,
        image: product.image
      });
    }
  }

  return validItems;
}

/**
 * Load cart from localStorage with schema reconciliation
 */
export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return reconcileCartItems(parsed);
  } catch (e) {
    console.warn('Failed to parse cart from localStorage:', e);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save cart to localStorage:', e);
  }
}

/**
 * Helper to add or merge item in a cart items array
 */
export function addItemToCartList(
  currentItems: CartItem[],
  newItem: Omit<CartItem, 'id'>
): CartItem[] {
  const lineId = `${newItem.productId}_${newItem.variantId || 'standard'}`;
  const existingIndex = currentItems.findIndex(i => i.id === lineId);

  if (existingIndex > -1) {
    // Increment quantity
    return currentItems.map((item, idx) => {
      if (idx === existingIndex) {
        return {
          ...item,
          quantity: item.quantity + (newItem.quantity || 1)
        };
      }
      return item;
    });
  }

  return [
    ...currentItems,
    {
      ...newItem,
      id: lineId,
      quantity: Math.max(1, newItem.quantity || 1)
    }
  ];
}
