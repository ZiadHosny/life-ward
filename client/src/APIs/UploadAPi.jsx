import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["uploadApi"],
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (payload) => ({
        url: `/upload/file`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["uploadApi"],
    }),
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: `/upload/image?type=jpg`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["uploadApi"],
    }),
  }),
});

export const { useUploadMediaMutation, useUploadImageMutation } = uploadApi;
