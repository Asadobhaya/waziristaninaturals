import { describe, it, expect } from 'vitest';
import { addItemToCartList, reconcileCartItems } from '../src/lib/cart';
import { CartItem } from '../src/types';

describe('Cart State & Item Reconciliation', () => {
  it('creates separate cart lines for different sizes of olive oil', () => {
    let list: CartItem[] = [];

    list = addItemToCartList(list, {
      productId: 'zaitoon-oil',
      variantId: '250ml',
      productName: 'Waziristani Zaitoon Oil',
      productNameUrdu: 'وزیرستانی زیتون کا تیل',
      variantSize: '250 ml',
      unitPrice: 1700,
      quantity: 1,
      image: '/assets/images/zaitoon-oil.svg'
    });

    list = addItemToCartList(list, {
      productId: 'zaitoon-oil',
      variantId: '500ml',
      productName: 'Waziristani Zaitoon Oil',
      productNameUrdu: 'وزیرستانی زیتون کا تیل',
      variantSize: '500 ml',
      unitPrice: 3300,
      quantity: 1,
      image: '/assets/images/zaitoon-oil.svg'
    });

    expect(list.length).toBe(2);
    expect(list[0].id).toBe('zaitoon-oil_250ml');
    expect(list[1].id).toBe('zaitoon-oil_500ml');
  });

  it('increments quantity when the same olive oil size is added again', () => {
    let list: CartItem[] = [];

    list = addItemToCartList(list, {
      productId: 'zaitoon-oil',
      variantId: '250ml',
      productName: 'Waziristani Zaitoon Oil',
      productNameUrdu: 'وزیرستانی زیتون کا تیل',
      variantSize: '250 ml',
      unitPrice: 1700,
      quantity: 1,
      image: '/assets/images/zaitoon-oil.svg'
    });

    list = addItemToCartList(list, {
      productId: 'zaitoon-oil',
      variantId: '250ml',
      productName: 'Waziristani Zaitoon Oil',
      productNameUrdu: 'وزیرستانی زیتون کا تیل',
      variantSize: '250 ml',
      unitPrice: 1700,
      quantity: 2,
      image: '/assets/images/zaitoon-oil.svg'
    });

    expect(list.length).toBe(1);
    expect(list[0].quantity).toBe(3);
    expect(list[0].unitPrice).toBe(1700);
  });

  it('reconciles stored cart data against authoritative prices to prevent stale or altered prices', () => {
    // Simulated stale / tampered local storage entry with incorrect price of 500 Rs
    const tamperedRaw = [
      {
        productId: 'zaitoon-oil',
        variantId: '1000ml',
        quantity: 2,
        unitPrice: 500 // Tampered! Actual config price is 6200
      },
      {
        productId: 'shilajit',
        quantity: 1,
        unitPrice: 100 // Tampered! Actual config price is 2000
      }
    ];

    const reconciled = reconcileCartItems(tamperedRaw);
    expect(reconciled.length).toBe(2);

    const oilItem = reconciled.find(i => i.variantId === '1000ml');
    expect(oilItem?.unitPrice).toBe(6200); // Successfully restored authoritative price!

    const shilajitItem = reconciled.find(i => i.productId === 'shilajit');
    expect(shilajitItem?.unitPrice).toBe(2000); // Successfully restored authoritative price!
  });
});
