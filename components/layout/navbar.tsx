'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingCart, BookOpen } from 'lucide-react';
import { ProfileMenu } from '@/components/auth/profile-menu';
import { MobileNav } from './mobile-nav';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const cartQuantity = useAppSelector(state => state.cart.quantity);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <nav className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <BookOpen className="w-6 h-6" />
          <span className="hidden sm:inline">LearnHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-foreground/70 hover:text-foreground transition">
            Courses
          </Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground transition">
            About
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart Link */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth Section */}
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <MobileNav isAuthenticated={isAuthenticated} onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
