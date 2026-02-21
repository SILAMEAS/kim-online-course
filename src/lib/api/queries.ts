import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MOCK_COURSES } from '../data/courses';
import { getReviewsByCourse } from '../data/reviews';
import { Review, ReviewFormData } from '../types';

// Simulated API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Query Keys
export const courseKeys = {
  all: ['courses'] as const,
  list: () => [...courseKeys.all, 'list'] as const,
  detail: (id: string) => [...courseKeys.all, 'detail', id] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  list: () => [...reviewKeys.all, 'list'] as const,
  byCourse: (courseId: string) => [...reviewKeys.all, 'course', courseId] as const,
};

export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

// Courses Queries
export function useGetCourses() {
  return useQuery({
    queryKey: courseKeys.list(),
    queryFn: async () => {
      await delay(500);
      return MOCK_COURSES;
    },
  });
}

export function useGetCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: async () => {
      await delay(300);
      const course = MOCK_COURSES.find(c => c.id === id);
      if (!course) throw new Error('Course not found');
      return course;
    },
    enabled: !!id,
  });
}

// Reviews Queries
export function useGetReviewsByCourse(courseId: string) {
  return useQuery({
    queryKey: reviewKeys.byCourse(courseId),
    queryFn: async () => {
      await delay(400);
      return getReviewsByCourse(courseId);
    },
    enabled: !!courseId,
  });
}

// Add Review Mutation
export function useAddReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      reviewData,
      user,
    }: {
      courseId: string;
      reviewData: ReviewFormData;
      user: { id: string; name: string; avatar: string };
    }) => {
      await delay(600);

      const newReview: Review = {
        id: `rev-${Date.now()}`,
        course_id: courseId,
        user_id: user.id,
        user_name: user.name,
        user_avatar: user.avatar,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        helpful_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return newReview;
    },
    onSuccess: (newReview) => {
      // Invalidate and refetch reviews for this course
      queryClient.invalidateQueries({
        queryKey: reviewKeys.byCourse(newReview.course_id),
      });
    },
  });
}

// Search Courses
export function useSearchCourses(query: string) {
  return useQuery({
    queryKey: [...courseKeys.list(), query],
    queryFn: async () => {
      await delay(300);
      if (!query) return MOCK_COURSES;
      const lowerQuery = query.toLowerCase();
      return MOCK_COURSES.filter(
        course =>
          course.title.toLowerCase().includes(lowerQuery) ||
          course.description.toLowerCase().includes(lowerQuery) ||
          course.category.toLowerCase().includes(lowerQuery)
      );
    },
    enabled: true,
  });
}

// Filter Courses
export function useFilterCourses({
  category,
  level,
  minPrice,
  maxPrice,
  minRating,
}: {
  category?: string | null;
  level?: string | null;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number | null;
}) {
  return useQuery({
    queryKey: ['courses', 'filter', { category, level, minPrice, maxPrice, minRating }],
    queryFn: async () => {
      await delay(300);
      return MOCK_COURSES.filter(course => {
        if (category && course.category !== category) return false;
        if (level && course.level !== level) return false;
        if (minPrice !== undefined && course.price < minPrice) return false;
        if (maxPrice !== undefined && course.price > maxPrice) return false;
        if (minRating !== null && minRating !== undefined && course.rating < minRating) return false;
        return true;
      });
    },
  });
}
