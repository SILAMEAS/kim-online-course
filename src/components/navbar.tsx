import {Link} from "react-router-dom";
import {useState} from "react";
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {BookOpen, Menu, ShoppingCart} from "lucide-react";
import {ProfileMenu} from "@/components/auth/profile-menu.tsx";
import {MobileNav} from "./mobile-nav.tsx";
import TriggerTheme from "@/components/providers/theme/TriggerTheme.tsx";
import TriggerLanguage from "@/components/providers/i18n/TriggerLanguage.tsx";
import useRestoreUserByToken from "@/hooks/useRestoreUserByToken.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentData,isLoading} = useRestoreUserByToken();
  const {t} = useTranslation();
  const cartQuantity = useAppSelector((state) => state.cart.quantity);

  if(isLoading){
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <nav className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <BookOpen className="w-6 h-6" />
          <span className="hidden sm:inline">Learning outcomes</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/courses"
            className="text-foreground/70 hover:text-foreground transition"
          >
            {t(Localization("form","course"))}
          </Link>
          <Link
            to="/about"
            className="text-foreground/70 hover:text-foreground transition"
          >
            {t(Localization("form","about"))}
          </Link>
          <Link
            to="/contact"
            className="text-foreground/70 hover:text-foreground transition"
          >
            {t(Localization("footer","contact"))}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart Link */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>
          {/* Theme */}
          <TriggerTheme/>
          <TriggerLanguage/>
          {/* Auth Section */}
          {currentData ? (
            <ProfileMenu />
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  {t(Localization("loginPage","login"))}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">{t(Localization("form","sign_up"))}</Button>
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
              <MobileNav
                isAuthenticated={Boolean(currentData)}
                onClose={() => setOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
