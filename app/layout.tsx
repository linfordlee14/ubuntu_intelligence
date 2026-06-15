import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:
    "CableGuard AI — Cost of Doing Nothing Simulator | Ubuntu Intelligence",
  description:
    "AI-powered municipal decision support for cable theft prevention in Qonce, South Africa. Model 5-year cost projections, compare intervention scenarios, and support infrastructure investment decisions. USAII Global AI Hackathon 2026.",
  openGraph: {
    title: "CableGuard AI — Cost of Doing Nothing Simulator",
    description:
      "AI-powered municipal decision support for cable theft prevention in Qonce, South Africa.",
    type: "website",
    locale: "en_ZA",
    siteName: "CableGuard AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CableGuard AI — Cost of Doing Nothing Simulator",
    description:
      "AI-powered municipal decision support for cable theft prevention in Qonce, South Africa.",
  },
  keywords: [
    "cable theft",
    "municipal decision support",
    "infrastructure protection",
    "Qonce",
    "Buffalo City Metro",
    "South Africa",
    "AI hackathon",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
