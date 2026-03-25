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

const imageSchema = z.object({
    filename: z.string().min(1, 'Filename is required'),
    mimeType: z.string().min(1, 'MIME type is required'),
    fileSize: z.coerce.number().min(1, 'File size must be at least 1 byte'),
    url: z.string().url('Must be a valid URL'),
});

type ImageFormData = z.infer<typeof imageSchema>;

const mockImages = [
    {
        id: '1',
        filename: 'course-react.jpg',
        mimeType: 'image/jpeg',
        fileSize: 102400,
        url: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        filename: 'course-nextjs.png',
        mimeType: 'image/png',
        fileSize: 204800,
        url: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        filename: 'instructor-john.jpg',
        mimeType: 'image/jpeg',
        fileSize: 51200,
        url: 'https://via.placeholder.com/150',
    },
];

export default function AdminImagesPage() {
    const [images, setImages] = React.useState(mockImages);
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<typeof mockImages[0] | null>(null);
    const [imageToDelete, setImageToDelete] = React.useState<typeof mockImages[0] | null>(null);

    const form = useForm<ImageFormData>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            filename: '',
            mimeType: 'image/jpeg',
            fileSize: 0,
            url: '',
        },
    });

    React.useEffect(() => {
        if (selectedImage) {
            form.reset({
                filename: selectedImage.filename,
                mimeType: selectedImage.mimeType,
                fileSize: selectedImage.fileSize,
                url: selectedImage.url,
            });
        } else {
            form.reset({
                filename: '',
                mimeType: 'image/jpeg',
                fileSize: 0,
                url: '',
            });
        }
    }, [selectedImage, form]);

    const onSubmit = (data: ImageFormData) => {
        if (selectedImage) {
            setImages(
                images.map((image) =>
                    image.id === selectedImage.id ? {...image, ...data} : image
                )
            );
        } else {
            const newImage = {
                id: Date.now().toString(),
                ...data,
            };
            setImages([...images, newImage]);
        }
        setOpen(false);
        setSelectedImage(null);
        form.reset();
    };

    const handleEdit = (image: typeof mockImages[0]) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleDeleteClick = (image: typeof mockImages[0]) => {
        setImageToDelete(image);
        setDeleteOpen(true);
    };

    const handleDelete = () => {
        if (imageToDelete) {
            setImages(images.filter((image) => image.id !== imageToDelete.id));
            setDeleteOpen(false);
            setImageToDelete(null);
        }
    };

    const handleAdd = () => {
        setSelectedImage(null);
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Images</h1>
                    <p className="text-muted-foreground mt-1">Manage uploaded images</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Image
                </Button>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Filename</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Preview</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {images.map((image) => (
                                <TableRow key={image.id}>
                                    <TableCell className="font-medium">{image.filename}</TableCell>
                                    <TableCell>{image.mimeType}</TableCell>
                                    <TableCell>{(image.fileSize / 1024).toFixed(2)} KB</TableCell>
                                    <TableCell>
                                        <a
                                            href={image.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(image)}
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600"
                                            onClick={() => handleDeleteClick(image)}
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
                            {selectedImage ? 'Edit Image' : 'Add New Image'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedImage ? 'Update image information' : 'Create a new image entry'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="filename"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Filename</FormLabel>
                                        <FormControl>
                                            <Input placeholder="course-image.jpg" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mimeType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>MIME Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="image/jpeg" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fileSize"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>File Size (bytes)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="102400" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="url"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                {...field}
                                            />
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
                                    {selectedImage ? 'Update' : 'Create'}
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
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{imageToDelete?.filename}"? This action
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
