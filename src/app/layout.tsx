import type { Metadata } from "next";
import { Mulish, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import WagmiComponentWrapper from '@/components/WagmiComponentWrapper';
const inter = Mulish({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Payrous",
  description: "Payrous is a blockchain-powered platform designed to streamline payroll and bulk payment processes by enabling organizations to efficiently handle payments to multiple recipients.",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '64x64',
      url: '/icon.svg',
    },
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${sourceSansPro.variable}`}>
        <WagmiComponentWrapper>
          <div className="bg-colors-Background min-h-screen">
            <div className="flex flex-col justify-center items-center">
              {children}
            </div>
          </div>
        </WagmiComponentWrapper>
      </body>
    </html>
  );
}