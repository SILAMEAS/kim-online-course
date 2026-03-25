import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Edit2, Plus, Trash2} from 'lucide-react';
import {CourseResponse, CreateCourseRequest, useListAllCoursesQuery} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {AddEditCourseDialog} from "@/pages/admin/courses/modal/add-edit-course-dialog.tsx";
import DeleteCourseDialog from "@/pages/admin/courses/modal/delete-course-dialog.tsx";


export default function AdminCoursesPage() {
    const {currentData, refetch} = useListAllCoursesQuery(DefaultPaginationRequest);
    const courses = currentData?.contents || [];
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedCourse, setSelectedCourse] = React.useState<CourseResponse | null>(null);


    const handleEdit = (course: CourseResponse) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleDeleteClick = (course: CourseResponse) => {
        if (course) {
            setSelectedCourse(course);
            setDeleteOpen(true);

        }
    };


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

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>${course?.price?.toFixed(2) ?? 0}</TableCell>
                                    <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {course.status}
                    </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(course as CreateCourseRequest)}
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600"
                                            onClick={() => handleDeleteClick(course as CreateCourseRequest)}
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <AddEditCourseDialog open={open} onOpenChange={setOpen} selectedCourse={selectedCourse}
                                 handleSuccess={() => {
                                     refetch();
                                     setOpen(false);
                                     setSelectedCourse(null);
                                 }}/>

            {/* Delete Confirmation Dialog */}
            <DeleteCourseDialog
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                courseToDelete={selectedCourse}
                handleSuccess={() => {
                    refetch();
                    setDeleteOpen(false);
                    setSelectedCourse(null)
                }}
            />

        </div>
    );
}
