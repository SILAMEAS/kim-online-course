import { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { BookMarked, User, Heart, LayoutDashboard } from "lucide-react";

const SIDEBAR_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/my-courses", label: "My Courses", icon: BookMarked },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.to} to={item.to}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3"
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
