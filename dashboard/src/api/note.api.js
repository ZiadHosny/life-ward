import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

export const noteApi = createApi({
  reducerPath: "noteApi",
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
  tagTypes: ["NotesTag"],
  endpoints: (builder) => ({
    getNote: builder.query({
      query: () => `/notes`,
      providesTags: ["NotesTag"],
    }),
    createNoteValue: builder.mutation({
      query: (payload) => ({
        url: `/notes`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["NotesTag"],
    }),
    updateNoteValue: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["NotesTag"],
    }),
  }),
});

export const {
  useGetNoteQuery,
  useCreateNoteValueMutation,
  useUpdateNoteValueMutation,
} = noteApi;
