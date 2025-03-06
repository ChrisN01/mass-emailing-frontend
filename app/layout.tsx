"use client";

import TopNav from "@/components/TopNav";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
        
          <TopNav />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
