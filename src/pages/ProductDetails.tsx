import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, ShoppingBag, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { getProductById, ProductVariant } from '../config/products';
import { ProductGallery } from '../components/ProductGallery';
import { VariantSelector } from '../components/VariantSelector';
import { QuantitySelector } from '../components/QuantitySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { MobileOrderBar } from '../components/MobileOrderBar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { formatPrice, calculateCartTotals, isDeliveryOfferActive } from '../lib/pricing';
import { buildSingleProductWhatsAppMessage } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const offerActive = isDeliveryOfferActive();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(() => {
    return product?.variants && product.variants.length > 0 ? product.variants[0] : undefined;
  });

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      trackEvent('product_viewed', { productId: product.id, productName: product.name });
      // Reset selected variant to 250ml if product has variants
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant(undefined);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

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

  // Product JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://waziristaninaturals.vercel.app${product.image}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Waziristani Naturals'
    },
    offers: product.variants
      ? product.variants.map(v => ({
          '@type': 'Offer',
          name: `${product.name} — ${v.size}`,
          price: v.price,
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: `https://waziristaninaturals.vercel.app/products/${product.id}`
        }))
      : {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: `https://waziristaninaturals.vercel.app/products/${product.id}`
        }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 md:pb-12">
        <Breadcrumbs
          items={[
            { label: t('products'), url: '/products' },
            { label: language === 'ur' ? product.nameUrdu : product.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={product.galleryImages}
              productName={language === 'ur' ? product.nameUrdu : product.name}
              activeImage={selectedVariant?.image}
            />
          </div>

          {/* Right Column: Details & Purchase Options */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-olive-600">
                {language === 'ur' ? product.categoryUrdu : product.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-forest-950 mt-1">
                {language === 'ur' ? product.nameUrdu : product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gold-600 font-semibold mt-1">
                {language === 'ur' ? product.taglineUrdu : product.tagline}
              </p>
            </div>

            {/* Price Display */}
            <div className="p-4 rounded-2xl bg-ivory-100/80 border border-charcoal-200/60 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-charcoal-500 uppercase font-semibold block">
                  {selectedVariant ? `${selectedVariant.size} ${language === 'ur' ? 'کی قیمت' : 'Price'}` : (language === 'ur' ? 'مقررہ قیمت' : 'Standard Price')}
                </span>
                <span className="text-3xl font-serif font-black text-forest-900">
                  {formatPrice(currentPrice, language)}
                </span>
              </div>

              {quantity > 1 && (
                <div className="text-right">
                  <span className="text-[11px] text-charcoal-500 uppercase font-semibold block">
                    {language === 'ur' ? 'کل رقم' : 'Subtotal'}
                  </span>
                  <span className="text-lg font-bold text-forest-700">
                    {formatPrice(currentPrice * quantity, language)}
                  </span>
                </div>
              )}
            </div>

            {/* Variant selector (Olive Oil sizes) */}
            {product.variants && selectedVariant && (
              <div className="p-4 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm">
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-charcoal-700">
                {language === 'ur' ? 'تعداد منتخب کریں:' : 'Quantity:'}
              </span>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                size="md"
              />
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  justAdded
                    ? 'bg-forest-700 text-white'
                    : 'bg-forest-900 hover:bg-forest-800 text-gold-300'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5 text-gold-400" />
                    <span>{t('addedToCart')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-gold-400" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>

              <WhatsAppButton
                getMessage={getWhatsAppMessage}
                variant="primary"
                size="lg"
                label={t('orderViaWhatsApp')}
                className="w-full text-sm"
                eventName="whatsapp_direct_clicked"
                eventPayload={{
                  productId: product.id,
                  variantId: selectedVariant?.id,
                  quantity,
                  unitPrice: currentPrice
                }}
              />
            </div>

            {/* Delivery & Purity Notice */}
            <div className="space-y-2 pt-2">
              {offerActive && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-forest-900/5 border border-forest-900/10 text-xs text-forest-900">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">
                    {language === 'ur'
                      ? 'مفت ڈیلیوری: محدود وقت کی پیشکش کے تحت پورے پاکستان میں ترسیل مفت ہے۔'
                      : 'Free Delivery: Nationwide delivery fee waived under our current promotion.'}
                  </span>
                </div>
              )}

              {/* Super Bumper Offer Highlight */}
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-gradient-to-r from-forest-950 via-charcoal-900 to-forest-950 border border-emerald-500/40 text-xs text-gold-300 shadow-sm">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0 animate-pulse" />
                <div className="flex-1">
                  <span className="font-bold text-white block">
                    {language === 'ur' ? 'سپر بمپر آفر: 100 روپے اضافی رعایت!' : 'Super Bumper Offer: Save Extra Rs. 100!'}
                  </span>
                  <span className="text-[11px] text-ivory-200/80">
                    {product.id === 'shilajit'
                      ? (language === 'ur'
                          ? 'اس سلاجیت کے ساتھ 500 ملی لٹر یا بڑی زیتون کے تیل کی بوتل خریدیں اور پائیں فوری 100 روپے ڈسکاؤنٹ!'
                          : 'Pair this Shilajit with any 500ml or larger Zaitoon Oil bottle to get an instant Rs. 100 discount.')
                      : (language === 'ur'
                          ? '500 ملی لٹر یا بڑی بوتل منتخب کر کے ساتھ 1 خالص سلاجیت ملائیں اور پائیں 100 روپے رعایت!'
                          : 'Select 500ml+ size and bundle with Waziristani Shilajit to get an instant Rs. 100 discount.')}
                  </span>
                </div>
              </div>
            </div>

            {/* Description and Specifications */}
            <div className="border-t border-charcoal-200 pt-6 space-y-6 text-xs text-charcoal-700">
              <div>
                <h3 className="font-serif font-bold text-forest-950 text-sm mb-2">
                  {language === 'ur' ? 'تفصیلات' : 'Product Description'}
                </h3>
                <p className="leading-relaxed">
                  {language === 'ur' ? product.descriptionUrdu : product.description}
                </p>
              </div>

              <div>
                <h3 className="font-serif font-bold text-forest-950 text-sm mb-3">
                  {t('specifications')}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.details.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-charcoal-200/60">
                      <dt className="text-charcoal-400 text-[11px] font-medium">
                        {language === 'ur' ? item.labelUrdu : item.label}
                      </dt>
                      <dd className="font-semibold text-charcoal-800 mt-0.5">
                        {language === 'ur' ? item.valueUrdu : item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-serif font-bold text-forest-950 text-sm mb-2">
                  {t('usageGuidelines')}
                </h3>
                <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-charcoal-600">
                  {(language === 'ur' ? product.usageNotesUrdu : product.usageNotes).map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-charcoal-200 flex justify-between items-center text-xs">
          <Link
            to="/products"
            className="text-forest-900 font-bold hover:text-gold-600 flex items-center gap-1"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 rtl:rotate-0" />
            <span>{language === 'ur' ? 'تمام مصنوعات پر واپس جائیں' : 'Back to All Products'}</span>
          </Link>
        </div>
      </div>

      {/* Sticky Mobile Order Bar */}
      <MobileOrderBar
        product={product}
        selectedVariant={selectedVariant}
        quantity={quantity}
      />
    </>
  );
};
