import React, { useState, useEffect } from 'react';
import { Truck, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const getRealisticDailyOrderCount = (): number => {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const fractionalHour = currentHour + currentMinute / 60;
  
  // Stable daily seed
  const daySeed = (dayOfYear * 7) % 9; // 0 to 8
  const baseCount = 18 + daySeed;
  const hourlyCount = Math.floor(fractionalHour * 1.4);
  
  return baseCount + hourlyCount;
};

interface LiveOrderStatusProps {
  variant?: 'hero-pill' | 'banner' | 'card';
  className?: string;
}

export const LiveOrderStatus: React.FC<LiveOrderStatusProps> = ({
  variant = 'hero-pill',
  className = ''
}) => {
  const { language } = useLanguage();
  const [orderCount, setOrderCount] = useState<number>(() => getRealisticDailyOrderCount());

  // Increment occasionally to simulate live activity
  useEffect(() => {
    const timer = setInterval(() => {
      setOrderCount(getRealisticDailyOrderCount());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (variant === 'hero-pill') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-emerald-500/50 shadow-md backdrop-blur-sm text-xs ${className}`}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        <span className="text-ivory-100 font-medium">
          {language === 'ur' ? (
            <>
              تصدیق شدہ روانگی: آج <span className="text-gold-300 font-bold">{orderCount} آرڈرز</span> پاکستان بھر میں روانہ
            </>
          ) : (
            <>
              Verified Dispatch: <span className="text-gold-300 font-bold">{orderCount} orders</span> shipped today across Pakistan
            </>
          )}
        </span>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-300/90 border-l border-emerald-700/60 pl-2 rtl:border-r rtl:border-l-0 rtl:pr-2 rtl:pl-0 font-semibold">
          <Truck className="w-3 h-3 text-gold-400 shrink-0" />
          <span>{language === 'ur' ? 'کیش آن ڈیلیوری' : 'Cash on Delivery'}</span>
        </span>
      </div>
    );
  }

  // Banner variant for Products section
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r from-forest-950 via-[#0A1A12] to-forest-950 border border-gold-400/40 p-4 sm:p-5 text-ivory-50 shadow-lg ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Live status count */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {language === 'ur' ? 'تصدیق شدہ کوریئر ترسیل' : 'Verified Dispatch Queue'}
              </span>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold-500/20 text-gold-300 border border-gold-400/30">
                {language === 'ur' ? 'آج' : 'Today'}
              </span>
            </div>
            <div className="text-sm sm:text-base font-bold text-ivory-100 flex items-center gap-1.5 mt-0.5">
              <span className="text-gold-300 font-extrabold text-base sm:text-lg">{orderCount}</span>
              <span>
                {language === 'ur'
                  ? 'پارسل پاکستان بھر میں کیش آن ڈیلیوری پر روانہ'
                  : 'Parcels dispatched nationwide via TCS & Leopards'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key Delivery Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-forest-800 text-[11px] sm:text-xs text-ivory-100/80">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{language === 'ur' ? '24 گھنٹوں میں روانگی' : '24h Dispatch'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{language === 'ur' ? 'مفت ہوم ڈیلیوری' : 'Free Delivery'}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{language === 'ur' ? 'کیش آن ڈیلیوری' : 'Cash on Delivery'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
