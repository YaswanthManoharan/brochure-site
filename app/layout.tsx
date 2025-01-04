'use client';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // List of routes where Navbar and Footer should be hidden
  const excludeRoutes = ['/admin'];

  const shouldExcludeLayout = excludeRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {!shouldExcludeLayout && <Navbar />}
        <main className={`flex-1 ${shouldExcludeLayout ? 'h-full' : ''}`}>
          {children}
        </main>
        {!shouldExcludeLayout && <Footer />}
      </body>
    </html>
  );
}