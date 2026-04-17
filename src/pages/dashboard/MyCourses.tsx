import {Link} from "react-router-dom";
import {useAppSelector} from "@/lib/redux/hooks";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ArrowRight, BookMarked} from "lucide-react";
import {useListAllCoursesQuery, useListAllCoursesStudentEnrollmentQuery} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";
import {cn} from "@/lib/utils.ts";

export default function MyCoursesPage() {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const {currentData: currentDataStudent} = useListAllCoursesStudentEnrollmentQuery({id: Number(currentUser?.id)}, {skip: !currentUser?.id || currentUser?.role !== EnumRole.STUDENT})
    const {currentData: currentDataTeacher} = useListAllCoursesQuery({instructorId: Number(currentUser?.id)}, {skip: !currentUser?.id || currentUser?.role !== EnumRole.INSTRUCTOR})
    const enrolledCourse = (currentUser?.role === EnumRole.STUDENT ? currentDataStudent?.contents : currentDataTeacher?.contents) ?? [];

    const isTeacher = currentUser?.role === EnumRole.INSTRUCTOR;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2">{`My Courses ${isTeacher ? "to teach.":""}`}</h1>
                <p className={cn("text-foreground/60",isTeacher&&"hidden")}>
                    {`You have ${enrolledCourse?.length} course(s) enrolled.`}
                </p>
            </div>

            {enrolledCourse?.length === 0 ? (
                <Card className="p-12 border border-border text-center">
                    <BookMarked className="w-16 h-16 mx-auto text-foreground/30 mb-4"/>
                    <h2 className="text-2xl font-semibold mb-2">No courses yet</h2>
                    <p className="text-foreground/60 mb-6">
                        Start learning by enrolling in your first course
                    </p>
                    <Link to="/courses">
                        <Button size="lg">
                            Browse Courses
                            <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {enrolledCourse?.map((course) => {
                        return (
                            <Card
                                key={course.id}
                                className="p-6 border border-border hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <div
                                        className="relative w-full md:w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                        <img
                                            src={course.imageUrl}
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
                                                by {course.instructor.firstName} {course.instructor.lastName}
                                            </p>

                                        </div>

                                        {/* Button */}
                                        <Link to={`/courses/${course.id}`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                Continue {isTeacher ? "Teaching" : "Learning"}
                                                <ArrowRight className="w-4 h-4"/>
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
