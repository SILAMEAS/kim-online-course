import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

interface MobileNavProps {
  isAuthenticated: boolean;
  onClose: () => void;
}

export function MobileNav({ isAuthenticated, onClose }: Readonly<MobileNavProps>) {
  const {t}=useTranslation();
  const navItems = [
    { to: "/courses", label: "course" },
    { to: "/about", label: "about_us" },
    { to: "/contact", label: "contact" },
  ];

  return (
    <div className="flex flex-col gap-4 py-4">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClose}
          className="px-4 py-2 text-foreground/70 hover:text-foreground transition"
        >
          {t(Localization("footer",item.label as any))}
        </Link>
      ))}

      <div className="border-t pt-4 mt-4">
        {!isAuthenticated && (
          <div className="flex flex-col gap-2">
            <Link to="/login" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={onClose}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
