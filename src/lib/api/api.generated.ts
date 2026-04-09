import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserByJwtToken: build.query<
      GetUserByJwtTokenApiResponse,
      GetUserByJwtTokenApiArg
    >({
      query: () => ({ url: `/auths/me` }),
    }),
    updateProfile: build.mutation<
      UpdateProfileApiResponse,
      UpdateProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/auths/me`,
        method: "PUT",
        body: queryArg.userRequest,
      }),
    }),
    updateVideo: build.mutation<UpdateVideoApiResponse, UpdateVideoApiArg>({
      query: (queryArg) => ({
        url: `/api/videos/${queryArg.publicId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateUserRequest,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCourseDetail: build.query<
      GetCourseDetailApiResponse,
      GetCourseDetailApiArg
    >({
      query: (queryArg) => ({ url: `/api/courses/${queryArg.courseId}` }),
    }),
    updateCourse: build.mutation<UpdateCourseApiResponse, UpdateCourseApiArg>({
      query: (queryArg) => ({
        url: `/api/courses/${queryArg.courseId}`,
        method: "PUT",
        body: queryArg.updateCourseRequest,
      }),
    }),
    deleteCourseById: build.mutation<
      DeleteCourseByIdApiResponse,
      DeleteCourseByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses/${queryArg.courseId}`,
        method: "DELETE",
      }),
    }),
    signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
      query: (queryArg) => ({
        url: `/auths/sign-up`,
        method: "POST",
        body: queryArg.signUpRequest,
      }),
    }),
    signIn: build.mutation<SignInApiResponse, SignInApiArg>({
      query: (queryArg) => ({
        url: `/auths/sign-in`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: (queryArg) => ({
        url: `/auths/refresh-token`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    uploadVideo: build.mutation<UploadVideoApiResponse, UploadVideoApiArg>({
      query: (queryArg) => ({
        url: `/api/videos/upload/${queryArg.courseId}`,
        method: "POST",
        body: queryArg.uploadVideoRequest,
      }),
    }),
    listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/users`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/api/users`,
        method: "POST",
        body: queryArg.createUserRequest,
      }),
    }),
    listReviews: build.query<ListReviewsApiResponse, ListReviewsApiArg>({
      query: (queryArg) => ({
        url: `/api/reviews/course/${queryArg.courseId}`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    createReviews: build.mutation<
      CreateReviewsApiResponse,
      CreateReviewsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/reviews/course/${queryArg.courseId}`,
        method: "POST",
        body: queryArg.reviewRequest,
      }),
    }),
    approve: build.mutation<ApproveApiResponse, ApproveApiArg>({
      query: (queryArg) => ({
        url: `/api/payments/${queryArg.paymentId}/approve`,
        method: "POST",
      }),
    }),
    submitPayment: build.mutation<
      SubmitPaymentApiResponse,
      SubmitPaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/payments/${queryArg.courseId}`,
        method: "POST",
      }),
    }),
    listAllCourses: build.query<
      ListAllCoursesApiResponse,
      ListAllCoursesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    createCourse: build.mutation<CreateCourseApiResponse, CreateCourseApiArg>({
      query: (queryArg) => ({
        url: `/api/courses`,
        method: "POST",
        body: queryArg.createCourseRequest,
      }),
    }),
    getVideos: build.query<GetVideosApiResponse, GetVideosApiArg>({
      query: (queryArg) => ({
        url: `/api/videos`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    watchVideo: build.query<WatchVideoApiResponse, WatchVideoApiArg>({
      query: (queryArg) => ({ url: `/api/videos/watch/${queryArg.publicId}` }),
    }),
    getVideosByCourseId: build.query<
      GetVideosByCourseIdApiResponse,
      GetVideosByCourseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/videos/by-course-id/${queryArg.courseId}`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    deleteVideosByCourseId: build.mutation<
      DeleteVideosByCourseIdApiResponse,
      DeleteVideosByCourseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/videos/by-course-id/${queryArg.courseId}`,
        method: "DELETE",
      }),
    }),
    listTeachers: build.query<ListTeachersApiResponse, ListTeachersApiArg>({
      query: (queryArg) => ({
        url: `/api/users/teachers`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    getRating: build.query<GetRatingApiResponse, GetRatingApiArg>({
      query: (queryArg) => ({
        url: `/api/reviews/course/${queryArg.courseId}/rating`,
      }),
    }),
    getAllPayments: build.query<
      GetAllPaymentsApiResponse,
      GetAllPaymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/payments`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    listImages: build.query<ListImagesApiResponse, ListImagesApiArg>({
      query: (queryArg) => ({
        url: `/api/images`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    getAllEnrollments: build.query<
      GetAllEnrollmentsApiResponse,
      GetAllEnrollmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/enrollments`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    getAllEnrollmentsByCourse: build.query<
      GetAllEnrollmentsByCourseApiResponse,
      GetAllEnrollmentsByCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/enrollments/courses/${queryArg.courseId}`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    deleteAllByCourse: build.mutation<
      DeleteAllByCourseApiResponse,
      DeleteAllByCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/enrollments/courses/${queryArg.courseId}`,
        method: "DELETE",
      }),
    }),
    dashboard: build.query<DashboardApiResponse, DashboardApiArg>({
      query: () => ({ url: `/api/dashboard` }),
    }),
    listAllCoursesStudentEnrollment: build.query<
      ListAllCoursesStudentEnrollmentApiResponse,
      ListAllCoursesStudentEnrollmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses/student/${queryArg.id}`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          limit: queryArg.limit,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    deleteVideo: build.mutation<DeleteVideoApiResponse, DeleteVideoApiArg>({
      query: (queryArg) => ({
        url: `/api/videos/${queryArg.id}/publicId/${queryArg.publicId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetUserByJwtTokenApiResponse =
  /** status 200 Profile retrieved successfully */ UserResponse;
export type GetUserByJwtTokenApiArg = void;
export type UpdateProfileApiResponse = /** status 200 OK */ UserResponse;
export type UpdateProfileApiArg = {
  userRequest: UserRequest;
};
export type UpdateVideoApiResponse =
  /** status 200 Video updated successfully */ string;
export type UpdateVideoApiArg = {
  /** Public ID of the existing video in Cloudinary */
  publicId: string;
  body: {
    /** New video file */
    file: Blob;
  };
};
export type UpdateUserApiResponse =
  /** status 200 User updated successfully */ GeneralResponse;
export type UpdateUserApiArg = {
  /** ID of the user to update */
  id: number;
  updateUserRequest: UpdateUserRequest;
};
export type DeleteUserApiResponse =
  /** status 200 User deleted successfully */ string;
export type DeleteUserApiArg = {
  /** ID of the user to delete */
  id: number;
};
export type GetCourseDetailApiResponse =
  /** status 200 Course details retrieved successfully */ CourseDetailResponse;
export type GetCourseDetailApiArg = {
  /** ID of the course */
  courseId: number;
};
export type UpdateCourseApiResponse = /** status 200 OK */ CourseResponse;
export type UpdateCourseApiArg = {
  courseId: number;
  updateCourseRequest: UpdateCourseRequest;
};
export type DeleteCourseByIdApiResponse =
  /** status 200 Course deleted successfully */ string;
export type DeleteCourseByIdApiArg = {
  /** ID of the course */
  courseId: number;
};
export type SignUpApiResponse = /** status 200 Account created successfully */ {
  [key: string]: string;
};
export type SignUpApiArg = {
  signUpRequest: SignUpRequest;
};
export type SignInApiResponse =
  /** status 200 Login successful */ LoginResponse;
export type SignInApiArg = {
  /** User login credentials */
  loginRequest: LoginRequest;
};
export type RefreshTokenApiResponse =
  /** status 200 Token refreshed successfully */ LoginResponse;
export type RefreshTokenApiArg = {
  /** Pass the refresh token in JSON: {"refreshToken":"<token>"} */
  body: string;
};
export type UploadVideoApiResponse =
  /** status 200 Video uploaded successfully */ GeneralResponse;
export type UploadVideoApiArg = {
  courseId: number;
  uploadVideoRequest: UploadVideoRequest;
};
export type ListUsersApiResponse =
  /** status 200 Users retrieved successfully */ ListUserPageResponse;
export type ListUsersApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type CreateUserApiResponse =
  /** status 200 User created successfully */ {
    [key: string]: string;
  };
export type CreateUserApiArg = {
  createUserRequest: CreateUserRequest;
};
export type ListReviewsApiResponse =
  /** status 200 course retrieved successfully */ ReviewsPageResponse;
export type ListReviewsApiArg = {
  courseId: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type CreateReviewsApiResponse =
  /** status 200 course retrieved successfully */ ReviewsPageResponse;
export type CreateReviewsApiArg = {
  courseId: number;
  reviewRequest: ReviewRequest;
};
export type ApproveApiResponse =
  /** status 200 Payment approved and enrollment created */ EnrollmentResponse;
export type ApproveApiArg = {
  /** ID of the payment to approve */
  paymentId: number;
};
export type SubmitPaymentApiResponse =
  /** status 200 Payment submitted successfully */ PaymentResponse;
export type SubmitPaymentApiArg = {
  /** ID of the course the student wants to enroll in */
  courseId: number;
};
export type ListAllCoursesApiResponse =
  /** status 200 Courses retrieved successfully */ CoursePageResponse;
export type ListAllCoursesApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type CreateCourseApiResponse =
  /** status 200 Course created successfully */ CourseResponse;
export type CreateCourseApiArg = {
  createCourseRequest: CreateCourseRequest;
};
export type GetVideosApiResponse =
  /** status 200 Videos retrieved successfully */ EntityResponseHandlerVideoListResponse;
export type GetVideosApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type WatchVideoApiResponse =
  /** status 200 Video link retrieved successfully */ string;
export type WatchVideoApiArg = {
  /** Public ID of the video in Cloudinary */
  publicId: string;
};
export type GetVideosByCourseIdApiResponse =
  /** status 200 Videos retrieved successfully */ EntityResponseHandlerVideoListResponse;
export type GetVideosByCourseIdApiArg = {
  /** Course ID */
  courseId: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type DeleteVideosByCourseIdApiResponse =
  /** status 200 All videos deleted successfully */ string;
export type DeleteVideosByCourseIdApiArg = {
  /** Course ID */
  courseId: number;
};
export type ListTeachersApiResponse =
  /** status 200 OK */ EntityResponseHandlerUserResponse;
export type ListTeachersApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetRatingApiResponse =
  /** status 200 course retrieved successfully */ CourseRatingDto;
export type GetRatingApiArg = {
  courseId: number;
};
export type GetAllPaymentsApiResponse =
  /** status 200 Payments retrieved successfully */ PaymentsPageResponse;
export type GetAllPaymentsApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type ListImagesApiResponse =
  /** status 200 Courses retrieved successfully */ ImagesPageResponse;
export type ListImagesApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetAllEnrollmentsApiResponse =
  /** status 200 Enrollments retrieved successfully */ EnrollmentsPageResponse;
export type GetAllEnrollmentsApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetAllEnrollmentsByCourseApiResponse =
  /** status 200 Enrollments retrieved successfully */ EnrollmentsPageResponse;
export type GetAllEnrollmentsByCourseApiArg = {
  /** ID of the course */
  courseId: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type DeleteAllByCourseApiResponse =
  /** status 200 Enrollments deleted successfully */ string;
export type DeleteAllByCourseApiArg = {
  /** ID of the course */
  courseId: number;
};
export type DashboardApiResponse =
  /** status 200 Users retrieved successfully */ DashboardResponse;
export type DashboardApiArg = void;
export type ListAllCoursesStudentEnrollmentApiResponse =
  /** status 200 Courses retrieved successfully */ CoursePageResponse;
export type ListAllCoursesStudentEnrollmentApiArg = {
  id: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type DeleteVideoApiResponse =
  /** status 200 Video deleted successfully */ GeneralResponse;
export type DeleteVideoApiArg = {
  /** Public ID of the video in Cloudinary */
  publicId: string;
  /** Video ID */
  id: number;
};
export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  imageUrl: string;
  status: "ACTIVE" | "INACTIVE";
};
export type UserRequest = {
  firstName: string;
  lastName: string;
  file?: Blob;
};
export type GeneralResponse = {
  message?: string;
  status?: number;
};
export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  status?: "ACTIVE" | "INACTIVE";
};
export type CourseResponse = {
  id: number;
  title: string;
  description: string;
  price: number;
  updatedBy: number;
  createdBy: number;
  imageUrl: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCE";
  status: "DRAFT" | "PUBLISHED" | "PREPARE";
  category:
    | "WEB_DEVELOPMENT"
    | "DATA_SCIENCE"
    | "DESIGN"
    | "MOBILE_DEVELOPMENT"
    | "CLOUD_COMPUTING"
    | "DEV_OPS"
    | "BUSINESS";
  rating: number;
  reviewsCount: number;
  duration: number;
  studentsCount: number;
  instructor: UserResponse;
};
export type VideoListResponse = {
  id: number;
  title: string;
  publicId: string;
  duration: number;
  course: CourseResponse;
};
export type CourseDetailResponse = {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  instructor?: UserResponse;
  imageUrl?: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCE";
  status?: "DRAFT" | "PUBLISHED" | "PREPARE";
  category?:
    | "WEB_DEVELOPMENT"
    | "DATA_SCIENCE"
    | "DESIGN"
    | "MOBILE_DEVELOPMENT"
    | "CLOUD_COMPUTING"
    | "DEV_OPS"
    | "BUSINESS";
  rating?: number;
  reviewsCount?: number;
  duration?: number;
  studentsCount?: number;
  curriculum?: VideoListResponse;
};
export type UpdateCourseRequest = {
  title?: string;
  description?: string;
  price?: number;
  status?: "DRAFT" | "PUBLISHED" | "PREPARE";
  instructorId?: number;
  file?: Blob;
  category?:
    | "WEB_DEVELOPMENT"
    | "DATA_SCIENCE"
    | "DESIGN"
    | "MOBILE_DEVELOPMENT"
    | "CLOUD_COMPUTING"
    | "DEV_OPS"
    | "BUSINESS";
};
export type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  file: Blob;
};
export type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  userId?: number;
  role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  message?: string;
  accessTokenExpiresIn?: number;
  refreshTokenExpiresIn?: number;
  accessTokenExpiresAt?: number;
  refreshTokenExpiresAt?: number;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type UploadVideoRequest = {
  title?: string;
  file: Blob;
};
export type ListUserPageResponse = {
  contents?: UserResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
};
export type EntityResponseHandlerUserResponse = {
  contents?: UserResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type CreateUserRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
};
export type ListCourseResponse = {
  id?: number;
  title?: string;
  price?: number;
};
export type ReviewResponse = {
  id: number;
  user: UserResponse;
  title: string;
  comment: string;
  course: ListCourseResponse;
  rating: number;
  createdAt: string;
};
export type ReviewsPageResponse = {
  contents?: ReviewResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
};
export type EntityResponseHandlerReviewResponse = {
  contents?: ReviewResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type ReviewRequest = {
  rating?: number;
  title?: string;
  comment?: string;
};
export type EnrollmentResponse = {
  id?: number;
  status?: "ACTIVE" | "FAILED";
  course?: ListCourseResponse;
};
export type PaymentResponse = {
  id?: number;
  amount?: number;
  status?: string;
  courseId?: number;
  courseTitle?: string;
  user?: UserResponse;
};
export type CoursePageResponse = {
  contents: CourseResponse[];
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  hasNext: boolean;
};
export type EntityResponseHandlerCourseResponse = {
  contents?: CourseResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type CreateCourseRequest = {
  title: string;
  description: string;
  price: number;
  status: "DRAFT" | "PUBLISHED" | "PREPARE";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCE";
  instructorId: number;
  file: Blob;
  category:
    | "WEB_DEVELOPMENT"
    | "DATA_SCIENCE"
    | "DESIGN"
    | "MOBILE_DEVELOPMENT"
    | "CLOUD_COMPUTING"
    | "DEV_OPS"
    | "BUSINESS";
};
export type EntityResponseHandlerVideoListResponse = {
  contents?: VideoListResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type CourseRatingDto = {
  average?: number;
  total?: number;
  breakdown?: {
    [key: string]: number;
  };
};
export type ListPaymentResponse = {
  id?: number;
  amount?: number;
  status?: string;
  user?: UserResponse;
  course?: CourseResponse;
  approvedBy?: number;
};
export type PaymentsPageResponse = {
  contents?: ListPaymentResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
};
export type EntityResponseHandlerListPaymentResponse = {
  contents?: ListPaymentResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type ImageListResponse = {
  id?: number;
  title?: string;
  publicId?: string;
};
export type ImagesPageResponse = {
  contents?: ImageListResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
};
export type EntityResponseHandlerImageListResponse = {
  contents?: ImageListResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type EnrollmentsPageResponse = {
  contents?: EnrollmentResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
};
export type EntityResponseHandlerEnrollmentResponse = {
  contents?: EnrollmentResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
  hasNext?: boolean;
};
export type DashboardResponse = {
  totalUsers: number;
  totalCourses: number;
  totalVideos: number;
  totalRevenues: string;
  totalEnrollments: number;
  totalImages: number;
};
export const {
  useGetUserByJwtTokenQuery,
  useUpdateProfileMutation,
  useUpdateVideoMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCourseDetailQuery,
  useUpdateCourseMutation,
  useDeleteCourseByIdMutation,
  useSignUpMutation,
  useSignInMutation,
  useRefreshTokenMutation,
  useUploadVideoMutation,
  useListUsersQuery,
  useCreateUserMutation,
  useListReviewsQuery,
  useCreateReviewsMutation,
  useApproveMutation,
  useSubmitPaymentMutation,
  useListAllCoursesQuery,
  useCreateCourseMutation,
  useGetVideosQuery,
  useWatchVideoQuery,
  useGetVideosByCourseIdQuery,
  useDeleteVideosByCourseIdMutation,
  useListTeachersQuery,
  useGetRatingQuery,
  useGetAllPaymentsQuery,
  useListImagesQuery,
  useGetAllEnrollmentsQuery,
  useGetAllEnrollmentsByCourseQuery,
  useDeleteAllByCourseMutation,
  useDashboardQuery,
  useListAllCoursesStudentEnrollmentQuery,
  useDeleteVideoMutation,
} = injectedRtkApi;
