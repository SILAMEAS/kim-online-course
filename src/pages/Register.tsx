import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Create Account</h2>
        <p className="text-foreground/60">
          Start your learning journey with Learning outcomes today
        </p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm">
        <span className="text-foreground/60">Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
