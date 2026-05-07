import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "@/lib/validations/schemas";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {SignUpApiArg, useSignUpMutation} from "@/lib/api/api.generated.ts";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export function RegisterForm() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [signUp, {isLoading}] = useSignUpMutation();
    const form = useForm<SignUpApiArg["signUpRequest"]>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            lastName: "",
            file: "",
            firstName: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(data: SignUpApiArg["signUpRequest"]) {
        try {
            const formData = new FormData();

            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);

            const file = data.file;

            if (file instanceof File) {
                formData.append("file", file);
            }

            await signUp({
                signUpRequest: formData as any
            }).unwrap();

            toast.success("Account created successfully!");
            navigate("/login");

        } catch (error:any) {
            console.error(error);
            toast.error(error?.data?.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                // 🔍 Debugging: Log validation errors if submission fails
                console.error("Form Validation Failed:", errors);
                toast.error("Please check the form for errors.");
            })} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t(Localization("form", "first_name"))}</FormLabel>
                            <FormControl>
                                <Input placeholder="John" disabled={isLoading} {...field} />
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
                            <FormLabel>{t(Localization("form", "last_name"))}</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t(Localization("form", "form_email"))}</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t(Localization("form", "form_password"))}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t(Localization("form", "confirm_password"))}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    {...field}
                                />
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
                            <FormLabel>{t(Localization("form", "profile"))}</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]; // ✅ IMPORTANT FIX
                                        console.log('file', file)
                                        field.onChange(file);
                                    }
                                    }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {`${isLoading ? t(Localization("form", "create_account")) : t(Localization("form", "create_account"))}`}
                </Button>
            </form>
        </Form>
    );
}
