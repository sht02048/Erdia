import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdia",
  description: "View your ERD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex items-center justify-center antialiased">
        {children}
      </body>
    </html>
  );
}
