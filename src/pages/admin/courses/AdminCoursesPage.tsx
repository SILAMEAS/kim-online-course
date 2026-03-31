import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {CourseResponse, useDeleteCourseByIdMutation, useListAllCoursesQuery} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {AddEditCourseDialog} from "@/pages/admin/courses/add-edit-course-dialog.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {toast} from "sonner";


export default function AdminCoursesPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit
    } = useCustomTable<CourseResponse>();
    const {currentData, refetch} = useListAllCoursesQuery({...DefaultPaginationRequest, sortBy, page, limit});
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
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {key: 'category', label: 'Category', sortable: true},
                    {key: 'price', label: 'Price', sortable: true},
                    {key: 'status', label: 'Status', sortable: true},
                ]}
                data={courses}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => {
                    setSortBy(key);
                    setSortDirection(dir);
                }}
                pagination={{page, limit, total: currentData?.total ?? 0}}
                onPageChange={setPage}
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
                isLoading={false}
                isDeleting={resultDeleteCourse.isLoading}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
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
