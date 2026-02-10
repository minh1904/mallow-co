import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScroll } from '@/providers/SmoothScroll';

const generalSans = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/GeneralSans-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-VariableItalic.woff2',
      style: 'italic',
    },
  ],

  variable: '--font-general-sans',
  weight: '200 700',
});
const azeretMono = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/AzeretMono-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AzeretMono-VariableItalic.woff2',
      style: 'italic',
    },
  ],

  variable: '--font-azeret-mono',
  weight: '200 700',
});

export const metadata: Metadata = {
  description: 'Mallow',
  title: 'Mallow & Co',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${generalSans.variable} ${azeretMono.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
