import React, { useEffect } from 'react';
import { X, ShieldCheck, RefreshCw, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PolicyType = 'privacy' | 'terms' | 'returns' | null;

interface PolicyModalProps {
  policy: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (policy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [policy, onClose]);

  if (!policy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-charcoal-200 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-200 bg-ivory-50">
          <div className="flex items-center gap-2.5">
            {policy === 'returns' && <RefreshCw className="w-5 h-5 text-gold-500" />}
            {policy === 'privacy' && <ShieldCheck className="w-5 h-5 text-gold-500" />}
            {policy === 'terms' && <FileText className="w-5 h-5 text-gold-500" />}
            <h3 className="font-serif font-bold text-lg text-forest-950">
              {policy === 'returns' && (language === 'ur' ? '7 روزہ واپسی و متبادل پالیسی' : '7-Day Return & Replacement Policy')}
              {policy === 'privacy' && (language === 'ur' ? 'رازداری کی پالیسی (Privacy Policy)' : 'Privacy Policy')}
              {policy === 'terms' && (language === 'ur' ? 'خدمات کی شرائط (Terms of Service)' : 'Terms of Service')}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-charcoal-500 hover:text-forest-950 hover:bg-charcoal-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-charcoal-700 space-y-4 leading-relaxed">
          {policy === 'returns' && (
            <>
              <p className="font-bold text-forest-900">
                {language === 'ur'
                  ? 'وزیرستانی نیچرلز میں ہم اپنی ہر بوتل اور سلاجیت کے جار کی کوالٹی کے ذمہ دار ہیں۔'
                  : 'At Waziristani Naturals, customer satisfaction and genuine product integrity are our utmost priority.'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>{language === 'ur' ? 'ترسیل کے دوران نقصان:' : 'Transit Damage or Leakage:'}</strong>{' '}
                  {language === 'ur'
                    ? 'اگر پارسل موصول ہونے پر بوتل ٹوٹی ہوئی ہو یا لیکیج ہو تو فوری طور پر 7 دنوں کے اندر واٹس ایپ پر تصویر شیئر کریں۔ ہم بلا معاوضہ فوری نیا پارسل بھیجیں گے۔'
                    : 'If your bottle or jar is damaged or leaking upon arrival, simply send us a clear photo on WhatsApp within 7 days. We will dispatch a free replacement immediately without questions.'}
                </li>
                <li>
                  <strong>{language === 'ur' ? 'کوئی پوشیدہ فیس نہیں:' : 'Zero Hidden Charges:'}</strong>{' '}
                  {language === 'ur'
                    ? 'خراب یا غلط پروڈکٹ کے متبادل پر کسٹمر سے کوئی واپسی چارجز وصول نہیں کیے جاتے۔'
                    : 'You will never be charged return shipping for damaged or defective items.'}
                </li>
                <li>
                  <strong>{language === 'ur' ? 'رابطہ:' : 'Claim via WhatsApp:'}</strong>{' '}
                  +92 334 8007049
                </li>
              </ul>
            </>
          )}

          {policy === 'privacy' && (
            <>
              <p>
                {language === 'ur'
                  ? 'ہم آپ کی ذاتی معلومات (نام، فون نمبر، پتہ) کا مکمل احترام کرتے ہیں۔'
                  : 'Waziristani Naturals respects your privacy. We only collect details essential for courier dispatch.'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>{language === 'ur' ? 'معلومات کا استعمال:' : 'Information Collection:'}</strong>{' '}
                  {language === 'ur'
                    ? 'آپ کا نام، فون نمبر اور پتہ صرف پارسل ڈیلیوری اور واٹس ایپ پر رابطہ کے لیے استعمال ہوتا ہے۔'
                    : 'Customer name, phone number, and delivery address are exclusively utilized for courier dispatch and WhatsApp order verification.'}
                </li>
                <li>
                  <strong>{language === 'ur' ? 'تیسرے فریق کو عدم فروخت:' : 'No Third-Party Selling:'}</strong>{' '}
                  {language === 'ur'
                    ? 'ہم آپ کا ڈیٹا کسی اشتہاری کمپنی یا تیسرے فریق کو فروخت نہیں کرتے۔'
                    : 'We never sell, rent, or lease your personal customer data to any advertisers or third-party marketing entities.'}
                </li>
              </ul>
            </>
          )}

          {policy === 'terms' && (
            <>
              <p>
                {language === 'ur'
                  ? 'وزیرستانی نیچرلز سے خریداری کر کے آپ درج ذیل شرائط سے اتفاق کرتے ہیں:'
                  : 'By ordering from Waziristani Naturals, you acknowledge the following transparent terms:'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>{language === 'ur' ? 'طبی دعویٰ کی عدم موجودگی:' : 'Medical Disclaimer:'}</strong>{' '}
                  {language === 'ur'
                    ? 'ہماری تمام مصنوعات قدرتی خوراک اور روایتی سوغات ہیں۔ یہ کسی بیماری کی تشخیص، علاج یا روک تھام کا متبادل نہیں ہیں۔ اگر آپ کسی خاص مرض میں مبتلا ہیں تو اپنے معالج سے مشورہ کریں۔'
                    : 'All products sold are traditional natural goods and botanical food items. They are not intended to diagnose, treat, cure, or prevent any illness. Consult a medical professional before beginning any new health regimen.'}
                </li>
                <li>
                  <strong>{language === 'ur' ? 'قیمتیں اور ادائیگیاں:' : 'Transparent Pricing:'}</strong>{' '}
                  {language === 'ur'
                    ? 'تمام قیمتیں پاکستانی روپوں میں مقرر ہیں اور کیش آن ڈیلیوری کی صورت میں پارسل وصولی کے وقت ادا کی جاتی ہیں۔'
                    : 'All listed prices are in PKR. Cash on Delivery is paid upon receipt to the designated courier partner.'}
                </li>
              </ul>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-charcoal-200 bg-ivory-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-forest-950 text-gold-300 font-bold text-xs hover:bg-forest-900 transition-colors"
          >
            {language === 'ur' ? 'ٹھیک ہے / بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
