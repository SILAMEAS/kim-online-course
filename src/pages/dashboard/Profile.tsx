import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateSchema,
  ProfileUpdateFormData,
} from "@/lib/validations/schemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, Mail, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: currentUser?.name || "",
      bio: currentUser?.bio || "",
      avatar: currentUser?.avatar || "",
    },
  });

  async function onSubmit(_data: ProfileUpdateFormData) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated successfully!");
      // In a real app, you would update the user in Redux store here
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!currentUser) return null;

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
        <p className="text-foreground/60">Manage your account information</p>
      </div>

      {/* Profile Overview */}
      <Card className="p-6 border border-border">
        <h3 className="text-xl font-semibold mb-6">Account Information</h3>

        <div className="flex items-center gap-6 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{currentUser.name}</p>
            <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {currentUser.email}
            </p>
            <p className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              Member since{" "}
              {formatDistanceToNow(new Date(currentUser.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
          <div>
            <p className="text-2xl font-bold">
              {currentUser.enrolled_courses.length}
            </p>
            <p className="text-sm text-foreground/60">Courses Enrolled</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {currentUser.certificates.length}
            </p>
            <p className="text-sm text-foreground/60">Certificates</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {Math.floor(currentUser.enrolled_courses.length * 8.5)}
            </p>
            <p className="text-sm text-foreground/60">Learning Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold">4.7</p>
            <p className="text-sm text-foreground/60">Avg. Rating</p>
          </div>
        </div>
      </Card>

      {/* Edit Profile */}
      <Card className="p-6 border border-border">
        <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      disabled={isLoading}
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </Card>

      {/* Security */}
      <Card className="p-6 border border-border">
        <h3 className="text-xl font-semibold mb-6">Security</h3>

        <div className="space-y-4">
          <p className="text-sm text-foreground/60 mb-4">
            Keep your account secure by regularly updating your password
          </p>
          <Button variant="outline">Change Password</Button>
        </div>
      </Card>
    </div>
  );
}
