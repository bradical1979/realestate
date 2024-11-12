'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4 sm:space-x-8">
          <Link 
            href="/" 
            className="text-lg font-bold"
          >
            Mini-Sites
          </Link>
          <div className="flex space-x-4 sm:space-x-8">
            <Link
              href="/"
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/template"
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === "/template" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Template
            </Link>
            <Link
              href="/signup"
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === "/signup" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}