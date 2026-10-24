import { X, MessageSquare, UserCheck } from 'lucide-react';
import { businessContacts, BusinessContact } from '../config/business';
import { useLanguage } from '../context/LanguageContext';

interface ContactSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact: (contact: BusinessContact) => void;
  title?: string;
  subtitle?: string;
}

export const ContactSelectModal: React.FC<ContactSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectContact,
  title,
  subtitle
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-charcoal-200/80 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center mx-auto mb-3 shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 id="contact-modal-title" className="text-xl font-serif font-bold text-forest-950">
            {title || (language === 'ur' ? 'نمائندہ منتخب کریں' : 'Choose Your Representative')}
          </h3>
          <p className="text-xs text-charcoal-600 mt-1 max-w-xs mx-auto">
            {subtitle || (language === 'ur'
              ? 'اپنا آرڈر یا سوال بھیجنے کے لیے نیچے دیے گئے نمائندوں میں سے کسی ایک کا انتخاب کریں:'
              : 'Select which Waziristani Naturals representative should receive and coordinate your order:')}
          </p>
        </div>

        <div className="space-y-3">
          {businessContacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => {
                onSelectContact(contact);
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-charcoal-200 hover:border-forest-800 hover:bg-ivory-50 transition-all text-left group shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-900/10 text-forest-900 group-hover:bg-forest-900 group-hover:text-gold-400 flex items-center justify-center transition-colors">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-forest-950 group-hover:text-forest-800 text-sm">
                    {language === 'ur' ? contact.nameUrdu : contact.name}
                  </div>
                  <div className="text-xs text-charcoal-600">
                    {language === 'ur' ? contact.roleUrdu : contact.role}
                  </div>
                  <div className="text-xs font-mono text-forest-700 mt-0.5 number-ltr">
                    {contact.phone}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-600 group-hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-xl bg-ivory-100 text-center text-[11px] text-charcoal-600 border border-ivory-800/40">
          {language === 'ur'
            ? 'نوٹ: واٹس ایپ لنک کھولنے کے بعد آرڈر مکمل کرنے کے لیے ایپ میں "Send" کا بٹن دبائیں۔'
            : 'Note: Opening WhatsApp prepares your order message. Please press Send in WhatsApp to finalize.'}
        </div>
      </div>
    </div>
  );
};
