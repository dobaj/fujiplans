import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";

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
      <body className={`antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
