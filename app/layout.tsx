import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import ModalProvider from "@/components/providor/model-provider";
import { ThemeProvider } from "@/components/providor/theme-provider";
import { ConvexClientProvider } from "@/components/providor/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "The connected best workspace where better, faster work happens ",
  icons:{
    icon:[
        {
          media: '(prefers-color-scheme: light)',
          url:"/logo.svg",
          href:"/logo.svg",
        },
        {
          media: '(prefers-color-scheme: dark)',
          url:"/logo-dark.svg",
          href:"/logo-dark.svg",
        }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              <Toaster position="bottom-center"/>
              <ModalProvider />
            {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
