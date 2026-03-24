import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "./customBaseQuery";

import {Method} from "../enum.ts";
import {CourseResponse} from "@/lib/api/api.generated.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth, // Adjust baseUrl to your API
    tagTypes: ["Course", "Review", "Auth"],
    endpoints: (builder) => ({
        createCourse: builder.mutation<CourseResponse, FormData>({
            query: (body) => ({
                url: "/api/courses",
                method: Method.POST,
                body,
            }),
        }),
    }),
});

export const {
    useCreateCourseMutation
} = apiSlice;
