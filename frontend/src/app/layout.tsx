import { Inter } from 'next/font/google';
import './globals.css';
import AntdProvider from '@/components/AntdProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Feedback Collector - Share Your Thoughts',
  description: 'A modern feedback collection platform where users can share their thoughts and experiences'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
