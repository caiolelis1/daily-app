import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={quicksand.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
