import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, MapPin, Mail, Clock, RefreshCw, FileText } from 'lucide-react';
import { businessContacts } from '../config/business';
import { createWhatsAppUrl, buildGeneralInquiryWhatsAppMessage } from '../lib/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { PolicyModal, PolicyType } from './PolicyModal';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <footer id="contact" className="bg-[#07160F] text-ivory-100 border-t border-emerald-900/40 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-forest-800/60">
            {/* Col 1: Brand Heritage */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/70 shadow-lg shrink-0 bg-forest-950 flex items-center justify-center">
                  <img
                    src="/assets/images/waziristani-logo.png"
                    alt="Waziristani Naturals Brand Emblem"
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
                  ? 'وزیرستان کی سرزمین اور روایتی باغات سے حاصل کردہ خالص قدرتی زیتون کا تیل (4 سائزز) اور اصل پہاڑی سلاجیت۔ سچائی اور مکمل امانت داری پر مبنی پاکستانی برانڈ۔'
                  : 'Delivering authentic Waziristani cold-pressed extra virgin olive oil in four calibrated sizes and purified mountain Shilajit resin directly to doorsteps across Pakistan.'}
              </p>
              <div className="flex items-center gap-2 text-xs text-gold-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{language === 'ur' ? '100٪ مستند قدرتی مصنوعات' : 'Direct Pakistani Sourcing & Transparency'}</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-serif">
                {language === 'ur' ? 'اہم لنکس' : 'Explore Store'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#products"
                    onClick={(e) => handleScrollToSection(e, 'products')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors"
                  >
                    {language === 'ur' ? 'ہماری مصنوعات' : 'Our Products (Oil & Shilajit)'}
                  </a>
                </li>
                <li>
                  <a
                    href="#why-us"
                    onClick={(e) => handleScrollToSection(e, 'why-us')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors"
                  >
                    {language === 'ur' ? 'ہمیں کیوں منتخب کریں' : 'Why Choose Us (Purity & Source)'}
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    onClick={(e) => handleScrollToSection(e, 'reviews')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors"
                  >
                    {language === 'ur' ? 'گاہکوں کے تاثرات' : 'Customer Reviews & Feedback'}
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleScrollToSection(e, 'faq')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors"
                  >
                    {language === 'ur' ? 'عمومی سوالات و جوابات' : 'Frequently Asked Questions (FAQ)'}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('returns')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors text-left flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-gold-400" />
                    <span>{language === 'ur' ? '7 روزہ ریٹرن و تبدیلی پالیسی' : '7-Day Return Guarantee'}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('privacy')}
                    className="text-ivory-100/80 hover:text-gold-300 transition-colors text-left flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-gold-400" />
                    <span>{language === 'ur' ? 'رازداری کی پالیسی' : 'Privacy & Terms'}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Operational Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-serif">
                {language === 'ur' ? 'دستیابی و ڈسپیچ' : 'Operating Hubs'}
              </h4>
              <div className="space-y-2.5 text-xs text-ivory-100/75">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    {language === 'ur'
                      ? 'ماخذ: وزیرستان خطہ • کوریئر ڈسپیچ ہبس: پشاور اور لاہور'
                      : 'Source: Waziristan • Express Dispatch Hubs: Peshawar & Lahore'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    {language === 'ur'
                      ? 'پیر تا ہفتہ: صبح 9:00 تا رات 9:00 بجے (24/7 واٹس ایپ انکوائری)'
                      : 'Mon – Sat: 9:00 AM – 9:00 PM PKT (24/7 WhatsApp Response)'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <a href="mailto:info@waziristaninaturals.com" className="hover:text-gold-300 transition-colors">
                    info@waziristaninaturals.com
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Official Direct Representatives */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-serif">
                {language === 'ur' ? 'آرڈر و کسٹمر کیئر' : 'Official WhatsApp Care'}
              </h4>
              <p className="text-xs text-ivory-100/70">
                {language === 'ur'
                  ? 'براہ راست ہمارے نمائندوں سے واٹس ایپ پر آرڈر اور پارسل ٹریکنگ کی معلومات حاصل کریں:'
                  : 'Speak directly with our confirmed representatives for order placement and dispatch confirmation:'}
              </p>

              <div className="space-y-2.5 pt-1">
                {businessContacts.map(contact => {
                  const waUrl = createWhatsAppUrl(
                    contact.whatsappNumber,
                    buildGeneralInquiryWhatsAppMessage(`Inquiry for ${contact.name}`)
                  );
                  return (
                    <div
                      key={contact.id}
                      className="p-3 rounded-2xl bg-forest-900/60 border border-forest-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-xs text-ivory-50">
                          {language === 'ur' ? contact.nameUrdu : contact.name}
                        </div>
                        <a
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                          className="text-[11px] text-ivory-100/80 hover:text-gold-300 font-mono"
                        >
                          {contact.phone}
                        </a>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all"
                        aria-label={`Chat with ${contact.name} on WhatsApp`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{language === 'ur' ? 'چیٹ کریں' : 'WhatsApp'}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mandatory Health Disclaimer */}
          <div className="py-6 border-b border-forest-800/60 text-[11px] text-ivory-100/65 leading-relaxed text-center sm:text-left rtl:sm:text-right">
            <strong className="text-gold-400 block mb-1">
              {language === 'ur' ? 'طبی و قانونی دستبرداری (Disclaimer)' : 'Consumer Health Notice & Disclaimer:'}
            </strong>
            <p>
              {language === 'ur'
                ? 'یہ بیانات کسی بھی بااختیار ادارے (FDA یا ڈریپ) کی جانب سے تشخیص شدہ نہیں ہیں۔ ہماری مصنوعات کسی بھی بیماری کی تشخیص، علاج، شفا یا روک تھام کے لیے نہیں ہیں۔ اگر آپ حاملہ ہیں، دوائیں لے رہے ہیں یا زیرِ علاج ہیں تو استعمال سے قبل اپنے معالج سے مشورہ کریں۔'
                : 'These statements have not been evaluated by any food or health authority. These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult your qualified healthcare practitioner before beginning any new natural wellness regimen.'}
            </p>
          </div>

          {/* Copyright & Social */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-100/60 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Waziristani Naturals. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-gold-400/90 font-medium">
              <button
                type="button"
                onClick={() => setActivePolicy('returns')}
                className="hover:text-gold-300 underline underline-offset-2"
              >
                {language === 'ur' ? 'واپسی پالیسی' : 'Return Policy'}
              </button>
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="hover:text-gold-300 underline underline-offset-2"
              >
                {language === 'ur' ? 'پرائیویسی' : 'Privacy'}
              </button>
              <button
                type="button"
                onClick={() => setActivePolicy('terms')}
                className="hover:text-gold-300 underline underline-offset-2"
              >
                {language === 'ur' ? 'شرائط و ضوابط' : 'Terms'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Render Policy Modal when triggered */}
      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </>
  );
};
