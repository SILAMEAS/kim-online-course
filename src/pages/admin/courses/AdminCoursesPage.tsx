import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {
    Category,
    CourseResponse,
    useDeleteCourseByIdMutation,
    useListAllCoursesQuery
} from "@/lib/api/api.generated.ts";
import {AddEditCourseDialog} from "@/pages/admin/courses/add-edit-course-dialog.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {toast} from "sonner";
import {formatDurationVideo} from "@/lib/utils/formatDurationVideo.ts";


export default function AdminCoursesPage() {
    const {
        filter,
        setFilter,
    } = useCustomTable<CourseResponse>();
    const {
        currentData,
        refetch,
        isLoading,
        isFetching
    } = useListAllCoursesQuery(filter, {refetchOnMountOrArgChange: true,});
    const courses = currentData?.contents || [];
    const [open, setOpen] = React.useState(false);
    const [deleteCourse, resultDeleteCourse] = useDeleteCourseByIdMutation();
    const [selectedCourse, setSelectedCourse] = React.useState<CourseResponse | null>(null);

    const handleAdd = () => {
        setSelectedCourse(null);
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <p className="text-muted-foreground mt-1">Manage all courses</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Course
                </Button>
            </div>

            <CustomTable<CourseResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {
                        key: 'category', label: 'Category', sortable: true, render: (r) => {
                            return <p>{(r as Category)?.name}</p>
                        }
                    },
                    {key: 'price', label: 'Price', sortable: true},
                    {
                        key: 'duration', label: 'Duration', sortable: false, render: (r) => {
                            return <p>{formatDurationVideo(Number(r))}</p>
                        }
                    },
                    {
                        key: 'studentsCount', label: 'Students', sortable: false, render: (r) => {
                            return <p>{Number(r)}</p>
                        }
                    },
                    {key: 'status', label: 'Status', sortable: true},
                ]}
                data={courses}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                onEdit={async (course) => {
                    setSelectedCourse(course);
                    setOpen(true);
                }}
                onDelete={async (course) => {
                    try {
                        if (course?.id) {
                            await deleteCourse({courseId: course.id}).unwrap();

                        }
                    } catch (e: any) {
                        if (e?.originalStatus !== 200) {
                            toast.error("Failed to delete course. Please try again later." + e?.data?.message);
                        }
                        toast.success("success to delete course");
                        refetch();
                    }
                }}
                isLoading={isLoading || isFetching}
                isDeleting={resultDeleteCourse.isLoading}

            />

            {/* Add/Edit Dialog */}
            <AddEditCourseDialog open={open} onOpenChange={setOpen} selectedCourse={selectedCourse}
                                 handleSuccess={() => {
                                     refetch();
                                     setOpen(false);
                                     setSelectedCourse(null);
                                 }}/>

        </div>
    );
}
