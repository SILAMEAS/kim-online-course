import {ForwardRefExoticComponent, RefAttributes, useEffect} from "react";
import {Link, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {Button} from "@/components/ui/button";
import {BookMarked, Command, Heart, LayoutDashboard, LucideProps, User} from "lucide-react";
import {loginSuccess} from "@/lib/redux/slices/auth.slice";

import {useMeQuery} from "@/lib/api/apiSlice";
import {EnumRole} from "@/lib/enum.ts";
import {UserResponse} from "@/lib/types.ts";

const SIDEBAR_ITEMS: Array<{
    to: string,
    label: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    roles: Array<EnumRole>
}> = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        roles: [EnumRole.ADMIN, EnumRole.STUDENT, EnumRole.INSTRUCTOR]
    },
    {
        to: "/dashboard/my-courses",
        label: "My Courses",
        icon: BookMarked,
        roles: [EnumRole.ADMIN, EnumRole.STUDENT, EnumRole.INSTRUCTOR]
    },
    {
        to: "/dashboard/wishlist",
        label: "Wishlist",
        icon: Heart,
        roles: [EnumRole.ADMIN, EnumRole.STUDENT, EnumRole.INSTRUCTOR]
    },
    {
        to: "/dashboard/profile",
        label: "Profile",
        icon: User,
        roles: [EnumRole.ADMIN, EnumRole.STUDENT, EnumRole.INSTRUCTOR]
    },
    {to: "/dashboard/manage-course", label: "Manage Course", icon: Command, roles: [EnumRole.ADMIN]},
    {to: "/dashboard/manage-video", label: "Manage Video", icon: Command, roles: [EnumRole.ADMIN]},
];

export default function DashboardLayout() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const me = useMeQuery(undefined, {refetchOnReconnect: true, refetchOnMountOrArgChange: true});

    useEffect(() => {
        // Fetch user immediately
        if (me.currentData) {
            const mockUser: UserResponse = {
                firstName: me.currentData.firstName,
                lastName: me.currentData.lastName,
                id: me.currentData.id.toString(),
                email: me.currentData.email,
                name: `${me.currentData.firstName} ${me.currentData.lastName}`,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${me.currentData.email}`,
                bio: "Passionate learner",
                enrolled_courses: [],
                role: me.currentData.role,
                certificates: [],
                created_at: new Date().toString()
            };

            dispatch(loginSuccess(mockUser));
        }
    }, [me.isFetching, me.currentData]);

    if (!isAuthenticated) {
        return null;
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                                <nav className="space-y-2">
                                    {SIDEBAR_ITEMS.filter(item => item.roles.includes(me?.currentData?.role as EnumRole)).map((item) => {
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
                        <div className="md:col-span-3">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
