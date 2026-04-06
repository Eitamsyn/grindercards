import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "FAQ – GrinderCards Custom Grinder Card Designer",
  description: "Everything you need to know about custom grinder cards — design, printing, ordering, and the AI design tool.",
};

const faqs = [
  {
    q: "What is a grinder card?",
    a: "A grinder card is a credit card-sized (3.375\" x 2.125\") herb grinder with a grated surface. It fits in your wallet and can grind herbs anywhere. V Syndicate invented the original grinder card in 2003.",
  },
  {
    q: "Can I put my own design or logo on a grinder card?",
    a: "Yes! That's exactly what GrinderCards is for. Upload your logo, describe your design, and our AI generates multiple design variations. You can order custom-printed grinder cards with your artwork.",
  },
  {
    q: "How does the AI design tool work?",
    a: "Upload your logo (optional), type a description of the design you want (style, colors, theme, text), and click Generate. Our AI uses Google's Imagen 3 model to create high-quality print-ready designs in seconds.",
  },
  {
    q: "What file format do I get for my design?",
    a: "Designs are generated as high-resolution PNG files suitable for professional printing. For production files, our team will prepare the final print-ready artwork.",
  },
  {
    q: "What is the minimum order quantity for custom grinder cards?",
    a: "Minimum orders start at 100 units. Volume pricing is available for orders of 500+ units. Contact us for wholesale pricing.",
  },
  {
    q: "How long does production take?",
    a: "Standard production is 10-14 business days after artwork approval. Rush production (5-7 days) is available at additional cost.",
  },
  {
    q: "Can I use the API to generate grinder card designs programmatically?",
    a: "Yes! GrinderCards offers a developer API. Send a POST request to /api/generate with your prompt and optionally a base64-encoded logo. See /api/docs for full documentation.",
  },
  {
    q: "What styles work best for grinder card designs?",
    a: "High-contrast designs with bold colors work best given the small card format. Dark backgrounds with bright accents, psychedelic patterns, street art, and minimalist logos all translate excellently to print.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — use the AI design studio for free to generate and preview designs. You only pay when you're ready to order printed cards.",
  },
  {
    q: "Who makes GrinderCards?",
    a: "GrinderCards is powered by V Syndicate, the original inventor of the grinder card. Since 2003, V Syndicate has produced grinder cards for hundreds of brands worldwide.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-brand-black">
      <Navbar theme="dark" />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl tracking-widest mb-4">FAQ</h1>
        <p className="text-white/40 mb-16">Everything about custom grinder cards and our AI design tool.</p>

        <div className="space-y-6">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="bg-brand-card border border-white/10 rounded-xl p-6">
              <h2 className="font-semibold text-white mb-3">{q}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
