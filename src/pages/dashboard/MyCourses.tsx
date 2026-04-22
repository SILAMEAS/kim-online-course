import {Link} from "react-router-dom";
import {useAppSelector} from "@/lib/redux/hooks";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ArrowRight, BookMarked, Loader} from "lucide-react";
import {
    CourseResponse,
    useListAllCoursesQuery,
    useListAllCoursesStudentEnrollmentQuery
} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";
import {cn} from "@/lib/utils.ts";
import {CustomTable, MODE_TABLE} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

export default function MyCoursesPage() {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const {t} = useTranslation();
    const {
        setFilter,
        filter,
    } = useCustomTable<CourseResponse>();
    const {
        currentData: currentDataStudent,
        isLoading: isLoadingStudent
    } = useListAllCoursesStudentEnrollmentQuery({
        ...filter,
        id: Number(currentUser?.id)
    }, {skip: !currentUser?.id || currentUser?.role !== EnumRole.STUDENT})
    const {currentData: currentDataTeacher, isLoading: isLoadingTeacher} = useListAllCoursesQuery({
        ...filter,
        instructorId: Number(currentUser?.id)
    }, {skip: !currentUser?.id || currentUser?.role !== EnumRole.INSTRUCTOR})
    const enrolledCourse = (currentUser?.role === EnumRole.STUDENT ? currentDataStudent?.contents : currentDataTeacher?.contents) ?? [];

    const isTeacher = currentUser?.role === EnumRole.INSTRUCTOR;

    const isLoading = isLoadingStudent || isLoadingTeacher;
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader/>
        </div>
    }
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2">{`${t(Localization("cart_page","my_course"))} ${isTeacher ? t(Localization("cart_page","to_teach")) : ""}`}</h1>
                <p className={cn("text-foreground/60", isTeacher && "hidden")}>
                    {t(Localization("cart_page", "enrollment_count"), {number: enrolledCourse?.length})}
                </p>
            </div>

            {enrolledCourse?.length === 0 ? (
                <Card className="p-12 border border-border text-center">
                    <BookMarked className="w-16 h-16 mx-auto text-foreground/30 mb-4"/>
                    <h2 className="text-2xl font-semibold mb-2"> {t(Localization("cart_page","empty_state_title"))}</h2>
                    <p className="text-foreground/60 mb-6">
                        {t(Localization("cart_page","empty_state_subtitle"))}
                    </p>
                    <Link to="/courses">
                        <Button size="lg">
                            {t(Localization("footer","browse_course"))}
                            <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    </Link>
                </Card>
            ) : (
                <CustomTable<CourseResponse>
                    setFilter={setFilter}
                    filter={filter}
                    data={enrolledCourse}
                    pagination={{
                        page: filter.page,
                        limit: filter.limit,
                        total: currentDataStudent?.total ?? currentDataTeacher?.total ?? 0
                    }}
                    isLoading={isLoadingStudent || isLoadingTeacher}
                    mode={MODE_TABLE.GRID}
                    customRenderModeContent={(course => <Card
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
                                        {t(Localization("profile", isTeacher ? "continue_teaching" : "continue_learning"))}
                                        <ArrowRight className="w-4 h-4"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>)}

                />
            )}
        </div>
    );
}

