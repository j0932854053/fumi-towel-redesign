# FUMI Commerce

FUMI 毛巾自有電商系統。前台維持目前的品牌選品風格，後續會逐步接上可視化外觀管理、活動管理、會員制度、綠界金流與 LINE 會員綁定。

## Current Foundation

- 前台首頁資料化：`lib/site-content.ts`
- 後台入口：`/admin`
- 商務資料表：`db/schema.ts`
- 系統狀態 API：`/api/commerce/status`
- 後台外觀設定 API：`/api/admin/site-settings`
- 後台活動管理 API：`/api/admin/campaigns`
- 綠界 API stub：`/api/payments/ecpay/create`、`/api/payments/ecpay/notify`
- LINE API stub：`/api/line/login/start`、`/api/line/login/callback`、`/api/line/webhook`
- 綠界 CheckMacValue helper：`lib/ecpay.ts`
- LINE webhook signature helper：`lib/line.ts`

## Runtime Target

This is now a full-stack commerce system, not a GitHub Pages static site.

Recommended hosting shape:

- App runtime: Cloudflare Workers / OpenAI Sites-compatible runtime
- Database: Cloudflare D1 binding `DB`
- File storage: Cloudflare R2 binding `ASSETS`
- Secrets: deploy-time environment variables, never committed to GitHub

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Copy `.env.example` and fill real credentials only in your deployment environment.

## Next Build Order

1. Deploy with D1/R2 bindings and secrets.
2. Turn `/api/admin/site-settings` into the source of truth for the homepage.
3. Build real admin login/session instead of token-only API writes.
4. Add cart and order creation.
5. Complete ECPay payment redirect + notify flow.
6. Complete LINE Login member binding and order notification messages.
