import {Card} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {
    CreateCourseApiArg,
    CreateCourseRequest,
    useCreateCourseMutation,
    useListTeachersQuery
} from "@/lib/api/api.generated.ts";
import {CreateCourseApiArgSchema} from "@/lib/validations/schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";


/* ================= LABELS ================= */
enum CourseStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    PREPARE = "PREPARE",
}

enum LevelStatus {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCE = "ADVANCE",
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


// 2. Safe label maps (fully type-checked)
export const levelLabels = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCE: "Advance",
} satisfies Record<LevelStatus, string>;

export const statusLabels = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    PREPARE: "Prepare",
} satisfies Record<CourseStatus, string>;

/* ================= COMPONENT ================= */

export default function AdminCourse() {
    const listTeachersQuery = useListTeachersQuery(DefaultPaginationRequest);
    const [addCourse] = useCreateCourseMutation();
    const teachers = listTeachersQuery.currentData?.contents || [];

    const form = useForm<CreateCourseApiArg["createCourseRequest"]>({
        resolver: zodResolver(CreateCourseApiArgSchema),
        defaultValues: {
            title: "Test",
            file: "",
            category: "WEB_DEVELOPMENT",
            description: "description of the course",
            instructorId: 3,
            level: "BEGINNER",
            price: 10,
            status: "PUBLISHED"
        },
    });

    /* ================= SUBMIT ================= */

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
        } catch (error) {
            console.error(error);
            toast.error("Failed to create course.");
        }
    }


    /* ================= UI ================= */

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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2">Manage Course</h1>
                <p className="text-foreground/60">
                    Create a new course for your platform
                </p>
            </div>

            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">Create Course</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        // 🔍 Debugging: Log validation errors if submission fails
                        console.error("Form Validation Failed:", errors);
                        toast.error("Please check the form for errors.");
                    })} className="space-y-6">

                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-32" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <select {...field}
                                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="">Select status</option>
                                            {Object.values(CourseStatus).map((s) => (
                                                <option key={s} value={s}>
                                                    {statusLabels[s]}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Level */}
                        <FormField
                            control={form.control}
                            name="level"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <select {...field}
                                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="">Select level</option>
                                            {Object.values(LevelStatus).map((l) => (
                                                <option key={l} value={l}>
                                                    {levelLabels[l]}
                                                </option>
                                            ))}
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

                        {/* Instructor */}
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

                        {/* File Upload */}
                        <FormField
                            control={form.control}
                            name="file"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]; // ✅ IMPORTANT FIX
                                                console.log('file', file)
                                                field.onChange(file);
                                            }
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Create Course</Button>

                    </form>
                </Form>
            </Card>
        </div>
    );
}