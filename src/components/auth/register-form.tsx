import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "@/lib/validations/schemas";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {SignUpApiArg, useSignUpMutation} from "@/lib/api/api.generated.ts";
import {z} from "zod";

export function RegisterForm() {
    const navigate = useNavigate();
    const [signUp, {isLoading}] = useSignUpMutation();
    const form = useForm<SignUpApiArg>({
        resolver: zodResolver(z.object({
            signUpRequest: registerSchema
        })),
        defaultValues: {
            signUpRequest: {
                email: "",
                password: "",
                lastName: "",
                file: "",
                firstName: "",
                confirmPassword:""
            }
        },
    });

    async function onSubmit(data: SignUpApiArg) {
        try {
            const formData = new FormData();

            formData.append("email", data.signUpRequest.email);
            formData.append("password", data.signUpRequest.password);
            formData.append("firstName", data.signUpRequest.firstName);
            formData.append("lastName", data.signUpRequest.lastName);

            const file = data.signUpRequest.file;

            if (file instanceof File) {
                formData.append("file", file);
            }

            await signUp({
                signUpRequest: formData as any
            }).unwrap();

            toast.success("Account created successfully!");
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Registration failed");
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
                    name="signUpRequest.firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="signUpRequest.lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="signUpRequest.email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
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
                    name="signUpRequest.password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
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
                    name="signUpRequest.confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                    name="signUpRequest.file"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Profile</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]; // ✅ IMPORTANT FIX
                                        console.log('file',file)
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
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>
        </Form>
    );
}
