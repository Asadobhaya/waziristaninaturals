import React from 'react';
import { ProductVariant } from '../config/products';
import { formatPrice } from '../lib/pricing';
import { useLanguage } from '../context/LanguageContext';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  className?: string;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  className = ''
}) => {
  const { language } = useLanguage();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-charcoal-700">
        <span>{language === 'ur' ? 'سائز منتخب کریں:' : 'Select Bottle Size:'}</span>
        <span className="text-forest-800 font-bold">
          {selectedVariant.size}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Product size variants">
        {variants.map(variant => {
          const isSelected = variant.id === selectedVariant.id;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectVariant(variant)}
              className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-forest-900 bg-forest-900 text-ivory-50 shadow-md ring-2 ring-gold-400/40'
                  : 'border-charcoal-200/90 bg-white hover:border-forest-700/60 hover:bg-ivory-50 text-charcoal-900'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`text-xs font-bold ${isSelected ? 'text-gold-300' : 'text-charcoal-900'}`}>
                  {variant.size}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center justify-between mt-1 gap-1">
                <span className={`text-[13px] font-semibold ${isSelected ? 'text-ivory-100' : 'text-forest-800'}`}>
                  {formatPrice(variant.price, language)}
                </span>
                {variant.id !== '250ml' && (
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1 py-0.5 rounded border border-emerald-500/30">
                    {language === 'ur' ? 'بمپر آفر' : 'Bumper'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
