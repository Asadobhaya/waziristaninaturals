import { describe, it, expect } from 'vitest';
import { validatePakistaniPhone, validateCustomerDetails } from '../src/lib/validation';

describe('Validation Utility', () => {
  it('accepts legitimate Pakistani phone numbers in various common notations', () => {
    expect(validatePakistaniPhone('03001234567').isValid).toBe(true);
    expect(validatePakistaniPhone('0300 1234567').isValid).toBe(true);
    expect(validatePakistaniPhone('0300-1234567').isValid).toBe(true);
    expect(validatePakistaniPhone('+92 334 8007049').isValid).toBe(true);
    expect(validatePakistaniPhone('+923004634494').isValid).toBe(true);
    expect(validatePakistaniPhone('923001234567').isValid).toBe(true);
  });

  it('rejects invalid or non-Pakistani mobile numbers with a helpful message', () => {
    expect(validatePakistaniPhone('').isValid).toBe(false);
    expect(validatePakistaniPhone('12345').isValid).toBe(false);
    expect(validatePakistaniPhone('02134567890').isValid).toBe(false); // Landline not mobile
    expect(validatePakistaniPhone('+1 555 1234').isValid).toBe(false);
  });

  it('validates complete customer details and detects unconfirmed cities', () => {
    const valid = validateCustomerDetails({
      fullName: 'Ahmad Khan',
      phone: '03001234567',
      city: 'Islamabad',
      address: 'Street 10, Sector F-7/2, Islamabad',
      preferredContactId: 'nabeel'
    });
    expect(valid.isValid).toBe(true);
    expect(valid.coverageNotice).toBeUndefined(); // Islamabad is confirmed

    const unconfirmedCity = validateCustomerDetails({
      fullName: 'Muhammad Usman',
      phone: '03001234567',
      city: 'Turbat',
      address: 'Main Bazaar Road, Turbat',
      preferredContactId: 'asad'
    });
    expect(unconfirmedCity.isValid).toBe(true);
    expect(unconfirmedCity.coverageNotice).toBeDefined(); // Explains verification needed
  });
});
