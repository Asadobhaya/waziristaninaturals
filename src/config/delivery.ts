export interface DeliveryOfferConfig {
  enabled: boolean;
  endDate: string; // ISO format: YYYY-MM-DD
  feeAfterOffer: number | null;
}

export const deliveryOffer: DeliveryOfferConfig = {
  enabled: true,
  endDate: "2026-11-07",
  feeAfterOffer: null
};

export interface DeliveryRegionConfig {
  confirmedCities: string[];
  notes: string;
  notesUrdu: string;
  cashOnDeliveryConfirmed: boolean;
}

export const deliveryCoverage: DeliveryRegionConfig = {
  // Cities where logistics dispatch is confirmed by default; empty or verified list
  confirmedCities: [
    "Islamabad",
    "Rawalpindi",
    "Lahore",
    "Karachi",
    "Peshawar",
    "Quetta",
    "Multan",
    "Faisalabad",
    "Dera Ismail Khan",
    "Bannu",
    "Wana",
    "Miranshah"
  ],
  notes: "Delivery network coverage across Pakistan is verified per order with our courier partners.",
  notesUrdu: "پاکستان بھر میں ڈیلیوری کی تصدیق اور ترسیل آرڈر کے وقت کوریئر پارٹنرز کے ذریعے کی جاتی ہے۔",
  cashOnDeliveryConfirmed: false // Cash on delivery is not yet verified; defaults to false as required
};
