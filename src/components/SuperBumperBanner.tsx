import React, { useState } from 'react';
import { Sparkles, Plus, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../lib/pricing';
import { trackEvent } from '../lib/analytics';

interface SuperBumperBannerProps {
  className?: string;
}

export const SuperBumperBanner: React.FC<SuperBumperBannerProps> = ({ className = '' }) => {
  const { addItem, setIsDrawerOpen } = useCart();
  const { language } = useLanguage();
  const [claimed, setClaimed] = useState(false);

  const handleClaimBundle = () => {
    // Add 1 x Shilajit
    addItem({
      productId: 'shilajit',
      productName: 'Waziristani Shilajit',
      productNameUrdu: 'وزیرستانی گولڈ سلاجیت',
      unitPrice: 2000,
      quantity: 1,
      image: '/assets/images/products/shilajit-top.jpg'
    }, false);

    // Add 1 x 500ml Zaitoon Oil
    addItem({
      productId: 'zaitoon-oil',
      variantId: '500ml',
      productName: 'Waziristani Zaitoon Oil',
      productNameUrdu: 'وزیرستانی زیتون کا تیل',
      variantSize: '500 ml',
      unitPrice: 3300,
      quantity: 1,
      image: '/assets/images/products/zaitoon-oil-500ml.jpg'
    }, true);

    setClaimed(true);
    trackEvent('super_bumper_bundle_claimed', {
      bundle: 'shilajit_plus_500ml_oil',
      discount: 100
    });

    setTimeout(() => {
      setClaimed(false);
      setIsDrawerOpen(true);
    }, 800);
  };

  return (
    <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07160F] via-[#0A0D0B] to-[#121614] border-2 border-emerald-500/40 text-ivory-50 shadow-2xl p-6 sm:p-8 lg:p-10 animate-border-glow ${className}`}>
      {/* Decorative Radial Ambient Glow with subtle breathing */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Offer Details */}
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left rtl:lg:text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-gold-400/50 text-gold-300 text-xs font-bold tracking-wider uppercase shadow-inner animate-badge-heartbeat">
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{language === 'ur' ? 'خصوصی پیشکش • سپر بمپر آفر' : 'Exclusive Deal • Super Bumper Offer'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white leading-tight">
            {language === 'ur' ? (
              <>
                سلاجیت + زیتون کا تیل خریدیں اور پائیں{' '}
                <span className="text-gold-400 underline decoration-emerald-500 decoration-4">100 روپے اضافی رعایت!</span>
              </>
            ) : (
              <>
                Buy Shilajit + 500ml+ Olive Oil & Get{' '}
                <span className="text-gold-400 underline decoration-emerald-500 decoration-4">Rs. 100 Extra Discount!</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-ivory-100/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {language === 'ur'
              ? 'جب بھی آپ خریداری کی ٹوکری میں 1 خالص سلاجیت (10 گرام) اور 500 ملی لٹر یا اس سے بڑی زیتون کے تیل کی بوتل شامل کریں گے، آپ کو کل بل پر فوری 100 روپے کی اضافی رعایت خودکار طریقے سے مل جائے گی!'
              : 'Combine 1 pure high-altitude Shilajit (10 G jar with measuring spoon) with any 500ml, 750ml, or 1000ml Zaitoon Oil bottle to automatically unlock an instant Rs. 100 bundle discount on your order!'}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-900/60 border border-emerald-500/30 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'ur' ? 'مفت ڈیلیوری شامل' : 'Free Delivery Included'}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-forest-900/60 border border-gold-400/30 text-xs text-gold-300 font-semibold animate-pulse">
              {language === 'ur' ? 'فوری ڈسکاؤنٹ: 100 روپے منفی' : 'Instant Savings: -Rs. 100'}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Bundle Box & 1-Click Action */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md bg-gradient-to-b from-forest-950/90 to-charcoal-900/90 rounded-2xl border border-emerald-500/30 p-5 shadow-xl text-center space-y-4">
            {/* Visual Thumbnail Pair with subtle floating animation */}
            <div className="flex items-center justify-center gap-3">
              {/* Shilajit Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-charcoal-950 border border-charcoal-700 p-2 flex flex-col items-center justify-center shadow-md animate-float-slow hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/images/products/shilajit-top.jpg"
                  alt="Waziristani Shilajit 10G"
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
                <span className="absolute bottom-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-gold-300 font-bold">
                  Rs. 2,000
                </span>
              </div>

              {/* Plus Sign */}
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold shadow-lg border border-emerald-400/40 animate-pulse">
                <Plus className="w-4 h-4" />
              </div>

              {/* 500ml Oil Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-charcoal-950 border border-charcoal-700 p-2 flex flex-col items-center justify-center shadow-md animate-float-alt hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/images/products/zaitoon-oil-500ml.jpg"
                  alt="Waziristani Zaitoon Oil 500ml"
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
                <span className="absolute bottom-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-emerald-300 font-bold">
                  Rs. 3,300
                </span>
              </div>
            </div>

            {/* Price Calculation Banner */}
            <div className="bg-forest-950/80 rounded-xl p-3 border border-charcoal-800 flex items-center justify-between text-xs">
              <div className="text-left rtl:text-right">
                <span className="text-[11px] text-charcoal-400 line-through block">
                  Rs. 5,300
                </span>
                <span className="text-sm sm:text-base font-serif font-black text-gold-400">
                  Rs. 5,200
                </span>
              </div>

              <div className="text-right rtl:text-left">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block animate-pulse">
                  {language === 'ur' ? '100 روپے کی بچت' : 'Extra Rs. 100 Off'}
                </span>
                <span className="text-[10px] text-ivory-200/70">
                  {language === 'ur' ? 'مفت ڈیلیوری کے ساتھ' : '+ Free Nationwide Shipping'}
                </span>
              </div>
            </div>

            {/* 1-Click Bundle Add CTA with interactive sheen */}
            <button
              type="button"
              onClick={handleClaimBundle}
              disabled={claimed}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-forest-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:shadow-emerald-500/25 hover:shadow-2xl disabled:opacity-90 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              {claimed ? (
                <>
                  <Check className="w-5 h-5 text-forest-950" />
                  <span>{language === 'ur' ? 'ٹوکری میں شامل ہو گیا!' : 'Bundle Added to Cart!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-forest-950" />
                  <span>{language === 'ur' ? 'بنڈل خریدیں (100 روپے رعایت)' : 'Claim Bundle & Save Rs. 100'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
