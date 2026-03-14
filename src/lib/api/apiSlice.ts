import { createApi } from "@reduxjs/toolkit/query/react";
import { Course, Review, ReviewFormData } from "../types";
import { MOCK_COURSES } from "../data/courses";
import { getReviewsByCourse } from "../data/reviews";
import { baseQueryWithReauth } from "./customBaseQuery";
import { LoginFormData } from "./type/schema";
import { LoginResponse, ProfileResponse } from "./type/response";
import { Method } from "./type/enum";
import { RegisterFormData } from "../validations/schemas";
// Simulated delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, // Adjust baseUrl to your API
  tagTypes: ["Course", "Review", "Auth"],
  endpoints: (builder) => ({
    // Authentication endpoints
    me: builder.query<ProfileResponse, void>({
      query: (body) => ({
        url: "/auths/me",
        method: Method.GET,
        body,
      }),
    }),
    signUp: builder.mutation<LoginResponse, RegisterFormData>({
      query: (body) => ({
        url: "/auths/sign-up",
        method: Method.POST,
        body,
        skipAuth: true, // public endpoint, no token needed
      }),
    }),
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (body) => ({
        url: "/auths/sign-in",
        method: Method.POST,
        body,
        skipAuth: true, // public endpoint, no token needed
      }),
    }),
    refrechToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auths/refresh-token",
        method: Method.POST,
        body,
      }),
    }),
    //  Other endpoints
    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        await delay(500);
        return { data: MOCK_COURSES };
      },
      providesTags: ["Course"],
    }),
    getCourse: builder.query<Course, string>({
      queryFn: async (id) => {
        await delay(300);
        const course = MOCK_COURSES.find((c) => c.id === id);
        if (!course)
          return { error: { status: 404, data: "Course not found" } };
        return { data: course };
      },
      providesTags: (_result, _error, id) => [{ type: "Course", id }],
    }),
    getReviewsByCourse: builder.query<Review[], string>({
      queryFn: async (courseId) => {
        await delay(400);
        return { data: getReviewsByCourse(courseId) };
      },
      providesTags: (_result, _error, courseId) => [
        { type: "Review", id: `LIST-${courseId}` },
      ],
    }),
    addReview: builder.mutation<
      Review,
      {
        courseId: string;
        reviewData: ReviewFormData;
        user: { id: string; name: string; avatar: string };
      }
    >({
      queryFn: async ({ courseId, reviewData, user }) => {
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
        return { data: newReview };
      },
      invalidatesTags: (_result, _error, { courseId }) => [
        { type: "Review", id: `LIST-${courseId}` },
      ],
    }),
    searchCourses: builder.query<Course[], string>({
      queryFn: async (query) => {
        await delay(300);
        if (!query) return { data: MOCK_COURSES };
        const lowerQuery = query.toLowerCase();
        const filtered = MOCK_COURSES.filter(
          (course) =>
            course.title.toLowerCase().includes(lowerQuery) ||
            course.description.toLowerCase().includes(lowerQuery) ||
            course.category.toLowerCase().includes(lowerQuery),
        );
        return { data: filtered };
      },
    }),
    filterCourses: builder.query<
      Course[],
      {
        category?: string | null;
        level?: string | null;
        minPrice?: number;
        maxPrice?: number;
        minRating?: number | null;
      }
    >({
      queryFn: async ({ category, level, minPrice, maxPrice, minRating }) => {
        await delay(300);
        const filtered = MOCK_COURSES.filter((course) => {
          if (category && course.category !== category) return false;
          if (level && course.level !== level) return false;
          if (minPrice !== undefined && course.price < minPrice) return false;
          if (maxPrice !== undefined && course.price > maxPrice) return false;
          if (
            minRating !== null &&
            minRating !== undefined &&
            course.rating < minRating
          )
            return false;
          return true;
        });
        return { data: filtered };
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetReviewsByCourseQuery,
  useAddReviewMutation,
  useSearchCoursesQuery,
  useFilterCoursesQuery,
  useLoginMutation,
  useMeQuery,
  useRefrechTokenMutation,
  useSignUpMutation
} = apiSlice;
