import { hmacSha256Base64 } from "@/lib/crypto-utils";

export async function verifyLineSignature({
  channelSecret,
  body,
  signature,
}: {
  channelSecret: string;
  body: string;
  signature: string | null;
}) {
  if (!signature) {
    return false;
  }

  const expected = await hmacSha256Base64(channelSecret, body);

  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;

  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return diff === 0;
}
