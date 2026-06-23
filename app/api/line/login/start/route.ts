import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
  const callbackUrl = process.env.LINE_LOGIN_CALLBACK_URL;

  if (!channelId || !callbackUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "LINE_LOGIN_NOT_CONFIGURED",
        message: "LINE Login 尚未設定 Channel ID 或 callback URL。",
        missing: [
          !channelId ? "LINE_LOGIN_CHANNEL_ID" : null,
          !callbackUrl ? "LINE_LOGIN_CALLBACK_URL" : null,
        ].filter(Boolean),
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: "LINE_LOGIN_IMPLEMENTATION_PENDING",
      message: "LINE OAuth state、nonce 與 callback 驗證尚未接上。",
    },
    { status: 501 }
  );
}
