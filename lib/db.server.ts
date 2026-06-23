import { getDb } from "@/db";

export function getOptionalDb() {
  try {
    return { db: getDb(), error: null };
  } catch (error) {
    return {
      db: null,
      error: error instanceof Error ? error.message : "Database binding is unavailable.",
    };
  }
}

export function databaseUnavailable(error: string | null) {
  return {
    ok: false,
    code: "DATABASE_NOT_CONFIGURED",
    message: "資料庫尚未綁定。部署時需要 D1 binding `DB` 才能儲存後台資料。",
    detail: error,
  };
}

export function databaseMigrationRequired(error: unknown) {
  return {
    ok: false,
    code: "DATABASE_MIGRATION_REQUIRED",
    message: "資料庫已綁定，但尚未套用 migration。請先執行 drizzle migration 建立資料表。",
    detail: error instanceof Error ? error.message : String(error),
  };
}
