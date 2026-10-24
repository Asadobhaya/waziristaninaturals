# WAZIRISTANI — Premium E-Commerce Storefront

A luxury-inspired, high-conversion Pakistani e-commerce storefront crafted for **WAZIRISTANI**, showcasing two authentic natural mountain provisions:
1. **Waziristani Zaitoon Oil** — four selectable sizes (250 ml, 500 ml, 750 ml, 1000 ml / 1 litre) with dynamic pricing.
2. **Waziristani Shilajit** — single product priced at Rs. 2,000 in a sealed airtight jar.

Built specifically for everyday Pakistani mobile shoppers with full bilingual English & Urdu (RTL) interfaces, dynamic WhatsApp order handoffs, Netlify Forms backup, and a central price authority system.

---

## 1. Project Overview

- **Brand:** WAZIRISTANI
- **Market:** Pakistan
- **Currency:** Pakistani Rupees (PKR / Rs.)
- **Primary Channels:** Direct WhatsApp Handoff (Primary) & Netlify Forms (Secondary Backup)
- **Verified Contacts:**
  - **Nabeel Aalam Khan:** Phone `+92 334 8007049` | WhatsApp `923348007049`
  - **Asad:** Phone `+92 300 4634494` | WhatsApp `923004634494`
- **Promotion:** Nationwide Free Delivery (active until November 7, 2026 Asia/Karachi time).

---

## 2. Technology Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom luxury color palette (`forest`, `olive`, `gold`, `ivory`, `charcoal`)
- **Routing:** [React Router 6](https://reactrouter.com/) with SPA redirect fallback
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **State & Persistence:** React Context + `localStorage` with automated schema reconciliation against central catalog rules
- **Hosting Target:** [Netlify](https://www.netlify.com/) with native Netlify Forms discovery and strict security headers

---

## 3. Installation

Ensure Node.js (v18+ or v20+ LTS) is available in your environment:

```bash
# Clone or navigate to the repository directory
cd /path/to/Zaitoon+Shilajit

# Install all project dependencies
npm install
```

---

## 4. Local Development

Start the local Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The application includes instant hot-module replacement (HMR).

---

## 5. Production Build & Automated Tests

Run the Vitest test suite (verifying catalog integrity, variant separation, reconciliation, phone validation, and URL-encoded WhatsApp messages):

```bash
npm test
```

Compile TypeScript and build the optimized production distribution:

```bash
npm run build
```

The production assets will be output to the `dist/` folder. You can preview the production bundle locally with:

```bash
npm run preview
```

---

## 6. Netlify Deployment

This storefront is fully pre-configured for seamless zero-config deployment on Netlify.

### Automated Git Deployment
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In the Netlify Dashboard, select **"Add new site"** > **"Import an existing project"**.
3. Choose your repository. Netlify automatically reads `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy the site.

### Netlify CLI Deployment
Alternatively, deploy directly via the Netlify CLI:
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Run build
npm run build

# Deploy to preview
netlify deploy --dir=dist

# Deploy to production
netlify deploy --dir=dist --prod
```

The repository includes:
- `netlify.toml` with SPA redirects (`/*` to `/index.html 200`) and security headers.
- `public/_redirects` as an additional fallback.

---

## 7. Central Configuration Guide

To avoid duplicated hardcoded values, the entire application derives its data from central configuration files in `src/config/`:

### A. Where to Change Product Prices & Variants
File: `src/config/products.ts`

```typescript
export const products: Product[] = [
  {
    id: "zaitoon-oil",
    name: "Waziristani Zaitoon Oil",
    variants: [
      { id: "250ml", size: "250 ml", price: 1700 },
      { id: "500ml", size: "500 ml", price: 3300 },
      { id: "750ml", size: "750 ml", price: 5100 },
      { id: "1000ml", size: "1000 ml (1 litre)", price: 6200 }
    ]
  },
  {
    id: "shilajit",
    name: "Waziristani Shilajit",
    price: 2000
  }
];
```
*Note: Any price modified here automatically propagates through product cards, detail views, cart calculations, checkout summaries, and generated WhatsApp messages. Stored carts in visitors' browsers will also automatically reconcile to the updated configuration on their next visit.*

### B. Where to Change WhatsApp Numbers & Business Contacts
File: `src/config/business.ts`

```typescript
export const businessContacts: BusinessContact[] = [
  {
    id: "nabeel",
    name: "Nabeel Aalam Khan",
    phone: "+92 334 8007049",
    whatsappNumber: "923348007049"
  },
  {
    id: "asad",
    name: "Asad",
    phone: "+92 300 4634494",
    whatsappNumber: "923004634494"
  }
];
```

### C. Where to Edit Promotion Dates & Delivery Rules
File: `src/config/delivery.ts`

```typescript
export const deliveryOffer = {
  enabled: true,
  endDate: "2026-11-07", // Expiry date (evaluated in Asia/Karachi timezone)
  feeAfterOffer: null    // Set to a number (e.g. 250) when standard delivery fee is decided
};
```

### D. Where to Configure Supported Cities & Coverage
File: `src/config/delivery.ts`

```typescript
export const deliveryCoverage = {
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
  cashOnDeliveryConfirmed: false // Switch to true when COD partner is finalized
};
```

---

## 8. Netlify Forms Verification

Static form declarations for `order-inquiry` and `contact-inquiry` are pre-rendered into `index.html` with honeypot spam protection (`bot-field`).

Upon deploying to Netlify:
1. Navigate to your site's dashboard at `app.netlify.com`.
2. Go to **Forms** in the site sidebar.
3. Verify that `order-inquiry` and `contact-inquiry` appear in the Active Forms list.
4. Set up email or webhook notifications under **Forms > Form notifications** to notify `Nabeel Aalam Khan` or `Asad` whenever a customer submits an inquiry form.

---

## 9. Business Details Requiring Confirmation Before Launch

The following operational details have safe, non-fabricated defaults in place, but should be confirmed with the brand owners before public launch:

1. **Custom Production Domain:** Configured to `https://waziristaninaturals.netlify.app/` (or `waziristaninaturals` on Netlify/Vercel). Update `public/robots.txt`, `public/sitemap.xml`, and `.env.example` once your custom apex domain (e.g., `waziristaninaturals.pk`) is connected.
2. **Standard Delivery Fee After Offer Expiry:** Currently set to `null` (`src/config/delivery.ts`). When the free promotion ends, provide the confirmed courier shipping fee.
3. **Cash On Delivery (COD) Partner:** Defaulted to `false`. Once courier COD accounts (e.g., TCS, Leopard, Trax, PostEx) are confirmed, update `cashOnDeliveryConfirmed: true`.
4. **Physical Product Photos:** High-resolution vector product assets and bottle lineup graphics are provided in `public/assets/images/`. Real photographic bottle shots can simply replace `zaitoon-oil.svg` and `shilajit.svg` without code changes.
5. **Business Notification Email:** Configure in Netlify Forms notifications for incoming online inquiry alerts.
