import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormData, loginSchema} from "@/lib/validations/schemas";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {useLoginMutation} from "@/lib/api/apiSlice";
import Cookies from "js-cookie";
import {setLoading} from "@/lib/redux/slices/courses.slice";
import {useTranslation} from "react-i18next";

export function LoginForm() {
  const {t}=useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoadingLocal] = useState(false);
  const [login, resultLogin] = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoadingLocal(true);
    dispatch(setLoading(true));
    try {
      const loginData = await login(data).unwrap();

      // Save tokens in cookies
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
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoadingLocal(false);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (resultLogin.data) {
      console.log(" Login successful, fetching user data...");
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    }
  }, [resultLogin.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.form_email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.form_password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? t("form.form_password")+"..." : t("form.form_password")}
        </Button>
      </form>
    </Form>
  );
}
