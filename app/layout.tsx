import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PwaRegister } from "./pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "iLIM",
  description: "Қазақ тіліндегі ойын түріндегі ислам оқу платформасы",
  manifest: "/manifest.webmanifest",
  applicationName: "iLIM",
  appleWebApp: {
    capable: true,
    title: "iLIM",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#ffd21f"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kk">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
