import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./lib/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recurring",
  description: "Saas Company Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Navbar />
            {children}
            <Footer />
          </StoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
