import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Plus} from 'lucide-react';
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {
    UploadVideoApiArg,
    useDeleteVideoMutation,
    useGetVideosQuery,
    useUploadVideoMutation,
    VideoListResponse
} from "@/lib/api/api.generated.ts";
import {toast} from "sonner";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {useForm} from "react-hook-form";


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
    //   State management
    const [uploadVideo, {isLoading}] = useUploadVideoMutation();
    const [deleteVideo, resultDeleteVideo] = useDeleteVideoMutation();
    const {currentData, refetch} = useGetVideosQuery(DefaultPaginationRequest);
    const videos = currentData?.contents || [];
    const [preview, setPreview] = useState<string | null>(null);
    //  Form management
    const form = useForm<UploadVideoApiArg>({
        defaultValues: {
            courseId: 5,
            uploadVideoRequest: {
                title: "TEST",
                file: undefined,
            }
        },
    });

    async function onSubmit(data: UploadVideoApiArg) {
        try {
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
        }
    }, [selectedItem, form]);


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

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* COURSE ID */}
                        <Input
                            type="number"
                            placeholder="Course ID"
                            {...form.register("courseId", {valueAsNumber: true})}
                        />

                        {/* TITLE */}
                        <Input
                            type="text"
                            placeholder="Video title"
                            {...form.register("uploadVideoRequest.title")}
                        />

                        {/* FILE */}
                        <Input
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                form.setValue("uploadVideoRequest.file", file);

                                // preview video
                                const url = URL.createObjectURL(file);
                                setPreview(url);
                            }}
                        />

                        {/* VIDEO PREVIEW */}
                        {preview && (
                            <video
                                src={preview}
                                controls
                                className="w-full rounded-md border"
                            />
                        )}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Uploading..." : "Upload Video"}
                        </Button>
                    </form>

                </DialogContent>
            </Dialog>

        </div>
    );
}
