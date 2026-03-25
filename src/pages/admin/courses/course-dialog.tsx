'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type CourseFormData, courseSchema} from '@/lib/v0/schemas';
import {createCourse, updateCourse, useUsers} from '@/lib/v0/api-hooks';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

interface CourseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    course?: any;
    onSuccess: () => void;
    onClose: () => void;
}

export function CourseDialog({
                                 open,
                                 onOpenChange,
                                 course,
                                 onSuccess
                             }: Readonly<CourseDialogProps>) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {users} = useUsers();

    const form = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: course || {
            title: '',
            description: '',
            instructorId: '',
            category: '',
            price: 0,
            status: 'DRAFT',
        },
    });

    React.useEffect(() => {
        if (course) {
            form.reset(course);
        } else {
            form.reset({
                title: '',
                description: '',
                instructorId: '',
                category: '',
                price: 0,
                status: 'DRAFT',
            });
        }
    }, [course, open, form]);

    const onSubmit = async (data: CourseFormData) => {
        setIsSubmitting(true);
        try {
            if (course?.id) {
                await updateCourse(course.id, data);
            } else {
                await createCourse(data);
            }
            onSuccess();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const instructors = users.filter((u: any) => u.role === 'INSTRUCTOR');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{course ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                    <DialogDescription>
                        {course ? 'Update course information' : 'Create a new course'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter course title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Course description" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="instructorId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Instructor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select instructor"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {instructors.map((instructor: any) => (
                                                    <SelectItem key={instructor.id} value={instructor.id}>
                                                        {instructor.firstName} {instructor.lastName}
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="99.99" {...field} />
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
                                                    <SelectValue/>
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
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {course ? 'Update Course' : 'Create Course'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
