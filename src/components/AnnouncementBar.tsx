import React from 'react';
import { Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { language } = useLanguage();

  return (
    <aside aria-label="Customer Notice" className="bg-[#07160F] text-ivory-100 text-xs py-2 px-4 border-b border-emerald-800/40 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        {/* Left: Free Courier Delivery Nationwide */}
        <div className="flex items-center gap-2 justify-center font-medium">
          <Truck className="w-4 h-4 text-gold-400 shrink-0" />
          <span className="tracking-wide">
            {language === 'ur'
              ? 'پورے پاکستان میں تمام آرڈرز پر مفت کوریئر ترسیل • کیش آن ڈیلیوری کی سہولت'
              : 'Free Courier Delivery Nationwide Across Pakistan • Cash on Delivery (COD) Available'}
          </span>
        </div>

        {/* Right: Dispatch timeline */}
        <div className="flex items-center gap-2 text-gold-300 text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>
            {language === 'ur'
              ? '24 گھنٹوں کے اندر روانگی • اصلی و تصدیق شدہ مصنوعات'
              : '24-Hour Dispatch • 100% Sourced from Waziristan'}
          </span>
        </div>
      </div>
    </aside>
  );
};
