import { Link } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";
import { MOCK_COURSES } from "@/lib/data/courses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookMarked, ArrowRight } from "lucide-react";

export default function MyCoursesPage() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const enrolledCourseIds = currentUser?.enrolled_courses || [];

  // Get enrolled courses
  const enrolledCourses = MOCK_COURSES.filter((course) =>
    enrolledCourseIds.includes(course.id),
  );

  // Mock progress data
  const courseProgress: Record<string, number> = {
    "1": 45,
    "2": 20,
    "3": 90,
    "4": 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">My Courses</h1>
        <p className="text-foreground/60">
          {enrolledCourses.length} course
          {enrolledCourses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <Card className="p-12 border border-border text-center">
          <BookMarked className="w-16 h-16 mx-auto text-foreground/30 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No courses yet</h2>
          <p className="text-foreground/60 mb-6">
            Start learning by enrolling in your first course
          </p>
          <Link to="/courses">
            <Button size="lg">
              Browse Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((course) => {
            const progress = courseProgress[course.id] || 0;
            return (
              <Card
                key={course.id}
                className="p-6 border border-border hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full md:w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-3">
                        by {course.instructor.name}
                      </p>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-foreground/60">
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>

                    {/* Button */}
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        {progress === 100 ? "Review" : "Continue Learning"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
