
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ImageFormData, imageSchema} from '@/lib/v0/schemas';
import {createImage, updateImage} from '@/lib/v0/api-hooks';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

interface ImageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    image?: any;
    onSuccess: () => void;
    onClose: () => void;
}

export function ImageDialog({
                                open,
                                onOpenChange,
                                image,
                                onSuccess,
                            }: Readonly<ImageDialogProps>) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<ImageFormData>({
        resolver: zodResolver(imageSchema),
        defaultValues: image || {
            filename: '',
            fileSize: 0,
            mimeType: 'image/jpeg',
            url: '',
            altText: '',
        },
    });

    React.useEffect(() => {
        if (image) {
            form.reset(image);
        } else {
            form.reset({
                filename: '',
                fileSize: 0,
                mimeType: 'image/jpeg',
                url: '',
                altText: '',
            });
        }
    }, [image, open, form]);

    const onSubmit = async (data: ImageFormData) => {
        setIsSubmitting(true);
        try {
            if (image?.id) {
                await updateImage(image.id, data);
            } else {
                await createImage(data);
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
                    <DialogTitle>{image ? 'Edit Image' : 'Add New Image'}</DialogTitle>
                    <DialogDescription>
                        {image ? 'Update image information' : 'Add a new image'}
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
                                        <Input placeholder="image.jpg" {...field} />
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
                                        <Input type="url" placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fileSize"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>File Size (bytes)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1024" {...field} />
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
                        </div>

                        <FormField
                            control={form.control}
                            name="altText"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Alt Text</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descriptive text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {image ? 'Update Image' : 'Create Image'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
