"use client";
import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, Package } from "lucide-react";
import Navbar from "./components/Navbar";

const samples = [
  { src: "/samples/cassette-retro.jpg", label: "Retro Cassette", style: "Psychedelic & Retro" },
  { src: "/samples/justice-anonymous.jpg", label: "Justice Is Coming", style: "Dark & Bold" },
  { src: "/samples/ace-of-spades.jpg", label: "Ace of Spades", style: "Classic Playing Card" },
  { src: "/samples/cheech-chong.jpg", label: "Cheech & Chong", style: "Novelty License" },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111", fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: "#1a72bb", padding: "7px 24px", textAlign: "center", fontSize: "12px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.04em" }}>
        🇺🇸 FREE SHIPPING ON ORDERS OVER $350 · USA BASED & SHIPPED
      </div>

      <Navbar theme="light" />

      {/* Hero */}
      <section style={{ background: "#111111", padding: "80px 32px 70px", textAlign: "center", position: "relative", overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute", inset: 0, background: "url('/samples/hero-banner.png') center/cover", opacity: 0.15 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1a72bb", borderRadius: "2px", padding: "6px 18px", fontSize: "11px", fontWeight: 800, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "28px" }}>
            SINCE 2010 · THE ORIGINAL GRINDER CARD
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "20px" }}>
            Design Your<br />
            <span style={{ color: "#1a72bb" }}>Custom Grinder Card</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", maxWidth: "560px", margin: "0 auto 36px", lineHeight: 1.75, fontWeight: 400 }}>
            Upload your logo, describe your vision — our AI generates professional print-ready grinder card designs in seconds. Trusted by 500+ brands.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/editor" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#1a72bb", color: "white", padding: "14px 32px",
              borderRadius: "4px", textDecoration: "none", fontSize: "15px", fontWeight: 800,
              letterSpacing: "0.04em", textTransform: "uppercase"
            }}>
              Try Design Studio <ArrowRight size={16} />
            </Link>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.1)", color: "white", padding: "14px 28px",
              borderRadius: "4px", textDecoration: "none", fontSize: "15px", fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.2)", letterSpacing: "0.04em", textTransform: "uppercase"
            }}>
              Get a Quote
            </Link>
          </div>
          {/* Trust */}
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "44px", flexWrap: "wrap" }}>
            {[
              { icon: <Star size={13} fill="#1a72bb" color="#1a72bb" />, text: "500+ brands served" },
              { icon: <Shield size={13} color="#1a72bb" />, text: "Print-ready files" },
              { icon: <Clock size={13} color="#1a72bb" />, text: "Results in ~15 sec" },
              { icon: <Package size={13} color="#1a72bb" />, text: "300 unit minimum" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600 }}>
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is section */}
      <style>{`@media(max-width:640px){.two-col{grid-template-columns:1fr!important}.four-col{grid-template-columns:repeat(2,1fr)!important}.three-col{grid-template-columns:1fr!important}.stats-row{flex-wrap:wrap!important;gap:16px!important}.hero-pad{padding:48px 20px 40px!important}.section-pad{padding:48px 16px!important}.section-inner{padding:48px 16px!important}}@media(max-width:480px){.four-col{grid-template-columns:1fr 1fr!important}}`}</style>
      <section style={{ padding: "64px 32px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="two-col section-pad">
        <div>
          <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "#1a72bb", textTransform: "uppercase", marginBottom: "16px" }}>The Product</div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px", color: "#111" }}>What is a<br />Grinder Card?</h2>
          <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8, marginBottom: "18px" }}>
            A grinder card is a <strong>credit card-sized stainless steel herb grinder</strong> with precision-punched holes. It fits in any wallet and grinds anywhere.
          </p>
          <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            V Syndicate invented the grinder card and has been producing custom designs for brands since 2010. Every card comes with your custom full-color printed sleeve.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Credit card size — fits any wallet", "Non-stick stainless steel", "Custom full-color printed sleeve", "Minimum 300 units"].map(item => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#333", fontSize: "14px", fontWeight: 600 }}>
                <span style={{ width: "6px", height: "6px", background: "#1a72bb", borderRadius: "50%", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/editor" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "white", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "28px" }}>
            Design Yours <ArrowRight size={14} />
          </Link>
        </div>
        <div>
          <img src="/samples/real-grinder-card.jpg" alt="V Syndicate Grinder Card" style={{ width: "100%", borderRadius: "8px", border: "1px solid #eee", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }} />
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: "#f5f5f5", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "40px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }} className="stats-row">
          {[
            { num: "500+", label: "Brands Served" },
            { num: "2010", label: "Original Inventor" },
            { num: "300+", label: "Min. Order" },
            { num: "30", label: "Day Turnaround" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#111", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Design Gallery */}
      <section style={{ padding: "72px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "#1a72bb", textTransform: "uppercase", marginBottom: "12px" }}>AI Design Studio</div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#111", marginBottom: "12px" }}>Every Design is Unique</h2>
          <p style={{ color: "#666", fontSize: "14px", maxWidth: "480px", margin: "0 auto" }}>Generated fresh from your prompt — no two designs are alike</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="four-col">
          {samples.map(({ src, label, style: s }) => (
            <div key={label} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #eee", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "#1a72bb"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "#eee"; }}
            >
              <img src={src} alt={label} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "14px 16px", background: "#fff" }}>
                <div style={{ fontWeight: 800, fontSize: "13px", color: "#111", marginBottom: "3px" }}>{label}</div>
                <div style={{ color: "#888", fontSize: "12px" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <Link href="/editor" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#1a72bb", textDecoration: "none", fontSize: "14px", fontWeight: 800, letterSpacing: "0.04em" }}>
            Create your own design <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "#111111", padding: "72px 32px" }} className="section-inner">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "#1a72bb", textTransform: "uppercase", marginBottom: "12px" }}>Simple Process</div>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#ffffff" }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }} className="three-col">
            {[
              { num: "01", title: "Upload Your Logo", desc: "Drop your brand logo or any image. PNG, JPG, SVG — any format works.", icon: "📤" },
              { num: "02", title: "Describe Your Design", desc: "Tell the AI your style, colors, mood. Get 3 unique variations instantly.", icon: "✍️" },
              { num: "03", title: "Download & Order", desc: "Download your print-ready design file and place a custom print order.", icon: "📦" },
            ].map(({ num, title, desc, icon }) => (
              <div key={num} style={{ background: "#1a1a1a", borderRadius: "8px", padding: "32px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#1a72bb", letterSpacing: "0.12em", marginBottom: "12px" }}>{num}</div>
                <div style={{ fontSize: "24px", marginBottom: "14px" }}>{icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px", textAlign: "center", background: "#f8f8f8", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <img src="/vs-logo-vertical-real.svg" alt="V Syndicate" style={{ height: "60px", margin: "0 auto 24px", display: "block" }} />
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Ready to Create Your Card?</h2>
          <p style={{ color: "#666", marginBottom: "36px", fontSize: "15px", lineHeight: 1.7 }}>
            Join hundreds of brands who trust V Syndicate for custom grinder cards. Since 2010.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/editor" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111111", color: "white", padding: "14px 32px", borderRadius: "4px", textDecoration: "none", fontSize: "14px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Start Designing Free
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", padding: "14px 28px", borderRadius: "4px", textDecoration: "none", fontSize: "14px", fontWeight: 700, border: "2px solid #111", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111111", padding: "36px 32px", textAlign: "center" }}>
        <img src="/vs-logo-vertical-real.svg" alt="V Syndicate" style={{ height: "40px", margin: "0 auto 16px", display: "block", filter: "invert(1)" }} />
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", lineHeight: 1.9 }}>
          © 2026 V Syndicate® Grinder Cards. The original grinder card since 2010.<br />
          <Link href="/editor" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Design Studio</Link>
          {" · "}
          <Link href="/faq" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>FAQ</Link>
          {" · "}
          <Link href="/contact" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Contact</Link>
          {" · "}
          <a href="https://vsyndicate.com" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VSyndicate.com</a>
        </p>
      </footer>
    </main>
  );
}
