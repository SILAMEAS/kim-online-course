'use client';

import { Review } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface ReviewSectionProps {
  reviews: Review[];
  courseRating: number;
  isLoading?: boolean;
}

export function ReviewSection({ reviews, courseRating, isLoading = false }: ReviewSectionProps) {
  const [helpful, setHelpful] = useState<Set<string>>(new Set());

  const handleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpful);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
    }
    setHelpful(newHelpful);
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
  }));

  const totalReviews = reviews.length;

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-4xl font-bold mb-2">{courseRating.toFixed(1)}</div>
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(courseRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-foreground/20'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-foreground/60">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 text-sm">
                <span>{rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: totalReviews > 0 ? `${(count / totalReviews) * 100}%` : 0 }}
                />
              </div>
              <div className="w-12 text-sm text-right text-foreground/60">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-foreground/60">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map(review => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user_avatar} alt={review.user_name} />
                    <AvatarFallback>{review.user_name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{review.user_name}</p>
                      <span className="text-xs text-foreground/60">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-foreground/20'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="font-medium mb-2">{review.title}</p>
                    <p className="text-sm text-foreground/70 mb-4">{review.comment}</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 ${helpful.has(review.id) ? 'text-primary' : 'text-foreground/60'}`}
                      onClick={() => handleHelpful(review.id)}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">
                        Helpful ({review.helpful_count + (helpful.has(review.id) ? 1 : 0)})
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-foreground/60">
            <p>No reviews yet. Be the first to review this course!</p>
          </div>
        )}
      </div>
    </div>
  );
}
