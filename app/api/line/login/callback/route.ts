import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        code: "LINE_LOGIN_ERROR",
        message: "LINE Login 回傳錯誤。",
        error,
        errorDescription: url.searchParams.get("error_description"),
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: "LINE_LOGIN_CALLBACK_PENDING",
      message: "已收到 LINE Login callback，但尚未接 token exchange、會員建立與 session 寫入。",
      received: {
        hasCode: Boolean(code),
        hasState: Boolean(state),
      },
    },
    { status: 501 }
  );
}
