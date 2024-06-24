import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const bannerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: "banner",
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    getBannerSection: builder.query({
      query: () => `/sections?type=banner`,
      providesTags: ["Banner"],
    }),
  }),
});
export const { useGetBannerSectionQuery } = bannerApi;
export default bannerApi;
