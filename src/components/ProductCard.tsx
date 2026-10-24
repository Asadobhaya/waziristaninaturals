import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Eye, Check, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '../config/products';
import { VariantSelector } from './VariantSelector';
import { QuantitySelector } from './QuantitySelector';
import { WhatsAppButton } from './WhatsAppButton';
import { formatPrice, calculateCartTotals } from '../lib/pricing';
import { buildSingleProductWhatsAppMessage } from '../lib/whatsapp';
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

  // If product has variants, default to first variant (250ml at 1700)
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
      variantSize: selectedVariant?.size,
      unitPrice: currentPrice,
      quantity,
      image: selectedVariant?.image || product.image
    }, true);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
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
        image: selectedVariant?.image || product.image
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
      className={`group bg-white rounded-3xl border border-charcoal-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-ivory-100 overflow-hidden flex items-center justify-center p-6 border-b border-charcoal-100">
        <img
          src={displayImage}
          alt={language === 'ur' ? product.nameUrdu : product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          loading="lazy"
          width="400"
          height="400"
        />

        {product.badge && (
          <span className="absolute top-4 left-4 bg-forest-900/90 backdrop-blur-sm text-gold-300 text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full border border-gold-400/30 uppercase">
            {language === 'ur' ? (product.badgeUrdu || product.badge) : product.badge}
          </span>
        )}

        <Link
          to={`/products/${product.id}`}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-forest-900 hover:bg-forest-900 hover:text-white p-2.5 rounded-full shadow-md transition-all duration-200"
          aria-label={language === 'ur' ? `${product.nameUrdu} کی تفصیلات دیکھیں` : `View details for ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xs font-semibold text-olive-600 tracking-wider uppercase mb-1">
            {language === 'ur' ? product.categoryUrdu : product.category}
          </div>

          <h3 className="text-xl font-serif font-bold text-forest-950 group-hover:text-forest-800 transition-colors">
            <Link to={`/products/${product.id}`}>
              {language === 'ur' ? product.nameUrdu : product.name}
            </Link>
          </h3>

          <p className="text-xs text-charcoal-600 mt-1.5 line-clamp-2 leading-relaxed">
            {language === 'ur' ? product.descriptionUrdu : product.description}
          </p>
        </div>

        {/* Variant Selector (if product has sizes, e.g. Zaitoon Oil) */}
        {product.variants && selectedVariant && (
          <div className="pt-2">
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleVariantChange}
            />
          </div>
        )}

        {/* Super Bumper eligibility callout */}
        {product.id === 'shilajit' && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-forest-950 to-charcoal-900 text-gold-300 text-[11px] border border-emerald-500/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium">
              {language === 'ur'
                ? 'سپر بمپر: 500ml+ تیل کے ساتھ 100 روپے رعایت!'
                : 'Super Bumper: Save Rs. 100 with 500ml+ Olive Oil!'}
            </span>
          </div>
        )}

        {product.id === 'zaitoon-oil' && selectedVariant && selectedVariant.id !== '250ml' && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-forest-950 to-charcoal-900 text-gold-300 text-[11px] border border-emerald-500/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium">
              {language === 'ur'
                ? 'سپر بمپر: سلاجیت کے ساتھ 100 روپے رعایت کی اہل سائز!'
                : 'Super Bumper: Pair with Shilajit for Rs. 100 off!'}
            </span>
          </div>
        )}

        {/* Price and Dynamic Subtotal Display */}
        <div className="pt-2 border-t border-charcoal-100 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] text-charcoal-400 uppercase font-medium">
              {language === 'ur' ? 'قیمت' : 'Price'}
            </div>
            <div className="text-2xl font-serif font-bold text-forest-900">
              {formatPrice(currentPrice, language)}
            </div>
          </div>

          {quantity > 1 && (
            <div className="text-right">
              <div className="text-[11px] text-charcoal-400 uppercase font-medium">
                {language === 'ur' ? 'کل رقم' : 'Subtotal'}
              </div>
              <div className="text-sm font-semibold text-forest-700">
                {formatPrice(currentPrice * quantity, language)}
              </div>
            </div>
          )}
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-charcoal-600">
              {language === 'ur' ? 'تعداد:' : 'Qty:'}
            </span>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              size="md"
              className="flex-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-2.5 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                justAdded
                  ? 'bg-forest-700 text-white shadow-inner'
                  : 'bg-forest-900 hover:bg-forest-800 text-gold-300 shadow-md hover:shadow'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ur' ? 'شامل ہو گیا!' : 'Added!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ur' ? 'ٹوکری میں ڈالیں' : 'Add to Cart'}</span>
                </>
              )}
            </button>

            <WhatsAppButton
              getMessage={getWhatsAppMessage}
              variant="primary"
              size="sm"
              label={language === 'ur' ? 'واٹس ایپ آرڈر' : 'Order on WA'}
              className="w-full text-xs"
              eventName="whatsapp_direct_clicked"
              eventPayload={{
                productId: product.id,
                variantId: selectedVariant?.id,
                quantity,
                unitPrice: currentPrice
              }}
            />
          </div>

          <Link
            to={`/products/${product.id}`}
            className="w-full py-2 text-center text-xs font-semibold text-forest-800 hover:text-gold-600 hover:underline flex items-center justify-center gap-1 transition-colors"
          >
            <span>{language === 'ur' ? 'مکمل معلومات اور گیلری' : 'View Full Details & Specs'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};
