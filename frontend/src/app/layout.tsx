import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Keely",
  description: "QTMA DEMO WINNER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
