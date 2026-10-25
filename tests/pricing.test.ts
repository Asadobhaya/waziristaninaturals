import { describe, it, expect } from 'vitest';
import { products, getProductById } from '../src/config/products';
import { formatPrice, calculateCartTotals, isDeliveryOfferActive } from '../src/lib/pricing';
import { CartItem } from '../src/types';

describe('Authoritative Product Configuration and Prices', () => {
  it('contains exactly two main products', () => {
    expect(products.length).toBe(2);
    expect(products.map(p => p.id)).toEqual(['zaitoon-oil', 'shilajit']);
  });

  it('configures Zaitoon Oil with exactly four variants and required prices', () => {
    const oil = getProductById('zaitoon-oil');
    expect(oil).toBeDefined();
    expect(oil?.variants).toBeDefined();
    expect(oil?.variants?.length).toBe(4);

    const variants = oil!.variants!;
    expect(variants[0]).toMatchObject({ id: '250ml', size: '250 ml', price: 1700, label: '250 ml' });
    expect(variants[1]).toMatchObject({ id: '500ml', size: '500 ml', price: 3300, label: '500 ml' });
    expect(variants[2]).toMatchObject({ id: '750ml', size: '750 ml', price: 5100, label: '750 ml' });
    expect(variants[3]).toMatchObject({ id: '1000ml', size: '1000 ml (1 litre)', price: 6200, label: '1000 ml (1 litre)' });
  });

  it('configures Shilajit with exact price of Rs. 2,000 without invented variants', () => {
    const shilajit = getProductById('shilajit');
    expect(shilajit).toBeDefined();
    expect(shilajit?.price).toBe(2000);
    expect(shilajit?.variants).toBeUndefined();
  });
});

describe('Pricing Calculations and Formatting', () => {
  it('formats prices correctly in Pakistani Rupees', () => {
    expect(formatPrice(1700, 'en')).toBe('Rs. 1,700');
    expect(formatPrice(3300, 'en')).toBe('Rs. 3,300');
    expect(formatPrice(5100, 'en')).toBe('Rs. 5,100');
    expect(formatPrice(6200, 'en')).toBe('Rs. 6,200');
    expect(formatPrice(2000, 'en')).toBe('Rs. 2,000');
    expect(formatPrice(1700, 'ur')).toBe('1,700 روپے');
  });

  it('accurately computes line subtotals and overall totals with active free delivery without bundle', () => {
    const testItems: CartItem[] = [
      {
        id: 'zaitoon-oil_250ml',
        productId: 'zaitoon-oil',
        variantId: '250ml',
        productName: 'Waziristani Zaitoon Oil',
        productNameUrdu: 'وزیرستانی زیتون کا تیل',
        variantSize: '250 ml',
        unitPrice: 1700,
        quantity: 2,
        image: '/assets/images/products/zaitoon-oil-250ml.jpg'
      },
      {
        id: 'shilajit_standard',
        productId: 'shilajit',
        productName: 'Waziristani Shilajit',
        productNameUrdu: 'وزیرستانی خالص سلاجیت',
        unitPrice: 2000,
        quantity: 1,
        image: '/assets/images/products/shilajit-full-kit.jpg'
      }
    ];

    const totals = calculateCartTotals(testItems);
    // 1700*2 = 3400; 2000*1 = 2000. Subtotal = 5400. 250ml does NOT qualify for bundle discount
    expect(totals.itemCount).toBe(3);
    expect(totals.subtotal).toBe(5400);
    expect(totals.isDeliveryFree).toBe(true);
    expect(totals.deliveryFee).toBe(0);
    expect(totals.bundleDiscount).toBe(0);
    expect(totals.isBundleDiscountActive).toBe(false);
    expect(totals.total).toBe(5400);
  });

  it('triggers Super Bumper Offer with Rs. 100 discount when Shilajit and 500ml+ Olive Oil are purchased together', () => {
    const testItems: CartItem[] = [
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
        image: '/assets/images/products/shilajit-full-kit.jpg'
      }
    ];

    const totals = calculateCartTotals(testItems);
    // 3300 + 2000 = 5300 subtotal. Discount = 100. Total = 5200.
    expect(totals.itemCount).toBe(2);
    expect(totals.subtotal).toBe(5300);
    expect(totals.isDeliveryFree).toBe(true);
    expect(totals.bundleDiscount).toBe(100);
    expect(totals.isBundleDiscountActive).toBe(true);
    expect(totals.total).toBe(5200);
  });
});
