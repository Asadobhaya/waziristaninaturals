import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LiveRecentOrderPopup } from './components/LiveRecentOrderPopup';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

/**
 * Component to handle scroll reset and dynamic SEO title & meta description updates
 */
const RouteMetadataHandler: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);

    const path = location.pathname;
    let title = 'Waziristani Naturals | Zaitoon Oil & Shilajit';
    let description = 'Rooted in Nature. Inspired by Heritage. Shop authentic Waziristani Zaitoon (Olive) Oil in 4 sizes (250ml to 1L) and pure mountain Shilajit (Rs. 2,000). Limited-time nationwide free delivery.';

    if (path === '/') {
      title = language === 'ur'
        ? 'وزیرستانی نیچرلز | زیتون کا تیل اور سلاجیت'
        : 'Waziristani Naturals | Zaitoon Oil & Shilajit';
      description = language === 'ur'
        ? 'فطرت سے وابستہ، روایات سے آراستہ۔ وزیرستان کی سرزمین سے حاصل کردہ خالص زیتون کا تیل اور قدرتی پہاڑی سلاجیت۔ پورے پاکستان میں مفت ڈیلیوری۔'
        : 'Rooted in Nature. Inspired by Heritage. Shop authentic Waziristani Zaitoon (Olive) Oil in 4 sizes (250ml to 1L) and pure mountain Shilajit (Rs. 2,000).';
    } else if (path === '/products') {
      title = language === 'ur'
        ? 'ہماری مصنوعات — وزیرستانی نیچرلز | زیتون کا تیل اور سلاجیت'
        : 'Our Products — Waziristani Naturals | Pure Zaitoon Oil & Shilajit';
      description = language === 'ur'
        ? 'وزیرستانی زیتون کے تیل کے 4 سائزز (250 ملی لٹر سے 1 لٹر) اور خالص سلاجیت (2,000 روپے)۔'
        : 'Explore pure Waziristani Zaitoon Oil in 4 sizes (250ml - 1L) and authentic mountain Shilajit (Rs. 2,000). Transparent pricing.';
    } else if (path === '/products/zaitoon-oil') {
      title = language === 'ur'
        ? 'وزیرستانی زیتون کا تیل — 4 سائزز (250 ملی لٹر تا 1 لٹر) | وزیرستانی نیچرلز'
        : 'Waziristani Zaitoon Oil — Pure Olive Oil in 4 Sizes (250ml to 1L) | Waziristani Naturals';
      description = language === 'ur'
        ? 'خالص زیتون کا تیل چار سائزز میں دستیاب: 250ml (1700 روپے)، 500ml (3300 روپے)، 750ml (5100 روپے)، 1000ml (6200 روپے)۔'
        : 'Pure Waziristani Olive Oil available in 4 calibrated sizes: 250ml (Rs. 1,700), 500ml (Rs. 3,300), 750ml (Rs. 5,100), 1000ml (Rs. 6,200).';
    } else if (path === '/products/shilajit') {
      title = language === 'ur'
        ? 'وزیرستانی خالص سلاجیت — اصل پہاڑی رال (2,000 روپے) | وزیرستانی نیچرلز'
        : 'Waziristani Shilajit — Authentic Mountain Mineral Resin (Rs. 2,000) | Waziristani Naturals';
      description = language === 'ur'
        ? 'وزیرستان کے بلند پہاڑی سلسلوں سے حاصل کردہ خالص و قدرتی سلاجیت۔ قیمت: 2,000 روپے۔ ہوا بند شیشے کا جار۔'
        : 'Authentic concentrated mountain Shilajit resin from high-altitude Waziristan terrain. Price: Rs. 2,000. Packed in airtight protective glass jar.';
    } else if (path === '/cart') {
      title = language === 'ur' ? 'آپ کی ٹوکری — وزیرستانی نیچرلز' : 'Your Shopping Cart — Waziristani Naturals';
    } else if (path === '/checkout') {
      title = language === 'ur' ? 'آرڈر فارم — وزیرستانی نیچرلز' : 'Order Request & Checkout — Waziristani Naturals';
    } else if (path === '/about') {
      title = language === 'ur' ? 'ہماری کہانی اور ورثہ — وزیرستانی نیچرلز' : 'Our Story & Heritage — Waziristani Naturals';
      description = language === 'ur'
        ? 'وزیرستان کی سرزمین سے سچی اور خالص سوغات فراہم کرنے کی کہانی۔'
        : 'Learn about Waziristani Naturals’ commitment to unadulterated natural olive oil and mountain shilajit with honest standards.';
    } else if (path === '/contact') {
      title = language === 'ur' ? 'رابطہ اور نمائندے — وزیرستانی نیچرلز' : 'Contact Us & Representatives — Waziristani Naturals';
      description = language === 'ur'
        ? 'نبیل عالم خان اور اسد سے فون یا واٹس ایپ پر براہِ راست رابطہ کریں۔'
        : 'Direct contact details for Nabeel Aalam Khan (+92 334 8007049) and Asad (+92 300 4634494).';
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [location.pathname, language]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ToastProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-ivory-50 text-charcoal-800">
              <RouteMetadataHandler />
              <AnnouncementBar />
              <Header />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
              <CartDrawer />
              <FloatingWhatsApp />
              <LiveRecentOrderPopup />
            </div>
          </CartProvider>
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
