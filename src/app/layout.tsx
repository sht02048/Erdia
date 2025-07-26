import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/shared/providers/theme-provider";

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
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
