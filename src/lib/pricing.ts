import { deliveryOffer } from '../config/delivery';
import { CartItem, CartTotals, Language } from '../types';

/**
 * Format a numeric amount in Pakistani Rupee style.
 * Example: 1700 -> "Rs. 1,700" (EN) or "1,700 روپے" (UR)
 */
export function formatPrice(amount: number, lang: Language = 'en'): string {
  const formattedNumber = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0
  }).format(amount);

  if (lang === 'ur') {
    return `${formattedNumber} روپے`;
  }
  return `Rs. ${formattedNumber}`;
}

/**
 * Check if the limited-time free delivery promotion is currently active in Asia/Karachi timezone.
 */
export function isDeliveryOfferActive(): boolean {
  if (!deliveryOffer.enabled) {
    return false;
  }

  try {
    // Current time in Asia/Karachi (Pakistan Standard Time, UTC+5)
    const now = new Date();
    // Parse target end date at end of day 23:59:59 Pakistan time
    // endDate string: "2026-11-07"
    const [year, month, day] = deliveryOffer.endDate.split('-').map(Number);
    // Construct UTC timestamp corresponding to Asia/Karachi end of day
    // Asia/Karachi is UTC+5, so 23:59:59 in Karachi is 18:59:59 UTC of the same day.
    const expiryUtc = Date.UTC(year, month - 1, day, 18, 59, 59, 999);

    return now.getTime() <= expiryUtc;
  } catch {
    return false;
  }
}

/**
 * Calculate remaining time in the promotion for display countdown
 */
export function getPromotionTimeRemaining(): {
  active: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const active = isDeliveryOfferActive();
  if (!active) {
    return { active: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const [year, month, day] = deliveryOffer.endDate.split('-').map(Number);
  const expiryUtc = Date.UTC(year, month - 1, day, 18, 59, 59, 999);
  const diffMs = Math.max(0, expiryUtc - Date.now());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { active: true, days, hours, minutes, seconds };
}

/**
 * Calculate totals for cart items using exact numeric values and central rules.
 */
export function calculateCartTotals(items: CartItem[]): CartTotals {
  let itemCount = 0;
  let subtotal = 0;

  for (const item of items) {
    // Ensure clean positive numbers
    const qty = Math.max(1, Math.floor(item.quantity || 1));
    const price = Math.max(0, Number(item.unitPrice) || 0);
    itemCount += qty;
    subtotal += price * qty;
  }

  const offerActive = isDeliveryOfferActive();
  let deliveryFee = 0;
  let isDeliveryFree = false;
  let deliveryStatusText = "";
  let deliveryStatusTextUrdu = "";

  if (itemCount === 0) {
    deliveryFee = 0;
    isDeliveryFree = false;
    deliveryStatusText = "—";
    deliveryStatusTextUrdu = "—";
  } else if (offerActive) {
    deliveryFee = 0;
    isDeliveryFree = true;
    deliveryStatusText = "Free (Limited-Time Offer)";
    deliveryStatusTextUrdu = "مفت (محدود وقت کی پیشکش)";
  } else {
    // If expired, standard delivery fee is unknown; we do not invent a charge!
    deliveryFee = deliveryOffer.feeAfterOffer ?? 0;
    isDeliveryFree = false;
    deliveryStatusText = deliveryOffer.feeAfterOffer !== null 
      ? formatPrice(deliveryOffer.feeAfterOffer, 'en')
      : "To be confirmed on order";
    deliveryStatusTextUrdu = deliveryOffer.feeAfterOffer !== null
      ? formatPrice(deliveryOffer.feeAfterOffer, 'ur')
      : "آرڈر کے وقت تصدیق کی جائے گی";
  }

  // Super Bumper Offer: 1 Shilajit + 500ml or above Zaitoon Oil gives Rs. 100 extra discount!
  const hasShilajit = items.some(i => i.productId === 'shilajit' && i.quantity >= 1);
  const hasQualifyingOil = items.some(
    i => i.productId === 'zaitoon-oil' &&
    (i.variantId === '500ml' || i.variantId === '750ml' || i.variantId === '1000ml') &&
    i.quantity >= 1
  );

  let bundleDiscount = 0;
  let isBundleDiscountActive = false;

  if (hasShilajit && hasQualifyingOil) {
    bundleDiscount = 100;
    isBundleDiscountActive = true;
  }

  const total = Math.max(0, subtotal + deliveryFee - bundleDiscount);

  return {
    itemCount,
    subtotal,
    deliveryFee,
    isDeliveryFree,
    bundleDiscount,
    isBundleDiscountActive,
    total,
    deliveryStatusText,
    deliveryStatusTextUrdu
  };
}
