import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrinderCards – Custom Grinder Card Designer",
  description: "Design your own custom grinder card in seconds. Upload your logo, describe your vision, and our AI generates unique designs instantly. Powered by V Syndicate – the original grinder card inventor.",
  keywords: ["custom grinder card", "grinder card designer", "personalized grinder", "AI grinder design", "V Syndicate", "cannabis accessories"],
  openGraph: {
    title: "GrinderCards – Custom Grinder Card Designer",
    description: "AI-powered custom grinder card design tool",
    url: "https://grindercards.com",
    siteName: "GrinderCards",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-brand-black text-white antialiased">{children}</body>
    </html>
  );
}
