import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const userApi = createApi({
  reducerPath: "APIs",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("authorization", "Bearer " + localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    //  LOGIN ENDPOINTS =>
    login: builder.mutation({
      query: (user) => ({
        url: `/auth/login`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "PUT",
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: `/auth/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => `/users/getMe`,
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/updateLoggedUser`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useLazyGetMeQuery,
} = userApi;
