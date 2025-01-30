import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth-App",
  description: "a app for authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
