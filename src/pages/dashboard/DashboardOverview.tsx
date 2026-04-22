import {useAppSelector} from "@/lib/redux/hooks";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {BookMarked} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useListAllCoursesStudentEnrollmentQuery} from "@/lib/api/api.generated.ts";
import {useEffect} from "react";
import {EnumRole} from "@/lib/enum.ts";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

export default function DashboardOverview() {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const {currentData} = useListAllCoursesStudentEnrollmentQuery({id: Number(currentUser?.id)}, {skip: !currentUser?.id});
    const navigate = useNavigate();
    const {t} = useTranslation();
    const stats = [
        {
            id: "courseTotal",
            label: t(Localization("profile_details", "courses_enrolled")),
            value: currentData?.total ?? 0,
            icon: BookMarked,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        }
    ];
    useEffect(() => {
        if (currentUser?.role !== EnumRole.STUDENT) {
            console.log("redirecting to instructor dashboard")
            navigate('/dashboard/my-courses')
        }

    }, [])

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-xl font-bold mb-2">
                    {t(Localization("loginPage", "welcome"))}, {currentUser?.name}!
                </h1>
                <p className="text-foreground/60">
                    {t(Localization("profile", "keep_learning"))}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.id} className="p-6 border border-border">
                            <div
                                className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}
                            >
                                <Icon className={`w-6 h-6 ${stat.color}`}/>
                            </div>
                            <p className="text-sm text-foreground/60 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border border-border">
                    <h3 className="text-xl font-semibold mb-2">{t(Localization("course", "continue_learning"))}</h3>
                    <p className="text-foreground/60 mb-4">
                        {currentData?.total && (currentData?.total > 0)
                            ? "Pick up where you left off"
                            : "Start your first course today"}
                    </p>
                    <Link to="/dashboard/my-courses">
                        <Button>{t(Localization("course", "view_my_courses"))}</Button>
                    </Link>
                </Card>

                <Card className="p-6 border border-border">
                    <h3 className="text-xl font-semibold mb-2">{t(Localization("course", "explore_more_courses"))}</h3>
                    <p className="text-foreground/60 mb-4">
                        {t(Localization("course", "discover_new_skill"))}
                    </p>
                    <Link to="/courses">
                        <Button variant="outline">{t(Localization("footer", "browse_course"))}</Button>
                    </Link>
                </Card>
            </div>

        </div>
    );
}
