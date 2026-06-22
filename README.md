# FUMI Towel Redesign

FUMI 毛巾首頁重新設計版，參考 aged nice things 的留白、細線、大片商品視覺與簡潔選品格狀版面。

[https://j0932854053.github.io/fumi-towel-redesign/](https://j0932854053.github.io/fumi-towel-redesign/)

## GitHub Pages

這個專案使用和「投資」專案相同的 GitHub Pages 部署方式：

- `npm run build:pages` 產生靜態網站到 `out/`
- `.github/workflows/deploy-pages.yml` 由 GitHub Actions 自動發布
- `next.config.ts` 針對 GitHub Pages 設定 `/fumi-towel-redesign` base path

## Local Preview

```bash
npm install
npm run dev
npm run build:pages
```
