import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Truck, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { products } from '../config/products';
import { ProductCard } from '../components/ProductCard';
import { SuperBumperBanner } from '../components/SuperBumperBanner';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { buildGeneralInquiryWhatsAppMessage } from '../lib/whatsapp';
import { isDeliveryOfferActive, getPromotionTimeRemaining } from '../lib/pricing';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const offerActive = isDeliveryOfferActive();
  const timeRemaining = getPromotionTimeRemaining();

  const getInquiryMessage = () => {
    return buildGeneralInquiryWhatsAppMessage('Direct Order / Inquiry from Homepage');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-forest-950 text-ivory-50 pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-forest-900">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-forest-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              {/* Promo Badge & Brand Tagline */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-gold-400/40 text-gold-300 text-xs font-semibold backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>{offerActive ? t('freeDeliveryBadge') : t('authenticPurityBadge')}</span>
                </div>
                <span className="text-xs font-bold tracking-widest text-gold-300/90 uppercase border-l rtl:border-l-0 rtl:border-r border-gold-400/30 pl-3 rtl:pl-0 rtl:pr-3 hidden sm:inline-block">
                  {t('brandTagline')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-ivory-50">
                {t('heroTitle')}
              </h1>

              <p className="text-sm sm:text-lg text-ivory-100/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t('heroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm shadow-xl hover:shadow-gold-500/20 transition-all active:scale-95"
                >
                  <span>{t('shopNow')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <WhatsAppButton
                  getMessage={getInquiryMessage}
                  variant="secondary"
                  size="lg"
                  label={t('orderOnWhatsApp')}
                  className="w-full sm:w-auto text-sm"
                  eventName="whatsapp_direct_clicked"
                  eventPayload={{ source: 'hero_cta' }}
                />
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-forest-900 text-xs text-ivory-100/70">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>4 Sizes: 250ml - 1 Litre</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Pure Shilajit Rs. 2,000</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Direct WhatsApp Handoff</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Feature Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-forest-900 to-forest-950 p-6 border border-gold-400/30 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Floating Brand Emblem Seal */}
                <div className="absolute top-4 right-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold-400/80 shadow-2xl bg-forest-950/90 backdrop-blur-sm p-0.5 transform hover:rotate-12 transition-transform duration-300">
                  <img
                    src="/assets/images/waziristani-logo.png"
                    alt="WAZIRISTANI Royal Seal"
                    className="w-full h-full object-cover rounded-full"
                    width="64"
                    height="64"
                  />
                </div>

                <img
                  src="/assets/images/products/combo-bundle-board.jpg"
                  alt="Waziristani Zaitoon Oil and Shilajit"
                  className="w-full h-full object-cover rounded-2xl filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  width="450"
                  height="450"
                />

                <div className="absolute bottom-4 inset-x-4 bg-forest-950/90 backdrop-blur-md rounded-2xl p-3 border border-forest-800 text-center">
                  <span className="text-xs font-semibold text-gold-300 block">
                    {language === 'ur' ? 'اصلی سوغاتِ وزیرستان' : 'Authentic Waziristani Essentials'}
                  </span>
                  <span className="text-[11px] text-ivory-100/70">
                    {language === 'ur' ? 'زیتون کا تیل اور خالص سلاجیت' : 'Olive Oil (4 Sizes) & High-Altitude Shilajit'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-forest-950 text-base">{t('feature1Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('feature1Desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-forest-950 text-base">{t('feature2Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('feature2Desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-forest-950 text-base">{t('feature3Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('feature3Desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-forest-950 text-base">{t('feature4Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('feature4Desc')}</p>
          </div>
        </div>
      </section>

      {/* Signature Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="products">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-olive-600">
            {language === 'ur' ? 'خالص اور سچی مصنوعات' : 'Carefully Curated'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-forest-950">
            {t('ourCatalog')}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            {t('catalogSubtitle')}
          </p>
        </div>

        {/* 2 Main Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Super Bumper Offer Showcase */}
        <div className="max-w-5xl mx-auto pt-6">
          <SuperBumperBanner />
        </div>
      </section>

      {/* Promotional Banner (if offer is active) */}
      {offerActive && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-ivory-50 p-8 sm:p-12 border border-gold-400/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left rtl:md:text-right max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-forest-950 text-xs font-bold uppercase tracking-wider">
                {language === 'ur' ? 'محدود وقت کی رعایت' : 'Limited-Time Promotion'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-50">
                {language === 'ur'
                  ? 'پورے پاکستان میں تمام آرڈرز پر مفت ڈیلیوری'
                  : 'Free Delivery on All Orders Across Pakistan'}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-100/80 leading-relaxed">
                {language === 'ur'
                  ? 'چاہے آپ زیتون کے تیل کی ایک بوتل منگوائیں یا خالص سلاجیت، ڈلیوری کے کوئی اضافی چارجز وصول نہیں کیے جائیں گے۔'
                  : 'Order any size of Waziristani Olive Oil or Shilajit resin and enjoy complimentary doorstep delivery.'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="text-xs text-gold-300 font-medium">
                {t('promoEndsIn')}
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-forest-950/90 border border-gold-400/30 rounded-xl px-3 py-2 text-center min-w-[55px]">
                  <span className="text-xl font-bold font-mono text-gold-400 block leading-tight number-ltr">{timeRemaining.days}</span>
                  <span className="text-[10px] text-ivory-100/60 uppercase">{t('days')}</span>
                </div>
                <div className="bg-forest-950/90 border border-gold-400/30 rounded-xl px-3 py-2 text-center min-w-[55px]">
                  <span className="text-xl font-bold font-mono text-gold-400 block leading-tight number-ltr">{timeRemaining.hours}</span>
                  <span className="text-[10px] text-ivory-100/60 uppercase">{t('hours')}</span>
                </div>
                <div className="bg-forest-950/90 border border-gold-400/30 rounded-xl px-3 py-2 text-center min-w-[55px]">
                  <span className="text-xl font-bold font-mono text-gold-400 block leading-tight number-ltr">{timeRemaining.minutes}</span>
                  <span className="text-[10px] text-ivory-100/60 uppercase">{t('minutes')}</span>
                </div>
                <div className="bg-forest-950/90 border border-gold-400/30 rounded-xl px-3 py-2 text-center min-w-[55px]">
                  <span className="text-xl font-bold font-mono text-gold-400 block leading-tight number-ltr">{timeRemaining.seconds}</span>
                  <span className="text-[10px] text-ivory-100/60 uppercase">{t('seconds')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-Step Ordering Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-forest-950">
            {t('howItWorks')}
          </h2>
          <p className="text-xs text-charcoal-600">
            {language === 'ur'
              ? 'تین آسان مراحل میں باآسانی آرڈر کریں اور براہِ راست ہمارے نمائندے سے رابطہ میں رہیں'
              : 'Effortless mobile shopping designed specifically for Pakistani customers'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-ivory-100 border border-charcoal-200/60 space-y-3">
            <span className="text-2xl font-serif font-black text-gold-500">01</span>
            <h3 className="font-bold text-base text-forest-950">{t('step1Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('step1Desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-ivory-100 border border-charcoal-200/60 space-y-3">
            <span className="text-2xl font-serif font-black text-gold-500">02</span>
            <h3 className="font-bold text-base text-forest-950">{t('step2Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('step2Desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-ivory-100 border border-charcoal-200/60 space-y-3">
            <span className="text-2xl font-serif font-black text-gold-500">03</span>
            <h3 className="font-bold text-base text-forest-950">{t('step3Title')}</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">{t('step3Desc')}</p>
          </div>
        </div>
      </section>

      {/* Brief Story Section */}
      <section className="bg-forest-900 text-ivory-50 py-16 sm:py-20 border-y border-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            {language === 'ur' ? 'ہماری سچی پہچان' : 'Authentic Sourcing'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory-50">
            {t('storyHeading1')}
          </h2>
          <p className="text-xs sm:text-base text-ivory-100/80 leading-relaxed">
            {t('storyParagraph1')}
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-300 hover:text-gold-200 underline underline-offset-4"
            >
              <span>{language === 'ur' ? 'ہماری کہانی مزید پڑھیں' : 'Read Our Full Story'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
