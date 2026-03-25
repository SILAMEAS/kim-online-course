import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Edit2, Plus, Trash2} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';

const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    instructorId: z.string().min(1, 'Instructor is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.coerce.number().min(0, 'Price must be positive'),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

type CourseFormData = z.infer<typeof courseSchema>;

const mockCourses = [
    {
        id: '1',
        title: 'React Advanced Patterns',
        instructorId: '1',
        category: 'Web Development',
        price: 99.99,
        status: 'PUBLISHED',
    },
    {
        id: '2',
        title: 'Next.js Full Stack',
        instructorId: '1',
        category: 'Web Development',
        price: 149.99,
        status: 'PUBLISHED',
    },
];

const mockInstructors = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Jane Smith'},
];

export default function AdminCoursesPage() {
    const [courses, setCourses] = React.useState(mockCourses);
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedCourse, setSelectedCourse] = React.useState<typeof mockCourses[0] | null>(null);
    const [courseToDelete, setCourseToDelete] = React.useState<typeof mockCourses[0] | null>(null);

    const form = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            instructorId: '',
            category: '',
            price: 0,
            status: 'DRAFT',
        },
    });

    React.useEffect(() => {
        if (selectedCourse) {
            form.reset({
                title: selectedCourse.title,
                instructorId: selectedCourse.instructorId,
                category: selectedCourse.category,
                price: selectedCourse.price,
                status: selectedCourse.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
            });
        } else {
            form.reset({
                title: '',
                instructorId: '',
                category: '',
                price: 0,
                status: 'DRAFT',
            });
        }
    }, [selectedCourse, form]);

    const onSubmit = (data: CourseFormData) => {
        if (selectedCourse) {
            setCourses(
                courses.map((course) =>
                    course.id === selectedCourse.id ? {...course, ...data} : course
                )
            );
        } else {
            const newCourse = {
                id: Date.now().toString(),
                ...data,
            };
            setCourses([...courses, newCourse]);
        }
        setOpen(false);
        setSelectedCourse(null);
        form.reset();
    };

    const handleEdit = (course: typeof mockCourses[0]) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleDeleteClick = (course: typeof mockCourses[0]) => {
        setCourseToDelete(course);
        setDeleteOpen(true);
    };

    const handleDelete = () => {
        if (courseToDelete) {
            setCourses(courses.filter((course) => course.id !== courseToDelete.id));
            setDeleteOpen(false);
            setCourseToDelete(null);
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
                                    <TableCell>${course.price.toFixed(2)}</TableCell>
                                    <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {course.status}
                    </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(course)}
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600"
                                            onClick={() => handleDeleteClick(course)}
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedCourse ? 'Edit Course' : 'Add New Course'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedCourse
                                ? 'Update course information'
                                : 'Create a new course'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Course Title" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="instructorId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Instructor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an instructor"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mockInstructors.map((instructor) => (
                                                    <SelectItem key={instructor.id} value={instructor.id}>
                                                        {instructor.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Web Development" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="99.99" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="DRAFT">Draft</SelectItem>
                                                <SelectItem value="PUBLISHED">Published</SelectItem>
                                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {selectedCourse ? 'Update' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{courseToDelete?.title}"? This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
