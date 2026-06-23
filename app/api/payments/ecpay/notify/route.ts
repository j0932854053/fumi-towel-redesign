import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const body =
    contentType.includes("application/json")
      ? await request.json().catch(() => ({}))
      : Object.fromEntries((await request.formData()).entries());

  return NextResponse.json(
    {
      ok: false,
      code: "ECPAY_NOTIFY_PENDING",
      message:
        "綠界付款通知接點已建立，但尚未啟用 CheckMacValue 驗證與訂單付款狀態更新。",
      receivedKeys: Object.keys(body),
    },
    { status: 501 }
  );
}
