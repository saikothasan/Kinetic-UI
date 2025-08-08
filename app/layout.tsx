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
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: {
    default: "Kinetic UI - Animated React Components for Creative Developers",
    template: "%s | Kinetic UI",
  },
  description: "An open-source library of 100+ animated, interactive, and customizable React components, built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: ["React components", "Framer Motion", "Tailwind CSS", "Next.js", "UI library", "animated components", "interactive UI"],
  openGraph: {
    title: "Kinetic UI - Animated React Components for Creative Developers",
    description: "An open-source library of 100+ animated, interactive, and customizable React components.",
    url: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
    siteName: "Kinetic UI",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kinetic UI Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kinetic UI - Animated React Components for Creative Developers",
    description: "An open-source library of 100+ animated, interactive, and customizable React components.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
