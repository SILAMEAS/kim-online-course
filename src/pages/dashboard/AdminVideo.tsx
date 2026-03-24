import {useState} from "react";
import {useForm} from "react-hook-form";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

import {UploadVideoApiArg, useUploadVideoMutation} from "@/lib/api/api.generated";


export default function AdminVideo() {
    const [preview, setPreview] = useState<string | null>(null);

    const [uploadVideo, {isLoading}] = useUploadVideoMutation();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
    } = useForm<UploadVideoApiArg>({
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

            reset();
            setPreview(null);
        } catch (err) {
            console.error(err);
            toast.error(
                "Upload failed: " + (err as any)?.data?.message
            );
        }
    }

    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Upload Video</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* COURSE ID */}
                <Input
                    type="number"
                    placeholder="Course ID"
                    {...register("courseId", {valueAsNumber: true})}
                />

                {/* TITLE */}
                <Input
                    type="text"
                    placeholder="Video title"
                    {...register("uploadVideoRequest.title")}
                />

                {/* FILE */}
                <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setValue("uploadVideoRequest.file", file);

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
        </Card>
    );
}