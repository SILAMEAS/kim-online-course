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
    deleteVideo: build.mutation<DeleteVideoApiResponse, DeleteVideoApiArg>({
      query: (queryArg) => ({
        url: `/api/videos/${queryArg.publicId}`,
        method: "DELETE",
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
        body: queryArg.body,
        params: {
          title: queryArg.title,
        },
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
    getAll: build.query<GetAllApiResponse, GetAllApiArg>({
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
    getAllByCourse: build.query<
      GetAllByCourseApiResponse,
      GetAllByCourseApiArg
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
export type DeleteVideoApiResponse =
  /** status 200 Video deleted successfully */ string;
export type DeleteVideoApiArg = {
  /** Public ID of the video in Cloudinary */
  publicId: string;
};
export type UpdateUserApiResponse =
  /** status 200 User updated successfully */ string;
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
  /** status 200 Video uploaded successfully */ string;
export type UploadVideoApiArg = {
  /** Course ID to upload the video into */
  courseId: number;
  /** Title of the video */
  title: string;
  body: {
    /** Video file to upload */
    file: Blob;
  };
};
export type ListUsersApiResponse =
  /** status 200 Users retrieved successfully */ UserResponse;
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
export type GetAllPaymentsApiResponse =
  /** status 200 Payments retrieved successfully */ ListPaymentResponse;
export type GetAllPaymentsApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetAllApiResponse =
  /** status 200 Enrollments retrieved successfully */ EnrollmentResponse;
export type GetAllApiArg = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetAllByCourseApiResponse =
  /** status 200 Enrollments retrieved successfully */ EnrollmentResponse;
export type GetAllByCourseApiArg = {
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
export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  imageUrl: string;
};
export type UserRequest = {
  firstName?: string;
  lastName?: string;
  file?: Blob;
};
export type UpdateUserRequest = {
  fistName: string;
  lastName: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
};
export type VideoListResponse = {
  id?: number;
  title?: string;
  publicId?: string;
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
export type CourseResponse = {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  updatedBy?: number;
  createdBy?: number;
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
  instructor?: UserResponse;
};
export type UpdateCourseRequest = {
  title?: string;
  description?: string;
  price?: number;
  status?: "DRAFT" | "PUBLISHED" | "PREPARE";
  instructorId?: number;
  file?: Blob;
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
  contents?: CourseResponse[];
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  hasNext?: boolean;
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
export type ListPaymentResponse = {
  id?: number;
  amount?: number;
  status?: string;
  user?: UserResponse;
};
export type EntityResponseHandlerListPaymentResponse = {
  contents?: ListPaymentResponse[];
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
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
export const {
  useGetUserByJwtTokenQuery,
  useUpdateProfileMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
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
  useApproveMutation,
  useSubmitPaymentMutation,
  useListAllCoursesQuery,
  useCreateCourseMutation,
  useGetVideosQuery,
  useWatchVideoQuery,
  useGetVideosByCourseIdQuery,
  useDeleteVideosByCourseIdMutation,
  useListTeachersQuery,
  useGetAllPaymentsQuery,
  useGetAllQuery,
  useGetAllByCourseQuery,
  useDeleteAllByCourseMutation,
} = injectedRtkApi;
