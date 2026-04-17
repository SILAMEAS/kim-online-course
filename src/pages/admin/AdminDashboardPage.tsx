import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {BookOpen, DollarSign, Image as ImageIcon, QrCodeIcon, UserCheck, Users, Video} from 'lucide-react';
import Link from "@/components/Link.tsx";
import {useDashboardQuery} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    description?: string;
    href: string;
    isLoading?:boolean
}

function StatCard({title, value, icon, description, href, isLoading}: Readonly<StatCardProps>) {
    if(isLoading){
        return  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
    const {currentData,isLoading}=useDashboardQuery();
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome to the admin panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    title="Total Users"
                    value={currentData?.totalUsers || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description="Active user accounts"
                    href="/admin/users"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Total Teachers"
                    value={currentData?.totalTeachers || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description="Teachers accounts"
                    href={`/admin/users?role=${EnumRole.INSTRUCTOR}`}
                    isLoading={isLoading}
                />
                <StatCard
                    title="Total Students"
                    value={currentData?.totalStudents || 'Loading...'}
                    icon={<Users className="h-4 w-4"/>}
                    description="Students accounts"
                    href={`/admin/users?role=${EnumRole.STUDENT}`}
                    isLoading={isLoading}
                />
                <StatCard
                    title="Courses"
                    value={currentData?.totalCourses || 'Loading...'}
                    icon={<BookOpen className="h-4 w-4"/>}
                    description="Published courses"
                    href="/admin/courses"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Videos"
                    value={currentData?.totalVideos || 'Loading...'}
                    icon={<Video className="h-4 w-4"/>}
                    description="Total videos"
                    href="/admin/videos"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Revenue"
                    value={currentData?.totalRevenues || 'Loading...'}
                    icon={<DollarSign className="h-4 w-4"/>}
                    description="Completed payments"
                    href="/admin/payments"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Enrollments"
                    value={currentData?.totalEnrollments || 'Loading...'}
                    icon={<UserCheck className="h-4 w-4"/>}
                    description="Active enrollments"
                    href="/admin/enrollments"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Images"
                    value={currentData?.totalImages || 'Loading...'}
                    icon={<ImageIcon className="h-4 w-4"/>}
                    description="Uploaded images"
                    href="/admin/images"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Catogies"
                    value={currentData?.totalCategories || 'Loading...'}
                    icon={<QrCodeIcon className="h-4 w-4"/>}
                    description="Total catogies"
                    href="/admin/categories"
                    isLoading={isLoading}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/users">Manage Users</Link>
                        <Link href="/admin/courses">Manage Courses</Link>
                        <Link href="/admin/payments">View Payments</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
