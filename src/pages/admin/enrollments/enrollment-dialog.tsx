

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type EnrollmentFormData, enrollmentSchema} from '@/lib/v0/schemas';
import {createEnrollment, updateEnrollment, useCourses, useUsers} from '@/lib/v0/api-hooks';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

interface EnrollmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    enrollment?: any;
    onSuccess: () => void;
    onClose: () => void;
}

export function EnrollmentDialog({
                                     open,
                                     onOpenChange,
                                     enrollment,
                                     onSuccess,
                                 }: Readonly<EnrollmentDialogProps>) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {users} = useUsers();
    const {courses} = useCourses();

    const form = useForm<EnrollmentFormData>({
        resolver: zodResolver(enrollmentSchema),
        defaultValues: enrollment || {
            userId: '',
            courseId: '',
            status: 'ACTIVE',
        },
    });

    React.useEffect(() => {
        if (enrollment) {
            form.reset(enrollment);
        } else {
            form.reset({
                userId: '',
                courseId: '',
                status: 'ACTIVE',
            });
        }
    }, [enrollment, open, form]);

    const onSubmit = async (data: EnrollmentFormData) => {
        setIsSubmitting(true);
        try {
            if (enrollment?.id) {
                await updateEnrollment(enrollment.id, data);
            } else {
                await createEnrollment(data);
            }
            onSuccess();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{enrollment ? 'Edit Enrollment' : 'Add New Enrollment'}</DialogTitle>
                    <DialogDescription>
                        {enrollment ? 'Update enrollment information' : 'Enroll a student in a course'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Student</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select student"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {users
                                                    .filter((u: any) => u.role === 'STUDENT')
                                                    .map((user: any) => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.firstName} {user.lastName}
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
                                                    <SelectValue placeholder="Select course"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courses.map((course: any) => (
                                                    <SelectItem key={course.id} value={course.id}>
                                                        {course.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue/>
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

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {enrollment ? 'Update Enrollment' : 'Create Enrollment'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
