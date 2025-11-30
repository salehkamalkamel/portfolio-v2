import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import BreadcrumbSkeleton from "@/components/breadcrumb-skeleton";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saleh Kamal - Frontend Developer & Web Performance Specialist",
  description:
    "Portfolio of Saleh Kamal, a frontend developer focused on web performance, optimization, and building fast web experiences.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Header />
        <Suspense fallback={<BreadcrumbSkeleton />}>
          <Breadcrumb />
        </Suspense>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
