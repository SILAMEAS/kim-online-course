import {useParams} from "react-router-dom";
import {Navbar} from "@/components/navbar.tsx";
import {Footer} from "@/components/footer.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {BookMarked, Clock, ShoppingCart, Star, User, Users} from "lucide-react";
import {
    useGetAllEnrollmentsByCourseQuery,
    useGetCourseDetailQuery,
    useGetVideosByCourseIdQuery,
    useListStudentInCourseQuery,
    UserResponse
} from "@/lib/api/api.generated.ts";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {AddReviewForm} from "@/components/course/add-review-form.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/redux/store.ts";
import {EnumRole} from "@/lib/enum.ts";
import {Button} from "@/components/ui/button.tsx";
import {CourseCurriculum} from "@/components/course/course-curriculum.tsx";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {formatDurationVideo} from "@/lib/utils/formatDurationVideo.ts";
import {useAppDispatch} from "@/lib/redux/hooks.ts";
import {addToCart} from "@/lib/redux/slices/cart.slice.ts";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

export default function CourseDetailPage() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const {id: courseId} = useParams<{ id: string }>();

    const courseDetailQuery = useGetCourseDetailQuery({courseId: Number(courseId)}, {skip: !courseId});
    const enrollmentsByCourseQuery = useGetAllEnrollmentsByCourseQuery({courseId: Number(courseId)}, {skip: !courseDetailQuery?.currentData?.id || currentUser?.role !== EnumRole.STUDENT});
    const videosByCourseIdQuery = useGetVideosByCourseIdQuery({
        ...DefaultPaginationRequest,
        courseId: Number(courseId)
    }, {skip: !currentUser})
    const hasBeenEnrollments = enrollmentsByCourseQuery?.currentData?.contents?.find(d => d.course?.id === Number(courseId))
    const {
        setFilter, filter,
    } = useCustomTable<UserResponse>();
    const [modalStudent, setModalStudent] = useState<boolean>(false);
    const studentInCourseQuery = useListStudentInCourseQuery({
        ...filter,
        courseId: Number(courseId)
    }, {skip: !courseId || currentUser?.role === EnumRole.STUDENT || !modalStudent});


    if ((courseDetailQuery?.isLoading || courseDetailQuery?.isFetching) && !courseDetailQuery?.currentData) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-12">
                    <p className="text-center text-foreground/60">
                        Loading course details...
                    </p>
                </main>
                <Footer/>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                {/* Hero Section */}
                <section
                    className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                        src={courseDetailQuery?.currentData?.imageUrl}
                        alt={`${courseDetailQuery?.currentData?.title}`}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40"/>
                </section>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header */}
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <Badge>{courseDetailQuery?.currentData?.category?.name}</Badge>
                                    <Badge variant="secondary">{courseDetailQuery?.currentData?.level}</Badge>
                                </div>
                                <h1 className="text-xl md:text-4xl font-bold mb-4">
                                    {courseDetailQuery?.currentData?.title}
                                </h1>
                                <p className="text-lg text-foreground/70 mb-6">
                                    {courseDetailQuery?.currentData?.description}
                                </p>

                                {/* Metadata */}
                                <div className="flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                                        <span className="font-semibold">
                      {courseDetailQuery?.currentData?.rating}
                    </span>
                                        <span className="text-foreground/60">
                      ({courseDetailQuery?.currentData?.reviewsCount}) {t(Localization("course_detail","reviews"))}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4"/>
                                        <span>
                          {courseDetailQuery?.currentData?.studentsCount} {t(Localization("course_detail","students"))}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4"/>
                                        <span>{formatDurationVideo(Number(courseDetailQuery?.currentData?.duration))}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">{t(Localization("tableHeaders", "instructor"))}</h3>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={courseDetailQuery?.currentData?.instructor?.imageUrl}
                                            alt={`${courseDetailQuery?.currentData?.instructor?.imageUrl}`}
                                        />
                                        <AvatarFallback>
                                            {courseDetailQuery?.currentData?.instructor?.firstName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">
                                            {`${courseDetailQuery?.currentData?.instructor?.firstName} ${courseDetailQuery?.currentData?.instructor?.lastName}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Curriculum */}
                            {
                                videosByCourseIdQuery?.currentData?.contents && videosByCourseIdQuery?.currentData?.contents?.length > 0 &&
                                <CourseCurriculum curriculum={videosByCourseIdQuery?.currentData?.contents}/>
                            }


                            {/* Reviews */}

                            <div className="space-y-6">
                                <AddReviewForm courseId={String(courseId)} onSuccess={() => {
                                    courseDetailQuery?.refetch();

                                }}/>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-card border border-border rounded-lg overflow-hidden">
                                <div className="relative w-full h-48 bg-secondary">
                                    <img
                                        src={courseDetailQuery?.currentData?.imageUrl}
                                        alt={`${courseDetailQuery?.currentData?.imageUrl}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6 space-y-6">
                                    <div>
                                        <p className="text-3xl font-bold text-primary mb-2">
                                            ${courseDetailQuery?.currentData?.price?.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-foreground/60">
                                            {t(Localization("course_detail","one_time_payment"))}

                                        </p>
                                    </div>

                                    {hasBeenEnrollments ? (
                                        <Button className="w-full" disabled>
                                            <BookMarked className="w-4 h-4 mr-2"/>
                                            {t(Localization("course_detail","already_enrolled"))}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            disabled={currentUser?.role !== EnumRole.STUDENT}
                                            className="w-full gap-2"
                                            onClick={async () => {

                                                courseId &&
                                                courseDetailQuery?.currentData?.title &&
                                                courseDetailQuery?.currentData?.imageUrl &&
                                                courseDetailQuery?.currentData?.price &&
                                                courseDetailQuery?.currentData?.instructor?.firstName &&
                                                dispatch(addToCart({
                                                    course_id: courseId,
                                                    course_title: courseDetailQuery?.currentData?.title,
                                                    id: courseId,
                                                    price: courseDetailQuery?.currentData?.price,
                                                    image: courseDetailQuery?.currentData?.imageUrl,
                                                    instructor_name: courseDetailQuery?.currentData?.instructor?.firstName,
                                                }))

                                            }}

                                        >
                                            <ShoppingCart className="w-4 h-4"/>

                                        </Button>
                                    )}

                                    {
                                        currentUser?.role !== EnumRole.STUDENT &&currentUser&&
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => setModalStudent(true)}
                                        >
                                            <User className="w-4 h-4"/>
                                            <span>{t(Localization("course_detail","view_students"))}</span>
                                        </Button>
                                    }

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary"/>
                                            <span>{formatDurationVideo(Number(courseDetailQuery?.currentData?.duration))} {t(Localization("course_detail","content_duration"))}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary"/>
                                            <span>{t(Localization("course_detail","certificate_of_completion"))}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary"/>
                                            <span>{t(Localization("course_detail","access_on_mobile_and_desktop"))}</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <p className="text-xs text-foreground/60 text-center">
                                            {t(Localization("course_detail","money_back_guarantee"))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

            <AlertDialog open={modalStudent} onOpenChange={() => {
                setModalStudent(false)
            }}>
                <AlertDialogContent className="w-[90vw] max-w-6xl">
                    <AlertDialogTitle>{t(Localization("course_detail","list_student"))}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <CustomTable<UserResponse>
                            setFilter={setFilter}
                            filter={filter}
                            columns={[
                                {key: 'firstName', label: 'FirstName', sortable: false},
                                {key: 'lastName', label: 'LastName', sortable: false},
                                {key: 'email', label: 'Email', sortable: false},
                            ]}
                            data={studentInCourseQuery?.currentData?.contents ?? []}
                            pagination={{
                                page: filter.page,
                                limit: filter.limit,
                                total: studentInCourseQuery?.currentData?.total ?? 0
                            }}
                            isLoading={studentInCourseQuery.isLoading}
                        />
                    </AlertDialogDescription>

                    <div className="flex justify-end gap-3">
                        <AlertDialogCancel>Back</AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
