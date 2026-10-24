import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '../config/products';
import { WhatsAppButton } from './WhatsAppButton';
import { formatPrice, calculateCartTotals } from '../lib/pricing';
import { buildSingleProductWhatsAppMessage } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface MobileOrderBarProps {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export const MobileOrderBar: React.FC<MobileOrderBarProps> = ({
  product,
  selectedVariant,
  quantity
}) => {
  const { addItem } = useCart();
  const { language } = useLanguage();

  const currentPrice = selectedVariant ? selectedVariant.price : (product.price || 0);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantSize: selectedVariant?.size,
      unitPrice: currentPrice,
      quantity,
      image: product.image
    }, true);
  };

  const getWhatsAppMessage = () => {
    const singleTotals = calculateCartTotals([
      {
        id: 'temp',
        productId: product.id,
        variantId: selectedVariant?.id,
        productName: product.name,
        productNameUrdu: product.nameUrdu,
        variantSize: selectedVariant?.size,
        unitPrice: currentPrice,
        quantity,
        image: product.image
      }
    ]);
    return buildSingleProductWhatsAppMessage(
      product.name,
      selectedVariant?.size,
      currentPrice,
      quantity,
      singleTotals
    );
  };

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal-200/80 p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-slide-up"
      role="region"
      aria-label="Quick order bar"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="shrink-0">
          <div className="text-[11px] text-charcoal-500 font-medium">
            {selectedVariant ? selectedVariant.size : (language === 'ur' ? 'کل رقم' : 'Price')}
          </div>
          <div className="text-lg font-bold text-forest-950 font-serif leading-tight">
            {formatPrice(currentPrice * quantity, language)}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
            <span>{language === 'ur' ? 'ٹوکری' : 'Add'}</span>
          </button>

          <WhatsAppButton
            getMessage={getWhatsAppMessage}
            variant="primary"
            size="sm"
            label={language === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}
            className="text-xs py-2.5"
            eventName="whatsapp_direct_clicked"
            eventPayload={{
              productId: product.id,
              variantId: selectedVariant?.id,
              quantity,
              unitPrice: currentPrice
            }}
          />
        </div>
      </div>
    </div>
  );
};
