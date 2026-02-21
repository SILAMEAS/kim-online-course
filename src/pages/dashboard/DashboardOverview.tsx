import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookMarked, Award, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const enrolledCourses = currentUser?.enrolled_courses || [];
  const certificates = currentUser?.certificates || [];

  const stats = [
    {
      label: "Courses Enrolled",
      value: enrolledCourses.length,
      icon: BookMarked,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Certificates Earned",
      value: certificates.length,
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Hours Completed",
      value: enrolledCourses.length * 10,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Learning Streak",
      value: "7 days",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-foreground/60">
          Keep up your learning momentum and continue growing
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border border-border">
              <div
                className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-6 h-6 ${stat.color}`} />
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
          <h3 className="text-xl font-semibold mb-2">Continue Learning</h3>
          <p className="text-foreground/60 mb-4">
            {enrolledCourses.length > 0
              ? "Pick up where you left off"
              : "Start your first course today"}
          </p>
          <Link to="/dashboard/my-courses">
            <Button>View My Courses</Button>
          </Link>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-xl font-semibold mb-2">Explore More Courses</h3>
          <p className="text-foreground/60 mb-4">
            Discover new skills and expand your knowledge
          </p>
          <Link to="/courses">
            <Button variant="outline">Browse Courses</Button>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border border-border">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3 text-sm text-foreground/60">
          <p>✓ Completed lesson in React: The Complete Guide</p>
          <p>✓ Earned certificate in Web Design Fundamentals</p>
          <p>✓ Started learning Node.js and Express.js</p>
          <p>✓ Left a 5-star review on Python for Data Science</p>
        </div>
      </Card>
    </div>
  );
}
