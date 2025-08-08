import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { PageProvider } from "@/components/page-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Fusion UI - Animated React Components for Modern Web",
  description: "A curated library of 100+ production-ready, animated, and customizable React components, built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: ["react components", "animated components", "framer motion", "tailwind css", "next.js", "ui library", "component library", "creative development"],
  metadataBase: new URL('https://fusion-ui-v0.vercel.app'), // Replace with your actual domain
  openGraph: {
    title: "Fusion UI - Animated React Components for Modern Web",
    description: "A curated library of 100+ production-ready, animated, and customizable React components.",
    url: "https://fusion-ui-v0.vercel.app", // Replace with your actual domain
    siteName: "Fusion UI",
    images: [
      {
        url: '/og-image.png', // Path to your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Fusion UI - Animated React Components',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fusion UI - Animated React Components for Modern Web",
    description: "A curated library of 100+ production-ready, animated, and customizable React components.",
    images: ['/og-image.png'], // Path to your Twitter card image
  },
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarState = cookies().get("sidebar:state");
  const defaultOpen = sidebarState?.value === "true";

  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <PageProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex">
              <AppSidebar />
              <main className="flex-1">{children}</main>
            </div>
          </SidebarProvider>
        </PageProvider>
      </body>
    </html>
  );
}
