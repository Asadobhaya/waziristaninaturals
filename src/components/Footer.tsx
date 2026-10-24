import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { businessContacts } from '../config/business';
import { createWhatsAppUrl, buildGeneralInquiryWhatsAppMessage } from '../lib/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-forest-950 text-ivory-100 border-t border-forest-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-forest-800/60">
          {/* Col 1: Brand Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/70 shadow-lg shrink-0 bg-forest-950 flex items-center justify-center">
                <img
                  src="/assets/images/waziristani-logo.png"
                  alt="WAZIRISTANI Brand Emblem"
                  className="w-full h-full object-cover"
                  width="48"
                  height="48"
                />
              </div>
              <span className="text-xl sm:text-2xl font-serif font-black tracking-wide text-ivory-50">
                {language === 'ur' ? 'وزیرستانی نیچرلز' : 'Waziristani Naturals'}
              </span>
            </div>
            <p className="text-xs text-gold-400/90 font-medium tracking-wide">
              {language === 'ur' ? 'فطرت سے وابستہ، روایات سے آراستہ' : 'Rooted in Nature. Inspired by Heritage.'}
            </p>
            <p className="text-xs text-ivory-100/75 leading-relaxed">
              {language === 'ur'
                ? 'وزیرستان کے پہاڑی سلسلوں اور روایتی باغات سے حاصل کردہ خالص قدرتی زیتون کا تیل اور اصل سلاجیت۔ سچائی اور شفافیت پر مبنی پاکستانی برانڈ۔'
                : 'Dedicated to presenting authentic Waziristani natural olive oil in four calibrated sizes and concentrated mountain Shilajit resin across Pakistan.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{language === 'ur' ? '100٪ مستند قدرتی مصنوعات' : 'Direct Pakistani Sourcing & Transparency'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-serif">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/products/zaitoon-oil" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {language === 'ur' ? 'وزیرستانی زیتون کا تیل' : 'Waziristani Zaitoon Oil (4 Sizes)'}
                </Link>
              </li>
              <li>
                <Link to="/products/shilajit" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {language === 'ur' ? 'وزیرستانی خالص سلاجیت' : 'Waziristani Shilajit (Rs. 2,000)'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory-100/80 hover:text-gold-300 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Representatives */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-serif">
              {t('contactInfo')}
            </h4>
            <p className="text-xs text-ivory-100/70">
              {language === 'ur'
                ? 'کسی بھی سوال یا فوری آرڈر کے لیے ہمارے تصدیق شدہ نمائندوں سے براہ راست رابطہ کریں:'
                : 'Directly speak with or message our official representatives for orders and dispatch confirmation:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {businessContacts.map(contact => {
                const waUrl = createWhatsAppUrl(
                  contact.whatsappNumber,
                  buildGeneralInquiryWhatsAppMessage(`Inquiry for ${contact.name}`)
                );
                return (
                  <div
                    key={contact.id}
                    className="p-3.5 rounded-2xl bg-forest-900/60 border border-forest-800 flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      <div className="font-bold text-sm text-ivory-50">
                        {language === 'ur' ? contact.nameUrdu : contact.name}
                      </div>
                      <div className="text-[11px] text-gold-400">
                        {language === 'ur' ? contact.roleUrdu : contact.role}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-2 text-xs text-ivory-100/90 hover:text-gold-300 transition-colors font-mono number-ltr"
                      >
                        <Phone className="w-3.5 h-3.5 text-gold-400" />
                        <span>{contact.phone}</span>
                      </a>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{language === 'ur' ? 'واٹس ایپ پر میسج کریں' : 'Chat on WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-ivory-100/60 pt-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{language === 'ur' ? 'پاکستان بھر میں محفوظ ترسیل' : 'Dispatching Nationwide Across Pakistan'}</span>
            </div>
          </div>
        </div>

        {/* Consumer Notice & Disclaimer */}
        <div className="py-6 border-b border-forest-800/60 text-[11px] text-ivory-100/60 leading-relaxed">
          <strong className="text-gold-400 block mb-1">{t('disclaimerTitle')}</strong>
          <p>{t('disclaimerText')}</p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-100/60 gap-4">
          <p>{t('copyright')}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gold-400/80">
              {language === 'ur' ? 'مستند پاکستانی برانڈ' : 'Authentic Natural Goods'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
