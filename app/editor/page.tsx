"use client";
import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Download, ArrowLeft, X, Send, ImageIcon, Sparkles, Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

// ── Options ───────────────────────────────────────────────────────────────────

const ORIENTATIONS = [
  { id: "landscape", label: "Landscape", desc: "3.375 × 2.125\"", w: 340, h: 214 },
  { id: "portrait",  label: "Portrait",  desc: "2.125 × 3.375\"", w: 214, h: 340 },
];

const SURFACE_OPTIONS = [
  { id: "standard", label: "Standard Grid", desc: "Classic punched hole grid" },
  { id: "fine",     label: "Fine Grind",    desc: "Smaller holes, finer grind" },
  { id: "coarse",   label: "Coarse Grind",  desc: "Larger holes, coarse grind" },
  { id: "hybrid",   label: "Hybrid",        desc: "Mixed hole sizes" },
];

const SIZE_OPTIONS = [
  { id: "credit", label: "Credit Card", desc: "Standard wallet size (3.375 × 2.125\")" },
  { id: "mini",   label: "Mini Card",   desc: "Compact (2.75 × 1.75\")" },
  { id: "xl",     label: "XL Card",     desc: "Larger format (4\" × 2.5\")" },
];

const BG_PRESETS = [
  "#000000","#111111","#1a1a2e","#0d1b2a",
  "#2d0036","#1b0000","#ffffff","#f5f5f0",
  "#FFD700","#FF4500","#39FF14","#00D4FF",
  "#8B0000","#2E4057","#3D405B","#4a4e69",
];

