"use client";

import TopNav from "@/components/TopNav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
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
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
