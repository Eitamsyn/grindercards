import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Custom Grinder Cards | Design Your Own – GrinderCards by V Syndicate",
  description: "Design custom grinder cards in seconds. Upload your logo or describe your vision and our AI generates unique designs instantly. Minimum orders, fast shipping. Powered by V Syndicate – the original grinder card inventor since 2012.",
  keywords: ["custom grinder cards", "personalized grinder cards", "grinder card designer", "cannabis business cards", "rolling tray cards", "dispensary promo cards", "V Syndicate", "AI grinder design", "cannabis accessories", "custom smoke shop merch"],
  metadataBase: new URL("https://grindercards.com"),
  alternates: { canonical: "https://grindercards.com" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Custom Grinder Cards | Design Your Own – GrinderCards",
    description: "AI-powered custom grinder card design. Upload your logo, get unique designs instantly. Fast shipping, low minimums.",
    url: "https://grindercards.com",
    siteName: "GrinderCards",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://grindercards.com/og-image.jpg", width: 1200, height: 630, alt: "GrinderCards – Custom Grinder Card Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Grinder Cards | Design Your Own",
    description: "AI-powered custom grinder card design. Fast, easy, unique.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://grindercards.com/#org",
      "name": "GrinderCards",
      "url": "https://grindercards.com",
      "description": "Custom grinder card designer powered by V Syndicate, the original grinder card inventor.",
      "sameAs": ["https://vsyndicate.com"]
    },
    {
      "@type": "WebSite",
      "@id": "https://grindercards.com/#website",
      "url": "https://grindercards.com",
      "name": "GrinderCards",
      "publisher": { "@id": "https://grindercards.com/#org" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://grindercards.com/editor",
        "query": "design custom grinder card"
      }
    },
    {
      "@type": "Product",
      "name": "Custom Grinder Cards",
      "description": "AI-designed custom grinder cards for dispensaries, smoke shops and cannabis brands. Low minimums, fast shipping.",
      "brand": { "@type": "Brand", "name": "GrinderCards by V Syndicate" },
      "url": "https://grindercards.com",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://grindercards.com/editor"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Google Analytics GA4 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GRINDERCARDS1" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GRINDERCARDS1');
        `}</Script>
      </head>
      <body className="bg-brand-black text-white antialiased">{children}</body>
    </html>
  );
}
