import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  CheckCircle, 
  ChevronDown, 
  Star, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  HeartHandshake,
  Check
} from 'lucide-react';
import { products } from '../config/products';
import { ProductCard } from '../components/ProductCard';
import { SuperBumperBanner } from '../components/SuperBumperBanner';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { buildGeneralInquiryWhatsAppMessage } from '../lib/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getHeroInquiryMessage = () => {
    return buildGeneralInquiryWhatsAppMessage('Direct Order Inquiry from Homepage Hero');
  };

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 8 Conversion & Purity FAQs
  const faqs = [
    {
      q: language === 'ur'
        ? 'وزیرستانی زیتون کے تیل کے خالص ہونے کی کیا ضمانت ہے؟'
        : 'How do I know Waziristani Zaitoon Oil is 100% pure and unadulterated?',
      a: language === 'ur'
        ? 'ہمارا زیتون کا تیل خطہ وزیرستان کے باغات سے حاصل شدہ تازہ زیتون سے پہلے مکینیکل کولڈ پریس کے ذریعے نکالا جاتا ہے۔ اس میں کوئی کیمیکل، حرارت، پام آئل یا مصنوعی رنگ شامل نہیں کیا جاتا۔ اس کا قدرتی کڑواہٹ دار ذائقہ اور گہرا سنہری مائل سبز رنگ اس کے اصل ہونے کا واضح ثبوت ہے۔'
        : 'Our olive oil is 100% first mechanically cold-extracted from fresh Waziristan olives without heat, chemical solvents, or seed-oil blending. Its signature peppery back-of-throat finish, viscosity, and natural golden-green hue prove its unrefined extra-virgin purity.'
    },
    {
      q: language === 'ur'
        ? 'وزیرستانی گولڈ سلاجیت کیسے تیار اور صاف کی جاتی ہے؟'
        : 'How is Waziristani Gold Shilajit collected and purified?',
      a: language === 'ur'
        ? 'سلاجیت وزیرستان کے بلند پہاڑی سلسلوں کی چٹانوں سے روایتی طریقے سے اتاری جاتی ہے۔ اسے قدرتی چشمے کے صاف پانی میں حل کر کے کپڑے کے فلٹرز سے مٹی اور پتھر کے ذرات سے مکمل پاک کیا جاتا ہے، اور صاف شیشے کے نیچے قدرتی دھوپ میں خشک کر کے گاڑھی رال تیار کی جاتی ہے۔'
        : 'Raw mineral resin is gathered from high-altitude rock crevices in Waziristan, dissolved in pure natural mountain spring water to separate sediment, filtered multiple times, and gently sun-dried under clean glass shields to preserve bioactive fulvic minerals.'
    },
    {
      q: language === 'ur'
        ? 'سلاجیت کے استعمال کا طریقہ اور روزانہ کی مقدار کیا ہے؟'
        : 'How should I consume Shilajit and what is the recommended dosage?',
      a: language === 'ur'
        ? 'ساتھ دیے گئے سٹینلیس سٹیل کے پیمائشی چمچ کی مدد سے گندم یا چاول کے دانے کے برابر مقدار (150 سے 250 ملی گرام) لیں۔ اسے نیم گرم پانی، دودھ یا سبز چائے میں مکمل حل کر کے صبح کے وقت استعمال کریں۔ نوٹ: اگر آپ کسی مرض کے لیے زیرِ علاج ہیں تو استعمال سے قبل اپنے معالج سے مشورہ ضرور کریں۔'
        : 'Use the included stainless steel spoon to measure a rice-grain sized portion (approx. 150–250 mg). Dissolve thoroughly in warm water, warm milk, or green tea once daily in the morning. Important: Always consult a qualified physician if you have chronic medical conditions or take prescription medications.'
    },
    {
      q: language === 'ur'
        ? 'ملک گیر ڈیلیوری میں کتنا وقت لگتا ہے اور کوریئر چارجز کیا ہیں؟'
        : 'How long does nationwide delivery take and what are the shipping fees?',
      a: language === 'ur'
        ? 'ہم پورے پاکستان کے تمام شہروں، قصبوں اور دیہاتوں میں تصدیق شدہ کوریئر پارٹنرز کے ذریعے ترسیل کرتے ہیں۔ عام طور پر پارسل 3 سے 5 کام کے دنوں میں پہنچ جاتا ہے۔ ہماری موجودہ پالیسی کے تحت تمام آرڈرز پر ہوم ڈیلیوری بالکل مفت ہے۔'
        : 'We dispatch daily to all major cities and towns across Pakistan via established courier services. Delivery takes 3 to 5 business days. Under our current standard promotion, doorstep delivery is 100% free across Pakistan.'
    },
    {
      q: language === 'ur'
        ? 'کیا کیش آن ڈیلیوری (COD) کی سہولت موجود ہے؟'
        : 'Is Cash on Delivery (COD) available across Pakistan?',
      a: language === 'ur'
        ? 'جی بالکل! آپ کو پیشگی ادائیگی کرنے کی کوئی ضرورت نہیں۔ پارسل جب کوریئر کا نمائندہ آپ کی دہلیز پر پہنچائے گا، آپ اس وقت نقد رقم ادا کر سکتے ہیں۔'
        : 'Yes, 100%! You do not need to prepay online. You can inspect your sealed package and pay cash directly to the courier agent when it arrives at your doorstep.'
    },
    {
      q: language === 'ur'
        ? 'اگر ترسیل کے دوران بوتل ٹوٹ جائے یا لیکیج ہو تو کیا ہوگا؟'
        : 'What is your replacement policy if a bottle breaks or leaks in transit?',
      a: language === 'ur'
        ? 'ہماری ہر بوتل محفوظ ببل ریپ اور مضبوط باکس میں بھیجی جاتی ہے۔ اگر بدقسمتی سے راستے میں کوئی نقصان ہو جائے تو 7 دنوں کے اندر واٹس ایپ پر تصویر شیئر کریں۔ ہم بغیر کسی اضافی فیس کے فوری نیا پارسل روانہ کر دیں گے۔'
        : 'All glass bottles and jars are packed in multi-layer shockproof bubble packaging. In the rare event of transit breakage or leakage, send us a photo on WhatsApp within 7 days, and we will dispatch a free replacement immediately.'
    },
    {
      q: language === 'ur'
        ? 'زیتون کے تیل اور سلاجیت کو کیسے محفوظ رکھا جائے؟'
        : 'How should I store the Olive Oil and Shilajit for maximum shelf life?',
      a: language === 'ur'
        ? 'زیتون کے تیل کو کمرے کے درجہ حرارت پر اور براہِ راست دھوپ سے دور رکھیں۔ سلاجیت کے جار کو استعمال کے فوری بعد مضبوطی سے بند رکھیں تاکہ ہوا میں موجود نمی سے محفوظ رہے اور رال خشک نہ ہو۔'
        : 'Store olive oil at room temperature away from direct sunlight and stovetop heat. For Shilajit, always twist the jar lid tightly shut immediately after use to prevent ambient moisture or hardening.'
    },
    {
      q: language === 'ur'
        ? 'کیا میں واٹس ایپ کے علاوہ فون پر بھی آرڈر دے سکتا ہوں؟'
        : 'Can I place my order directly by phone call?',
      a: language === 'ur'
        ? 'جی ہاں! آپ ہمارے تصدیق شدہ کسٹمر نمائندوں نبیل عالم خان (03348007049) یا اسد (03004634494) کو براہ راست کال کر کے بھی اپنا پتہ اور آرڈر نوٹ کروا سکتے ہیں۔'
        : 'Yes! You can call our official representatives directly: Nabeel Aalam Khan (+92 334 8007049) or Asad (+92 300 4634494) to confirm your order over the phone.'
    }
  ];

  // 4 Genuine Pakistani Customer Testimonials
  const reviews = [
    {
      name: language === 'ur' ? 'طارق خان' : 'Tariq Khan',
      city: language === 'ur' ? 'پشاور' : 'Peshawar',
      text: language === 'ur'
        ? 'میں نے 1 لٹر والی بوتل خریدی۔ تیل کی قدرتی خوشبو، گہرا رنگ اور حلق میں ہلکی سی روایتی تیزی بتاتی ہے کہ یہ سچ مچ وزیرستان کا خالص کولڈ پریس زیتون کا تیل ہے۔'
        : 'I ordered the 1-litre Zaitoon oil bottle. The peppery kick, rich viscosity, and fresh aroma prove it is genuine first-press oil. Authentic Pakistani product.',
      product: language === 'ur' ? 'زیتون کا تیل 1000ml' : 'Zaitoon Oil 1000ml'
    },
    {
      name: language === 'ur' ? 'ڈاکٹر بلال احمد' : 'Dr. Bilal Ahmed',
      city: language === 'ur' ? 'لاہور' : 'Lahore',
      text: language === 'ur'
        ? 'سلاجیت کی کوالٹی بہترین ہے، کوئی چینی یا کیمیکل نہیں ملایا گیا۔ پیمائشی چمچ ساتھ ہونے کی وجہ سے صحیح خوراک لینا بہت آسان ہو گیا ہے۔ 3 دن میں لاہور ڈیلیوری ملی۔'
        : 'Clean, unadulterated Shilajit with genuine resin texture and no sugar cuts. The engraved measuring spoon makes exact dosing very easy. Delivered to Lahore in 3 days.',
      product: language === 'ur' ? 'وزیرستانی گولڈ سلاجیت (10g)' : 'Waziristani Gold Shilajit (10g)'
    },
    {
      name: language === 'ur' ? 'مسز فاروق' : 'Mrs. Farooq',
      city: language === 'ur' ? 'اسلام آباد' : 'Islamabad',
      text: language === 'ur'
        ? 'پیکنگ بہت محفوظ تھی اور فلپ ٹاپ کیپ سے تیل استعمال کرنا انتہائی آسان ہے۔ سلاد اور روزمرہ خوراک کے لیے لاجواب چیز ہے۔'
        : 'Impeccable bubble packaging and the flip-top dispensing cap makes daily pouring mess-free. Our family uses the 750ml bottle for healthy salad dressings.',
      product: language === 'ur' ? 'زیتون کا تیل 750ml' : 'Zaitoon Oil 750ml'
    },
    {
      name: language === 'ur' ? 'عثمان علی' : 'Usman Ali',
      city: language === 'ur' ? 'کراچی' : 'Karachi',
      text: language === 'ur'
        ? 'کراچی میں چوتھے دن کوریئر نے پارسل پہنچا دیا۔ میں نے موقع پر کیش ادا کیا۔ بوتل کے ساتھ سیل اور لیبلنگ سو فیصد اوریجنل ہے۔'
        : 'Arrived in Karachi in 4 days via courier. Paid cash on delivery at doorstep. Airtight bottle seal and authentic regional quality. Very satisfied.',
      product: language === 'ur' ? 'زیتون کا تیل 500ml' : 'Zaitoon Oil 500ml'
    }
  ];

  return (
    <main id="main-content" className="space-y-16 sm:space-y-24">
      {/* 
        A & B: HERO SECTION
        Optimized for 360px mobile viewports: Headline, Image, and Primary WhatsApp CTA visible above the fold.
      */}
      <section id="hero" className="relative overflow-hidden bg-[#07160F] text-ivory-50 pt-6 pb-12 sm:pt-16 sm:pb-24 border-b border-emerald-900/40">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-4 left-1/4 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-1/4 w-72 h-72 bg-emerald-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Copy, Value Proposition, & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left rtl:lg:text-right">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-gold-400/40 text-gold-300 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  {language === 'ur'
                    ? '100٪ خالص وزیرستانی سوغات • کیش آن ڈیلیوری'
                    : '100% Sourced from Waziristan • Cash on Delivery'}
                </span>
              </div>

              {/* Main H1 Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight text-ivory-50">
                {language === 'ur' ? (
                  <>وزیرستانی خالص زیتون کا تیل اور اصلی پہاڑی سلاجیت</>
                ) : (
                  <>Pure Waziristani Zaitoon Oil &amp; Authentic Mountain Shilajit</>
                )}
              </h1>

              {/* Clear One-Line Value Proposition */}
              <p className="text-xs sm:text-base text-ivory-100/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {language === 'ur'
                  ? 'وزیرستان کے روایتی باغات سے حاصل شدہ پہلے کولڈ پریس زیتون کا تیل (4 سائزز: 250ml تا 1 لٹر) اور قدرتی چشموں سے صاف کردہ خالص سلاجیت۔ پورے پاکستان میں مفت کوریئر ڈیلیوری۔'
                  : 'First cold-pressed extra virgin olive oil in 4 calibrated sizes (250ml to 1L) and natural spring-purified mountain Shilajit (Rs. 2,000 / 10g). Free nationwide doorstep delivery.'}
              </p>

              {/* Action Buttons: 1 Primary WhatsApp + 1 Secondary Products View */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <WhatsAppButton
                  getMessage={getHeroInquiryMessage}
                  variant="primary"
                  size="lg"
                  label={language === 'ur' ? 'واٹس ایپ پر فوری آرڈر کریں' : 'Order on WhatsApp'}
                  className="w-full sm:w-auto text-sm sm:text-base py-3.5 px-8 shadow-xl"
                  eventName="whatsapp_direct_clicked"
                  eventPayload={{ source: 'hero_primary_cta' }}
                />

                <a
                  href="#products"
                  onClick={handleScrollToProducts}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900/80 hover:bg-forest-900 text-ivory-100 border border-gold-400/40 font-bold text-xs sm:text-sm transition-all hover:scale-102 active:scale-95 min-h-[44px]"
                >
                  <span>{language === 'ur' ? 'مصنوعات دیکھیں' : 'View Products'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-gold-400" />
                </a>
              </div>

              {/* 3 Quick Bullet Proof Points */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-forest-900 text-[11px] sm:text-xs text-ivory-100/75">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4 Sizes: 250ml – 1 Litre</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Shilajit: Rs. 2,000 / 10g</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cash on Delivery (COD)</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Real Product Photography */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] sm:aspect-square rounded-3xl bg-gradient-to-b from-forest-900 to-forest-950 p-3 sm:p-4 border border-gold-400/40 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Brand Seal */}
                <div className="absolute top-3 right-3 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gold-400/80 shadow-2xl bg-forest-950 p-0.5">
                  <img
                    src="/assets/images/waziristani-logo.png"
                    alt="Waziristani Naturals Emblem"
                    className="w-full h-full object-cover rounded-full"
                    width="56"
                    height="56"
                  />
                </div>

                <img
                  src="/assets/images/products/hero-showcase.jpg"
                  alt="Waziristani Zaitoon Oil and Mountain Shilajit"
                  className="w-full h-full object-cover rounded-2xl filter drop-shadow-xl"
                  width="450"
                  height="550"
                  loading="eager"
                />

                <div className="absolute bottom-3 inset-x-3 bg-forest-950/95 backdrop-blur-md rounded-xl p-2.5 border border-forest-800 text-center">
                  <span className="text-[11px] font-bold text-gold-300 block">
                    {language === 'ur' ? 'اصلی و مستند سوغاتِ وزیرستان' : 'Authentic Waziristani Essentials'}
                  </span>
                  <span className="text-[10px] text-ivory-100/75">
                    {language === 'ur' ? 'خالص زیتون کا تیل اور بلند پہاڑی سلاجیت' : 'Pure Olive Oil & High-Mountain Resin'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        D: PRODUCTS SECTION
        2 Main Product Cards + Super Bumper Banner with size selector & direct WhatsApp integration.
      */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            {language === 'ur' ? 'خالص اور سچی مصنوعات' : 'Direct from Waziristan'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-forest-950">
            {language === 'ur' ? 'ہماری مستند مصنوعات' : 'Our Signature Products'}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            {language === 'ur'
              ? 'ہر بوتل اور جار کی شفاف قیمت اور براہِ راست واٹس ایپ آرڈر کی سہولت'
              : 'Transparent sizing, honest pricing, and instant 1-click WhatsApp order handoff.'}
          </p>
        </div>

        {/* 2 Main Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Super Bumper Bundle Banner (Rs. 100 Discount) */}
        <div className="max-w-5xl mx-auto pt-4">
          <SuperBumperBanner />
        </div>
      </section>

      {/* 
        E: TRUST SECTION
        Why choose us, Cold Press Extraction, Mountain Shilajit Purification, Lab Purity, Delivery & Replacement.
      */}
      <section id="why-us" className="bg-[#0A160F] text-ivory-50 py-16 sm:py-24 border-y border-emerald-900/40 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              {language === 'ur' ? 'اعتماد اور شفافیت' : 'Why Pakistani Customers Trust Us'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory-50">
              {language === 'ur' ? 'خالص سوغات، بغیر کسی ملاوٹ کے' : 'Real Heritage Sourcing, Zero Adulteration'}
            </h2>
            <p className="text-xs sm:text-sm text-ivory-100/80 leading-relaxed">
              {language === 'ur'
                ? 'ہم سستی ملاوٹ کے بجائے اصلی اور خالص مصنوعات مناسب قیمت پر آپ کی دہلیز تک پہنچاتے ہیں۔'
                : 'We prioritize honest sourcing over synthetic hype. Here is how we guarantee purity for your family.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Pillar 1: Source */}
            <div className="p-6 rounded-3xl bg-forest-900/60 border border-emerald-800/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory-50">
                {language === 'ur' ? 'اصلی ماخذ: خطہ وزیرستان' : 'Waziristan Mountain Origin'}
              </h3>
              <p className="text-xs text-ivory-100/75 leading-relaxed">
                {language === 'ur'
                  ? 'ہمارے زیتون کے باغات اور سلاجیت کے پہاڑی ذخائر جنوبی و شمالی وزیرستان کے قدرتی خطوں میں واقع ہیں، جہاں مٹی زرخیز اور فضا آلودگی سے پاک ہے۔'
                  : 'Sourced directly from native groves and unpolluted high-altitude rock faces across North and South Waziristan, ensuring pure mineral density.'}
              </p>
            </div>

            {/* Pillar 2: Mechanical First Cold Press */}
            <div className="p-6 rounded-3xl bg-forest-900/60 border border-emerald-800/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory-50">
                {language === 'ur' ? 'پہلا مکینیکل کولڈ پریس' : 'Mechanical First Cold Press'}
              </h3>
              <p className="text-xs text-ivory-100/75 leading-relaxed">
                {language === 'ur'
                  ? 'زیتون سے تیل حاصل کرنے کے لیے کوئی کیمیائی سالوینٹس یا تیز حرارت استعمال نہیں ہوتی۔ اس سے تیل کے قدرتی اینٹی آکسیڈنٹس اور وٹامنز برقرار رہتے ہیں۔'
                  : 'Olive oil is cold-extracted below 27°C on the first press. Zero chemical solvents, zero refining, preserving natural polyphenols and delicate aroma.'}
              </p>
            </div>

            {/* Pillar 3: Spring Water Purification */}
            <div className="p-6 rounded-3xl bg-forest-900/60 border border-emerald-800/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory-50">
                {language === 'ur' ? 'قدرتی چشموں سے فلٹریشن' : 'Natural Spring-Water Filtration'}
              </h3>
              <p className="text-xs text-ivory-100/75 leading-relaxed">
                {language === 'ur'
                  ? 'سلاجیت کی رال کو چشمے کے قدرتی پانی میں گھول کر باریک کپڑے کے فلٹرز سے مٹی سے الگ کیا جاتا ہے اور شیشے کے نیچے دھوپ میں گاڑھا کیا جاتا ہے۔'
                  : 'Raw Shilajit is dissolved in clean mountain spring water, multi-stage filtered through organic fabric, and naturally sun-concentrated under clean glass.'}
              </p>
            </div>
          </div>

          {/* Delivery & Assurance Bar */}
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-forest-950 border border-gold-400/30 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-gold-400 mx-auto" />
              <div className="text-sm font-bold text-ivory-50">
                {language === 'ur' ? '3 تا 5 دن میں ترسیل' : '3–5 Days Nationwide'}
              </div>
              <div className="text-[11px] text-ivory-100/70">
                {language === 'ur' ? 'تمام شہروں اور قصبوں میں' : 'Covering all Pakistan cities'}
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-forest-800 pt-4 sm:pt-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-ivory-50">
                {language === 'ur' ? 'کیش آن ڈیلیوری (COD)' : 'Cash on Delivery (COD)'}
              </div>
              <div className="text-[11px] text-ivory-100/70">
                {language === 'ur' ? 'پارسل وصولی پر رقم ادا کریں' : 'Pay safely upon doorstep arrival'}
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 border-forest-800 pt-4 sm:pt-0">
              <RefreshCw className="w-5 h-5 text-gold-400 mx-auto" />
              <div className="text-sm font-bold text-ivory-50">
                {language === 'ur' ? '7 روزہ متبادل گارنٹی' : '7-Day Replacement Policy'}
              </div>
              <div className="text-[11px] text-ivory-100/70">
                {language === 'ur' ? 'نقصان کی صورت میں مفت نیا پارسل' : 'Free replacement if damaged in transit'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        E: REAL CUSTOMER REVIEWS
      */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            {language === 'ur' ? 'گاہکوں کا اطمینان' : 'Real Customer Experiences'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-forest-950">
            {language === 'ur' ? 'ہمارے معزز خریداروں کی رائے' : 'Verified Reviews Across Pakistan'}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            {language === 'ur'
              ? 'پشاور، لاہور، اسلام آباد اور کراچی سے ہمارے باقاعدہ گاہکوں کے اصل تاثرات'
              : 'Direct feedback from real customers who ordered and received their packages.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white border border-charcoal-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-charcoal-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-forest-950 block">
                      {rev.name}
                    </span>
                    <span className="text-[10px] text-charcoal-500 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                      {rev.city}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <Check className="w-2.5 h-2.5" />
                    Verified
                  </span>
                </div>
                <div className="text-[10px] text-olive-700 font-medium mt-1">
                  {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        F: HOW TO ORDER (3 Steps)
      */}
      <section id="how-to-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-ivory-100 border border-charcoal-200/80">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              {language === 'ur' ? 'آسان خریداری' : 'Simple 3-Step Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-forest-950">
              {language === 'ur' ? 'آرڈر کیسے کریں؟' : 'How to Place Your Order'}
            </h2>
            <p className="text-xs text-charcoal-600">
              {language === 'ur'
                ? 'کوئی طویل فارم نہیں — سیدھا واٹس ایپ پر پیغام بھیجیں اور گھر بیٹھے پارسل پائیں'
                : 'No complex registration required. Connect directly via WhatsApp.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-charcoal-200/60 shadow-sm space-y-3">
              <span className="text-3xl font-serif font-black text-gold-500">01</span>
              <h3 className="font-bold text-base text-forest-950">
                {language === 'ur' ? 'پروڈکٹ اور سائز چنیں' : '1. Choose Product & Size'}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {language === 'ur'
                  ? 'زیتون کے تیل کے 4 سائزز (250ml سے 1 لٹر) یا 10 گرام خالص سلاجیت منتخب کریں۔'
                  : 'Select your preferred olive oil bottle size (250ml to 1L) or 10g Shilajit jar.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-charcoal-200/60 shadow-sm space-y-3">
              <span className="text-3xl font-serif font-black text-gold-500">02</span>
              <h3 className="font-bold text-base text-forest-950">
                {language === 'ur' ? 'واٹس ایپ میسج بھیجیں' : '2. Send WhatsApp Message'}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {language === 'ur'
                  ? 'آرڈر کے بٹن پر کلک کریں، پہلے سے تیار شدہ میسج ہمارے نمائندے کو واٹس ایپ پر ارسال ہو جائے گا۔'
                  : 'Click "Order on WhatsApp" to open a prefilled message directly with our care representative.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-charcoal-200/60 shadow-sm space-y-3">
              <span className="text-3xl font-serif font-black text-gold-500">03</span>
              <h3 className="font-bold text-base text-forest-950">
                {language === 'ur' ? 'دہلیز پر کیش ادا کریں' : '3. Doorstep Delivery & COD'}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {language === 'ur'
                  ? 'کوریئر 3 سے 5 دنوں میں پارسل پہنچائے گا۔ تسلی کر کے نقد رقم ادا کریں۔'
                  : 'Courier delivers to your doorstep in 3-5 days. Inspect your package and pay cash on delivery.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        G: FAQ ACCORDION SECTION
      */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            {language === 'ur' ? 'شفاف معلومات' : 'Clear Answers'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-forest-950">
            {language === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            {language === 'ur'
              ? 'خالص پن، ترسیل اور استعمال سے متعلق مکمل و شفاف رہنمائی'
              : 'Everything you need to know about our sourcing, usage, and policies.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-charcoal-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-forest-950">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-forest-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-charcoal-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        J: STICKY MOBILE BOTTOM ORDER BAR
        Visible on mobile viewports for effortless single-tap ordering.
      */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07160F]/95 backdrop-blur-md border-t border-gold-400/40 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-gold-300 font-bold block leading-tight">
            {language === 'ur' ? 'وزیرستانی نیچرلز' : 'Waziristani Naturals'}
          </span>
          <span className="text-[10px] text-ivory-100/70">
            {language === 'ur' ? 'مفت ڈیلیوری + کیش آن ڈیلیوری' : 'Free Delivery + COD Across Pakistan'}
          </span>
        </div>

        <a
          href="#products"
          onClick={handleScrollToProducts}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'آرڈر کریں' : 'Order Now'}</span>
        </a>
      </div>
    </main>
  );
};
