import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-ivory-100 border border-charcoal-200/80 text-forest-900 font-serif font-black text-3xl flex items-center justify-center mx-auto shadow-sm">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-black text-forest-950">
          {t('pageNotFoundTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-sm mx-auto">
          {t('pageNotFoundDesc')}
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-bold text-xs shadow-md hover:bg-forest-800 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>{t('backToHome')}</span>
        </Link>

        <Link
          to="/products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-charcoal-200 hover:border-forest-900 text-forest-950 font-bold text-xs shadow-sm transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-forest-800" />
          <span>{t('browseProducts')}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
