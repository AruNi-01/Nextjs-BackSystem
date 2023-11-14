import React from 'react';
import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next App",
  description: "next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0">
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
