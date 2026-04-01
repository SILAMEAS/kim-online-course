// apiSlice.ts
import {ENV} from "@/config/env";
import {BaseQueryFn, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {LoginResponse} from "@/lib/types.ts";

const publicEndpoint = [""];

// --- Custom baseQuery that adds Authorization header if needed ---
const customBaseQuery = (baseUrl: string, skipAuth: boolean) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken");
            if (token && !skipAuth) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });

    return rawBaseQuery;
};

// --- BaseQuery with automatic refresh ---
export const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
    args,
    api,
    extraOptions,
) => {
    const skipAuth = (args as any)?.skipAuth; // opt-out flag
    const baseQuery = customBaseQuery(ENV.API_URL, skipAuth);

    // If skipAuth, use simple baseQuery without token refresh logic
    if (skipAuth) {
        return baseQuery(args, api, extraOptions);
    }

    let result = await baseQuery(args, api, extraOptions);
    const Forbidden = result.error && (result.error as any).status === 401;

    // If 401, attempt refresh token
    if (Forbidden && !publicEndpoint.includes(api.endpoint)) {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
            // Call refresh endpoint WITHOUT accessToken
            const refreshResult = await customBaseQuery(ENV.API_URL, true)({
                url: "/auths/refresh-token",
                method: "POST",
                body: { refreshToken },
            }, api, extraOptions);
            console.log(refreshResult)
            if (refreshResult.data) {
                const data = refreshResult.data as LoginResponse;
                Cookies.set("accessToken", data.accessToken);
                Cookies.set("refreshToken", data.refreshToken);

                // Retry original request
                result = await baseQuery(args, api, extraOptions);
            }
        } else {
            // Refresh failed, remove tokens
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            globalThis.history.pushState({}, "", "/");
        }
    }

    return result;
};
