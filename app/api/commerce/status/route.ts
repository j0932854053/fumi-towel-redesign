import { NextResponse } from "next/server";
import { commerceModules, getIntegrationReadiness } from "@/lib/commerce-config";

export const runtime = "edge";

export function GET() {
  return NextResponse.json({
    name: "FUMI Commerce",
    storage: {
      database: "Cloudflare D1 binding: DB",
      assets: "Cloudflare R2 binding: ASSETS",
    },
    modules: commerceModules,
    environment: getIntegrationReadiness(),
  });
}
