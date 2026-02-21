import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations/schemas";
import { loginSuccess, setLoading } from "@/lib/redux/slices/auth.slice";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoadingLocal] = useState(false);

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
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in production, this would call an API
      const mockUser: User = {
        id: "user-" + Date.now(),
        email: data.email,
        name: data.email.split("@")[0].replace(/[0-9]/g, " ").trim() || "User",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        bio: "Passionate learner",
        enrolled_courses: [],
        role: "student",
        certificates: [],
        created_at: new Date(),
      };

      // Save to Redux store
      dispatch(loginSuccess(mockUser));

      // Save to localStorage
      localStorage.setItem("auth_user", JSON.stringify(mockUser));

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoadingLocal(false);
      dispatch(setLoading(false));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
