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
import {
    UpdatePasswordReq,
    UserRequest,
    useUpdatePasswordMutation,
    useUpdateProfileMutation
} from "@/lib/api/api.generated.ts";
import useRestoreUserByToken from "@/hooks/useRestoreUserByToken.tsx";
import {passwordSchema} from "@/lib/validations/global-schema.ts";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

const profileUpdateSchema = z.object({
    firstName: z.string().min(2, 'Name must be at least 2 characters').max(50),
    lastName: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    file: z.union([
        z.instanceof(File),
        z.string().url(),
    ]).optional(),
});

const updatePasswordSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
})
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password cannot be the same as your old one",
        path: ["password"],
    });

export default function ProfilePage() {
    const {t} = useTranslation();
    const {currentData: currentUser, refetch} = useRestoreUserByToken();
    const [updatePassword] = useUpdatePasswordMutation();
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
    const formChangePassword = useForm<UpdatePasswordReq>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
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

    const onSubmitUpdatePassword = async (data: any) => {
        try {
            const formData = new FormData();

            formData.append("newPassword", data.newPassword);
            formData.append("currentPassword", data.currentPassword);
            await updatePassword({
                updatePasswordReq: formData as any
            }).unwrap();

            toast.success(`Update password successfully!`);
            formChangePassword.reset(); // Clear form
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update password");
        }
    };

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
                <h1 className="text-4xl font-bold mb-2">{t(Localization("profile_details","profile_settings"))}</h1>
                <p className="text-foreground/60">{t(Localization("profile_details","manage_account"))}</p>
            </div>

            {/* Profile Overview */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">{t(Localization("profile_details","account_information"))}</h3>

                <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-20 w-20">
                        {preview && <AvatarImage src={preview} alt={name}/>}
                    </Avatar>
                    <div>
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4"/>
                            {currentUser.email}
                        </p>
                        <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4"/>
                            {t(Localization("profile_details","member_since"))}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                    <div>

                        <p className="text-sm text-foreground/60">{t(Localization("profile_details","courses_enrolled"))}</p>
                    </div>
                    <div>

                        <p className="text-sm text-foreground/60">{t(Localization("profile_details","certificates"))}</p>
                    </div>
                    <div>

                        <p className="text-sm text-foreground/60">{t(Localization("profile_details","learning_hours"))}</p>
                        <p className="text-2xl font-bold">4.7</p>
                        <p className="text-sm text-foreground/60">{t(Localization("profile_details","avg_rating"))}</p>
                    </div>
                </div>
            </Card>

            {/* Edit Profile */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">{t(Localization("profile_details","edit_profile"))}</h3>
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
                                    <FormLabel>{t(Localization("profile_details","first_name"))}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter first name" {...field} />
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
                                    <FormLabel>{t(Localization("profile_details","last_name"))}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter last name" {...field} />
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
                                    <FormLabel>{t(Localization("profile_details","image"))}</FormLabel>
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
                            <p>{t(Localization("profile_details","update_profile"))}</p>
                        </Button>
                    </form>
                </Form>
            </Card>

            {/* Security */}
            <Card className="p-6 border border-border">
                <h3 className="text-xl font-semibold mb-6">{t(Localization("profile_details","security"))}</h3>

                <div className="space-y-4">
                    <p className="text-sm text-foreground/60 mb-4">
                        {t(Localization("profile_details","security_subtitle"))}
                    </p>
                    <Form {...formChangePassword}>
                        <form onSubmit={formChangePassword.handleSubmit(onSubmitUpdatePassword, (errors) => {
                            // 🔍 Debugging: Log validation errors if submission fails
                            console.error("Form Validation Failed:", errors);
                            toast.error("Please check the form for errors.");
                        })} className="space-y-4">
                            <FormField
                                control={formChangePassword.control}
                                name="currentPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t(Localization("profile_details","current_password"))}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter current password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formChangePassword.control}
                                name="newPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t(Localization("profile_details","new_password"))}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter new password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* File Upload */}
                            <FormField
                                control={formChangePassword.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t(Localization("profile_details","confirm_password"))}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter confirm password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full"
                                    disabled={formChangePassword.formState.isSubmitting}>
                                {formChangePassword.formState.isSubmitting &&
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                <p>{t(Localization("profile_details","change_password"))}</p>
                            </Button>
                        </form>
                    </Form>
                </div>
            </Card>
        </div>
    );
}
