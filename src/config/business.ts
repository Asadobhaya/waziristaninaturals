export interface BusinessContact {
  id: string;
  name: string;
  nameUrdu: string;
  role: string;
  roleUrdu: string;
  phone: string;
  whatsappNumber: string;
}

export const businessContacts: BusinessContact[] = [
  {
    id: "nabeel",
    name: "Nabeel Aalam Khan",
    nameUrdu: "نبیل عالم خان",
    role: "Order & Customer Care",
    roleUrdu: "کسٹمر کیئر اور آرڈرز",
    phone: "+92 334 8007049",
    whatsappNumber: "923348007049"
  },
  {
    id: "asad",
    name: "Asad",
    nameUrdu: "اسد",
    role: "Sales & Inquiries",
    roleUrdu: "سیلز اور عمومی معلومات",
    phone: "+92 300 4634494",
    whatsappNumber: "923004634494"
  }
];

export const brandConfig = {
  name: "Waziristani Naturals",
  title: "Waziristani Naturals | Zaitoon Oil & Shilajit",
  tagline: "Rooted in Nature. Inspired by Heritage.",
  taglineUrdu: "فطرت سے وابستہ، روایات سے آراستہ",
  market: "Pakistan",
  currency: "PKR",
  currencySymbol: "Rs.",
  currencySymbolUrdu: "روپے",
  defaultContactId: "nabeel"
};
