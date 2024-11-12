import Link from 'next/link';

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="transition-colors hover:text-foreground/80">
        Dashboard
      </Link>
      <Link href="/template" className="transition-colors hover:text-foreground/80">
        Template
      </Link>
      <Link href="/signup" className="transition-colors hover:text-foreground/80">
        Sign Up
      </Link>
    </nav>
  );
}