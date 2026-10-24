import React, { useState, useEffect } from 'react';
import { Truck, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPromotionTimeRemaining } from '../lib/pricing';

export const AnnouncementBar: React.FC = () => {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(getPromotionTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getPromotionTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside aria-label="Promotion" className="animate-shimmer-bar text-ivory-100 text-xs py-2 px-4 border-b border-emerald-500/30 sticky top-0 z-40 shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        {/* Left: Animated Truck & Promo Headline with live ping */}
        <div className="flex items-center gap-2.5 justify-center font-medium">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -left-1" />
            <Truck className="w-4 h-4 text-gold-400 shrink-0 animate-truck-drive ml-1.5" />
          </div>
          <span className="tracking-wide">
            {t('announcement')}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{language === 'ur' ? 'ملک گیر مفت ترسیل' : 'Nationwide Free'}</span>
          </span>
        </div>

        {/* Right: Live Pulsing Countdown Clock */}
        {timeLeft.active ? (
          <div className="flex items-center gap-2 text-ivory-100/90 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0 animate-spin" style={{ animationDuration: '12s' }} />
            <span className="font-medium text-ivory-200">{t('promoEndsIn')}</span>
            <span className="font-mono bg-forest-900/90 px-2.5 py-0.5 rounded-md border border-gold-400/40 font-bold text-gold-300 number-ltr animate-pulse-glow">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
        ) : (
          <div className="text-[11px] text-ivory-100/70">
            {t('promoExpired')}
          </div>
        )}
      </div>
    </aside>
  );
};
