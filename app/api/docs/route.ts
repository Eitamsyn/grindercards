export const runtime = 'edge';
import { NextResponse } from "next/server";

const docs = {
  openapi: "3.0.0",
  info: {
    title: "GrinderCards AI Design API",
    version: "1.0.0",
    description: "Programmatic access to the GrinderCards AI design engine. Generate custom grinder card designs from text prompts.",
    contact: { email: "api@grindercards.com" },
  },
  servers: [{ url: "https://grindercards.com", description: "Production" }],
  paths: {
    "/api/generate": {
      post: {
        summary: "Generate grinder card designs",
        description: "Generate 1-3 AI-designed grinder card images from a text prompt and optional logo.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["prompt"],
                properties: {
                  prompt: { type: "string", description: "Design description", example: "Dark gothic skull design with neon green accents" },
                  logo: { type: "string", description: "Base64-encoded logo image (optional)", example: "data:image/png;base64,..." },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Generated designs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    designs: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          imageUrl: { type: "string", description: "Base64 PNG data URL" },
                          prompt: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(docs);
}
