import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { businessContacts, BusinessContact } from '../config/business';
import { CustomerDetails } from '../types';
import { validateCustomerDetails } from '../lib/validation';
import { formatPrice } from '../lib/pricing';
import { buildOrderWhatsAppMessage, createWhatsAppUrl } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { trackEvent } from '../lib/analytics';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Checkout: React.FC = () => {
  const { items, totals, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    preferredContactId: 'nabeel' // default contact
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [coverageNotice, setCoverageNotice] = useState<string | undefined>();
  const [isSubmittingNetlify, setIsSubmittingNetlify] = useState(false);
  const [submittedViaForm, setSubmittedViaForm] = useState(false);

  // If cart is empty, redirect to cart page
  if (items.length === 0 && !submittedViaForm) {
    return <Navigate to="/cart" replace />;
  }

  const selectedContact: BusinessContact =
    businessContacts.find(c => c.id === form.preferredContactId) || businessContacts[0];

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCityBlur = () => {
    const res = validateCustomerDetails(form);
    setCoverageNotice(res.coverageNotice);
  };

  // Primary Action: Submit via WhatsApp
  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCustomerDetails(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast(language === 'ur' ? 'براہِ کرم فارم کی ضروری معلومات درست درج کریں' : 'Please fix form errors before submitting', 'error');
      return;
    }

    setCoverageNotice(validation.coverageNotice);

    // Build the dynamic WhatsApp message
    const msg = buildOrderWhatsAppMessage(
      form,
      items,
      totals,
      language === 'ur' ? selectedContact.nameUrdu : selectedContact.name
    );

    const waUrl = createWhatsAppUrl(selectedContact.whatsappNumber, msg);

    trackEvent('whatsapp_order_clicked', {
      contactId: selectedContact.id,
      itemCount: totals.itemCount,
      orderSubtotal: totals.subtotal,
      orderTotal: totals.total,
      city: form.city
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showToast(
      language === 'ur'
        ? 'آرڈر کی تفصیلات واٹس ایپ میں کھل چکی ہیں، تصدیق کے لیے وہاں "Send" دبائیں!'
        : 'Order message opened in WhatsApp! Please press Send in WhatsApp to complete.',
      'info'
    );
  };

  // Secondary Backup Action: Submit via Netlify Forms
  const handleNetlifyFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCustomerDetails(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast(language === 'ur' ? 'براہِ کرم فارم کی ضروری معلومات درست درج کریں' : 'Please fix form errors before submitting', 'error');
      return;
    }

    setIsSubmittingNetlify(true);

    try {
      let orderSummaryText = items
        .map(i => `${i.productName} (${i.variantSize || 'Standard'}) x ${i.quantity} @ ${formatPrice(i.unitPrice, 'en')}`)
        .join('\n');

      if (totals.isBundleDiscountActive) {
        orderSummaryText += `\nSuper Bumper Discount: -Rs. ${totals.bundleDiscount} (Shilajit + 500ml+ Olive Oil)`;
      }

      const formData = new URLSearchParams();
      formData.append('form-name', 'order-inquiry');
      formData.append('fullName', form.fullName);
      formData.append('phone', form.phone);
      formData.append('city', form.city);
      formData.append('address', form.address);
      formData.append('preferredContact', selectedContact.name);
      formData.append('orderDetails', orderSummaryText);
      formData.append('orderTotal', formatPrice(totals.total, 'en'));
      formData.append('notes', form.notes || '');

      trackEvent('contact_inquiry_attempted', { source: 'checkout_netlify_form' });

      // In production deployed on Netlify, POSTing to '/' handles Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (response.ok) {
        setSubmittedViaForm(true);
        trackEvent('contact_inquiry_submitted', { source: 'checkout_netlify_form' });
        showToast(
          language === 'ur'
            ? 'آپ کا آرڈر بطور ویب سائٹ انکوائری جمع کر دیا گیا ہے۔'
            : 'Order request submitted as website inquiry successfully.',
          'success'
        );
      } else {
        throw new Error('Netlify form submission endpoint responded with error');
      }
    } catch (err) {
      console.warn('Netlify form submission status:', err);
      // Fallback feedback: clearly instruct user to use WhatsApp
      showToast(
        language === 'ur'
          ? 'ویب سائٹ فارم کی ترسیل کے بعد، براہِ راست واٹس ایپ پر آرڈر بھیجنا تیز ترین طریقہ ہے!'
          : 'For fastest confirmation, please submit your order directly via WhatsApp.',
        'info'
      );
    } finally {
      setIsSubmittingNetlify(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: t('cart'), url: '/cart' },
          { label: t('proceedToCheckout') }
        ]}
      />

      <div className="max-w-2xl mx-auto text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-forest-950">
          {t('checkoutTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          {t('checkoutSubtitle')}
        </p>
      </div>

      {submittedViaForm ? (
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-forest-900/20 text-center space-y-5 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-forest-950">
            {language === 'ur' ? 'آرڈر کی درخواست موصول ہو گئی' : 'Order Request Registered'}
          </h2>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            {language === 'ur'
              ? `آپ کی درخواست ہمارے نمائندے ${selectedContact.nameUrdu} کو بھیج دی گئی ہے۔ فوری جواب کے لیے آپ واٹس ایپ پر بھی رابطہ کر سکتے ہیں۔`
              : `Your request has been routed to ${selectedContact.name}. For immediate confirmation and dispatch schedule, connect on WhatsApp directly.`}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'ur' ? 'واٹس ایپ پر میسج بھیجیں' : 'Open in WhatsApp'}</span>
            </button>
            <Link
              to="/products"
              onClick={() => clearCart()}
              className="px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-bold text-xs flex items-center justify-center transition-all"
            >
              <span>{language === 'ur' ? 'نئی خریداری کریں' : 'Done & Return to Store'}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleWhatsAppCheckout} className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200/90 shadow-sm space-y-6">
              <h2 className="text-lg font-serif font-bold text-forest-950 border-b border-charcoal-100 pb-3">
                {t('customerDetails')}
              </h2>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-xs font-semibold text-charcoal-700">
                  {t('fullName')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder={t('fullNamePlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                      : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-xs font-semibold text-charcoal-700">
                  {t('mobileNumber')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
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
                {errors.phone ? (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-charcoal-500">
                    {language === 'ur' ? 'مثال: 03001234567 یا 03348007049' : 'Accepts standard Pakistani numbers (03xx xxxxxxx or +92 3xx)'}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="block text-xs font-semibold text-charcoal-700">
                  {t('city')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  onBlur={handleCityBlur}
                  placeholder={t('cityPlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.city
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                      : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                  }`}
                  required
                />
                {errors.city && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
                {coverageNotice && !errors.city && (
                  <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-1.5 mt-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <span>{coverageNotice}</span>
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label htmlFor="address" className="block text-xs font-semibold text-charcoal-700">
                  {t('deliveryAddress')} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={t('addressPlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.address
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                      : 'border-charcoal-200 focus:border-forest-800 focus:ring-forest-800/20'
                  }`}
                  required
                />
                {errors.address && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.address}</span>
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-xs font-semibold text-charcoal-700">
                  {t('orderNotes')}
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder={t('orderNotesPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:border-forest-800 focus:ring-forest-800/20"
                />
              </div>

              {/* Contact Representative Selection */}
              <div className="space-y-3 pt-3 border-t border-charcoal-100">
                <label className="block text-xs font-semibold text-charcoal-700">
                  {t('selectContact')}
                </label>
                <p className="text-xs text-charcoal-500">
                  {t('selectContactDesc')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
                  {businessContacts.map(contact => {
                    const isSelected = form.preferredContactId === contact.id;
                    return (
                      <button
                        key={contact.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleInputChange('preferredContactId', contact.id)}
                        className={`p-3.5 rounded-2xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-forest-900 bg-forest-900 text-ivory-50 shadow-md ring-2 ring-gold-400/40'
                            : 'border-charcoal-200 bg-white hover:bg-ivory-50 text-charcoal-900'
                        }`}
                      >
                        <div>
                          <div className={`font-bold text-xs ${isSelected ? 'text-gold-300' : 'text-forest-950'}`}>
                            {language === 'ur' ? contact.nameUrdu : contact.name}
                          </div>
                          <div className={`text-[11px] ${isSelected ? 'text-ivory-200' : 'text-charcoal-500'}`}>
                            {language === 'ur' ? contact.roleUrdu : contact.role}
                          </div>
                          <div className={`text-[11px] font-mono mt-0.5 number-ltr ${isSelected ? 'text-gold-400' : 'text-forest-800'}`}>
                            {contact.phone}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-gold-400 text-forest-950 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submission Notice & Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('submitViaWhatsApp')}</span>
                </button>

                <p className="text-[11px] text-charcoal-500 text-center leading-relaxed">
                  {t('whatsAppHandoffNotice')}
                </p>

                <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500">
                  <span>{t('formBackupNotice')}</span>
                  <button
                    type="button"
                    onClick={handleNetlifyFormSubmit}
                    disabled={isSubmittingNetlify}
                    className="text-forest-900 font-semibold hover:underline flex items-center gap-1 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingNetlify ? 'Submitting...' : t('submitViaForm')}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-charcoal-200/90 shadow-sm space-y-5 sticky top-24">
              <h2 className="font-serif font-bold text-forest-950 text-lg border-b border-charcoal-100 pb-3 flex items-center justify-between">
                <span>{t('orderSummary')}</span>
                <span className="text-xs font-normal text-charcoal-500 font-sans">
                  {totals.itemCount} items
                </span>
              </h2>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-charcoal-100 max-h-72 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="pr-3 rtl:pr-0 rtl:pl-3">
                      <div className="font-bold text-forest-950">
                        {language === 'ur' ? item.productNameUrdu : item.productName}
                      </div>
                      {item.variantSize && (
                        <span className="text-[11px] text-olive-700 font-semibold">
                          {item.variantSize}
                        </span>
                      )}
                      <div className="text-charcoal-500 mt-0.5">
                        Qty: {item.quantity} × {formatPrice(item.unitPrice, language)}
                      </div>
                    </div>
                    <div className="font-bold text-forest-900 shrink-0">
                      {formatPrice(item.unitPrice * item.quantity, language)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 pt-3 border-t border-charcoal-100 text-xs">
                <div className="flex justify-between text-charcoal-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-charcoal-900">
                    {formatPrice(totals.subtotal, language)}
                  </span>
                </div>

                {totals.isBundleDiscountActive && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{t('superBumperDiscount')}</span>
                    <span>- {formatPrice(totals.bundleDiscount, language)}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal-600">
                  <span>{t('deliveryFee')}</span>
                  <span className={totals.isDeliveryFree ? 'font-bold text-emerald-700' : 'font-semibold text-charcoal-900'}>
                    {totals.isDeliveryFree
                      ? (language === 'ur' ? 'مفت' : 'Free')
                      : (language === 'ur' ? totals.deliveryStatusTextUrdu : totals.deliveryStatusText)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-forest-950 pt-3 border-t border-charcoal-200">
                  <span>{t('totalAmount')}</span>
                  <span className="text-xl font-serif font-black text-forest-900">
                    {formatPrice(totals.total, language)}
                  </span>
                </div>
              </div>

              {/* Representative Banner */}
              <div className="p-3.5 rounded-xl bg-forest-950 text-ivory-100 text-xs space-y-1">
                <div className="text-[11px] text-gold-400 font-semibold uppercase">
                  {language === 'ur' ? 'منتخب نمائندہ' : 'Assigned Contact:'}
                </div>
                <div className="font-bold text-sm">
                  {language === 'ur' ? selectedContact.nameUrdu : selectedContact.name}
                </div>
                <div className="text-[11px] font-mono text-ivory-200 number-ltr">
                  {selectedContact.phone}
                </div>
              </div>

              <div className="text-[11px] text-charcoal-500 text-center flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-600" />
                <span>{language === 'ur' ? 'کوئی کریڈٹ کارڈ ڈیٹا محفوظ نہیں کیا جاتا' : 'No card details required. Direct Pakistani order processing.'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
