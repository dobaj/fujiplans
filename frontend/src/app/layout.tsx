import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import ReduxProvider from "@/redux/Provider";
import PersistLogin from "@/hooks/usePersistLogin";
import RequireAuth from "@/hooks/useRequireAuth";
import Refetch from "@/hooks/useRefetch";

export const metadata: Metadata = {
  title: "FUJIPLANS",
  description: "QTMA DEMO WINNER",
  icons: {
    icon: "/fujiplans.svg",
  },
  
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="">
      <Head>
        <link rel="icon" href="/fujiplans.svg" />
      </Head>
      <body className={`antialiased`}>
        <ReduxProvider>
          <PersistLogin>
            <Refetch>
              <RequireAuth>{children}</RequireAuth>
            </Refetch>
          </PersistLogin>
        </ReduxProvider>
      </body>
    </html>
  );
}
