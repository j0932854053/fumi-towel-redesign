import { sha256Hex } from "@/lib/crypto-utils";

type EcpayParams = Record<string, string | number | boolean | null | undefined>;

export async function createEcpayCheckMacValue({
  params,
  hashKey,
  hashIv,
}: {
  params: EcpayParams;
  hashKey: string;
  hashIv: string;
}) {
  const encoded = buildEcpayCheckString({ params, hashKey, hashIv });

  return sha256Hex(encoded);
}

export function buildEcpayCheckString({
  params,
  hashKey,
  hashIv,
}: {
  params: EcpayParams;
  hashKey: string;
  hashIv: string;
}) {
  const entries = Object.entries(params)
    .filter(([key, value]) => key !== "CheckMacValue" && value !== null && value !== undefined)
    .sort(([left], [right]) => left.toLowerCase().localeCompare(right.toLowerCase()))
    .map(([key, value]) => `${key}=${value}`);

  const raw = `HashKey=${hashKey}&${entries.join("&")}&HashIV=${hashIv}`;

  return encodeURIComponent(raw)
    .toLowerCase()
    .replaceAll("%20", "+")
    .replaceAll("%2d", "-")
    .replaceAll("%5f", "_")
    .replaceAll("%2e", ".")
    .replaceAll("%21", "!")
    .replaceAll("%2a", "*")
    .replaceAll("%28", "(")
    .replaceAll("%29", ")");
}
