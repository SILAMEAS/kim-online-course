import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isAuthenticated: boolean;
  onClose: () => void;
}

export function MobileNav({ isAuthenticated, onClose }: MobileNavProps) {
  const navItems = [
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
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
          {item.label}
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
