import { NextRequest } from "next/server";

export function assertAdminRequest(request: NextRequest) {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    return {
      ok: false,
      status: 503,
      body: {
        ok: false,
        code: "ADMIN_AUTH_NOT_CONFIGURED",
        message: "後台 API token 尚未設定，寫入操作已被安全阻擋。",
      },
    } as const;
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  if (token !== expectedToken) {
    return {
      ok: false,
      status: 401,
      body: {
        ok: false,
        code: "ADMIN_UNAUTHORIZED",
        message: "缺少或錯誤的後台 API token。",
      },
    } as const;
  }

  return { ok: true } as const;
}
