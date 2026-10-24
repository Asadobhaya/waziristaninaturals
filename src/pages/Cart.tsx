import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../components/CartItem';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { formatPrice } from '../lib/pricing';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const Cart: React.FC = () => {
  const { items, totals, clearCart } = useCart();
  const { t, language } = useLanguage();

  const handleClear = () => {
    if (window.confirm(t('confirmClearCart'))) {
      clearCart();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: t('cart') }]} />

      <div className="flex items-center justify-between pb-4 border-b border-charcoal-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-forest-950">
            {t('yourCart')}
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {totals.itemCount} {t('itemsInCart')}
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('clearCart')}</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-ivory-100 text-forest-900/30 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-serif font-bold text-forest-950">
            {t('cartEmptyTitle')}
          </h2>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            {t('cartEmptyDesc')}
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 text-xs font-bold shadow-md hover:bg-forest-800 transition-all"
            >
              <span>{t('continueShopping')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Super Bumper Offer Banner or Prompt */}
            {totals.isBundleDiscountActive ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-forest-950 via-charcoal-900 to-forest-950 border border-gold-400/50 shadow-md flex items-center gap-3 text-xs text-gold-300 font-medium">
                <Sparkles className="w-5 h-5 text-gold-400 shrink-0 animate-pulse" />
                <span>{t('superBumperUnlocked')}</span>
              </div>
            ) : (
              (() => {
                const hasShilajit = items.some(i => i.productId === 'shilajit' && i.quantity >= 1);
                const hasQualifyingOil = items.some(
                  i => i.productId === 'zaitoon-oil' &&
                  (i.variantId === '500ml' || i.variantId === '750ml' || i.variantId === '1000ml') &&
                  i.quantity >= 1
                );
                if (hasShilajit && !hasQualifyingOil) {
                  return (
                    <div className="p-3.5 rounded-2xl bg-forest-900/5 border border-dashed border-forest-900/30 flex items-center gap-3 text-xs text-forest-900">
                      <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{t('superBumperAddOilPrompt')}</span>
                    </div>
                  );
                }
                if (hasQualifyingOil && !hasShilajit) {
                  return (
                    <div className="p-3.5 rounded-2xl bg-forest-900/5 border border-dashed border-forest-900/30 flex items-center gap-3 text-xs text-forest-900">
                      <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{t('superBumperAddShilajitPrompt')}</span>
                    </div>
                  );
                }
                return null;
              })()
            )}

            {totals.isDeliveryFree && (
              <div className="p-4 rounded-2xl bg-forest-900/5 border border-forest-900/15 flex items-center gap-3 text-xs text-forest-900 font-medium">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {language === 'ur'
                    ? 'آپ کا آرڈر محدود وقت کی مفت ڈیلیوری پیشکش کا اہل ہے!'
                    : 'Your order qualifies for the limited-time nationwide Free Delivery offer!'}
                </span>
              </div>
            )}
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-white border border-charcoal-200/90 shadow-sm space-y-5 sticky top-24">
              <h2 className="font-serif font-bold text-forest-950 text-lg border-b border-charcoal-100 pb-3">
                {t('orderSummary')}
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-charcoal-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-charcoal-900">
                    {formatPrice(totals.subtotal, language)}
                  </span>
                </div>

                {totals.isBundleDiscountActive && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{t('superBumperDiscount')}</span>
                    <span>- {formatPrice(totals.bundleDiscount, language)}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal-600">
                  <span>{t('deliveryFee')}</span>
                  <span className={totals.isDeliveryFree ? 'font-bold text-emerald-700' : 'font-semibold text-charcoal-900'}>
                    {totals.isDeliveryFree
                      ? (language === 'ur' ? 'مفت' : 'Free')
                      : (language === 'ur' ? totals.deliveryStatusTextUrdu : totals.deliveryStatusText)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-forest-950 pt-3 border-t border-charcoal-100">
                  <span>{t('totalAmount')}</span>
                  <span className="text-xl font-serif font-black text-forest-900">
                    {formatPrice(totals.total, language)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/checkout"
                  className="w-full py-4 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <div className="flex items-center gap-2 text-[11px] text-charcoal-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>{language === 'ur' ? 'آرڈر کی تصدیق اور ڈسپیچ واٹس ایپ پر' : 'Verified order dispatch with representatives'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
