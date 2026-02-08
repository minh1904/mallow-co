import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const generalSans = localFont({
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
  display: 'swap',
});
const azeretMono = localFont({
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
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mallow & Co',
  description: 'Mallow',
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
        {children}
      </body>
    </html>
  );
}
