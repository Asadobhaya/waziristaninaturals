import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { QuantitySelector } from './QuantitySelector';
import { formatPrice } from '../lib/pricing';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { language } = useLanguage();

  const lineSubtotal = item.unitPrice * item.quantity;

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white border border-charcoal-200/70 shadow-sm hover:border-charcoal-300 transition-all">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-xl bg-ivory-100 p-2 shrink-0 border border-charcoal-100 flex items-center justify-center">
        <img
          src={item.image}
          alt={language === 'ur' ? item.productNameUrdu : item.productName}
          className="w-full h-full object-contain"
          width="80"
          height="80"
        />
      </div>

      {/* Info & Controls */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-serif font-bold text-forest-950 text-sm">
              {language === 'ur' ? item.productNameUrdu : item.productName}
            </h4>
            {item.variantSize && (
              <span className="inline-block mt-0.5 text-xs font-semibold text-olive-700 bg-olive-50 px-2 py-0.5 rounded-md border border-olive-100">
                {item.variantSize}
              </span>
            )}
            <div className="text-xs text-charcoal-600 mt-1">
              {formatPrice(item.unitPrice, language)}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label={`Remove ${item.productName} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-charcoal-100">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.id, q)}
            size="sm"
          />

          <div className="text-right">
            <span className="text-sm font-bold text-forest-900">
              {formatPrice(lineSubtotal, language)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
