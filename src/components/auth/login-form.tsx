import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/lib/validations/schemas";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import Cookies from "js-cookie";
import {setLoading} from "@/lib/redux/slices/courses.slice";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";
import {SignInApiArg, useSignInMutation} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";

export function LoginForm() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Use RTK Query loading state (REMOVE local state)
    const [login, {isLoading}] = useSignInMutation();

    // Fix: Wrap the flat loginSchema to match the nested "loginRequest" form structure
    const formSchema = z.object({
        loginRequest: loginSchema,
    });

    const form = useForm<SignInApiArg>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loginRequest: {
                email: "",
                password: ""
            }
        },
    });

    async function onSubmit(data: SignInApiArg) {

        // Optional: Only keep this if you have a global loading bar separate from the button
        dispatch(setLoading(true));

        try {
            // ✅ Use unwrap result directly
            const loginData = await login(data).unwrap();


            if (
                loginData?.accessToken &&
                loginData?.refreshToken &&
                loginData?.accessTokenExpiresIn &&
                loginData?.refreshTokenExpiresIn
            ) {
                Cookies.set("accessToken", loginData.accessToken, {
                    expires: loginData.accessTokenExpiresIn / 86400,
                    secure: true,
                    sameSite: "strict",
                });

                Cookies.set("refreshToken", loginData.refreshToken, {
                    expires: loginData.refreshTokenExpiresIn / 86400,
                    secure: true,
                    sameSite: "strict",
                });
            }

            toast.success("Logged in successfully!");
            console.log("loginData",loginData?.role==EnumRole.ADMIN)
            if(loginData?.role == EnumRole.ADMIN){
                navigate("/admin")
            }else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    // 🔍 Debugging: Log validation errors if submission fails
                    console.error("Form Validation Failed:", errors);
                    toast.error("Please check the form for errors.");
                })}
                className="space-y-6"
            >
                {/* Email */}
                <FormField
                    control={form.control}
                    name="loginRequest.email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                {t(Localization("loginPage", "login"))}
                            </FormLabel>
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

                {/* Password */}
                <FormField
                    control={form.control}
                    name="loginRequest.password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                {t(Localization("form", "form_password"))}
                            </FormLabel>
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

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    )}
                    {`${t(Localization("form", "sign_in"))} ${isLoading ? "...":""}`}
                </Button>
            </form>
        </Form>
    );
}