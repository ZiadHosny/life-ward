import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const occasionsApi = createApi({
  reducerPath: "occasionsApi",
  tagTypes: ["Occasion"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      headers.set("Authorization", "Bearer " + localStorage.getItem("token")),
  }),
  endpoints: (builder) => ({
    getOccasions: builder.query({
      query: () => `/occasions/forLoggedUser`,
      providesTags: ["Occasion"],
    }),
    addOccasion: builder.mutation({
      query: (payload) => ({
        url: `/occasions`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Occasion"],
    }),
    updateOccasion: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/occasions/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Occasion"],
    }),
    removeOccasion: builder.mutation({
      query: (item) => ({
        url: `/occasions/${item._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Occasion"],
    }),
  }),
});
export const {
  useGetOccasionsQuery,
  useAddOccasionMutation,
  useUpdateOccasionMutation,
  useRemoveOccasionMutation,
} = occasionsApi;
export default occasionsApi;
