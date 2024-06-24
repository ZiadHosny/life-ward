import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const privacyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: "privacy",
  tagTypes: ["Privacy"],
  endpoints: (builder) => ({
    getAllPrivcay: builder.query({
      query: () => `/sections?type=retrieval&&type=public&&type=usage&&type=privacy`,
      providesTags: ["Privacy"],
    }),
    getPrivacy: builder.query({
      query: (type) => `/sections?type=${type}`,
      providesTags: ["Privacy"],
    }),
  }),
});
export const { useGetAllPrivcayQuery,useGetPrivacyQuery } = privacyApi;
export default privacyApi;
