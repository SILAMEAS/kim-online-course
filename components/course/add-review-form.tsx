'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewFormData } from '@/lib/validations/schemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AddReviewFormProps {
  courseId: string;
  onReviewAdded?: () => void;
}

export function AddReviewForm({ courseId, onReviewAdded }: AddReviewFormProps) {
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      title: '',
      comment: '',
    },
  });

  const currentRating = form.watch('rating');

  async function onSubmit(data: ReviewFormData) {
    if (!currentUser) {
      toast.error('Please login to submit a review');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      toast.success('Review submitted successfully!');
      form.reset();
      onReviewAdded?.();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Review error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!currentUser) {
    return (
      <div className="bg-secondary/50 border border-border rounded-lg p-6 text-center">
        <p className="text-foreground/70 mb-4">Sign in to leave a review</p>
        <Button asChild>
          <a href="/login">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border rounded-lg p-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Share Your Feedback</h3>
          <p className="text-sm text-foreground/60">Help others discover this course by sharing your experience</p>
        </div>

        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => field.onChange(rating)}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= (hoveredRating || currentRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-foreground/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Summarize your experience..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share what you learned and what could be improved..."
                  disabled={isLoading}
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
}
