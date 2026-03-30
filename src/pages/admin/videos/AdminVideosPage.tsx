import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Loader2, Plus} from 'lucide-react';
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {
    UploadVideoApiArg,
    useDeleteVideoMutation,
    useGetVideosQuery,
    useListAllCoursesQuery,
    useUploadVideoMutation,
    VideoListResponse
} from "@/lib/api/api.generated.ts";
import {toast} from "sonner";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import previewCloudinary from "@/components/previewCloudinary.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {videoFileSchema} from "@/lib/validations/global-schema.ts";


export default function AdminVideosPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit,
        setOpen, open, setSelectedItem, selectedItem
    } = useCustomTable<VideoListResponse>();
    const listAllCoursesQuery = useListAllCoursesQuery(DefaultPaginationRequest);
    const courses = listAllCoursesQuery?.data?.contents || [];
    //   State management
    const [uploadVideo] = useUploadVideoMutation();
    const [deleteVideo, resultDeleteVideo] = useDeleteVideoMutation();
    const {currentData, refetch} = useGetVideosQuery(DefaultPaginationRequest);
    const videos = currentData?.contents || [];
    const [preview, setPreview] = useState<string | null>(null);
    //  Form management
    const form = useForm<UploadVideoApiArg>({
        resolver: zodResolver(z.object({
            courseId: z
                .number({
                    required_error: "Course is required",
                    invalid_type_error: "Course ID must be a number",
                })
                .min(1, {message: "Course must be selected"}),
            uploadVideoRequest: z.object({
                title: z.string({
                    required_error: "Title is required",
                    invalid_type_error: "Title must be string"
                }).min(5, {message: "Title more than 5 characters"}),
                file: videoFileSchema
            })
        }))
    });

    async function onSubmit(data: UploadVideoApiArg) {
        try {
            console.log("data", data)
            const formData = new FormData();
            formData.append("title", String(data.uploadVideoRequest.title));
            const file = data.uploadVideoRequest.file;

            if (file instanceof File) {
                formData.append("file", file);
            }


            if (!data.uploadVideoRequest.file) {
                toast.error("Please select a video file");
                return;
            }

            await uploadVideo({
                courseId: data.courseId,
                uploadVideoRequest: formData as any
            }).unwrap();

            toast.success("Video uploaded successfully");
            refetch();
            form.reset();
            setPreview(null);
            setOpen(false);
        } catch (err: any) {
            console.error(err);
            toast.error(
                "Upload failed: " + err?.data?.message
            );
        }
    }

    React.useEffect(() => {
        if (selectedItem) {
            form.reset({
                courseId: selectedItem.id,
                uploadVideoRequest: {
                    title: selectedItem.title,
                    file: selectedItem.publicId,
                }
            });
            if (selectedItem.publicId) {
                setPreview(previewCloudinary({type: 'video', url: selectedItem.publicId}));
            }
        }
    }, [selectedItem, form]);

    const handleSelectCourse = () => {
        if (listAllCoursesQuery?.isLoading) {
            return <option disabled>Loading...</option>
        }
        if (courses?.length === 0) {
            return <option disabled>No teachers found</option>
        }
        return courses?.map((c) => (
            <option key={c.id} value={c.id}>
                {c.title}
            </option>
        ))
    }
    useEffect(() => {
        if (!open) {
            setSelectedItem(null);
            form.reset();
        }
        if (open) {
            listAllCoursesQuery.refetch();
            form.reset();
        }

    }, [open])

    console.log(form.getValues())
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Videos</h1>
                    <p className="text-muted-foreground mt-1">Manage course videos</p>
                </div>
                <Button onClick={() => {
                    setOpen(true);
                }}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Video
                </Button>
            </div>

            <Card>

                <CustomTable<VideoListResponse>
                    columns={[
                        {key: 'id', label: 'ID', sortable: true},
                        {key: 'title', label: 'Title', sortable: true},
                        {key: 'publicId', label: 'Url', sortable: true},
                    ]}
                    data={videos}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSortChange={(key, dir) => {
                        setSortBy(key);
                        setSortDirection(dir);
                    }}
                    pagination={{page, limit, total: currentData?.total ?? 0}}
                    onPageChange={setPage}
                    onEdit={async (video) => {
                        setSelectedItem(video);
                        setOpen(true);
                    }}
                    onDelete={async (video) => {
                        try {
                            if (video?.publicId && video.id) {
                                console.log("video.id", video.id);
                                await deleteVideo({id: video.id, publicId: video.publicId}).unwrap();

                                toast.success("success to delete video");
                                refetch();
                                setSelectedItem(null);

                            }
                        } catch (e: any) {
                            toast.error("Failed to delete video. Please try again later." + e?.data?.message);
                        }
                    }}
                    isLoading={false}
                    onLimitChange={(newLimit) => {
                        setLimit(newLimit);
                        setPage(1);
                    }}
                    isDeleting={resultDeleteVideo.isLoading}
                />
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedItem ? 'Edit Video' : 'Add New Video'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedItem ? 'Update video information' : 'Create a new video'}
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
                                name="uploadVideoRequest.title"
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
                                name="courseId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            >
                                                <option value="">Select course</option>
                                                {handleSelectCourse()}
                                            </select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            {/* File Upload */}
                            <FormField
                                control={form.control}
                                name="uploadVideoRequest.file"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    console.log("file", file);
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
                                <video
                                    src={preview}
                                    controls
                                    className="w-full rounded-md border"
                                />
                            )}
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                {selectedItem ? 'Update video' : 'Create video'}
                            </Button>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>

        </div>
    );
}
