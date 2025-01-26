import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Liga Tari Mahasiswa UI Krida Budaya | Universitas Indonesia',
  description:
    'Liga Tari Mahasiswa UI Krida Budaya Universitas Indonesia yang aktif dalam kegiatan tari dan musik tradisional, melestarikan budaya Indonesia melalui pertunjukan dan pelatihan.',
  keywords: [
    'UKM Tari UI',
    'Liga Tari UI',
    'Krida Budaya',
    'Tari Tradisional UI',
    'Musik Tradisional UI',
    'Budaya Indonesia',
    'Folklore Dance UI',
    'Folklore Music UI',
  ],
  authors: [
    {
      name: 'Liga Tari Mahasiswa UI Krida Budaya',
      url: 'https://kridabudaya.co.id',
    },
  ],
  viewport: 'width=device-width, initial-scale=1.0',

  // Open Graph for Facebook, Instagram, WhatsApp, and YouTube
  openGraph: {
    title: 'UKM Liga Tari Mahasiswa UI Krida Budaya',
    description:
      'Organisasi mahasiswa Universitas Indonesia yang berfokus pada tari dan musik tradisional, melestarikan warisan budaya Indonesia.',
    url: 'https://kridabudaya.co.id',
    siteName: 'UKM Liga Tari Mahasiswa UI',
    images: [
      {
        url: '/images/krida-budaya-cover.jpg', //ganti url image
        width: 1200,
        height: 630,
        alt: 'Liga Tari Mahasiswa UI Krida Budaya',
      },
    ],
    type: 'website',
    locale: 'id_ID', // Indonesian locale
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'UKM Liga Tari Mahasiswa UI Krida Budaya',
    description:
      'Menjaga dan melestarikan seni tari serta musik tradisional Indonesia melalui berbagai kegiatan dan pertunjukan.',
    //images: ['/images/krida-budaya-cover.jpg'], //ganti url image
  },

  // Additional icons for favicon and Apple devices
  // icons: {
  //   icon: '/favicon.ico', //ganti url image
  //   apple: '/apple-touch-icon.png', //ganti url image
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
