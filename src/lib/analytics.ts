/**
 * Privacy-Conscious Analytics Event Tracker for WAZIRISTANI Storefront
 *
 * Requirements:
 * - Disabled by default until the business verifies an analytics provider (e.g. Google Analytics / Plausible / PostHog).
 * - Never log PII (full delivery addresses, customer phone numbers, customer names).
 * - Distinguish 'whatsapp_opened' from 'completed_sale' (opening WhatsApp is a handoff, NOT a confirmed sale).
 */

export interface AnalyticsEvent {
  eventName:
    | 'product_viewed'
    | 'variant_selected'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'cart_cleared'
    | 'checkout_started'
    | 'whatsapp_order_clicked'
    | 'whatsapp_direct_clicked'
    | 'contact_inquiry_attempted'
    | 'contact_inquiry_submitted';
  payload?: Record<string, unknown>;
  timestamp?: string;
}

// Set to true only once the business configures a verified tracking ID
export const ANALYTICS_ENABLED = false;

export function trackEvent(name: AnalyticsEvent['eventName'], data?: Record<string, unknown>): void {
  const event: AnalyticsEvent = {
    eventName: name,
    payload: data,
    timestamp: new Date().toISOString()
  };

  if (!ANALYTICS_ENABLED) {
    // In development / unconfigured mode, optionally log in non-production
    if (typeof window !== 'undefined' && (import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
      console.debug('[WAZIRISTANI Analytics Event (Local)]', event);
    }
    return;
  }

  // Hook into configured provider window.gtag / window.plausible etc.
  try {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', name, data);
    }
  } catch (err) {
    console.warn('Analytics dispatch error:', err);
  }
}
