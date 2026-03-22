import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {store} from "@/lib/redux/store.ts";
import {EnumRole} from "@/lib/enum.ts";
import {Card} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

/* ================= ENUMS ================= */

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

/* ================= LABELS ================= */

const categoryLabels: Record<CategoryStatus, string> = {
    WEB_DEVELOPMENT: "Web Development",
    DATA_SCIENCE: "Data Science",
    DESIGN: "Design",
    MOBILE_DEVELOPMENT: "Mobile Development",
    CLOUD_COMPUTING: "Cloud Computing",
    DEV_OPS: "DevOps",
    BUSINESS: "Business",
};

const levelLabels: Record<LevelStatus, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCE: "Advance",
};

const statusLabels: Record<CourseStatus, string> = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    PREPARE: "Prepare",
};

/* ================= FORM TYPE ================= */

type CreateCourseFormData = {
    title: string;
    description: string;
    price: number;
    status: CourseStatus;
    level: LevelStatus;
    instructorId: number;
    category: CategoryStatus;
    file: FileList;
};

/* ================= COMPONENT ================= */

export default function ManageCoursePage() {
    const navigate = useNavigate();

    const form = useForm<CreateCourseFormData>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            status: undefined,
            level: undefined,
            instructorId: 0,
            category: undefined,
        },
    });

    /* ================= SUBMIT ================= */

    async function onSubmit(data: CreateCourseFormData) {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", String(data.price));
            formData.append("status", data.status);
            formData.append("level", data.level);
            formData.append("instructorId", String(data.instructorId));
            formData.append("category", data.category);

            if (data.file?.[0]) {
                formData.append("file", data.file[0]);
            }

            const res = await fetch("/api/courses", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("API Error");
            }

            toast.success("Course created successfully!");
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create course.");
        }
    }

    /* ================= AUTH GUARD ================= */

    useEffect(() => {
        if (store?.getState()?.auth?.currentUser?.role !== EnumRole.ADMIN) {
            navigate("/");
        }
    }, []);

    /* ================= UI ================= */

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-32" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <select {...field}  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="">Select status</option>
                                            {Object.values(CourseStatus).map((s) => (
                                                <option key={s} value={s}>
                                                    {statusLabels[s]}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Level */}
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <select {...field}  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="">Select level</option>
                                            {Object.values(LevelStatus).map((l) => (
                                                <option key={l} value={l}>
                                                    {levelLabels[l]}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <select {...field}  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="">Select category</option>
                                            {Object.values(CategoryStatus).map((c) => (
                                                <option key={c} value={c}>
                                                    {categoryLabels[c]}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Instructor ID */}
                        <FormField
                            control={form.control}
                            name="instructorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructor ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* File Upload */}
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) =>
                                                field.onChange(e.target.files)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
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