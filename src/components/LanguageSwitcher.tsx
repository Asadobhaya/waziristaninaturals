import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full border border-forest-800/40 bg-forest-900/60 p-0.5 text-xs ${className}`}>
      <div className="flex items-center pl-2 pr-1 text-gold-400">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full font-medium transition-all ${
          language === 'en'
            ? 'bg-gold-500 text-forest-950 font-semibold shadow-sm'
            : 'text-ivory-100 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ur')}
        className={`px-2.5 py-1 rounded-full font-medium font-urdu transition-all ${
          language === 'ur'
            ? 'bg-gold-500 text-forest-950 font-semibold shadow-sm'
            : 'text-ivory-100 hover:text-white'
        }`}
        aria-label="اردو میں تبدیل کریں"
      >
        اردو
      </button>
    </div>
  );
};
