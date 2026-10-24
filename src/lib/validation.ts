import { deliveryCoverage } from '../config/delivery';
import { CustomerDetails } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof CustomerDetails, string>>;
  coverageNotice?: string;
}

/**
 * Validate Pakistani mobile phone number with flexible support for common user formats:
 * - 03001234567
 * - 0300 1234567 / 0300-1234567
 * - +923001234567 / +92 300 1234567
 * - 923001234567
 */
export function validatePakistaniPhone(phone: string): { isValid: boolean; normalized: string; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, normalized: '', error: 'Mobile number is required' };
  }

  // Remove spaces, dashes, parentheses
  const cleaned = trimmed.replace(/[\s\-()]/g, '');

  // Check valid patterns
  // Pattern 1: +923xxxxxxxxx (13 chars)
  // Pattern 2: 923xxxxxxxxx (12 chars)
  // Pattern 3: 03xxxxxxxxx (11 chars)
  // Pattern 4: 3xxxxxxxxx (10 chars)
  const pkRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

  if (!pkRegex.test(cleaned)) {
    return {
      isValid: false,
      normalized: trimmed,
      error: 'Please enter a valid Pakistani mobile number (e.g., 0300 1234567 or +92 300 1234567)'
    };
  }

  // Normalize to standard 03xx-xxxxxxx
  let standardized = cleaned;
  if (standardized.startsWith('+92')) {
    standardized = '0' + standardized.slice(3);
  } else if (standardized.startsWith('92')) {
    standardized = '0' + standardized.slice(2);
  } else if (!standardized.startsWith('0')) {
    standardized = '0' + standardized;
  }

  return { isValid: true, normalized: standardized };
}

/**
 * Validate entire customer checkout form
 */
export function validateCustomerDetails(details: CustomerDetails): ValidationResult {
  const errors: Partial<Record<keyof CustomerDetails, string>> = {};

  if (!details.fullName || details.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name';
  } else if (details.fullName.trim().length > 70) {
    errors.fullName = 'Name cannot exceed 70 characters';
  }

  const phoneValidation = validatePakistaniPhone(details.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }

  if (!details.city || details.city.trim().length < 2) {
    errors.city = 'Please enter your city';
  }

  if (!details.address || details.address.trim().length < 8) {
    errors.address = 'Please provide your complete street address and landmark for delivery';
  }

  let coverageNotice: string | undefined;
  if (details.city && details.city.trim()) {
    const enteredCity = details.city.trim().toLowerCase();
    const isConfirmed = deliveryCoverage.confirmedCities.some(
      c => c.toLowerCase() === enteredCity
    );
    if (!isConfirmed) {
      coverageNotice = `Delivery to "${details.city.trim()}" will be verified with the courier upon order confirmation.`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    coverageNotice
  };
}
