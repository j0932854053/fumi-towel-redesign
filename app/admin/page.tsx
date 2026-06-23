import Link from "next/link";
import { commerceModules, getIntegrationReadiness } from "@/lib/commerce-config";
import { siteContent } from "@/lib/site-content";

const activityDrafts = [
  {
    title: "開站首購禮",
    status: "待設定",
    rule: "新會員首筆訂單滿 NT$ 1,000 折 NT$ 100",
  },
  {
    title: "毛巾組合優惠",
    status: "待設定",
    rule: "指定系列任選三件 88 折",
  },
  {
    title: "LINE 好友限定",
    status: "待串接",
    rule: "綁定 LINE 後發送活動通知與折扣碼",
  },
];

const apiEndpoints = [
  { method: "GET", path: "/api/admin/site-settings", purpose: "讀取外觀設定" },
  { method: "PUT", path: "/api/admin/site-settings", purpose: "儲存外觀設定，需要 ADMIN_API_TOKEN" },
  { method: "GET", path: "/api/admin/campaigns", purpose: "讀取活動列表" },
  { method: "POST", path: "/api/admin/campaigns", purpose: "建立活動草稿，需要 ADMIN_API_TOKEN" },
  { method: "POST", path: "/api/payments/ecpay/create", purpose: "建立綠界付款參數與檢查碼" },
  { method: "POST", path: "/api/line/webhook", purpose: "接收 LINE webhook 並驗證簽章" },
];

export default function AdminDashboard() {
  const readiness = getIntegrationReadiness();
  const configuredCount = readiness.filter((item) => item.configured).length;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">FUMI COMMERCE</p>
          <h1>營運後台</h1>
          <p>
            這裡會是你之後管理外觀、活動、會員、訂單、綠界金流與 LINE 連結的入口。
          </p>
        </div>
        <Link className="admin-link" href="/">
          查看前台
        </Link>
      </header>

      <section className="admin-metrics" aria-label="System status">
        <article>
          <span>商品</span>
          <strong>{siteContent.products.length}</strong>
          <p>已整理成可轉入資料庫的選品資料</p>
        </article>
        <article>
          <span>首頁區塊</span>
          <strong>{siteContent.features.length + 4}</strong>
          <p>Hero、選品、故事、保養、通路</p>
        </article>
        <article>
          <span>環境設定</span>
          <strong>
            {configuredCount}/{readiness.length}
          </strong>
          <p>金流、LINE 與 session secrets</p>
        </article>
      </section>

      <section className="admin-layout">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <p className="eyebrow">MODULES</p>
            <h2>客製系統模組</h2>
          </div>
          <div className="module-list">
            {commerceModules.map((module) => (
              <article className="module-card" key={module.id}>
                <div>
                  <span className={`status-dot status-${module.status}`} />
                  <p>{module.status}</p>
                </div>
                <h3>{module.title}</h3>
                <span>{module.description}</span>
                <strong>{module.nextStep}</strong>
              </article>
            ))}
          </div>
        </div>

        <aside className="admin-panel">
          <div className="admin-panel-heading">
            <p className="eyebrow">SETUP</p>
            <h2>上線前檢查</h2>
          </div>
          <div className="setup-list">
            {readiness.map((item) => (
              <div className="setup-row" key={item.key}>
                <span>{item.key}</span>
                <strong>{item.configured ? "已設定" : "待設定"}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="admin-layout">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <p className="eyebrow">APPEARANCE</p>
            <h2>外觀可調項目</h2>
          </div>
          <div className="control-grid">
            <label>
              品牌名稱
              <input defaultValue={siteContent.hero.title} />
            </label>
            <label>
              首頁標語
              <input defaultValue={siteContent.hero.copy} />
            </label>
            <label>
              主色
              <input defaultValue="#ea705f" />
            </label>
            <label>
              輔色
              <input defaultValue="#7f9172" />
            </label>
            <label className="wide">
              Hero 圖片路徑
              <input defaultValue={siteContent.theme.hero} />
            </label>
          </div>
          <p className="admin-note">
            這一區下一步會接 `site_settings`，儲存後直接影響前台，不需要改程式。
          </p>
        </div>

        <aside className="admin-panel">
          <div className="admin-panel-heading">
            <p className="eyebrow">CAMPAIGNS</p>
            <h2>活動草稿</h2>
          </div>
          <div className="activity-list">
            {activityDrafts.map((activity) => (
              <article key={activity.title}>
                <p>{activity.status}</p>
                <h3>{activity.title}</h3>
                <span>{activity.rule}</span>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="admin-panel admin-endpoints">
        <div className="admin-panel-heading">
          <p className="eyebrow">BACKEND</p>
          <h2>目前已建立 API</h2>
        </div>
        <div className="endpoint-table">
          {apiEndpoints.map((endpoint) => (
            <div className="endpoint-row" key={`${endpoint.method}-${endpoint.path}`}>
              <strong>{endpoint.method}</strong>
              <code>{endpoint.path}</code>
              <span>{endpoint.purpose}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
