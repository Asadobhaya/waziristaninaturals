import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { businessContacts, BusinessContact } from '../config/business';
import { ContactSelectModal } from './ContactSelectModal';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

interface WhatsAppButtonProps {
  getMessage: () => string;
  contactId?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  eventName?: 'whatsapp_order_clicked' | 'whatsapp_direct_clicked';
  eventPayload?: Record<string, unknown>;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  getMessage,
  contactId,
  variant = 'primary',
  size = 'md',
  label,
  className = '',
  eventName = 'whatsapp_direct_clicked',
  eventPayload
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  const handleOpenWhatsApp = (contact: BusinessContact) => {
    const rawMessage = getMessage();
    const url = createWhatsAppUrl(contact.whatsappNumber, rawMessage);
    trackEvent(eventName, {
      contactId: contact.id,
      contactName: contact.name,
      ...eventPayload
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (contactId) {
      const targetContact = businessContacts.find(c => c.id === contactId) || businessContacts[0];
      handleOpenWhatsApp(targetContact);
    } else {
      setIsModalOpen(true);
    }
  };

  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-forest-900 hover:bg-forest-800 text-gold-300 border border-gold-400/30',
    outline: 'border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50',
    pill: 'bg-emerald-600/10 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-full'
  };

  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs gap-1.5',
    md: 'py-2.5 px-4 text-sm gap-2',
    lg: 'py-3.5 px-6 text-base gap-2.5 font-bold'
  };

  const displayLabel = label || (language === 'ur' ? 'واٹس ایپ پر رابطہ کریں' : 'Order on WhatsApp');

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        aria-label={displayLabel}
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>{displayLabel}</span>
      </button>

      <ContactSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectContact={handleOpenWhatsApp}
      />
    </>
  );
};
