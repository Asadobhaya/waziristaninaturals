import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totals, setIsDrawerOpen } = useCart();
  const { t, language } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/products', label: t('products') },
    { to: '/about', label: t('about') },
    { to: '/contact', label: t('contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-gradient-to-r from-[#07160F] via-[#0A0D0B] to-[#07160F] text-ivory-50 sticky top-0 z-30 shadow-lg border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link
            to="/"
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors py-1 relative ${
                  isActive(link.to)
                    ? 'text-gold-300 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-400'
                    : 'text-ivory-100/90 hover:text-gold-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Language Switcher + Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-forest-950/80 hover:bg-forest-950 text-gold-400 border border-gold-400/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm"
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
              className="md:hidden p-2 rounded-xl text-ivory-100 hover:text-white hover:bg-forest-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-forest-950 border-b border-forest-800 px-5 pt-3 pb-6 space-y-4 animate-slide-up">
          <div className="flex justify-between items-center py-2 border-b border-forest-800/80">
            <span className="text-xs text-ivory-100/70">{t('menu')}</span>
            <LanguageSwitcher />
          </div>

          <nav className="flex flex-col space-y-2 text-base font-medium">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'bg-forest-800/90 text-gold-300 font-bold'
                    : 'text-ivory-100 hover:bg-forest-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDrawerOpen(true);
              }}
              className="w-full text-left rtl:text-right py-2 px-3 rounded-lg text-gold-400 hover:bg-forest-800/50 font-bold flex items-center justify-between"
            >
              <span>{t('cart')}</span>
              <span className="bg-gold-500 text-forest-950 text-xs px-2 py-0.5 rounded-full font-bold">
                {totals.itemCount}
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
