export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  label?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  categoryUrdu: string;
  tagline: string;
  taglineUrdu: string;
  description: string;
  descriptionUrdu: string;
  image: string;
  galleryImages: string[];
  variants?: ProductVariant[];
  price?: number;
  badge?: string;
  badgeUrdu?: string;
  details: {
    label: string;
    labelUrdu: string;
    value: string;
    valueUrdu: string;
  }[];
  usageNotes: string[];
  usageNotesUrdu: string[];
}

export const products: Product[] = [
  {
    id: "zaitoon-oil",
    name: "Waziristani Zaitoon Oil",
    nameUrdu: "وزیرستانی زیتون کا تیل",
    category: "Olive Oil",
    categoryUrdu: "زیتون کا خالص تیل",
    tagline: "The Pearl Of The MW — Pure Olive Oil from Waziristan",
    taglineUrdu: "زیتون کے دانوں سے نکالا ہوا خالص و مستند تیل",
    description: "Pure, natural olive oil extracted directly from quality olives and sealed in protective amber packaging with a precision flip-top cap. Preserves natural aroma, rich viscosity, and golden-green purity across four convenient sizes.",
    descriptionUrdu: "تازہ زیتون کے دانوں سے روایتی مہارت کے ساتھ حاصل کردہ خالص زیتون کا تیل۔ فلپ ٹاپ محفوظ پیکنگ میں چار مختلف سائزز میں دستیاب۔",
    image: "/assets/images/products/zaitoon-bottle-front.jpg",
    galleryImages: [
      "/assets/images/products/zaitoon-bottle-front.jpg",
      "/assets/images/products/zaitoon-oil-500ml.jpg",
      "/assets/images/products/zaitoon-oil-750ml.jpg",
      "/assets/images/products/zaitoon-oil-1000ml.jpg"
    ],
    variants: [
      { id: "250ml", size: "250 ml", price: 1700, label: "250 ml", image: "/assets/images/products/zaitoon-bottle-front.jpg" },
      { id: "500ml", size: "500 ml", price: 3300, label: "500 ml", image: "/assets/images/products/zaitoon-oil-500ml.jpg" },
      { id: "750ml", size: "750 ml", price: 5100, label: "750 ml", image: "/assets/images/products/zaitoon-oil-750ml.jpg" },
      { id: "1000ml", size: "1000 ml (1 litre)", price: 6200, label: "1000 ml (1 litre)", image: "/assets/images/products/zaitoon-oil-1000ml.jpg" }
    ],
    badge: "Halal Control Verified",
    badgeUrdu: "حلال تصدیق شدہ",
    details: [
      { label: "Registration", labelUrdu: "رجسٹریشن", value: "TM: 714998 | Reg No: 21705S9014653", valueUrdu: "ٹریڈ مارک: 714998 | رجسٹریشن نمبر: 21705S9014653" },
      { label: "Dispenser Cap", labelUrdu: "ڈسپنسر کیپ", value: "Airtight, leak-resistant flip-top cap", valueUrdu: "محفوظ فلپ ٹاپ ایئر ٹائٹ کیپ" },
      { label: "Available Sizes", labelUrdu: "دستیاب سائزز", value: "250 ml, 500 ml, 750 ml, 1000 ml (1 litre)", valueUrdu: "250 ملی لٹر، 500 ملی لٹر، 750 ملی لٹر، 1 لٹر" },
      { label: "Origin", labelUrdu: "ماخذ", value: "Waziristan region, Pakistan", valueUrdu: "خطہ وزیرستان، پاکستان" }
    ],
    usageNotes: [
      "Ideal for dressing fresh salads, gentle culinary cooking, and warm recipes",
      "Traditional natural choice for skin nourishing and hair massage routines",
      "Store at room temperature away from direct heat"
    ],
    usageNotesUrdu: [
      "سلاد، کھانوں پر چھڑکنے اور روزمرہ پکائی کے لیے بہترین",
      "جلد اور بالوں کے قدرتی مساج اور نگہداشت کے لیے آزمودہ",
      "براہِ راست دھوپ سے دور کمرے کے درجہ حرارت پر رکھیں"
    ]
  },
  {
    id: "shilajit",
    name: "Waziristani Shilajit",
    nameUrdu: "وزیرستانی گولڈ سلاجیت",
    category: "Shilajit",
    categoryUrdu: "خالص گولڈ سلاجیت",
    tagline: "WGS Waziristani Gold Shilajit — High Mountain Resin (10 G)",
    taglineUrdu: "پہاڑی چٹانوں سے روایتی طریقوں سے صاف کردہ اصل گولڈ سلاجیت",
    description: "Authentic, high-grade purified mountain Shilajit resin packed in a sealed black glass jar with its official protective box and an engraved stainless steel measuring spoon for accurate daily portions.",
    descriptionUrdu: "خالص پہاڑی چٹانوں سے حاصل کردہ اصل وزیرستانی گولڈ سلاجیت۔ ہوا بند محفوظ بلیک جار، ڈبے اور پیمائش کے مخصوص چمچ کے ساتھ۔",
    image: "/assets/images/products/shilajit-top.jpg",
    galleryImages: [
      "/assets/images/products/shilajit-top.jpg",
      "/assets/images/products/shilajit-box.jpg",
      "/assets/images/products/shilajit-jar.jpg"
    ],
    price: 2000,
    badge: "Net Wt: 10 G + Spoon",
    badgeUrdu: "وزن: 10 گرام + خصوصی چمچ",
    details: [
      { label: "Net Weight", labelUrdu: "خالص وزن", value: "10 Grams (Net Wt: 10 G)", valueUrdu: "10 گرام خالص وزن" },
      { label: "Accessories", labelUrdu: "اضافی لوازمات", value: "Stainless steel measuring spoon included", valueUrdu: "سٹینلیس سٹیل کا مخصوص پیمائشی چمچ شامل ہے" },
      { label: "Price", labelUrdu: "قیمت", value: "Rs. 2,000", valueUrdu: "2,000 روپے" },
      { label: "Storage", labelUrdu: "محفوظ رکھنے کی ہدایت", value: "Keep jar tightly closed in a cool, dry place", valueUrdu: "خشک اور محفوظ جگہ پر مضبوطی سے بند رکھیں" }
    ],
    usageNotes: [
      "Use the included measuring spoon to take a rice-grain sized portion (approx 100-250mg)",
      "Dissolve thoroughly in warm water, warm milk, or green tea",
      "Consume once daily in the morning or early afternoon",
      "Keep the jar tightly capped immediately after each use"
    ],
    usageNotesUrdu: [
      "ساتھ دیے گئے چمچ کی مدد سے گندم یا چاول کے دانے کے برابر مقدار لیں",
      "نیم گرم پانی، دودھ یا سبز چائے میں اچھی طرح حل کر کے پئیں",
      "دن میں ایک مرتبہ صبح یا دوپہر کے وقت استعمال کریں",
      "استعمال کے بعد جار کو فوری طور پر مضبوطی سے بند کر دیں"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getDefaultVariant(product: Product): ProductVariant | undefined {
  if (product.variants && product.variants.length > 0) {
    return product.variants[0];
  }
  return undefined;
}
