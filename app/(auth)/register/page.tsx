import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';

// export const metadata = {
//   title: 'Sign Up - LearnHub',
//   description: 'Create a new LearnHub account',
// };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Create Account</h2>
        <p className="text-foreground/60">Start your learning journey with LearnHub today</p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm">
        <span className="text-foreground/60">Already have an account? </span>
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
