import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totals, setIsDrawerOpen } = useCart();
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'products', label: language === 'ur' ? 'مصنوعات' : 'Products' },
    { id: 'why-us', label: language === 'ur' ? 'ہمیں کیوں چنیں' : 'Why Us' },
    { id: 'packaging', label: language === 'ur' ? 'پیکنگز' : 'Packings' },
    { id: 'reviews', label: language === 'ur' ? 'گاہکوں کی رائے' : 'Reviews' },
    { id: 'how-to-order', label: language === 'ur' ? 'طریقہ آرڈر' : 'How to Order' },
    { id: 'contact', label: language === 'ur' ? 'رابطہ' : 'Contact' },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#07160F] via-[#0A0D0B] to-[#07160F] text-ivory-50 sticky top-0 z-30 shadow-lg border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-lg p-1"
            aria-label="Waziristani Naturals Home"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gold-400/70 shadow-lg group-hover:scale-105 group-hover:border-gold-300 transition-all shrink-0 bg-forest-950 flex items-center justify-center">
              <img
                src="/assets/images/waziristani-logo.png"
                alt="Waziristani Naturals Brand Emblem"
                className="w-full h-full object-cover"
                width="48"
                height="48"
              />
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-serif font-black tracking-wide text-ivory-50 block leading-tight">
                {language === 'ur' ? 'وزیرستانی نیچرلز' : 'Waziristani Naturals'}
              </span>
              <span className="text-[10px] tracking-wider text-gold-400/90 font-medium uppercase block">
                {language === 'ur' ? 'فطرت سے وابستہ، روایات سے آراستہ' : 'Rooted in Nature. Inspired by Heritage.'}
              </span>
            </div>
          </Link>

          {/* Desktop Single-Page Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" aria-label="Main Navigation">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-ivory-100/90 hover:text-gold-300 py-2 transition-colors relative font-semibold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-forest-950/80 hover:bg-forest-950 text-gold-400 border border-gold-400/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label={`Open shopping cart. ${totals.itemCount} items currently in cart.`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-gold-500 text-forest-950 text-[11px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {totals.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-ivory-100 hover:text-white hover:bg-forest-900 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-0 top-20 z-40 bg-forest-950/98 backdrop-blur-xl border-t border-forest-800/80 flex flex-col justify-between p-6 overflow-y-auto animate-fade-in"
        >
          <div className="space-y-6">
            <div className="pb-4 border-b border-forest-800/60 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                {language === 'ur' ? 'نیویگیشن' : 'Navigation Menu'}
              </span>
              <LanguageSwitcher />
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-lg font-serif font-bold text-ivory-50 hover:text-gold-300 py-2 border-b border-forest-900/60 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-forest-800/80 text-xs text-ivory-100/70 space-y-3">
            <p className="font-serif text-sm font-bold text-gold-300">
              {language === 'ur' ? 'وزیرستانی نیچرلز کسٹمر کیئر' : 'Waziristani Naturals Order Care'}
            </p>
            <p>
              {language === 'ur' ? 'فون / واٹس ایپ:' : 'Direct WhatsApp:'}{' '}
              <a href="https://wa.me/923348007049" className="text-gold-400 font-mono font-bold">
                +92 334 8007049
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
