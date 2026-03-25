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
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';

const videoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    courseId: z.string().min(1, 'Course is required'),
    duration: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
    sequenceNumber: z.coerce.number().min(1, 'Sequence must be at least 1'),
});

type VideoFormData = z.infer<typeof videoSchema>;

const mockVideos = [
    {
        id: '1',
        title: 'Introduction to React',
        courseId: '1',
        duration: 45,
        sequenceNumber: 1,
    },
    {
        id: '2',
        title: 'React Hooks Deep Dive',
        courseId: '1',
        duration: 60,
        sequenceNumber: 2,
    },
    {
        id: '3',
        title: 'Next.js Fundamentals',
        courseId: '2',
        duration: 50,
        sequenceNumber: 1,
    },
];

const mockCourses = [
    {id: '1', name: 'React Advanced Patterns'},
    {id: '2', name: 'Next.js Full Stack'},
];

export default function AdminVideosPage() {
    const [videos, setVideos] = React.useState(mockVideos);
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedVideo, setSelectedVideo] = React.useState<typeof mockVideos[0] | null>(null);
    const [videoToDelete, setVideoToDelete] = React.useState<typeof mockVideos[0] | null>(null);

    const form = useForm<VideoFormData>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            title: '',
            courseId: '',
            duration: 0,
            sequenceNumber: 1,
        },
    });

    React.useEffect(() => {
        if (selectedVideo) {
            form.reset({
                title: selectedVideo.title,
                courseId: selectedVideo.courseId,
                duration: selectedVideo.duration,
                sequenceNumber: selectedVideo.sequenceNumber,
            });
        } else {
            form.reset({
                title: '',
                courseId: '',
                duration: 0,
                sequenceNumber: 1,
            });
        }
    }, [selectedVideo, form]);

    const onSubmit = (data: VideoFormData) => {
        if (selectedVideo) {
            setVideos(
                videos.map((video) =>
                    video.id === selectedVideo.id ? {...video, ...data} : video
                )
            );
        } else {
            const newVideo = {
                id: Date.now().toString(),
                ...data,
            };
            setVideos([...videos, newVideo]);
        }
        setOpen(false);
        setSelectedVideo(null);
        form.reset();
    };

    const handleEdit = (video: typeof mockVideos[0]) => {
        setSelectedVideo(video);
        setOpen(true);
    };

    const handleDeleteClick = (video: typeof mockVideos[0]) => {
        setVideoToDelete(video);
        setDeleteOpen(true);
    };

    const handleDelete = () => {
        if (videoToDelete) {
            setVideos(videos.filter((video) => video.id !== videoToDelete.id));
            setDeleteOpen(false);
            setVideoToDelete(null);
        }
    };

    const handleAdd = () => {
        setSelectedVideo(null);
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Videos</h1>
                    <p className="text-muted-foreground mt-1">Manage course videos</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Video
                </Button>
            </div>

            <Card>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Sequence</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {videos.map((video) => (
                                <TableRow key={video.id}>
                                    <TableCell className="font-medium">{video.title}</TableCell>
                                    <TableCell>{video.courseId}</TableCell>
                                    <TableCell>{video.duration} min</TableCell>
                                    <TableCell>{video.sequenceNumber}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(video)}
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600"
                                            onClick={() => handleDeleteClick(video)}
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
                            {selectedVideo ? 'Edit Video' : 'Add New Video'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedVideo ? 'Update video information' : 'Create a new video'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Video Title" {...field} />
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

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {selectedVideo ? 'Update' : 'Create'}
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
                        <AlertDialogTitle>Delete Video</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{videoToDelete?.title}"? This action
                            cannot be undone.
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
