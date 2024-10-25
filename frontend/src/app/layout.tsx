import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";
import PersistLogin from "@/hooks/usePersistLogin";
import RequireAuth from "@/hooks/useRequireAuth";
import Refetch from "@/hooks/useRefetch";

export const metadata: Metadata = {
  title: "Team Keely",
  description: "QTMA DEMO WINNER",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="">
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
