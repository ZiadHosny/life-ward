import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const verifySmsApi = createApi({
  reducerPath: "verifySmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["verifySmsApi"],
  endpoints: (builder) => ({
    verifyCode: builder.mutation({
      query: ({ endpoint, payload }) => {
        return {
          url: `${endpoint}`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useVerifyCodeMutation } = verifySmsApi;
