import React from 'react';
import { products } from '../config/products';
import { ProductCard } from '../components/ProductCard';
import { SuperBumperBanner } from '../components/SuperBumperBanner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

export const Products: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ label: t('products'), url: '/products' }]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-olive-600">
          {language === 'ur' ? 'خالص و مستند مصنوعات' : 'Heritage Collection'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-950">
          {t('ourCatalog')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          {language === 'ur'
            ? 'ہماری دونوں اصل مصنوعات شفاف اور مقررہ قیمتوں کے ساتھ دستیاب ہیں۔ اپنی ضرورت کے مطابق سائز اور تعداد منتخب کریں۔'
            : 'Explore our two flagship natural products. Select your desired size for olive oil or order mineral-rich mountain shilajit with direct WhatsApp support.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Super Bumper Banner Showcase */}
      <div className="max-w-5xl mx-auto pt-4">
        <SuperBumperBanner />
      </div>
    </div>
  );
};
