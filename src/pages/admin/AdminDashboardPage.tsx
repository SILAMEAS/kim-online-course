import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {BookOpen, DollarSign, Image as ImageIcon, QrCodeIcon, UserCheck, Users, Video} from 'lucide-react';
import Link from "@/components/Link.tsx";
import {useDashboardQuery} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    description?: string;
    href: string;
    isLoading?: boolean
}

function StatCard({title, value, icon, description, href, isLoading}: Readonly<StatCardProps>) {
    if (isLoading) {
        return <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {/*<CardTitle className="text-sm font-medium">{title}</CardTitle>*/}
                {/*<div className="text-muted-foreground">{icon}</div>*/}
            </CardHeader>
            <CardContent>
                {/*<div className="text-2xl font-bold">{value}</div>*/}
                {/*{description && (*/}
                {/*    <p className="text-xs text-muted-foreground mt-1">{description}</p>*/}
                {/*)}*/}
            </CardContent>
        </Card>
    }
    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => globalThis.location.href = href}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboardPage() {
    const {currentData, isLoading} = useDashboardQuery();
    const {t} = useTranslation();
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">{t(Localization("admin_nav", "Dashboard"))}</h1>
                <p className="text-muted-foreground mt-2">{t(Localization("admin", "welcome_admin_panel"))}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    title={t(Localization("dashboard", "total_users"))}
                    value={currentData?.totalUsers || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "active_users"))}`}
                    href="/admin/users"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "total_teachers"))}
                    value={currentData?.totalTeachers || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "teachers_accounts"))}`}
                    href={`/admin/users?role=${EnumRole.INSTRUCTOR}`}
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "total_students"))}
                    value={currentData?.totalStudents || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "students_accounts"))}`}
                    href={`/admin/users?role=${EnumRole.STUDENT}`}
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "courses"))}
                    value={currentData?.totalCourses || 'Loading...'}
                    icon={<BookOpen className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "published_courses"))}`}
                    href="/admin/courses"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "videos"))}
                    value={currentData?.totalVideos || 'Loading...'}
                    icon={<Video className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "total_videos"))}`}
                    href="/admin/videos"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "revenue"))}
                    value={currentData?.totalRevenues || 'Loading...'}
                    icon={<DollarSign className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "completed_payments"))}`}
                    href="/admin/payments"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "enrollments"))}
                    value={currentData?.totalEnrollments || 'Loading...'}
                    icon={<UserCheck className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "active_enrollments"))}`}
                    href="/admin/enrollments"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "images"))}
                    value={currentData?.totalImages || 'Loading...'}
                    icon={<ImageIcon className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "uploaded_images"))}`}
                    href="/admin/images"
                    isLoading={isLoading}
                />
                <StatCard
                    title={t(Localization("dashboard", "categories"))}
                    value={currentData?.totalCategories || 'Loading...'}
                    icon={<QrCodeIcon className="h-4 w-4"/>}
                    description={`${t(Localization("dashboard", "total_categories"))}`}
                    href="/admin/categories"
                    isLoading={isLoading}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t(Localization("quick_actions", "title"))}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/users">{t(Localization("quick_actions", "manage_users"))}</Link>
                        <Link href="/admin/courses">{t(Localization("quick_actions", "manage_courses"))}</Link>
                        <Link href="/admin/payments">{t(Localization("quick_actions", "view_payments"))}</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
