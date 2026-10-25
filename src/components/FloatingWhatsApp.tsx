import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ContactSelectModal } from './ContactSelectModal';
import { buildGeneralInquiryWhatsAppMessage, createWhatsAppUrl } from '../lib/whatsapp';
import { BusinessContact } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleSelectContact = (contact: BusinessContact) => {
    const msg = buildGeneralInquiryWhatsAppMessage();
    const url = createWhatsAppUrl(contact.whatsappNumber, msg);
    trackEvent('whatsapp_direct_clicked', { contactId: contact.id, type: 'floating_button' });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 group">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 p-3.5 md:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Direct WhatsApp Assistance"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>

          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden md:inline-block text-xs font-bold tracking-wide pr-1">
            {language === 'ur' ? 'واٹس ایپ پر رابطہ' : 'Chat with Us'}
          </span>
        </button>
      </div>

      <ContactSelectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectContact={handleSelectContact}
        title={language === 'ur' ? 'کس نمائندے سے رابطہ کرنا چاہتے ہیں؟' : 'Connect on WhatsApp'}
        subtitle={language === 'ur' ? 'نبیل عالم خان یا اسد میں سے کسی سے بھی فوری رہنمائی حاصل کریں:' : 'Directly message Nabeel or Asad for product inquiries & instant dispatch:'}
      />
    </>
  );
};
