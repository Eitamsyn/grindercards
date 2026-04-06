"use client";
import { useState } from "react";
import { Send, MessageCircle, Sparkles, ArrowRight, Package, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BIZCOMMAND_URL || "https://biz.grindercards.com"}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "grindercards.com/contact", status: "new" })
      });
      setSent(true);
    } catch(e) { setSent(true); }
    setSending(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111", fontFamily: "'Nunito Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      <Navbar theme="light" />

      {/* Hero banner */}
      <section style={{ background: "#111111", padding: "64px 32px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1a72bb", borderRadius: "2px", padding: "6px 18px", fontSize: "11px", fontWeight: 800, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>
          <MessageCircle size={12} /> Talk to Our Team
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, marginBottom: "16px" }}>
          Let's Build Your<br />
          <span style={{ color: "#1a72bb" }}>Custom Grinder Card</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.75 }}>
          Tell us about your brand and we'll put together a quote. Minimum 300 units, 30 day turnaround.
        </p>
      </section>

      {/* Stats bar */}
      <div style={{ background: "#f5f5f5", borderBottom: "1px solid #eee", padding: "24px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center", flexWrap: "wrap", gap: "12px" }}>
          {[
            { icon: <Package size={16} color="#1a72bb" />, label: "300 Unit MOQ" },
            { icon: <Clock size={16} color="#1a72bb" />, label: "30 Day Turnaround" },
            { icon: "🇺🇸", label: "USA Based & Shipped" },
            { icon: "✅", label: "Samples Available" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#333" }}>
              {typeof icon === "string" ? <span>{icon}</span> : icon}
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "1fr 420px", gap: "60px", alignItems: "start" }} className="contact-grid">
        <div>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", marginBottom: "16px" }}>We'll Be In Touch!</h2>
              <p style={{ color: "#666", fontSize: "15px", marginBottom: "36px", lineHeight: 1.7 }}>
                Our team typically responds within a few hours. In the meantime, try our Design Studio to see what your custom grinder card could look like.
              </p>
              <Link href="/editor" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#1a72bb", color: "white", padding: "14px 32px", borderRadius: "4px", textDecoration: "none", fontWeight: 800, fontSize: "14px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <Sparkles size={18} /> Try Design Studio
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "36px" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "#1a72bb", textTransform: "uppercase", marginBottom: "12px" }}>Get a Quote</div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", marginBottom: "12px" }}>Ready to Order?</h2>
                <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.7 }}>
                  Fill out the form and a V Syndicate rep will get back to you within a few hours with pricing and details.
                </p>
              </div>

              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-2col">
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Your Name *" required
                    style={{ background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "14px 16px", color: "#111", fontSize: "15px", outline: "none" }} />
                  <input value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                    placeholder="Company / Shop Name *" required
                    style={{ background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "14px 16px", color: "#111", fontSize: "15px", outline: "none" }} />
                </div>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  type="email" placeholder="Business Email *" required
                  style={{ background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "14px 16px", color: "#111", fontSize: "15px", outline: "none" }} />
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="Phone Number"
                  style={{ background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "14px 16px", color: "#111", fontSize: "15px", outline: "none" }} />
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Tell us about your order — design ideas, quantity, timeline, any special requirements..."
                  rows={5}
                  style={{ background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "14px 16px", color: "#111", fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "inherit" }} />

                <button type="submit" disabled={sending} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  background: "#1a72bb", color: "white", border: "none", borderRadius: "4px",
                  padding: "16px", fontSize: "15px", fontWeight: 800, cursor: "pointer",
                  letterSpacing: "0.06em", textTransform: "uppercase"
                }}>
                  <Send size={16} />
                  {sending ? "Sending..." : "Send Message"}
                </button>

                <p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                  * Required fields. We respond within a few hours during business hours.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#111", borderRadius: "8px", padding: "32px", color: "white" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "#1a72bb", textTransform: "uppercase", marginBottom: "16px" }}>V Syndicate</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "14px" }}>The Original Since 2010</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.8, marginBottom: "20px" }}>
              V Syndicate invented the grinder card. Over 500 brands trust us for custom printed grinder cards shipped across the USA.
            </p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "300 unit minimum order",
                "30 day production turnaround",
                "Full-color custom printing",
                "Non-stick stainless steel",
                "Samples available on request",
                "USA based and shipped",
              ].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>
                  <span style={{ width: "5px", height: "5px", background: "#1a72bb", borderRadius: "50%", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "#f8f8f8", border: "1px solid #eee", borderRadius: "8px", padding: "24px" }}>
            <Sparkles size={20} style={{ color: "#1a72bb", marginBottom: "12px" }} />
            <h4 style={{ fontWeight: 800, fontSize: "15px", color: "#111", marginBottom: "8px" }}>Try the Design Studio First</h4>
            <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.7, marginBottom: "16px" }}>
              Generate AI designs from your prompt before you commit to an order. See exactly what your card could look like.
            </p>
            <Link href="/editor" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#111", color: "white", padding: "10px 20px", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Open Studio <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 20px !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
