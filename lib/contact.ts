// Update these values in .env.local:
// NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_channel
// NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/972XXXXXXXXX
export const CONTACT = {
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
} as const;
