import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";
export const SectionApi = createApi({
  reducerPath: "section",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSliders: builder.query({
      query: () => `/sections?type=slider`,
      providesTags: ["section"],
    }),
  }),
});

export const { useGetAllSlidersQuery } = SectionApi;
