'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { CartSheet } from './CartSheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            Crispy Goodness
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
