import { Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-foreground/60">
          Sign in to your account to continue learning
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
        <span className="text-foreground/60">Don't have an account? </span>
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
