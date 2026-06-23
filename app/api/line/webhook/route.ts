import { NextRequest, NextResponse } from "next/server";
import { verifyLineSignature } from "@/lib/line";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-line-signature");
  const body = await request.text();
  const channelSecret = process.env.LINE_MESSAGING_CHANNEL_SECRET;

  if (!channelSecret) {
    return NextResponse.json({
      ok: true,
      code: "LINE_WEBHOOK_RECEIVED_NOT_VERIFIED",
      message: "LINE webhook 已收到，但尚未設定 Channel Secret，因此未執行簽章驗證。",
      hasSignature: Boolean(signature),
      bodyLength: body.length,
    });
  }

  const isValid = await verifyLineSignature({
    channelSecret,
    body,
    signature,
  });

  if (!isValid) {
    return NextResponse.json(
      {
        ok: false,
        code: "LINE_WEBHOOK_INVALID_SIGNATURE",
        message: "LINE webhook 簽章驗證失敗，事件未處理。",
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: "LINE_WEBHOOK_VERIFICATION_PENDING",
      message: "LINE webhook 簽章驗證與事件處理尚未接上。",
      hasSignature: Boolean(signature),
      bodyLength: body.length,
    },
    { status: 501 }
  );
}
