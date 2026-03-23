import {createApi} from "@reduxjs/toolkit/query/react";
import {CourseResponse, IPagination, LoginResponse, PaginationRequest, ProfileResponse, UserResponse} from "../types";
import {baseQueryWithReauth} from "./customBaseQuery";

import {Method} from "../enum.ts";
import {LoginFormData, RegisterFormData} from "../validations/schemas";

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
        refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
            query: (body) => ({
                url: "/auths/refresh-token",
                method: Method.POST,
                body,
            }),
        }),
        //  Other endpoints
        getListCourse: builder.query<IPagination<CourseResponse>, PaginationRequest>({
            query: (params) => ({
                url: "/api/courses",
                method: Method.GET,
                params
            }),
        }),
        createCourse: builder.mutation<CourseResponse, FormData>({
            query: (body) => ({
                url: "/api/courses",
                method: Method.POST,
                body,
            }),
        }),
        getListTeachers: builder.query<IPagination<UserResponse>, PaginationRequest>({
            query: (params) => ({
                url: "/api/users/teachers",
                method: Method.GET,
                params
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useMeQuery,
    useSignUpMutation,
    useGetListCourseQuery,
    useGetListTeachersQuery,
    useCreateCourseMutation
} = apiSlice;