const STYLE_PRESETS = [
  { label: "Dark & Edgy",  prompt: "dark background, skull motifs, neon accents, gothic style" },
  { label: "Psychedelic",  prompt: "vibrant colors, sacred geometry, trippy patterns, cosmic" },
  { label: "Street Art",   prompt: "graffiti style, bold letters, spray paint, urban" },
  { label: "Botanical",    prompt: "Art Nouveau, botanical illustration, gold line art, elegant" },
  { label: "Minimal",      prompt: "clean minimal design, simple geometry, sophisticated" },
  { label: "Retro",        prompt: "vintage retro style, distressed texture, 70s aesthetic" },
  { label: "Cosmic",       prompt: "space nebula, stars, galaxy, cosmic colors, ethereal" },
  { label: "Neon",         prompt: "neon lights, dark background, electric colors, cyberpunk" },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface Design { id: string; imageUrl: string; prompt: string; }

// ── Main component ────────────────────────────────────────────────────────────

export default function EditorPage() {
  // Mode
  const [mode, setMode] = useState<"upload" | "ai">("upload");

  // Upload state
  const [image, setImage]       = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [fit, setFit]           = useState<"contain" | "cover" | "fill">("contain");

  // AI state
  const [prompt, setPrompt]     = useState("");
  const [aiLogo, setAiLogo]     = useState<string | null>(null);
  const [designs, setDesigns]   = useState<Design[]>([]);
  const [selected, setSelected] = useState<Design | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]   = useState<string | null>(null);

  // Shared config
  const [bgColor, setBgColor]   = useState("#000000");
  const [customBg, setCustomBg] = useState("#000000");
  const [orientation, setOrientation] = useState(ORIENTATIONS[0]);
  const [surface, setSurface]   = useState(SURFACE_OPTIONS[0]);
  const [size, setSize]         = useState(SIZE_OPTIONS[0]);

  // Lead modal
  const [showModal, setShowModal]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "", company: "", shipping_address: "", tax_number: "" });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Dropzone (upload mode) ───────────────────────────────────────────────

  const onDrop = useCallback((files: File[]) => {
    const file = files[0]; if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, maxFiles: 1 });

  // Dropzone for AI logo
  const onAiLogoDrop = useCallback((files: File[]) => {
    const file = files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAiLogo(reader.result as string);
    reader.readAsDataURL(file);
  }, []);
  const aiLogoDropzone = useDropzone({ onDrop: onAiLogoDrop, accept: { "image/*": [] }, maxFiles: 1 });

  // ── AI generation ────────────────────────────────────────────────────────

  const generate = async () => {
    if (!prompt.trim() || aiLoading) return;
    setAiLoading(true); setAiError(null);
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, logo: aiLogo }),
      });
      const d = await r.json();
      if (!r.ok || d.error) throw new Error(d.error || "Generation failed");
      setDesigns(d.designs || []);
      setSelected(d.designs?.[0] || null);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Something went wrong");
    }
    setAiLoading(false);
  };

  // ── Lead submit ──────────────────────────────────────────────────────────

  const submitLead = async () => {
    if (!lead.email || !lead.phone) return;
    setSubmitting(true);
    const designPrompt = mode === "ai" && selected?.prompt
      ? selected.prompt
      : `${orientation.label} | ${size.label} | ${surface.label} | BG: ${bgColor}`;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "grindercards.com/editor", design_prompt: designPrompt, status: "new" }),
      });
      setDone(true);
    } catch { /* silent */ }
    setSubmitting(false);
  };

  // ── Active image (for preview) ───────────────────────────────────────────

  const activeImage = mode === "upload" ? image : (selected?.imageUrl || null);
  const cardW = orientation.w;
  const cardH = orientation.h;

  // ── Styles ────────────────────────────────────────────────────────────────

  const card = { background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" };
  const label = { fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "10px", display: "block" };
  const optBtn = (active?: boolean) => ({
    padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
    border: active ? "2px solid #FF4500" : "1px solid rgba(255,255,255,0.1)",
    background: active ? "rgba(255,69,0,0.1)" : "rgba(255,255,255,0.03)",
    color: active ? "#FF4500" : "rgba(255,255,255,0.6)",
    fontSize: "0.8125rem", fontWeight: 600, textAlign: "left" as const, transition: "all 0.15s",
  });
  const primary = { background: "#FF4500", color: "white", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" } as const;
  const input = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 14px", color: "white", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white" }}>
      <Navbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.875rem", marginBottom: "16px" }}>
            <ArrowLeft size={14} /> Back
          </Link>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", letterSpacing: "0.08em" }}>Card Design Studio</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9375rem", marginTop: "6px" }}>Design your custom grinder card and submit an order inquiry.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          {([
            { id: "upload", icon: <Upload size={15} />, label: "Upload My Design" },
            { id: "ai",     icon: <Sparkles size={15} />, label: "Generate with AI" },
          ] as const).map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.9375rem", transition: "all 0.2s",
                background: mode === m.id ? "#FF4500" : "rgba(255,255,255,0.06)",
                color: mode === m.id ? "white" : "rgba(255,255,255,0.45)",
              }}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "28px", alignItems: "start" }}>

          {/* ── LEFT panel ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* ── UPLOAD MODE ── */}
            {mode === "upload" && (
              <div style={card}>
                <span style={label}>1. Upload Your Artwork</span>
                {!image ? (
                  <div {...getRootProps()} style={{ border: `2px dashed ${isDragActive ? "#FF4500" : "rgba(255,255,255,0.1)"}`, borderRadius: "12px", padding: "40px 24px", textAlign: "center", cursor: "pointer", background: isDragActive ? "rgba(255,69,0,0.05)" : "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
                    <input {...getInputProps()} />
                    <Upload size={32} style={{ color: "rgba(255,255,255,0.2)", marginBottom: "12px" }} />
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "6px" }}>Drop your image here</p>
                    <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>PNG, JPG, SVG — any format</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px", background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "10px" }}>
                    <ImageIcon size={20} style={{ color: "#39FF14", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{imageName}</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Uploaded ✓</div>
                    </div>
                    <button onClick={() => { setImage(null); setImageName(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}><X size={16} /></button>
                  </div>
                )}

                {image && (
                  <div style={{ marginTop: "16px" }}>
                    <span style={{ ...label, marginBottom: "8px" }}>Image Fit</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {(["contain", "cover", "fill"] as const).map(f => (
                        <button key={f} onClick={() => setFit(f)} style={{ ...optBtn(fit === f), flex: 1, textAlign: "center" as const, padding: "8px" }}>
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: "6px" }}>
                      {fit === "contain" ? "Fit inside card, background shows on sides" : fit === "cover" ? "Fill card, may crop edges" : "Stretch to fill exactly"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── AI MODE ── */}
            {mode === "ai" && (
              <div style={card}>
                <span style={label}>1. Describe Your Design</span>
                <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g. Dark gothic skull with cannabis leaf crown, neon green eyes, gold metallic borders..."
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px", color: "white", fontSize: "0.875rem", resize: "vertical", minHeight: "110px", outline: "none", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }} />

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                  {STYLE_PRESETS.map(p => (
                    <button key={p.label} onClick={() => setPrompt(prev => prev ? `${prev}, ${p.prompt}` : p.prompt)}
                      style={{ padding: "5px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", cursor: "pointer" }}>
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Optional logo upload for AI */}
                <div style={{ marginTop: "20px" }}>
                  <span style={{ ...label, marginBottom: "8px" }}>Logo (optional — AI will incorporate it)</span>
                  {!aiLogo ? (
                    <div {...aiLogoDropzone.getRootProps()} style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "10px", padding: "16px", textAlign: "center", cursor: "pointer" }}>
                      <input {...aiLogoDropzone.getInputProps()} />
                      <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>+ Add logo file</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "10px" }}>
                      <ImageIcon size={16} style={{ color: "#39FF14" }} />
                      <span style={{ fontSize: "0.8125rem", flex: 1 }}>Logo uploaded ✓</span>
                      <button onClick={() => setAiLogo(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}><X size={14} /></button>
                    </div>
                  )}
                </div>

                <button onClick={generate} disabled={!prompt.trim() || aiLoading}
                  style={{ ...primary, width: "100%", justifyContent: "center", marginTop: "20px", opacity: !prompt.trim() || aiLoading ? 0.4 : 1, cursor: !prompt.trim() || aiLoading ? "not-allowed" : "pointer" }}>
                  {aiLoading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Generating...</> : <><Sparkles size={16} /> Generate 3 Designs</>}
                </button>

                {aiError && <p style={{ marginTop: "10px", color: "#ff6b6b", fontSize: "0.8125rem", textAlign: "center" }}>{aiError}</p>}

                {/* AI results */}
                {designs.length > 0 && (
                  <div style={{ marginTop: "24px" }}>
                    <span style={{ ...label, marginBottom: "12px" }}>Pick a design</span>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                      {designs.map(d => (
                        <button key={d.id} onClick={() => setSelected(d)}
                          style={{ padding: 0, border: selected?.id === d.id ? "3px solid #FF4500" : "2px solid rgba(255,255,255,0.08)", borderRadius: "10px", cursor: "pointer", overflow: "hidden", background: "none", transition: "all 0.15s" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={d.imageUrl} alt="design" style={{ width: "100%", display: "block" }} />
                        </button>
                      ))}
                    </div>
                    <button onClick={generate} style={{ marginTop: "12px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem", cursor: "pointer" }}>
                      <RotateCcw size={13} /> Regenerate
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── SHARED CONFIG ── */}

            {/* Background color */}
            <div style={card}>
              <span style={label}>{mode === "upload" ? "2." : "2."} Background Color</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                {BG_PRESETS.map(c => (
                  <button key={c} onClick={() => { setBgColor(c); setCustomBg(c); }}
                    style={{ width: "36px", height: "36px", borderRadius: "8px", background: c, border: bgColor === c ? "3px solid #FF4500" : "2px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.15s" }} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="color" value={customBg} onChange={e => { setCustomBg(e.target.value); setBgColor(e.target.value); }}
                  style={{ width: "40px", height: "40px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", background: "none", padding: "2px" }} />
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{bgColor.toUpperCase()}</span>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>Custom color</span>
              </div>
            </div>

            {/* Orientation */}
            <div style={card}>
              <span style={label}>3. Card Orientation</span>
              <div style={{ display: "flex", gap: "12px" }}>
                {ORIENTATIONS.map(o => (
                  <button key={o.id} onClick={() => setOrientation(o)} style={{ ...optBtn(orientation.id === o.id), flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: "3px" }}>{o.label}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{o.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={card}>
              <span style={label}>4. Card Size</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {SIZE_OPTIONS.map(s => (
                  <button key={s.id} onClick={() => setSize(s)} style={{ ...optBtn(size.id === s.id), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: "2px" }}>{s.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{s.desc}</div>
                    </div>
                    {size.id === s.id && <span style={{ color: "#FF4500", fontSize: "0.75rem" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface */}
            <div style={card}>
              <span style={label}>5. Grinder Surface</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {SURFACE_OPTIONS.map(s => (
                  <button key={s.id} onClick={() => setSurface(s)} style={{ ...optBtn(surface.id === s.id), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: "2px" }}>{s.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{s.desc}</div>
                    </div>
                    {surface.id === s.id && <span style={{ color: "#FF4500", fontSize: "0.75rem" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + CTA ── */}
          <div style={{ position: "sticky", top: "90px", display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Preview card */}
            <div style={card}>
              <span style={label}>Preview</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", minHeight: "260px" }}>
                <div style={{ width: cardW, height: cardH, borderRadius: "14px", background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)", position: "relative", transition: "all 0.3s", flexShrink: 0 }}>
                  {activeImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={activeImage} alt="design" style={{ width: "100%", height: "100%", objectFit: mode === "ai" ? "cover" : fit === "fill" ? "fill" : fit === "cover" ? "cover" : "contain", display: "block" }} />
                  ) : (
                    <div style={{ textAlign: "center", opacity: 0.2 }}>
                      <ImageIcon size={32} style={{ marginBottom: "8px" }} />
                      <div style={{ fontSize: "0.75rem" }}>{mode === "upload" ? "Upload artwork" : "Generate a design"}<br />to preview</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  ["Orientation", orientation.label],
                  ["Size", size.label],
                  ["Surface", surface.label],
                  ["Background", bgColor.toUpperCase()],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              {activeImage && (
                <a href={activeImage} download="grinder-card-design.png"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", marginTop: "16px", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
                  <Download size={14} /> Download Preview
                </a>
              )}
            </div>

            {/* Order CTA */}
            <div style={{ ...card, background: "linear-gradient(135deg, #1a0800 0%, #2d0d00 100%)", border: "1px solid rgba(255,69,0,0.25)" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.06em", marginBottom: "6px" }}>Ready to Order?</h3>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", marginBottom: "20px", lineHeight: 1.6 }}>Minimum 100 units · 10–14 day turnaround · Ships from USA</p>
              <button onClick={() => setShowModal(true)} style={{ ...primary, width: "100%", justifyContent: "center" }}>
                <Send size={16} /> Submit Order Inquiry
              </button>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "10px" }}>We'll contact you within 1 business day</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lead modal ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "40px", maxWidth: "480px", width: "100%", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}><X size={20} /></button>

            {!done ? (
              <>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.06em", marginBottom: "6px" }}>Submit Your Inquiry</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "28px" }}>Our team will reach out within 1 business day with a quote.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <input style={input} placeholder="Your Name" value={lead.name} onChange={e => setLead(p => ({ ...p, name: e.target.value }))} />
                  <input style={input} placeholder="Company Name" value={lead.company} onChange={e => setLead(p => ({ ...p, company: e.target.value }))} />
                  <input style={{ ...input, borderColor: lead.email ? "rgba(255,69,0,0.4)" : "rgba(255,255,255,0.1)" }} placeholder="Email Address *" value={lead.email} onChange={e => setLead(p => ({ ...p, email: e.target.value }))} />
                  <input style={{ ...input, borderColor: lead.phone ? "rgba(255,69,0,0.4)" : "rgba(255,255,255,0.1)" }} placeholder="Phone Number *" value={lead.phone} onChange={e => setLead(p => ({ ...p, phone: e.target.value }))} />
                  <input style={input} placeholder="Shipping Address" value={lead.shipping_address} onChange={e => setLead(p => ({ ...p, shipping_address: e.target.value }))} />
                  <input style={input} placeholder="Tax Number / VAT (optional)" value={lead.tax_number} onChange={e => setLead(p => ({ ...p, tax_number: e.target.value }))} />
                </div>
                <button onClick={submitLead} disabled={!lead.email || !lead.phone || submitting}
                  style={{ ...primary, width: "100%", justifyContent: "center", marginTop: "20px", opacity: !lead.email || !lead.phone ? 0.4 : 1, cursor: !lead.email || !lead.phone ? "not-allowed" : "pointer" }}>
                  {submitting ? "Sending..." : <><Send size={16} /> Send Inquiry</>}
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.06em", marginBottom: "10px" }}>You&apos;re in!</h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem", lineHeight: 1.7 }}>We received your inquiry and will be in touch within 1 business day with your custom quote.</p>
                <button onClick={() => { setShowModal(false); setDone(false); }} style={{ ...primary, margin: "24px auto 0", justifyContent: "center" }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} width={cardW} height={cardH} style={{ display: "none" }} />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
