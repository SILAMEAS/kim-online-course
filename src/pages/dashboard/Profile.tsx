import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {toast} from "sonner";
import {Calendar, Loader2, Mail} from "lucide-react";
import {z} from "zod";
import {UserRequest, useUpdateProfileMutation} from "@/lib/api/api.generated.ts";
import useRestoreUserByToken from "@/hooks/useRestoreUserByToken.tsx";

const profileUpdateSchema = z.object({
    firstName: z.string().min(2, 'Name must be at least 2 characters').max(50),
    lastName: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    file: z.union([
        z.instanceof(File),
        z.string().url(),
    ]).optional(),
});

export default function ProfilePage() {
    const {currentData: currentUser, refetch} = useRestoreUserByToken();
    const [updateProfile] = useUpdateProfileMutation();
    const [preview, setPreview] = useState<string | null>(null);
    const form = useForm<UserRequest>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            file: undefined
        },
    });

    async function onSubmit(data: UserRequest) {

        const formData = new FormData();

        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);

        // ✅ Only append file if user actually selects a new one
        if (data.file instanceof File) {
            formData.append("file", data.file);
        }

        await updateProfile({
            userRequest: formData as any
        }).unwrap();

        refetch()
        toast.success(`Update profile successfully!`);
        form.reset();
        setPreview(null);
    }

    useEffect(() => {
        if (currentUser) {
            const imageUrl = currentUser.imageUrl;
            form.reset({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                file: imageUrl,
            });
            if (imageUrl)
                setPreview(imageUrl);
        }
    }, [currentUser, updateProfile]);

    if (!currentUser) return null;

    const name = `${currentUser.firstName} ${currentUser.lastName}`;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
                <p className="text-foreground/60">Manage your account information</p>
            </div>

            {/* Profile Overview */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">Account Information</h3>

                <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-20 w-20">
                        {preview && <AvatarImage src={preview} alt={name}/>
                        }
                        {/*<AvatarFallback>{initials}</AvatarFallback>*/}
                    </Avatar>
                    <div>
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4"/>
                            {currentUser.email}
                        </p>
                        <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4"/>
                            Member since{" "}
                            {/*{formatDistanceToNow(new Date(currentUser.created_at), {*/}
                            {/*    addSuffix: true,*/}
                            {/*})}*/}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                    <div>
                        {/*<p className="text-2xl font-bold">*/}
                        {/*    {currentUser.enrolled_courses.length}*/}
                        {/*</p>*/}
                        <p className="text-sm text-foreground/60">Courses Enrolled</p>
                    </div>
                    <div>
                        {/*<p className="text-2xl font-bold">*/}
                        {/*    {currentUser.certificates.length}*/}
                        {/*</p>*/}
                        <p className="text-sm text-foreground/60">Certificates</p>
                    </div>
                    <div>
                        {/*<p className="text-2xl font-bold">*/}
                        {/*    {Math.floor(currentUser.enrolled_courses.length * 8.5)}*/}
                        {/*</p>*/}
                        <p className="text-sm text-foreground/60">Learning Hours</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">4.7</p>
                        <p className="text-sm text-foreground/60">Avg. Rating</p>
                    </div>
                </div>
            </Card>

            {/* Edit Profile */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        // 🔍 Debugging: Log validation errors if submission fails
                        console.error("Form Validation Failed:", errors);
                        toast.error("Please check the form for errors.");
                    })} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter course title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter course title" {...field} />
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
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            <p>Update Profile</p>
                        </Button>
                    </form>
                </Form>
            </Card>

            {/* Security */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">Security</h3>

                <div className="space-y-4">
                    <p className="text-sm text-foreground/60 mb-4">
                        Keep your account secure by regularly updating your password
                    </p>
                    <Button variant="outline">Change Password</Button>
                </div>
            </Card>
        </div>
    );
}
