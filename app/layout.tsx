import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BNomad - Venture Studio for Glocal Innovation",
  description: "BNomad bridges global innovation and local communities, creating meaningful ventures that honor both tradition and transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
