import {ForwardRefExoticComponent, RefAttributes} from "react";
import {Link, Outlet} from "react-router-dom";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {Button} from "@/components/ui/button";
import {BookMarked, Heart, LayoutDashboard, LucideProps, User} from "lucide-react";
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {cn} from "@/lib/utils.ts";

interface ISidebarItem {
    to: string,
    label: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
}

const SIDEBAR_ITEMS: Array<ISidebarItem> = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        to: "/dashboard/my-courses",
        label: "My Courses",
        icon: BookMarked,
    },
    {
        to: "/dashboard/wishlist",
        label: "Wishlist",
        icon: Heart,
    },
    {
        to: "/dashboard/profile",
        label: "Profile",
        icon: User,
    },
    {
        to: "/dashboard/admin/course",
        label: "Course",
        icon: LayoutDashboard,
    },
    {
        to: "/dashboard/admin/video",
        label: "Video",
        icon: LayoutDashboard,
    },

];

// const SIDEBAR_ITEMS_ADMIN_PANEL: Array<ISidebarItem> = [
//     {
//         to: "/dashboard/admin-control",
//         label: "Course",
//         icon: LayoutDashboard,
//     },
//     {
//         to: "/dashboard/my-courses",
//         label: "My Courses",
//         icon: BookMarked,
//     }
// ];

export default function DashboardLayout() {
    const {currentUser: me} = useAppSelector(state => state.auth);
    // const routeIsIncludeAdminPanel = globalThis.location.pathname.includes("/admin-control");

    if (!me) {
        return null;
    }
    // const sidebarRender = routeIsIncludeAdminPanel ? SIDEBAR_ITEMS_ADMIN_PANEL : SIDEBAR_ITEMS;
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className={cn("md:col-span-1")}>
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
                                                    <Icon className="w-5 h-5"/>
                                                    <span>{item.label}</span>
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className={cn("md:col-span-3")}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
