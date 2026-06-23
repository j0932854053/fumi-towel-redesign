import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { campaigns } from "@/db/schema";
import { assertAdminRequest } from "@/lib/admin-auth";
import {
  databaseMigrationRequired,
  databaseUnavailable,
  getOptionalDb,
} from "@/lib/db.server";

export const runtime = "edge";

const fallbackCampaigns = [
  {
    id: "opening-offer",
    title: "開站首購禮",
    slug: "opening-offer",
    description: "新會員首筆訂單滿 NT$ 1,000 折 NT$ 100。",
    status: "draft",
    discountType: "amount",
    discountValue: 100,
  },
  {
    id: "line-friends",
    title: "LINE 好友限定",
    slug: "line-friends",
    description: "綁定 LINE 後發送活動通知與折扣碼。",
    status: "draft",
    discountType: "none",
    discountValue: null,
  },
];

export async function GET() {
  const { db, error } = getOptionalDb();

  if (!db) {
    return NextResponse.json({
      ok: true,
      source: "fallback",
      warning: databaseUnavailable(error),
      campaigns: fallbackCampaigns,
    });
  }

  let rows;

  try {
    rows = await db.select().from(campaigns).orderBy(desc(campaigns.updatedAt));
  } catch (selectError) {
    return NextResponse.json({
      ok: true,
      source: "fallback",
      warning: databaseMigrationRequired(selectError),
      campaigns: fallbackCampaigns,
    });
  }

  return NextResponse.json({ ok: true, source: "database", campaigns: rows });
}

export async function POST(request: NextRequest) {
  const auth = assertAdminRequest(request);

  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const { db, error } = getOptionalDb();

  if (!db) {
    return NextResponse.json(databaseUnavailable(error), { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const title = typeof payload?.title === "string" ? payload.title.trim() : "";
  const slug = typeof payload?.slug === "string" ? payload.slug.trim() : "";

  if (!title || !slug) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_CAMPAIGN_PAYLOAD",
        message: "活動 title 與 slug 為必填。",
      },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  try {
    await db.insert(campaigns).values({
      id,
      title,
      slug,
      description: typeof payload.description === "string" ? payload.description : null,
      bannerImageUrl: typeof payload.bannerImageUrl === "string" ? payload.bannerImageUrl : null,
      startsAt: typeof payload.startsAt === "string" ? payload.startsAt : null,
      endsAt: typeof payload.endsAt === "string" ? payload.endsAt : null,
      status: "draft",
      discountType: "none",
      discountValue: null,
      ruleJson: "{}",
      createdAt: now,
      updatedAt: now,
    });
  } catch (writeError) {
    return NextResponse.json(databaseMigrationRequired(writeError), { status: 503 });
  }

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
