import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const cormorant = localFont({
  src: "../../public/fonts/cormorant-italic-latin.woff2",
  variable: "--font-cormorant",
  display: "swap",
  weight: "300 700",
  style: "italic",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://127.0.0.1:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Root & Ritual — A little wild. A lot of good.",
  description:
    "A fictional vegetarian kitchen & café in Portland, Oregon. Explore seasonal plates, slow coffee and a more thoughtful way to gather. Portfolio demo.",
  applicationName: "Root & Ritual",
  openGraph: {
    title: "Root & Ritual — Rooted in nature. Made with intention.",
    description:
      "Seasonal vegetarian plates, slow coffee, and a little room to pause. A restaurant website portfolio concept.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/restaurant-interior.png",
        width: 1536,
        height: 1024,
        alt: "A warm, plant-filled fictional neighborhood café",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Root & Ritual — Vegetarian kitchen & café",
    description: "A little wild. A lot of good. A fictional Portland restaurant portfolio concept.",
  },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#171a17", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
