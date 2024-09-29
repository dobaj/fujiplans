import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";
import PersistLogin from "@/hooks/usePersistLogin";
import RequireAuth from "@/hooks/userRequireAuth";
import Refetch from "@/hooks/useRefetch";
import CheckLoading from "@/components/CheckLoading";

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
        <ReduxProvider>
          <PersistLogin>
            <Refetch>
              <CheckLoading>
                <RequireAuth>{children}</RequireAuth>
              </CheckLoading>
            </Refetch>
          </PersistLogin>
        </ReduxProvider>
      </body>
    </html>
  );
}
