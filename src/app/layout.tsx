import type { Metadata } from "next";
import { Mulish, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ContextProvider from '@/contexts/AppKitContext';
import { headers } from 'next/headers'
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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body className={`${inter.className} ${sourceSansPro.variable}`}>
        <ContextProvider cookies={cookies}>
          <div className="bg-colors-Background min-h-screen">
            <div className="flex flex-col justify-center items-center">
              {children}
            </div>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}