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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';

const enrollmentSchema = z.object({
    userId: z.string().min(1, 'User is required'),
    courseId: z.string().min(1, 'Course is required'),
    status: z.enum(['ACTIVE', 'COMPLETED', 'DROPPED']),
    enrolledAt: z.string().min(1, 'Enrollment date is required'),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const mockEnrollments = [
    {
        id: '1',
        userId: '1',
        courseId: '1',
        status: 'ACTIVE',
        enrolledAt: '2024-01-15',
    },
    {
        id: '2',
        userId: '2',
        courseId: '2',
        status: 'COMPLETED',
        enrolledAt: '2023-11-20',
    },
    {
        id: '3',
        userId: '3',
        courseId: '1',
        status: 'ACTIVE',
        enrolledAt: '2024-02-10',
    },
];

const mockUsers = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Jane Smith'},
    {id: '3', name: 'Bob Johnson'},
];

const mockCourses = [
    {id: '1', name: 'React Advanced Patterns'},
    {id: '2', name: 'Next.js Full Stack'},
];

export default function AdminEnrollmentsPage() {
    const [enrollments, setEnrollments] = React.useState(mockEnrollments);
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = React.useState<typeof mockEnrollments[0] | null>(null);
    const [enrollmentToDelete, setEnrollmentToDelete] = React.useState<typeof mockEnrollments[0] | null>(null);

    const form = useForm<EnrollmentFormData>({
        resolver: zodResolver(enrollmentSchema),
        defaultValues: {
            userId: '',
            courseId: '',
            status: 'ACTIVE',
            enrolledAt: '',
        },
    });

    React.useEffect(() => {
        if (selectedEnrollment) {
            form.reset({
                userId: selectedEnrollment.userId,
                courseId: selectedEnrollment.courseId,
                status: selectedEnrollment.status as any,
                enrolledAt: selectedEnrollment.enrolledAt,
            });
        } else {
            form.reset({
                userId: '',
                courseId: '',
                status: 'ACTIVE',
                enrolledAt: new Date().toISOString().split('T')[0],
            });
        }
    }, [selectedEnrollment, form]);

    const onSubmit = (data: EnrollmentFormData) => {
        if (selectedEnrollment) {
            setEnrollments(
                enrollments.map((enrollment) =>
                    enrollment.id === selectedEnrollment.id ? {...enrollment, ...data} : enrollment
                )
            );
        } else {
            const newEnrollment = {
                id: Date.now().toString(),
                ...data,
            };
            setEnrollments([...enrollments, newEnrollment]);
        }
        setOpen(false);
        setSelectedEnrollment(null);
        form.reset();
    };

    const handleEdit = (enrollment: typeof mockEnrollments[0]) => {
        setSelectedEnrollment(enrollment);
        setOpen(true);
    };

    const handleDeleteClick = (enrollment: typeof mockEnrollments[0]) => {
        setEnrollmentToDelete(enrollment);
        setDeleteOpen(true);
    };

    const handleDelete = () => {
        if (enrollmentToDelete) {
            setEnrollments(enrollments.filter((enrollment) => enrollment.id !== enrollmentToDelete.id));
            setDeleteOpen(false);
            setEnrollmentToDelete(null);
        }
    };

    const handleAdd = () => {
        setSelectedEnrollment(null);
        setOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800';
            case 'DROPPED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Enrollments</h1>
                    <p className="text-muted-foreground mt-1">Manage student enrollments</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Enrollment
                </Button>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Enrolled At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enrollments.map((enrollment) => (
                                <TableRow key={enrollment.id}>
                                    <TableCell>{enrollment.userId}</TableCell>
                                    <TableCell>{enrollment.courseId}</TableCell>
                                    <TableCell>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                                    </TableCell>
                                    <TableCell>{new Date(enrollment.enrolledAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(enrollment)}
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600"
                                            onClick={() => handleDeleteClick(enrollment)}
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
                            {selectedEnrollment ? 'Edit Enrollment' : 'Add New Enrollment'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedEnrollment
                                ? 'Update enrollment information'
                                : 'Create a new enrollment'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>User</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a user"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mockUsers.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name}
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
                                name="courseId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a course"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mockCourses.map((course) => (
                                                    <SelectItem key={course.id} value={course.id}>
                                                        {course.name}
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
                                                <SelectItem value="ACTIVE">Active</SelectItem>
                                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                                <SelectItem value="DROPPED">Dropped</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="enrolledAt"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Enrolled At</FormLabel>
                                        <FormControl>
                                            <input
                                                type="date"
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {selectedEnrollment ? 'Update' : 'Create'}
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
                        <AlertDialogTitle>Delete Enrollment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this enrollment? This action cannot be
                            undone.
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
