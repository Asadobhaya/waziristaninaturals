import { describe, it, expect } from 'vitest';
import { buildOrderWhatsAppMessage, createWhatsAppUrl, buildContactFormWhatsAppMessage } from '../src/lib/whatsapp';
import { CartItem, CartTotals, CustomerDetails } from '../src/types';

describe('WhatsApp Message Generation & URL Encoding', () => {
  it('generates accurate, formatted order text with all required fields', () => {
    const customer: CustomerDetails = {
      fullName: 'Tariq Mehmood',
      phone: '03348007049',
      city: 'Peshawar',
      address: 'House 14, University Town, Peshawar',
      notes: 'Please call before dispatch',
      preferredContactId: 'nabeel'
    };

    const items: CartItem[] = [
      {
        id: 'zaitoon-oil_250ml',
        productId: 'zaitoon-oil',
        variantId: '250ml',
        productName: 'Waziristani Zaitoon Oil',
        productNameUrdu: 'وزیرستانی زیتون کا تیل',
        variantSize: '250 ml',
        unitPrice: 1700,
        quantity: 2,
        image: '/assets/images/zaitoon-oil.svg'
      },
      {
        id: 'shilajit_standard',
        productId: 'shilajit',
        productName: 'Waziristani Shilajit',
        productNameUrdu: 'وزیرستانی خالص سلاجیت',
        unitPrice: 2000,
        quantity: 1,
        image: '/assets/images/shilajit.svg'
      }
    ];

    const totals: CartTotals = {
      itemCount: 3,
      subtotal: 5400,
      deliveryFee: 0,
      isDeliveryFree: true,
      total: 5400,
      deliveryStatusText: 'Free (Limited-Time Offer)',
      deliveryStatusTextUrdu: 'مفت'
    };

    const text = buildOrderWhatsAppMessage(customer, items, totals, 'Nabeel Aalam Khan');

    expect(text).toContain('*WAZIRISTANI NATURALS — NEW ORDER REQUEST*');
    expect(text).toContain('*Customer:* Tariq Mehmood');
    expect(text).toContain('*Phone:* 03348007049');
    expect(text).toContain('*City:* Peshawar');
    expect(text).toContain('*Order Assigned To:* Nabeel Aalam Khan');
    expect(text).toContain('Waziristani Zaitoon Oil — 250 ml');
    expect(text).toContain('Quantity: 2');
    expect(text).toContain('Unit Price: Rs. 1,700');
    expect(text).toContain('Subtotal: Rs. 3,400');
    expect(text).toContain('Waziristani Shilajit');
    expect(text).toContain('Unit Price: Rs. 2,000');
    expect(text).toContain('Subtotal: Rs. 2,000');
    expect(text).toContain('*Subtotal:* Rs. 5,400');
    expect(text).toContain('*Delivery:* Free (Limited-Time Offer)');
    expect(text).toContain('*Total Amount:* Rs. 5,400');
    expect(text).toContain('*Order Notes:* Please call before dispatch');

    const url = createWhatsAppUrl('923348007049', text);
    expect(url.startsWith('https://wa.me/923348007049?text=')).toBe(true);
    // Verifies spaces and special characters are properly URL-encoded
    expect(url).not.toContain('\n');
    expect(url).not.toContain(' ');
  });

  it('includes Super Bumper Discount line when bundle discount is active', () => {
    const customer: CustomerDetails = {
      fullName: 'Hamza Khan',
      phone: '03004634494',
      city: 'Lahore',
      address: 'Gulberg III, Lahore',
      preferredContactId: 'asad'
    };

    const items: CartItem[] = [
      {
        id: 'zaitoon-oil_500ml',
        productId: 'zaitoon-oil',
        variantId: '500ml',
        productName: 'Waziristani Zaitoon Oil',
        productNameUrdu: 'وزیرستانی زیتون کا تیل',
        variantSize: '500 ml',
        unitPrice: 3300,
        quantity: 1,
        image: '/assets/images/products/zaitoon-oil-500ml.jpg'
      },
      {
        id: 'shilajit_standard',
        productId: 'shilajit',
        productName: 'Waziristani Shilajit',
        productNameUrdu: 'وزیرستانی خالص سلاجیت',
        unitPrice: 2000,
        quantity: 1,
        image: '/assets/images/products/shilajit-top.jpg'
      }
    ];

    const totals: CartTotals = {
      itemCount: 2,
      subtotal: 5300,
      deliveryFee: 0,
      isDeliveryFree: true,
      bundleDiscount: 100,
      isBundleDiscountActive: true,
      total: 5200,
      deliveryStatusText: 'Free (Limited-Time Offer)',
      deliveryStatusTextUrdu: 'مفت'
    };

    const text = buildOrderWhatsAppMessage(customer, items, totals, 'Asad');
    expect(text).toContain('*Super Bumper Discount:* -Rs. 100 (Shilajit + 500ml+ Zaitoon Oil)');
    expect(text).toContain('*Total Amount:* Rs. 5,200');
  });

  it('generates formatted contact form WhatsApp inquiry message', () => {
    const text = buildContactFormWhatsAppMessage(
      'Kamran Khan',
      '03001234567',
      'Bulk olive oil order',
      'Interested in 5 bottles of 1 litre olive oil.'
    );

    expect(text).toContain('*WAZIRISTANI NATURALS — WEBSITE INQUIRY*');
    expect(text).toContain('*From:* Kamran Khan');
    expect(text).toContain('*Phone:* 03001234567');
    expect(text).toContain('*Subject:* Bulk olive oil order');
    expect(text).toContain('Interested in 5 bottles of 1 litre olive oil.');
  });
});
