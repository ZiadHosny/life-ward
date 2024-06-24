import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const noteApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`),
  }),
  reducerPath: "note",
  tagTypes: ["note"],
  endpoints: (builder) => ({
    getNote: builder.query({
      query: () => `/notes`,
      providesTags: ["note"],
    }),
  }),
});
export const { useLazyGetNoteQuery } = noteApi;
export default noteApi;
