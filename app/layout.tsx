import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FUMI Towel｜從台灣織出你的日常",
  description:
    "FUMI Towel 來自台灣傳統毛巾工廠，以剩紗再生、柔軟織造與客製化服務，製作日常會一直用到的毛巾。",
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
