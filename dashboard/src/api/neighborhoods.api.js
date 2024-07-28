import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

const neighborhoodUrl = 'url'

export const neighborhoodApi = createApi({
  reducerPath: "neighborhoodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["neighborhoodApi"],
  endpoints: (builder) => ({
    getAllNeighborhoods: builder.query({
      query: (params) => ({ url: `/${neighborhoodUrl}${params ? params : ""}` }),
      providesTags: ["neighborhoodApi"],
    }),
    getAllNeighborhoodsForSpecificCity: builder.query({
      query: ({ id, query }) => ({
        url: `/${neighborhoodUrl}/forSpecificCity/${id}${query ? `?${query}` : ""
          }`,
      }),
      providesTags: ["neighborhoodApi"],
    }),
    getNeighborhoodById: builder.query({
      query: (params) => ({ url: `/${neighborhoodUrl}${params}` }),
      providesTags: ["neighborhoodApi"],
    }),
    createNeighborhood: builder.mutation({
      query: (body) => ({
        url: `/${neighborhoodUrl}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["neighborhoodApi"],
    }),
    updateNeighborhoodById: builder.mutation({
      query: ({ body, id }) => ({
        url: `/${neighborhoodUrl}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["neighborhoodApi"],
    }),
    deleteNeighborhoodById: builder.mutation({
      query: (id) => ({
        url: `/${neighborhoodUrl}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["neighborhoodApi"],
    }),
  }),
});

export const {
  useGetAllNeighborhoodsQuery,
  useLazyGetAllNeighborhoodsQuery,
  useGetAllNeighborhoodsForSpecificCityQuery,
  useLazyGetAllNeighborhoodsForSpecificCityQuery,
  useGetNeighborhoodByIdQuery,
  useCreateNeighborhoodMutation,
  useUpdateNeighborhoodByIdMutation,
  useDeleteNeighborhoodByIdMutation,
} = neighborhoodApi;
