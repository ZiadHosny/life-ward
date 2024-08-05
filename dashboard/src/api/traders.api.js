import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

const tradersUrl = `/traders`

export const traderApi = createApi({
  reducerPath: "traderApi",
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
  tagTypes: ["traderApi"],
  endpoints: (builder) => ({
    getAllTraders: builder.query({
      query: (params) => `${tradersUrl}?${params ? params : ""}`,
      providesTags: ["traderApi"],
    }),
    createTrader: builder.mutation({
      query: (body) => ({
        url: `${tradersUrl}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["traderApi"],
    }),
    getTraderById: builder.query({
      query: (params) => ({ url: `${tradersUrl}/${params}` }),
      providesTags: ["traderApi"],
    }),
    updateTrader: builder.mutation({
      query: ({ body, id }) => ({
        url: `${tradersUrl}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["traderApi"],
    }),
    deleteTraderById: builder.mutation({
      query: (id) => ({
        url: `${tradersUrl}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["traderApi"],
    }),

  }),
});

export const {
  useCreateTraderMutation,
  useDeleteTraderByIdMutation,
  useUpdateTraderMutation,
  useGetTraderByIdQuery,
  useGetAllTradersQuery,
} = traderApi;
