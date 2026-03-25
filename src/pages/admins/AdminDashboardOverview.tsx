'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {BookOpen, DollarSign, Image as ImageIcon, UserCheck, Users, Video} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from "@/components/commons/Link.tsx";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    description?: string;
    href: string;
}

function StatCard({title, value, icon, description, href}: StatCardProps) {
    return (
        <Link href={href}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
        </Link>
    );
}

export default function AdminDashboardOverview() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome to the admin panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    title="Total Users"
                    value="2,543"
                    icon={<Users className="h-4 w-4"/>}
                    description="Active user accounts"
                    href="/admin/users"
                />
                <StatCard
                    title="Courses"
                    value="124"
                    icon={<BookOpen className="h-4 w-4"/>}
                    description="Published courses"
                    href="/admin/courses"
                />
                <StatCard
                    title="Videos"
                    value="856"
                    icon={<Video className="h-4 w-4"/>}
                    description="Total videos"
                    href="/admin/videos"
                />
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    icon={<DollarSign className="h-4 w-4"/>}
                    description="Completed payments"
                    href="/admin/payments"
                />
                <StatCard
                    title="Enrollments"
                    value="3,234"
                    icon={<UserCheck className="h-4 w-4"/>}
                    description="Active enrollments"
                    href="/admin/enrollments"
                />
                <StatCard
                    title="Images"
                    value="892"
                    icon={<ImageIcon className="h-4 w-4"/>}
                    description="Uploaded images"
                    href="/admin/images"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="w-full">
                            <Link href="/admin/users">Manage Users</Link>
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Link href="/admin/courses">Manage Courses</Link>
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Link href="/admin/payments">View Payments</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
