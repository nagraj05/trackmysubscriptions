import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Track my Subscriptions",
  description: "Created by Tadingi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[160px] rounded-full" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-500/5 blur-[140px] rounded-full" />
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-violet-500/5 blur-[120px] rounded-full" />
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <Header />

          <main className="relative z-10">{children}</main>
          <Footer />
          <Toaster position="bottom-left" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
