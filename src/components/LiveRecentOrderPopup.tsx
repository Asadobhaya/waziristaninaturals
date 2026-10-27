import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RecentOrder {
  name: string;
  city: string;
  cityUrdu: string;
  product: string;
  productUrdu: string;
  timeAgo: string;
  timeAgoUrdu: string;
}

const RECENT_ORDERS: RecentOrder[] = [
  {
    name: 'Tariq K.',
    city: 'Peshawar',
    cityUrdu: 'پشاور',
    product: 'Zaitoon Oil 1000ml (1 Litre)',
    productUrdu: 'زیتون کا خالص تیل 1 لٹر',
    timeAgo: '4m ago',
    timeAgoUrdu: '4 منٹ پہلے'
  },
  {
    name: 'Dr. Bilal A.',
    city: 'Lahore',
    cityUrdu: 'لاہور',
    product: 'Mountain Shilajit (10g Jar + Spoon)',
    productUrdu: 'وزیرستانی گولڈ سلاجیت (10g + چمچ)',
    timeAgo: '8m ago',
    timeAgoUrdu: '8 منٹ پہلے'
  },
  {
    name: 'Zubair M.',
    city: 'Islamabad',
    cityUrdu: 'اسلام آباد',
    product: 'Super Bumper Combo (Oil + Shilajit)',
    productUrdu: 'سپر بمپر کمبو (تیل + سلاجیت)',
    timeAgo: '15m ago',
    timeAgoUrdu: '15 منٹ پہلے'
  },
  {
    name: 'Farhan S.',
    city: 'Rawalpindi',
    cityUrdu: 'راولپنڈی',
    product: 'Zaitoon Oil 500ml',
    productUrdu: 'زیتون کا تیل 500ml',
    timeAgo: '22m ago',
    timeAgoUrdu: '22 منٹ پہلے'
  },
  {
    name: 'Usman A.',
    city: 'Karachi',
    cityUrdu: 'کراچی',
    product: 'Zaitoon Oil 750ml',
    productUrdu: 'زیتون کا تیل 750ml',
    timeAgo: '34m ago',
    timeAgoUrdu: '34 منٹ پہلے'
  },
  {
    name: 'Hamza N.',
    city: 'Multan',
    cityUrdu: 'ملتان',
    product: 'Mountain Shilajit (10g)',
    productUrdu: 'پہاڑی خالص سلاجیت (10 گرام)',
    timeAgo: '41m ago',
    timeAgoUrdu: '41 منٹ پہلے'
  },
  {
    name: 'Rashid K.',
    city: 'Faisalabad',
    cityUrdu: 'فیصل آباد',
    product: 'Zaitoon Oil 1000ml (1 Litre)',
    productUrdu: 'زیتون کا تیل 1 لٹر',
    timeAgo: '53m ago',
    timeAgoUrdu: '53 منٹ پہلے'
  }
];

export const LiveRecentOrderPopup: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial notification after 3.5 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Rotate every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ORDERS.length);
        setIsVisible(true);
      }, 1000); // 1s pause between transitions
    }, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const order = RECENT_ORDERS[currentIndex];

  return (
    <aside
      aria-label="Recent Customer Orders"
      className={`fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-40 max-w-[320px] sm:max-w-xs transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-charcoal-200/90 shadow-xl flex items-start gap-3 relative text-left rtl:text-right">
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 rtl:right-auto rtl:left-2 p-1 text-charcoal-400 hover:text-charcoal-700 transition-colors rounded-full"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Product / Bag Icon */}
        <div className="w-9 h-9 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <ShoppingBag className="w-4 h-4" />
        </div>

        {/* Content */}
        <div className="flex-1 pr-4 rtl:pr-0 rtl:pl-4 space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
            </span>
            <span>{language === 'ur' ? 'نیا تصدیق شدہ آرڈر' : 'Just Ordered'}</span>
            <span className="text-charcoal-400">•</span>
            <span className="text-charcoal-500 font-normal">
              {language === 'ur' ? order.timeAgoUrdu : order.timeAgo}
            </span>
          </div>

          <div className="text-xs font-bold text-forest-950 leading-tight">
            <span>{order.name}</span>{' '}
            <span className="text-charcoal-500 font-normal text-[11px]">
              ({language === 'ur' ? order.cityUrdu : order.city})
            </span>
          </div>

          <div className="text-[11px] text-olive-700 font-medium line-clamp-1">
            {language === 'ur' ? order.productUrdu : order.product}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-emerald-700 pt-0.5 font-semibold">
            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{language === 'ur' ? 'کیش آن ڈیلیوری تصدیق شدہ' : 'Verified COD Delivery'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
