import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { siteSettings } from "@/db/schema";
import { assertAdminRequest } from "@/lib/admin-auth";
import {
  databaseMigrationRequired,
  databaseUnavailable,
  getOptionalDb,
} from "@/lib/db.server";
import { siteContent } from "@/lib/site-content";

export const runtime = "edge";

const editableKeys = [
  "brand.name",
  "brand.logo",
  "theme.primaryColor",
  "theme.secondaryColor",
  "home.heroTitle",
  "home.heroCopy",
  "home.heroImage",
] as const;

type EditableKey = (typeof editableKeys)[number];

const defaultSettings: Record<EditableKey, string> = {
  "brand.name": siteContent.hero.title,
  "brand.logo": siteContent.theme.logo,
  "theme.primaryColor": "#ea705f",
  "theme.secondaryColor": "#7f9172",
  "home.heroTitle": siteContent.hero.title,
  "home.heroCopy": siteContent.hero.copy,
  "home.heroImage": siteContent.theme.hero,
};

export async function GET() {
  const { db, error } = getOptionalDb();

  if (!db) {
    return NextResponse.json({
      ok: true,
      source: "fallback",
      warning: databaseUnavailable(error),
      settings: defaultSettings,
    });
  }

  let rows;

  try {
    rows = await db.select().from(siteSettings);
  } catch (selectError) {
    return NextResponse.json({
      ok: true,
      source: "fallback",
      warning: databaseMigrationRequired(selectError),
      settings: defaultSettings,
    });
  }
  const settings = { ...defaultSettings };

  for (const row of rows) {
    if (editableKeys.includes(row.key as EditableKey)) {
      settings[row.key as EditableKey] = row.value;
    }
  }

  return NextResponse.json({ ok: true, source: "database", settings });
}

export async function PUT(request: NextRequest) {
  const auth = assertAdminRequest(request);

  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const { db, error } = getOptionalDb();

  if (!db) {
    return NextResponse.json(databaseUnavailable(error), { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const settings = payload?.settings;

  if (!settings || typeof settings !== "object") {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_SETTINGS_PAYLOAD",
        message: "請提供 settings 物件。",
      },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const saved: string[] = [];

  for (const key of editableKeys) {
    const value = settings[key];

    if (typeof value !== "string") {
      continue;
    }

    try {
      const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);

      if (existing.length > 0) {
        await db
          .update(siteSettings)
          .set({ value, valueType: "string", updatedAt: now })
          .where(eq(siteSettings.key, key));
      } else {
        await db.insert(siteSettings).values({
          key,
          value,
          valueType: "string",
          updatedAt: now,
        });
      }
    } catch (writeError) {
      return NextResponse.json(databaseMigrationRequired(writeError), { status: 503 });
    }

    saved.push(key);
  }

  return NextResponse.json({ ok: true, saved });
}
