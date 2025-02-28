import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Zewan Construction | Premium Home Building & Renovation",
  description:
    "Zewan Construction offers high-quality custom home building and renovation services with over 20 years of experience in the industry.",
  keywords:
    "construction company, home building, renovation, custom homes, remodeling, home improvement, construction services, quality construction, residential construction",
  openGraph: {
    title: "Zewan Construction | Premium Home Building & Renovation",
    description:
      "Zewan Construction offers high-quality custom home building and renovation services with over 20 years of experience in the industry.",
    url: "https://zewanconstruction.com",
    siteName: "Zewan Construction",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zewan Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

