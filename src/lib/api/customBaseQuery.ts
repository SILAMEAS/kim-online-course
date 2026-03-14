import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

export const customBaseQuery = (baseUrl: string) => {
  console.log("Base baseUrl set to:", baseUrl); // Debug log to verify the URL
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {}) => {
      console.log("Preparing headers..."); // Debug log to check when headers are being prepared
      const token = Cookies.get("accessToken");
      console.log("Retrieved token:", token); // Debug log to check when headers are being prepared
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return rawBaseQuery;
};
