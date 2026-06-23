import { NextRequest, NextResponse } from "next/server";
import { createEcpayCheckMacValue } from "@/lib/ecpay";

export const runtime = "edge";

const requiredKeys = [
  "ECPAY_MERCHANT_ID",
  "ECPAY_HASH_KEY",
  "ECPAY_HASH_IV",
  "ECPAY_RETURN_URL",
] as const;

function missingEcpayKeys() {
  return requiredKeys.filter((key) => !process.env[key]);
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const missing = missingEcpayKeys();

  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        code: "ECPAY_NOT_CONFIGURED",
        message: "綠界金流尚未設定完整憑證，付款建立已被安全阻擋。",
        missing,
      },
      { status: 503 }
    );
  }

  const now = new Date();
  const merchantTradeNo = `FUMI${now.getTime()}`.slice(0, 20);
  const params = {
    MerchantID: process.env.ECPAY_MERCHANT_ID,
    MerchantTradeNo: merchantTradeNo,
    MerchantTradeDate: formatEcpayDate(now),
    PaymentType: "aio",
    TotalAmount: Number(payload?.amount ?? 0),
    TradeDesc: "FUMI Towel Order",
    ItemName: payload?.itemName ?? "FUMI Towel",
    ReturnURL: process.env.ECPAY_RETURN_URL,
    ChoosePayment: "ALL",
    EncryptType: 1,
  };
  const checkMacValue = await createEcpayCheckMacValue({
    params,
    hashKey: process.env.ECPAY_HASH_KEY ?? "",
    hashIv: process.env.ECPAY_HASH_IV ?? "",
  });

  return NextResponse.json(
    {
      ok: false,
      code: "ECPAY_IMPLEMENTATION_PENDING",
      message: "綠界交易簽章與導轉表單尚未接上。下一步會從訂單產生 MerchantTradeNo 並寫入 payments。",
      ecpayPreview: {
        merchantTradeNo,
        checkMacValue,
        params: {
          ...params,
          CheckMacValue: checkMacValue,
        },
      },
      received: {
        orderId: payload?.orderId ?? null,
        amount: payload?.amount ?? null,
      },
    },
    { status: 501 }
  );
}

function formatEcpayDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
