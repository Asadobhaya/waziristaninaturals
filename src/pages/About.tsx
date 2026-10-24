import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mountain, Leaf, ArrowRight, HeartHandshake } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: t('about') }]} />

      {/* Hero Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gold-400/80 shadow-2xl p-0.5 bg-forest-950 animate-pulse" style={{ animationDuration: '6s' }}>
          <img
            src="/assets/images/waziristani-logo.png"
            alt="WAZIRISTANI Royal Seal"
            className="w-full h-full object-cover rounded-full"
            width="96"
            height="96"
          />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-olive-600">
          {language === 'ur' ? 'ہماری پہچان اور مقصد' : 'Our Purpose & Philosophy'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-forest-950">
          {t('aboutTitle')}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* Narrative Story Sections */}
      <div className="max-w-4xl mx-auto space-y-12 text-charcoal-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center mb-2">
            <Mountain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-forest-950">
            {t('storyHeading1')}
          </h2>
          <p className="text-charcoal-600 leading-relaxed">
            {t('storyParagraph1')}
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center mb-2">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-forest-950">
            {t('storyHeading2')}
          </h2>
          <p className="text-charcoal-600 leading-relaxed">
            {t('storyParagraph2')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-ivory-100 border border-charcoal-200/60">
              <span className="font-serif font-bold text-forest-950 block text-sm">
                {language === 'ur' ? 'وزیرستانی زیتون کا تیل' : 'Waziristani Zaitoon Oil'}
              </span>
              <span className="text-xs text-charcoal-500 mt-1 block">
                {language === 'ur' ? 'چار سائزز: 250 ملی لٹر، 500 ملی لٹر، 750 ملی لٹر اور 1 لٹر' : '4 Sizes: 250ml (Rs. 1,700), 500ml (Rs. 3,300), 750ml (Rs. 5,100), 1000ml (Rs. 6,200)'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-ivory-100 border border-charcoal-200/60">
              <span className="font-serif font-bold text-forest-950 block text-sm">
                {language === 'ur' ? 'وزیرستانی خالص سلاجیت' : 'Waziristani Shilajit'}
              </span>
              <span className="text-xs text-charcoal-500 mt-1 block">
                {language === 'ur' ? 'خالص پہاڑی معدنی رال: 2,000 روپے' : 'Concentrated mountain resin: Rs. 2,000 per sealed jar'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-charcoal-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-forest-950">
            {t('storyHeading3')}
          </h2>
          <p className="text-charcoal-600 leading-relaxed">
            {t('storyParagraph3')}
          </p>
        </div>

        {/* Disclosure Note */}
        <div className="p-6 rounded-2xl bg-ivory-100/80 border border-charcoal-200/50 text-xs text-charcoal-600 leading-relaxed flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-forest-950 block mb-0.5">
              {language === 'ur' ? 'ہمارا سچائی کا عہد' : 'Our Commitment to Integrity'}
            </strong>
            <span>
              {language === 'ur'
                ? 'ہم کسی قسم کے من گھڑت طبی یا غیر تصدیق شدہ سرٹیفیکیشن کے دعوے نہیں کرتے۔ ہماری تمام اشیاء کا مقصد روایتی قدرتی استعمال ہے۔'
                : 'We strictly refrain from fabricating unverified lab statistics or disease-cure claims. Waziristani Naturals delivers authentic natural provisions with honest representation.'}
            </span>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="text-center pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 font-bold text-sm shadow-md transition-all"
          >
            <span>{t('shopNow')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};
