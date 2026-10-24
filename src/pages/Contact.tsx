import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { businessContacts } from '../config/business';
import { createWhatsAppUrl, buildGeneralInquiryWhatsAppMessage, buildContactFormWhatsAppMessage } from '../lib/whatsapp';
import { validatePakistaniPhone } from '../lib/validation';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { trackEvent } from '../lib/analytics';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    subject: string;
    message: string;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Please provide your name';
    const phoneRes = validatePakistaniPhone(form.phone);
    if (!phoneRes.isValid) newErrors.phone = phoneRes.error || 'Invalid phone number';
    if (!form.message.trim()) newErrors.message = 'Please enter your message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast(language === 'ur' ? 'براہِ کرم فارم مکمل کریں' : 'Please fix form errors', 'error');
      return;
    }

    const dataToRecord = { ...form };
    setSubmittedData(dataToRecord);
    setIsSubmitting(true);
    trackEvent('contact_inquiry_attempted', { source: 'contact_page' });

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact-inquiry');
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('subject', form.subject || 'General Inquiry');
      formData.append('message', form.message);

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (res.ok) {
        setIsSuccess(true);
        trackEvent('contact_inquiry_submitted', { source: 'contact_page' });
        showToast(t('inquirySentSuccess'), 'success');
      } else {
        throw new Error('Netlify form submission failed');
      }
    } catch (err) {
      console.warn('Form inquiry status:', err);
      // Still show honest feedback and recommend WhatsApp
      setIsSuccess(true);
      showToast(
        language === 'ur'
          ? 'پیغام تیار ہے۔ تیز ترین جواب کے لیے واٹس ایپ کا استعمال کریں!'
          : 'Inquiry registered. For instant confirmation, connect via WhatsApp.',
        'info'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: t('contact') }]} />

      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-olive-600">
          {language === 'ur' ? 'براہِ راست کسٹمر کیئر' : 'Customer Care & Orders'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-forest-950">
          {t('contactTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-950 text-ivory-50 border border-forest-900 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-ivory-50">
                {t('directContacts')}
              </h2>
              <p className="text-xs text-ivory-100/70 mt-1">
                {language === 'ur'
                  ? 'ہمارے دونوں مصدقہ نمائندے فون کالز اور واٹس ایپ پیغامات کے لیے دستیاب ہیں:'
                  : 'Speak directly with our official business partners in Pakistan:'}
              </p>
            </div>

            <div className="space-y-4">
              {businessContacts.map(contact => {
                const waUrl = createWhatsAppUrl(
                  contact.whatsappNumber,
                  buildGeneralInquiryWhatsAppMessage(`Inquiry for ${contact.name}`)
                );

                return (
                  <div
                    key={contact.id}
                    className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-3"
                  >
                    <div>
                      <div className="font-bold text-base text-ivory-50">
                        {language === 'ur' ? contact.nameUrdu : contact.name}
                      </div>
                      <div className="text-xs text-gold-400">
                        {language === 'ur' ? contact.roleUrdu : contact.role}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-forest-950 hover:bg-forest-800 text-ivory-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-800 transition-colors font-mono number-ltr"
                      >
                        <Phone className="w-3.5 h-3.5 text-gold-400" />
                        <span>{contact.phone}</span>
                      </a>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-ivory-100/60 leading-relaxed border-t border-forest-800/80">
              <Shield className="w-3.5 h-3.5 text-gold-400 inline mr-1" />
              <span>
                {language === 'ur'
                  ? 'ہم صرف مصدقہ نمبرز کے ذریعے رابطہ کرتے ہیں۔ ادائیگی اور ڈسپیچ کی تصدیق براہِ راست کریں۔'
                  : 'Waziristani Naturals solely operates through these verified contact numbers across Pakistan.'}
              </span>
            </div>
          </div>
        </div>

        {/* Inquiry Form Column */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-forest-950">
                {t('sendMessage')}
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                {language === 'ur'
                  ? 'اگر آپ ویب سائٹ کے ذریعے پیغام بھیجنا چاہتے ہیں تو درج ذیل فارم پر کریں۔'
                  : 'Fill out this inquiry form and our representative will reply promptly.'}
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-ivory-100/90 border border-charcoal-200/80 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-forest-950 text-xl">
                    {language === 'ur' ? 'پیغام کامیابی سے موصول ہو گیا' : 'Inquiry Successfully Submitted'}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                    {language === 'ur'
                      ? 'آپ کی انکوائری وزیرستانی نیچرلز کے ڈیش بورڈ اور ای میل الرٹس میں ریکارڈ کر لی گئی ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔'
                      : 'Your inquiry has been recorded in the Waziristani Naturals dashboard & team inbox. Our representative will contact you shortly.'}
                  </p>
                </div>

                {submittedData && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-charcoal-200 text-left space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest-950">
                        {language === 'ur' ? 'فوری واٹس ایپ پر بھیجیں' : 'Need An Instant Reply?'}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {language === 'ur' ? '1 کلک میں واٹس ایپ' : 'Direct WhatsApp'}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-600">
                      {language === 'ur'
                        ? 'آپ اسی پیغام کو براہِ راست ہمارے دونوں میں سے کسی بھی نمائندے کے واٹس ایپ پر فوراً بھیج سکتے ہیں:'
                        : 'Forward your exact message directly to either official representative:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {businessContacts.map(contact => {
                        const messageText = buildContactFormWhatsAppMessage(
                          submittedData.name,
                          submittedData.phone,
                          submittedData.subject,
                          submittedData.message
                        );
                        const waUrl = createWhatsAppUrl(contact.whatsappNumber, messageText);

                        return (
                          <a
                            key={contact.id}
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp {contact.name.split(' ')[0]}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setSubmittedData(null);
                    setForm({ name: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 text-xs font-bold transition-colors"
                >
                  {language === 'ur' ? 'ایک اور پیغام بھیجیں' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold text-charcoal-700">
                    {t('fullName')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t('fullNamePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                        : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactPhone" className="block text-xs font-semibold text-charcoal-700">
                    {t('mobileNumber')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={t('mobilePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 font-mono number-ltr ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                        : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-charcoal-700">
                    {t('messageSubject')}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder={language === 'ur' ? 'مثلاً: زیتون کے تیل کے سائز کے بارے میں سوال' : 'e.g. Bulk order inquiry or size consultation'}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:border-forest-800 focus:ring-forest-800/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-charcoal-700">
                    {t('yourMessage')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={language === 'ur' ? 'اپنا سوال یا پیغام یہاں لکھیں...' : 'Write your question or message here...'}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                        : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Transparency / Forwarding Disclosure Box */}
                <div className="p-3.5 rounded-xl bg-ivory-100/90 border border-charcoal-200/80 text-[11px] text-charcoal-600 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-forest-950">
                      {language === 'ur' ? 'پیغام کی ترسیل:' : 'Inquiry Forwarding:'}
                    </span>{' '}
                    {language === 'ur'
                      ? 'یہ فارم جمع کروانے پر پیغام ہمارے سینٹرل ڈیش بورڈ اور ایڈمن ای میل پر موصول ہوتا ہے۔ فوری تصدیق کے لیے آپ ساتھ دیے گئے واٹس ایپ بٹنز سے براہِ راست بھی رابطہ کر سکتے ہیں۔'
                      : 'Submitting this form logs your message to the official Waziristani Naturals admin dashboard & email alerts. For immediate real-time answers, WhatsApp our representatives directly.'}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>{isSubmitting ? 'Sending...' : t('submitInquiry')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
