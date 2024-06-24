import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";
const aboutUsApi = createApi({
  reducerPath: "aboutUsApi",
  tagTypes: ["AboutUs"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getAboutUsData: builder.query({
      query: () => `/sections?type=aboutus`,
      providesTags: ["AboutUs"],
    }),
    
  }),
});

export const { useGetAboutUsDataQuery } = aboutUsApi;
export default aboutUsApi;
