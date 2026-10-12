import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  ),
  title: `${site.fullName} — Luxury Cottages in Shoghi, Shimla`,
  description:
    "Luxury cottages, a swimming pool and bonfire nights inside a private pine forest at Shoghi, Shimla. Book directly on WhatsApp with GhumoG Stay.",
  keywords: ["resort in Shoghi", "Shimla resort", "jungle resort Shimla", "pine cottages Shimla", "GhumoG Stay"],
  openGraph: {
    title: site.fullName,
    description: "Wake up in the pines — luxury cottages at Shoghi, Shimla.",
    images: ["/images/hero-valley.webp"],
    type: "website",
  },
  icons: { icon: "/images/logo-icon.png" },
};

export const viewport: Viewport = { themeColor: "#16301f" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: site.fullName,
  brand: site.brand,
  telephone: site.phones[0],
  email: site.email,
  image: "/images/hero-valley.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Village Paughat, Shoghi",
    addressLocality: "Shimla",
    addressRegion: "Himachal Pradesh",
    addressCountry: "IN",
  },
  amenityFeature: ["Swimming pool", "Restaurant", "Parking", "Trekking", "Pet friendly"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
