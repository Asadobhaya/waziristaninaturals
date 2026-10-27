import React, { useState } from 'react';
import { Star, X, CheckCircle2, MessageSquare, PenLine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { businessContacts } from '../config/business';

export interface SubmittedReview {
  name: string;
  city: string;
  text: string;
  product: string;
  rating: number;
  date: string;
}

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: SubmittedReview) => void;
}

const PRODUCTS_LIST = [
  { id: 'oil-1000', labelEn: 'Zaitoon Oil 1000ml (1 Litre)', labelUr: 'زیتون کا خالص تیل 1 لٹر' },
  { id: 'oil-750', labelEn: 'Zaitoon Oil 750ml', labelUr: 'زیتون کا تیل 750ml' },
  { id: 'oil-500', labelEn: 'Zaitoon Oil 500ml', labelUr: 'زیتون کا تیل 500ml' },
  { id: 'oil-250', labelEn: 'Zaitoon Oil 250ml', labelUr: 'زیتون کا تیل 250ml' },
  { id: 'shilajit', labelEn: 'Mountain Shilajit (10g Jar + Spoon)', labelUr: 'خالص پہاڑی سلاجیت (10 گرام + چمچ)' },
  { id: 'bundle', labelEn: 'Super Bumper Bundle (Oil + Shilajit)', labelUr: 'سپر بمپر بنڈل (تیل + سلاجیت)' },
];

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const { language } = useLanguage();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_LIST[0].labelEn);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedReview | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !comment.trim()) return;

    const newReview: SubmittedReview = {
      name: name.trim(),
      city: city.trim(),
      product: selectedProduct,
      text: comment.trim(),
      rating,
      date: new Date().toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    onSubmitReview(newReview);
    setSubmittedData(newReview);
    setIsSuccess(true);
  };

  const handleShareOnWhatsApp = () => {
    if (!submittedData) return;
    const rep = businessContacts[0];
    const stars = Array(submittedData.rating).fill('★').join('');
    const rawMsg = language === 'ur'
      ? `السلام علیکم، میں وزیرستانی نیچرلز کے لیے اپنا ریویو شیئر کرنا چاہتا ہوں:\n\nپروڈکٹ: ${submittedData.product}\nریٹنگ: ${stars} (${submittedData.rating}/5)\nرائے: "${submittedData.text}"\nنام: ${submittedData.name}\nشہر: ${submittedData.city}`
      : `Assalam o Alaikum, I would like to submit my review for Waziristani Naturals:\n\nProduct: ${submittedData.product}\nRating: ${stars} (${submittedData.rating}/5)\nReview: "${submittedData.text}"\nName: ${submittedData.name}\nCity: ${submittedData.city}`;

    const url = createWhatsAppUrl(rep.whatsappNumber, rawMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setCity('');
    setComment('');
    setRating(5);
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-charcoal-200 overflow-hidden text-charcoal-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-charcoal-100 bg-forest-950 text-ivory-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest-900 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <PenLine className="w-4 h-4" />
            </div>
            <div>
              <h3 id="review-modal-title" className="text-base sm:text-lg font-serif font-bold text-ivory-50">
                {language === 'ur' ? 'اپنی قیمتی رائے درج کریں' : 'Write a Customer Review'}
              </h3>
              <p className="text-[11px] text-ivory-100/70">
                {language === 'ur' ? 'وزیرستانی نیچرلز کے ساتھ اپنا تجربہ شیئر کریں' : 'Share your verified purchase experience'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full text-ivory-100/70 hover:text-white hover:bg-forest-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold font-serif text-forest-950">
                  {language === 'ur' ? 'آپ کی رائے موصول ہو چکی ہے!' : 'Review Submitted Successfully!'}
                </h4>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
                  {language === 'ur'
                    ? 'آپ کا ریویو ہماری ویب سائٹ پر شامل کر دیا گیا ہے۔ اگر آپ اسے آفیشل تصدیق کے لیے واٹس ایپ پر بھی شیئر کرنا چاہیں تو نیچے دیے گئے بٹن پر کلک کریں۔'
                    : 'Thank you for your feedback! Your review is now visible on our page. You can also share it directly with our team on WhatsApp for official verification.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleShareOnWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'ur' ? 'واٹس ایپ پر بھی شیئر کریں' : 'Share on WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-charcoal-300 hover:bg-charcoal-50 text-charcoal-800 font-semibold text-xs transition-colors"
                >
                  {language === 'ur' ? 'مکمل' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-left rtl:text-right">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1.5 uppercase tracking-wider">
                  {language === 'ur' ? 'آپ کی ریٹنگ (ستارے):' : 'Overall Rating:'}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                      aria-label={`${star} star rating`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-gold-400 fill-gold-400'
                            : 'text-charcoal-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gold-600 ml-2 rtl:mr-2 rtl:ml-0">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    {language === 'ur' ? 'آپ کا نام *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ur' ? 'مثال: طارق خان' : 'e.g. Tariq Khan'}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    {language === 'ur' ? 'شہر کا نام *' : 'Your City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={language === 'ur' ? 'مثال: پشاور / لاہور / کراچی' : 'e.g. Lahore, Islamabad'}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
                  />
                </div>
              </div>

              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1">
                  {language === 'ur' ? 'خریدی گئی پروڈکٹ *' : 'Product Purchased *'}
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
                >
                  {PRODUCTS_LIST.map((prod) => (
                    <option key={prod.id} value={prod.labelEn}>
                      {language === 'ur' ? prod.labelUr : prod.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1">
                  {language === 'ur' ? 'آپ کے تاثرات و تجربہ *' : 'Your Review / Feedback *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    language === 'ur'
                      ? 'تیل کے خالص پن، خوشبو، پیکنگ، سلاجیت کی تاثیر یا ترسیل کے بارے میں اپنے تاثرات لکھیں...'
                      : 'Share your honest feedback regarding purity, aroma, packaging, or delivery...'
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-charcoal-300 hover:bg-charcoal-50 text-charcoal-700 text-xs font-semibold transition-colors"
                >
                  {language === 'ur' ? 'منسوخ کریں' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-gold-300 border border-gold-400/50 text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  {language === 'ur' ? 'ریویو جمع کروائیں' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
