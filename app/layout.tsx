import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from "@/components/ui/sonner"



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow p-4 flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="CarRentalParadise Logo" width={70} height={70} />
            <span className="ml-2 text-xl font-bold">CarRentalParadise</span>
          </Link>
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}