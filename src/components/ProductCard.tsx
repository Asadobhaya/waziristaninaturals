import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product, ProductVariant } from '../config/products';
import { VariantSelector } from './VariantSelector';
import { QuantitySelector } from './QuantitySelector';
import { WhatsAppButton } from './WhatsAppButton';
import { formatPrice } from '../lib/pricing';
import { buildSimpleWhatsAppOrderMessage } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { language } = useLanguage();
  const { addItem } = useCart();

  // If product has variants, default to 250ml (Rs. 1,700)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(() => {
    return product.variants && product.variants.length > 0 ? product.variants[0] : undefined;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : (product.price || 0);
  const displayImage = selectedVariant?.image || product.image;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    trackEvent('variant_selected', {
      productId: product.id,
      variantId: variant.id,
      size: variant.size,
      price: variant.price
    });
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantSize: selectedVariant?.size || (product.id === 'shilajit' ? '10 G' : undefined),
      unitPrice: currentPrice,
      quantity,
      image: selectedVariant?.image || product.image
    }, true);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Mandated WhatsApp format: "Assalam o Alaikum, I want to order [product] [size] – Qty [n]"
  const getWhatsAppMessage = () => {
    const size = selectedVariant?.size || (product.id === 'shilajit' ? '10g' : undefined);
    return buildSimpleWhatsAppOrderMessage(product.name, size, quantity);
  };

  return (
    <div
      id={`card-${product.id}`}
      className={`group bg-white rounded-3xl border border-charcoal-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${className}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-ivory-100 overflow-hidden flex items-center justify-center p-6 border-b border-charcoal-100">
        <img
          src={displayImage}
          alt={language === 'ur' ? product.nameUrdu : product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          loading="lazy"
          width="400"
          height="400"
        />

        {/* In Stock Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-sm text-emerald-300 text-[11px] font-bold tracking-wider border border-emerald-500/40 uppercase shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'ur' ? 'دستیاب ہے (ان اسٹاک)' : 'In Stock'}</span>
          </span>

          {product.badge && (
            <span className="inline-block bg-forest-900/90 backdrop-blur-sm text-gold-300 text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full border border-gold-400/30 uppercase">
              {language === 'ur' ? (product.badgeUrdu || product.badge) : product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Product Info & Controls */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xs font-semibold text-olive-600 tracking-wider uppercase mb-1">
            {language === 'ur' ? product.categoryUrdu : product.category}
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-black text-forest-950">
            {language === 'ur' ? product.nameUrdu : product.name}
          </h3>

          {/* Short Benefit Line */}
          <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
            {product.id === 'zaitoon-oil'
              ? (language === 'ur'
                  ? 'تازہ وزیرستانی زیتون سے قدرتی طریقے سے نکالا ہوا خالص و شفاف تیل'
                  : '100% pure first cold-pressed extra virgin olive oil from Waziristan groves.')
              : (language === 'ur'
                  ? 'بلند پہاڑی چٹانوں سے روایتی فلٹریشن کے ساتھ تیار کردہ خالص رال'
                  : 'Pure high-mountain mineral resin purified with natural spring water.')}
          </p>
        </div>

        {/* Size Selector (Zaitoon Oil 4 sizes) */}
        {product.variants && selectedVariant && (
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold text-charcoal-700 uppercase tracking-wide block">
              {language === 'ur' ? 'سائز منتخب کریں:' : 'Select Bottle Size:'}
            </label>
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleVariantChange}
            />
          </div>
        )}

        {/* Super Bumper Callout */}
        {product.id === 'shilajit' && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-forest-950 to-charcoal-900 text-gold-300 text-[11px] border border-emerald-500/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium">
              {language === 'ur'
                ? 'سپر بمپر: 500ml+ تیل کے ساتھ 100 روپے بچائیں!'
                : 'Super Bumper: Save Rs. 100 when paired with 500ml+ Olive Oil!'}
            </span>
          </div>
        )}

        {/* Price & Auto-Total Display */}
        <div className="pt-3 border-t border-charcoal-100 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] text-charcoal-500 uppercase font-semibold">
              {product.id === 'shilajit'
                ? (language === 'ur' ? 'قیمت (10 گرام)' : 'Price / 10g Net Wt')
                : (language === 'ur' ? `${selectedVariant?.size} کی قیمت` : `${selectedVariant?.size} Price`)}
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-black text-forest-950">
              {formatPrice(currentPrice, language)}
              {product.id === 'shilajit' && (
                <span className="text-xs font-sans font-normal text-charcoal-500 ml-1.5">
                  / 10g
                </span>
              )}
            </div>
          </div>

          {quantity > 1 && (
            <div className="text-right">
              <div className="text-[11px] text-charcoal-500 uppercase font-semibold">
                {language === 'ur' ? 'کل رقم' : 'Auto-Total'}
              </div>
              <div className="text-base sm:text-lg font-bold text-forest-800">
                {formatPrice(currentPrice * quantity, language)}
              </div>
            </div>
          )}
        </div>

        {/* Quantity Stepper & Actions */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-charcoal-700">
              {language === 'ur' ? 'مقدار:' : 'Quantity:'}
            </span>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              size="md"
              className="flex-1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Primary Mandated Action: Order on WhatsApp */}
            <WhatsAppButton
              getMessage={getWhatsAppMessage}
              variant="primary"
              size="md"
              label={language === 'ur' ? 'واٹس ایپ پر آرڈر کریں' : 'Order on WhatsApp'}
              className="w-full text-xs sm:text-sm py-3"
              eventName="whatsapp_direct_clicked"
              eventPayload={{
                productId: product.id,
                variantId: selectedVariant?.id,
                quantity,
                unitPrice: currentPrice
              }}
            />

            {/* Secondary Action: Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] active:scale-95 ${
                justAdded
                  ? 'bg-forest-700 text-white shadow-inner'
                  : 'bg-forest-950 hover:bg-forest-900 text-gold-300 border border-gold-400/30 shadow-md'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ur' ? 'ٹوکری میں شامل!' : 'Added to Cart!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ur' ? 'ٹوکری میں ڈالیں' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick link to detailed specs */}
          <Link
            to={`/products/${product.id}`}
            className="w-full pt-1 text-center text-xs font-semibold text-charcoal-500 hover:text-forest-900 transition-colors inline-block"
          >
            {language === 'ur' ? 'مکمل لیب نوٹس اور غذائی تفصیلات &larr;' : 'View detailed lab notes & full specs &rarr;'}
          </Link>
        </div>
      </div>
    </div>
  );
};
