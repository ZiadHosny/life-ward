import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const fastDeliveryCoastApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`),
  }),
  reducerPath: "fastCoast",
  tagTypes: ["fastCoast"],
  endpoints: (builder) => ({
    getFastCoast: builder.query({
      query: () => `/fastCost`,
      providesTags: ["fastCoast"],
    }),
  }),
});
export const { useLazyGetFastCoastQuery } = fastDeliveryCoastApi;
export default fastDeliveryCoastApi;
