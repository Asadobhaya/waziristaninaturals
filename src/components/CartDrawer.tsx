import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Trash2, Truck, Sparkles } from 'lucide-react';
import { CartItem } from './CartItem';
import { formatPrice } from '../lib/pricing';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const { items, totals, isDrawerOpen, setIsDrawerOpen, clearCart } = useCart();
  const { t, language } = useLanguage();

  if (!isDrawerOpen) return null;

  const handleClear = () => {
    if (window.confirm(t('confirmClearCart'))) {
      clearCart();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-ivory-50 shadow-2xl border-l rtl:border-l-0 rtl:border-r border-charcoal-200/80 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-charcoal-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif font-bold text-forest-950 text-lg">
                  {t('yourCart')}
                </h2>
                <p className="text-xs text-charcoal-500">
                  {totals.itemCount} {t('itemsInCart')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-ivory-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-100 text-forest-900/40 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-forest-950 text-base">
                    {t('cartEmptyTitle')}
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1 max-w-xs">
                    {t('cartEmptyDesc')}
                  </p>
                </div>
                <Link
                  to="/products"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-gold-300 font-semibold text-xs shadow-md hover:bg-forest-800 transition-all"
                >
                  <span>{t('continueShopping')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 text-xs text-charcoal-500">
                  <span>{language === 'ur' ? 'منتخب اشیاء' : 'Selected Items'}</span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1 text-rose-700 hover:underline hover:text-rose-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('clearCart')}</span>
                  </button>
                </div>

                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}

                {/* Super Bumper Offer Active Banner or Prompt */}
                {totals.isBundleDiscountActive ? (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-forest-950 to-charcoal-900 border border-gold-400/50 shadow-md flex items-center gap-2.5 text-xs text-gold-300 font-medium animate-pulse-glow">
                    <Sparkles className="w-4 h-4 text-gold-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
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
                        <div className="p-2.5 rounded-xl bg-forest-900/5 border border-dashed border-forest-900/30 flex items-center gap-2 text-xs text-forest-900">
                          <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{t('superBumperAddOilPrompt')}</span>
                        </div>
                      );
                    }
                    if (hasQualifyingOil && !hasShilajit) {
                      return (
                        <div className="p-2.5 rounded-xl bg-forest-900/5 border border-dashed border-forest-900/30 flex items-center gap-2 text-xs text-forest-900">
                          <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{t('superBumperAddShilajitPrompt')}</span>
                        </div>
                      );
                    }
                    return null;
                  })()
                )}

                {/* Delivery Promo Pill */}
                {totals.isDeliveryFree && (
                  <div className="p-3 rounded-xl bg-forest-900/5 border border-forest-900/15 flex items-center gap-2.5 text-xs text-forest-900 font-medium">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {language === 'ur'
                        ? 'محدود وقت کی پیشکش: آپ کے آرڈر پر مفت ڈیلیوری شامل ہے!'
                        : 'Limited-Time Offer: Free Delivery included on this order!'}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-charcoal-200/80 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
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

                <div className="flex justify-between text-sm font-bold text-forest-950 pt-2 border-t border-charcoal-100">
                  <span>{t('totalAmount')}</span>
                  <span className="text-base text-forest-900 font-serif">
                    {formatPrice(totals.total, language)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <p className="text-[11px] text-center text-charcoal-500 leading-tight">
                  {t('orderRequestNotice')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
