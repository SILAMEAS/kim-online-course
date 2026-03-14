import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const customBaseQuery = (baseUrl: string) => {
  console.log("Base baseUrl set to:", baseUrl); // Debug log to verify the URL
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers,{}) => {
      console.log("Preparing headers..."); // Debug log to check when headers are being prepared
      // const token = (getState() as any).counter.login?.accessToken;
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  });

  return rawBaseQuery;
};
