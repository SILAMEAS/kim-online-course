import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    BookOpen,
    CreditCard,
    Image,
    LayoutDashboard,
    PanelLeftClose,
    PanelLeftOpen,
    Shapes,
    UserCheck,
    Users,
    Video
} from "lucide-react";
import Link from "@/components/Link.tsx"; // Example close icon

interface NavItem {
    href: string;
    label: string;
    icon: any;
}

interface SidebarProps {
    navItems?: NavItem[];
    pathname: string;
}

const navItemsDefault = [
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
    {
        href: '/admin/categories',
        label: 'Categories',
        icon: Shapes,
    },
];

export const Sidebar = ({navItems, pathname}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const renderItems = navItems ?? navItemsDefault;

    return (
        <>
            {/* Drawer toggle button (small screens) */}
            <Button
                className="md:hidden m-4 fixed"
                variant={"outline"}
                onClick={() => setIsOpen(true)}
            >
                <PanelLeftOpen/>
            </Button>

            {/* Overlay */}
            {isOpen && (
                <button
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar / Drawer */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                            <p className="text-sm text-muted-foreground mt-1">Course Management</p>
                        </div>
                        {/* Close button for small screens */}

                        <Button
                            className="md:hidden p-2"
                            variant={"outline"}
                            onClick={() => setIsOpen(false)}
                        >
                            <PanelLeftClose/>
                        </Button>

                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {renderItems?.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        isActive={pathname === item.href}
                                    >
                                        <Icon className="h-5 w-5"/>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
};