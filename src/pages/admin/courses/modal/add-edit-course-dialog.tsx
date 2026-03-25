import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Loader2} from 'lucide-react';
import {
    CourseResponse,
    CreateCourseRequest,
    useCreateCourseMutation,
    useListTeachersQuery
} from "@/lib/api/api.generated.ts";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateCourseApiArgSchema} from "@/lib/validations/schemas.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";

interface CourseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedCourse: CourseResponse | null;
    handleSuccess: () => void
}

enum CategoryStatus {
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
    DATA_SCIENCE = "DATA_SCIENCE",
    DESIGN = "DESIGN",
    MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
    CLOUD_COMPUTING = "CLOUD_COMPUTING",
    DEV_OPS = "DEV_OPS",
    BUSINESS = "BUSINESS",
}

const categoryLabels: Record<CategoryStatus, string> = {
    WEB_DEVELOPMENT: "Web Development",
    DATA_SCIENCE: "Data Science",
    DESIGN: "Design",
    MOBILE_DEVELOPMENT: "Mobile Development",
    CLOUD_COMPUTING: "Cloud Computing",
    DEV_OPS: "DevOps",
    BUSINESS: "Business",
};


export function AddEditCourseDialog({
                                        open,
                                        onOpenChange,
                                        selectedCourse,
                                        handleSuccess
                                    }: Readonly<CourseDialogProps>) {
    const [preview, setPreview] = useState<string | null>(null);
    const listTeachersQuery = useListTeachersQuery(DefaultPaginationRequest);
    const teachers = listTeachersQuery.currentData?.contents || [];
    const [addCourse] = useCreateCourseMutation();

    const form = useForm<CreateCourseRequest>({
        resolver: zodResolver(CreateCourseApiArgSchema),
    });

    React.useEffect(() => {
        if (selectedCourse) {
            form.reset({
                title: selectedCourse.title,
                instructorId: selectedCourse?.instructor?.id ?? undefined,
                category: selectedCourse.category,
                price: selectedCourse.price,
                status: selectedCourse.status,
                description: selectedCourse.description,
                level: selectedCourse.level,
                file: selectedCourse.imageUrl
            });
            selectedCourse.imageUrl && setPreview(selectedCourse.imageUrl)
        } else {
            form.reset({
                title: "New Course",
                file: "",
                category: "WEB_DEVELOPMENT",
                description: "new description of the course",
                instructorId: undefined,
                level: "BEGINNER",
                price: 10,
                status: "PUBLISHED",
            });
            setPreview(null)
        }
    }, [selectedCourse, form]);


    const handleSelectTeachers = () => {
        if (listTeachersQuery?.isLoading) {
            return <option disabled>Loading...</option>
        }
        if (teachers.length === 0) {
            return <option disabled>No teachers found</option>
        }
        return teachers.map((t) => (
            <option key={t.id} value={t.id}>
                {t.firstName} {t.lastName}
            </option>
        ))
    }


    async function onSubmit(data: CreateCourseRequest) {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", String(data.price));
            formData.append("status", data.status);
            formData.append("level", data.level);
            formData.append("instructorId", String(data.instructorId));
            formData.append("category", data.category);

            const file = data.file;

            if (file instanceof File) {
                formData.append("file", file);
            }
            await addCourse(formData as any).unwrap();

            toast.success("Course created successfully!");
            form.reset();
            setPreview(null); // ✅ reset preview
            handleSuccess();

        } catch (error) {
            toast.error("failed to create course. Please try again :" + (error as any)?.data?.message);
        }
    }


    return (
        <Dialog open={open} onOpenChange={() => {
            onOpenChange(false);
            form.reset();
        }}>
            <DialogContent className="max-w-2xl ">
                <DialogHeader>
                    <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                    <DialogDescription>
                        {selectedCourse ? 'Update course information' : 'Create a new course'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        // 🔍 Debugging: Log validation errors if submission fails
                        console.error("Form Validation Failed:", errors);
                        toast.error("Please check the form for errors.");
                    })} className="space-y-4">
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
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            >
                                                <option value="">Select teacher</option>
                                                {handleSelectTeachers()}
                                            </select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <select {...field}
                                                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                                <option value="">Select category</option>
                                                {Object.values(CategoryStatus).map((c) => (
                                                    <option key={c} value={c}>
                                                        {categoryLabels[c]}
                                                    </option>
                                                ))}
                                            </select>
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
                        {/* File Upload */}
                        <FormField
                            control={form.control}
                            name="file"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (!file) return;

                                                field.onChange(file);

                                                const reader =
                                                    new FileReader();
                                                reader.onloadend = () => {
                                                    setPreview(
                                                        reader.result as string
                                                    );
                                                };
                                                reader.readAsDataURL(file);
                                            }}
                                        />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* PREVIEW */}
                        {preview && (
                            <img
                                src={preview}
                                className="w-48 h-32 object-cover rounded-md border"
                                alt={preview}/>
                        )}
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {selectedCourse ? 'Update Course' : 'Create Course'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
