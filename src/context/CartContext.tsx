import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartTotals } from '../types';
import { loadCartFromStorage, saveCartToStorage, addItemToCartList } from '../lib/cart';
import { calculateCartTotals } from '../lib/pricing';
import { useToast } from './ToastContext';
import { useLanguage } from './LanguageContext';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, 'id'>, openDrawer?: boolean) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const { language } = useLanguage();

  // Save to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const totals = calculateCartTotals(items);

  const addItem = (item: Omit<CartItem, 'id'>, openDrawer: boolean = false) => {
    setItems(current => addItemToCartList(current, item));
    const title = language === 'ur' ? item.productNameUrdu : item.productName;
    const variant = item.variantSize ? ` (${item.variantSize})` : '';
    const msg = language === 'ur'
      ? `${title}${variant} ٹوکری میں شامل ہو گیا`
      : `Added ${title}${variant} to cart`;
    showToast(msg, 'success');
    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const removeItem = (lineId: string) => {
    setItems(current => {
      const removed = current.find(i => i.id === lineId);
      if (removed) {
        const title = language === 'ur' ? removed.productNameUrdu : removed.productName;
        const msg = language === 'ur'
          ? `${title} ٹوکری سے ہٹا دیا گیا`
          : `Removed ${title} from cart`;
        showToast(msg, 'info');
      }
      return current.filter(i => i.id !== lineId);
    });
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(lineId);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.id === lineId ? { ...item, quantity: Math.max(1, Math.floor(quantity)) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    const msg = language === 'ur' ? 'ٹوکری خالی کر دی گئی' : 'Cart emptied';
    showToast(msg, 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isDrawerOpen,
        setIsDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
