import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {CourseResponse, useDeleteCourseByIdMutation, useListAllCoursesQuery} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {AddEditCourseDialog} from "@/pages/admin/courses/modal/add-edit-course-dialog.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/useCustomTable.tsx";
import {toast} from "sonner";


export default function AdminCoursesPage() {
    const {currentData, refetch} = useListAllCoursesQuery(DefaultPaginationRequest);
    const courses = currentData?.contents || [];
    const [open, setOpen] = React.useState(false);
    const [deleteCourse] = useDeleteCourseByIdMutation();
    const [selectedCourse, setSelectedCourse] = React.useState<CourseResponse | null>(null);
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection
    } = useCustomTable<CourseResponse>();

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
                    // {key: 'id', label: 'ID', sortable: true},
                    {key: 'title', label: 'Title', sortable: true},
                    {key: 'category', label: 'First Name', sortable: true},
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
                pagination={{page, limit}}
                onPageChange={setPage}
                onEdit={(course) => {
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
