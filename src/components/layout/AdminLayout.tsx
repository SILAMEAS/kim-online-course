import {BookOpen, CreditCard, Image, LayoutDashboard, UserCheck, Users, Video,} from 'lucide-react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ProfileMenu} from "@/components/auth/profile-menu.tsx";
import {useEffect} from "react";
import {EnumRole} from "@/lib/enum.ts";
import useRestoreUserByToken from "@/hooks/useRestoreUserByToken.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";
import Link from "@/components/Link.tsx";
import ThemeLanguage from "@/components/ThemeLanguage.tsx";
import Cookies from "js-cookie";

const navItems = [
    {
        href: '/admin',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        href: '/admin/users',
        label: 'Users',
        icon: Users,
    },
    {
        href: '/admin/courses',
        label: 'Courses',
        icon: BookOpen,
    },
    {
        href: '/admin/videos',
        label: 'Videos',
        icon: Video,
    },
    {
        href: '/admin/payments',
        label: 'Payments',
        icon: CreditCard,
    },
    {
        href: '/admin/enrollments',
        label: 'Enrollments',
        icon: UserCheck,
    },
    {
        href: '/admin/images',
        label: 'Images',
        icon: Image,
    },
];

export default function AdminLayout() {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {currentData: currentUser, isLoading} = useRestoreUserByToken();
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        // if not logged in
        if (!accessToken) {
            navigate("/", {replace: true});

        }
        // wait until auth is resolved
        if (!currentUser) return;

        //  not admin
        if (currentUser && currentUser?.role != EnumRole.ADMIN) {
            navigate("/", {replace: true});
        }
    }, [currentUser, navigate, accessToken]);
    if (isLoading) return <>loading ...</>
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card">
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-border">
                        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                        <p className="text-sm text-muted-foreground mt-1">Course Management</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={item.href} href={item.href} isActive={pathname === item.href}>
                                        <Icon className="h-5 w-5"/>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border">
                        <Button variant="outline" className="w-full">
                            {t(Localization("loginPage", "logout"))}
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className={'flex flex-grow flex-row justify-self-end mr-4 mt-4'}>
                    <ThemeLanguage className={"w-[100px]"}/>
                    <ProfileMenu/>
                </div>
                <div className="p-8">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
