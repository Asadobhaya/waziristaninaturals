import { businessContacts, BusinessContact } from '../config/business';
import { CartItem, CartTotals, CustomerDetails } from '../types';
import { formatPrice } from './pricing';

/**
 * Generate full checkout order message
 */
export function buildOrderWhatsAppMessage(
  customer: CustomerDetails,
  items: CartItem[],
  totals: CartTotals,
  contactName: string
): string {
  const lines: string[] = [
    `*WAZIRISTANI NATURALS — NEW ORDER REQUEST*`,
    `--------------------------------`,
    `*Customer:* ${customer.fullName}`,
    `*Phone:* ${customer.phone}`,
    `*City:* ${customer.city}`,
    `*Address:* ${customer.address}`,
    `*Order Assigned To:* ${contactName}`,
    ``,
    `*ITEMS ORDERED:*`
  ];

  items.forEach((item, index) => {
    const itemSubtotal = item.unitPrice * item.quantity;
    const nameWithVariant = item.variantSize
      ? `${item.productName} — ${item.variantSize}`
      : item.productName;

    lines.push(`${index + 1}. *${nameWithVariant}*`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Unit Price: ${formatPrice(item.unitPrice, 'en')}`);
    lines.push(`   Subtotal: ${formatPrice(itemSubtotal, 'en')}`);
  });

  lines.push(`--------------------------------`);
  lines.push(`*Subtotal:* ${formatPrice(totals.subtotal, 'en')}`);
  lines.push(`*Delivery:* ${totals.deliveryStatusText}`);
  if (totals.isBundleDiscountActive) {
    lines.push(`*Super Bumper Discount:* -Rs. ${totals.bundleDiscount} (Shilajit + 500ml+ Zaitoon Oil)`);
  }
  lines.push(`*Total Amount:* ${formatPrice(totals.total, 'en')}`);

  if (customer.notes && customer.notes.trim()) {
    lines.push(`*Order Notes:* ${customer.notes.trim()}`);
  }

  lines.push(``);
  lines.push(`_Note: Please confirm this order request with delivery timeline and payment details._`);

  return lines.join('\n');
}

/**
 * Generate standard direct WhatsApp order message per conversion specification:
 * "Assalam o Alaikum, I want to order [product] [size] – Qty [n]"
 */
export function buildSimpleWhatsAppOrderMessage(
  productName: string,
  variantSize: string | undefined,
  quantity: number
): string {
  const sizeString = variantSize ? ` ${variantSize}` : '';
  return `Assalam o Alaikum, I want to order ${productName}${sizeString} – Qty ${quantity}`;
}

/**
 * Generate quick single-product order message (for direct WhatsApp order buttons)
 */
export function buildSingleProductWhatsAppMessage(
  productName: string,
  variantSize: string | undefined,
  unitPrice: number,
  quantity: number,
  totals: CartTotals
): string {
  const nameWithVariant = variantSize
    ? `${productName} (${variantSize})`
    : productName;
  const lineSubtotal = unitPrice * quantity;

  const lines: string[] = [
    `*WAZIRISTANI NATURALS — DIRECT PRODUCT ORDER*`,
    `--------------------------------`,
    `*Product:* ${nameWithVariant}`,
    `*Quantity:* ${quantity}`,
    `*Unit Price:* ${formatPrice(unitPrice, 'en')}`,
    `*Subtotal:* ${formatPrice(lineSubtotal, 'en')}`,
    `*Delivery:* ${totals.deliveryStatusText}`,
    `*Estimated Total:* ${formatPrice(lineSubtotal + totals.deliveryFee, 'en')}`,
    ``,
    `I would like to order this item. Please confirm availability and share the delivery details.`
  ];

  return lines.join('\n');
}

/**
 * Generate standard inquiry message
 */
export function buildGeneralInquiryWhatsAppMessage(topic?: string): string {
  const lines: string[] = [
    `*WAZIRISTANI NATURALS — CUSTOMER INQUIRY*`,
    `--------------------------------`,
    topic ? `Topic: ${topic}` : `Hello, I have an inquiry about Waziristani Naturals products.`,
    ``,
    `Please assist me with more information.`
  ];
  return lines.join('\n');
}

/**
 * Generate formatted contact form inquiry message for direct WhatsApp sending
 */
export function buildContactFormWhatsAppMessage(
  name: string,
  phone: string,
  subject: string,
  message: string
): string {
  const lines: string[] = [
    `*WAZIRISTANI NATURALS — WEBSITE INQUIRY*`,
    `--------------------------------`,
    `*From:* ${name}`,
    `*Phone:* ${phone}`,
    subject ? `*Subject:* ${subject}` : `*Subject:* General Customer Inquiry`,
    ``,
    `*Message:*`,
    message,
    `--------------------------------`,
    `_Sent via Waziristani Naturals contact portal._`
  ];
  return lines.join('\n');
}

/**
 * Build the full wa.me link with encoded text
 */
export function createWhatsAppUrl(whatsappNumber: string, message: string): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

/**
 * Get contact by ID or default to first contact
 */
export function getContact(contactId?: string): BusinessContact {
  const found = businessContacts.find(c => c.id === contactId);
  return found || businessContacts[0];
}
