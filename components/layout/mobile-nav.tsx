'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  isAuthenticated: boolean;
  onClose: () => void;
}

export function MobileNav({ isAuthenticated, onClose }: MobileNavProps) {
  const navItems = [
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex flex-col gap-4 py-4">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="px-4 py-2 text-foreground/70 hover:text-foreground transition"
        >
          {item.label}
        </Link>
      ))}

      <div className="border-t pt-4 mt-4">
        {!isAuthenticated && (
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={onClose}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
