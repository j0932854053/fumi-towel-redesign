import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FUMI Towel | 台灣毛巾選品與客製服務",
  description:
    "FUMI Towel 結合台灣毛巾工廠工藝、日常選品、客製服務與未來自有電商系統。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
