import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

export const fastCoastApi = createApi({
  reducerPath: "fastCoastApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = `Bearer ${localStorage.getItem("token")}`;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["fastCoast"],
  endpoints: (builder) => ({
    getCoast: builder.query({
      query: () => `/fastCost`,
      providesTags: ["fastCoast"],
    }),
    getCoastById: builder.query({
      query: (id) => `/fastCost`,
      providesTags: ["fastCoast"],
    }),
    createCoastValue: builder.mutation({
      query: (payload) => ({
        url: `/fastCost`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["fastCoast"],
    }),
    updateCoastValue: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/fastCost/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["fastCoast"],
    }),
  }),
});

export const {
  useGetCoastQuery,
  useCreateCoastValueMutation,
  useUpdateCoastValueMutation,
} = fastCoastApi;
