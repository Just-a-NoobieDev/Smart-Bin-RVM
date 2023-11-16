import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import DashboardLayout from "@/components/DashboardLayout";
import SidebarContextProvider from "@/context/SidebarContext";
import { createClient } from "@supabase/supabase-js";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Smart Bottle Bin",
  description: "Smart Bottle Bin: A Reverse Vending Machine",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "min-h-[88px] px-4 py-15 gap-4 text-[16px] w-full",
            duration: 3000,
          }}
        />
        <AuthProvider accessToken={accessToken}>
          <SidebarContextProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </SidebarContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
