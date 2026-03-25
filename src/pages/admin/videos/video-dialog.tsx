import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type VideoFormData, videoSchema} from '@/lib/v0/schemas';
import {createVideo, updateVideo, useCourses} from '@/lib/v0/api-hooks';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

interface VideoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    video?: any;
    onSuccess: () => void;
    onClose: () => void;
}

export function VideoDialog({
                                open,
                                onOpenChange,
                                video,
                                onSuccess,
                            }: Readonly<VideoDialogProps>) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {courses} = useCourses();

    const form = useForm<VideoFormData>({
        resolver: zodResolver(videoSchema),
        defaultValues: video || {
            title: '',
            description: '',
            courseId: '',
            videoUrl: '',
            duration: 0,
            sequenceNumber: 1,
        },
    });

    React.useEffect(() => {
        if (video) {
            form.reset(video);
        } else {
            form.reset({
                title: '',
                description: '',
                courseId: '',
                videoUrl: '',
                duration: 0,
                sequenceNumber: 1,
            });
        }
    }, [video, open, form]);

    const onSubmit = async (data: VideoFormData) => {
        setIsSubmitting(true);
        try {
            if (video?.id) {
                await updateVideo(video.id, data);
            } else {
                await createVideo(data);
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
                    <DialogTitle>{video ? 'Edit Video' : 'Add New Video'}</DialogTitle>
                    <DialogDescription>
                        {video ? 'Update video information' : 'Add a new video to a course'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Video Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter video title" {...field} />
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
                                        <Textarea placeholder="Video description" {...field} />
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

                        <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Video URL</FormLabel>
                                    <FormControl>
                                        <Input type="url" placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Duration (minutes)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="45" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sequenceNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Sequence Number</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {video ? 'Update Video' : 'Create Video'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
