import React from 'react';
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js App",
  description: "next.js & antd app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='h-full'>
      <body className="m-0 h-full bg-root-background bg-cover">
        <StyledComponentsRegistry>
          {children}
          <Analytics />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
