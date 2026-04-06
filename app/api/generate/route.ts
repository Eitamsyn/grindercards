export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

// ── Rate limiting (5 generates per IP per hour) ───────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetIn: WINDOW_MS };
  }
  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count, resetIn: entry.resetAt - now };
}

// CORRECT PRODUCT SPEC:
// Grinder card = stainless steel credit card with punched holes
// Customer designs the PRINTED SLEEVE that goes over the metal card
// The sleeve is a full-color printed card with their custom artwork
const GRINDER_CARD_SPEC = `
V Syndicate Grinder Card printed sleeve design.
Credit card size (3.375 x 2.125 inches), slightly portrait orientation, rounded corners.
This is the PRINTED DESIGN SLEEVE that slides over the stainless steel grinder card.
Show the card flat, full-face, with the complete artwork design filling the entire surface.
Ultra high quality print design, professional product visualization.
Dark or contrasting background behind the card for clarity.
`;

export async function POST(req: NextRequest) {
  try {
    // Rate limit check
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      const minutesLeft = Math.ceil(rl.resetIn / 60000);
      return NextResponse.json(
        { error: `Rate limit reached. You can generate again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.` },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0', 'X-RateLimit-Reset': String(Date.now() + rl.resetIn) } }
      );
    }

    const { prompt, logo } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const fullPrompt = `${GRINDER_CARD_SPEC}
DESIGN THEME: ${prompt}
${logo ? "Incorporate the provided brand logo prominently and clearly in the design." : ""}
Make the artwork bold, high-contrast, and visually striking.
The design should fill the entire card face edge to edge.
Professional print quality, realistic card mockup.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt: fullPrompt }],
          parameters: {
            sampleCount: 3,
            aspectRatio: "1:1",
            safetyFilterLevel: "block_only_high",
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Imagen error:", err);
      return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const predictions = data.predictions || [];

    const designs = predictions.map((p: { bytesBase64Encoded: string }, i: number) => ({
      id: `design-${Date.now()}-${i}`,
      imageUrl: `data:image/png;base64,${p.bytesBase64Encoded}`,
      prompt,
    }));

    return NextResponse.json({ designs });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
