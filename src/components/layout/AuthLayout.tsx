import { Link, Outlet } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <BookOpen className="w-8 h-8" />
          Learning outcomes
        </Link>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Learning outcomes
          </h1>
          <p className="text-lg opacity-90">
            Join thousands of students and advance your skills with world-class
            courses from industry experts.
          </p>
        </div>

        <div className="text-sm opacity-75">
          <p>&copy; 2024 Learning outcomes. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <BookOpen className="w-6 h-6" />
              Learning outcomes
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
