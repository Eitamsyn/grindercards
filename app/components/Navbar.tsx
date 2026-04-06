"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function Navbar({ theme = "light" }: NavbarProps) {
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const linkColor = isDark ? "rgba(255,255,255,0.7)" : "#333";
  const bg = isDark ? "rgba(10,10,10,0.96)" : "#ffffff";
  const border = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8";

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .nav-mobile-menu { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      <nav style={{
        borderBottom: border,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: bg,
        backdropFilter: isDark ? "blur(16px)" : undefined,
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        boxSizing: "border-box",
      }}>
        {/* Logo as Home Button */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 0", textDecoration: "none", flexShrink: 0 }}>
          <img
            src="/vs-logo-vertical-real.svg"
            alt="V Syndicate – Home"
            style={{ height: "72px", width: "auto", filter: isDark ? "invert(1)" : "none" }}
          />
          <div style={{ borderLeft: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #ddd", paddingLeft: "10px" }}>
            <div style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "0.2em", color: isDark ? "rgba(255,255,255,0.4)" : "#888", textTransform: "uppercase" }}>GRINDER CARDS</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: isDark ? "rgba(255,255,255,0.7)" : "#444", letterSpacing: "0.04em" }}>Custom Design Studio</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link href="/editor" style={{ color: linkColor, textDecoration: "none", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Design Studio</Link>
          <Link href="/faq" style={{ color: linkColor, textDecoration: "none", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>FAQ</Link>
          <a href="https://vsyndicate.com" target="_blank" rel="noreferrer" style={{ color: linkColor, textDecoration: "none", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>VSyndicate</a>
          <Link href="/editor" style={{
            background: isDark ? "#1a72bb" : "#111111",
            color: "white", padding: "9px 18px", borderRadius: "4px",
            textDecoration: "none", fontSize: "12px", fontWeight: 800,
            letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
          }}>Start Designing →</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", color: isDark ? "white" : "#111" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          position: "fixed", top: "61px", left: 0, right: 0, zIndex: 49,
          background: bg, borderBottom: border,
          display: "flex", flexDirection: "column", padding: "8px 16px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}>
          {[
            { href: "/editor", label: "Design Studio" },
            { href: "/faq", label: "FAQ" },
            { href: "https://vsyndicate.com", label: "VSyndicate", external: true },
          ].map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              onClick={() => setMenuOpen(false)}
              style={{ color: linkColor, textDecoration: "none", fontSize: "15px", fontWeight: 700, padding: "12px 0", borderBottom: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f0f0f0", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >{label}</Link>
          ))}
          <Link href="/editor" onClick={() => setMenuOpen(false)} style={{
            marginTop: "12px", background: isDark ? "#1a72bb" : "#111", color: "white",
            padding: "13px 20px", borderRadius: "4px", textDecoration: "none",
            fontSize: "14px", fontWeight: 800, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>Start Designing →</Link>
        </div>
      )}
    </>
  );
}
