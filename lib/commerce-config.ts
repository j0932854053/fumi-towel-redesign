export const commerceModules = [
  {
    id: "appearance",
    title: "外觀設定",
    status: "ready",
    description: "Logo、主色、首頁區塊、Hero 圖、商品排序與頁尾內容。",
    nextStep: "接上 site_settings 與 media_assets 後，後台即可即時更新前台。",
  },
  {
    id: "campaigns",
    title: "活動管理",
    status: "schema-ready",
    description: "首頁 Banner、限時活動、折扣規則、滿額活動與活動頁。",
    nextStep: "建立 campaign 編輯表單與前台活動曝光規則。",
  },
  {
    id: "members",
    title: "會員制度",
    status: "schema-ready",
    description: "會員資料、等級、點數、訂單紀錄、LINE 綁定與行銷同意。",
    nextStep: "補 email/LINE 登入、session 與會員中心頁面。",
  },
  {
    id: "ecpay",
    title: "綠界金流",
    status: "needs-credentials",
    description: "付款建立、付款完成通知、付款狀態同步與訂單狀態更新。",
    nextStep: "準備 MerchantID、HashKey、HashIV 與正式/測試環境設定。",
  },
  {
    id: "line",
    title: "LINE 連結",
    status: "needs-credentials",
    description: "LINE Login、會員綁定、Messaging API webhook 與訂單通知。",
    nextStep: "準備 LINE Login Channel、Messaging API Channel 與 callback URL。",
  },
] as const;

export const requiredEnvironment = [
  "SESSION_SECRET",
  "ADMIN_BOOTSTRAP_EMAIL",
  "ECPAY_MERCHANT_ID",
  "ECPAY_HASH_KEY",
  "ECPAY_HASH_IV",
  "ECPAY_RETURN_URL",
  "LINE_LOGIN_CHANNEL_ID",
  "LINE_LOGIN_CHANNEL_SECRET",
  "LINE_LOGIN_CALLBACK_URL",
  "LINE_MESSAGING_CHANNEL_ACCESS_TOKEN",
  "LINE_MESSAGING_CHANNEL_SECRET",
] as const;

export function getIntegrationReadiness() {
  return requiredEnvironment.map((key) => ({
    key,
    configured: Boolean(process.env[key]),
  }));
}
