// apiSlice.ts
import { ENV } from "@/config/env";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { LoginResponse } from "./type/response";

// --- Custom baseQuery that adds Authorization header if needed ---
const customBaseQuery = (baseUrl: string,skipAuth:boolean) => {
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

  // If 401, attempt refresh token
  if (result.error && (result.error as any).status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        { url: "/auths/refresh-token", method: "POST", body: { refreshToken } },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as LoginResponse;
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("refreshToken", data.refreshToken);

        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, remove tokens
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    }
  }

  return result;
};
