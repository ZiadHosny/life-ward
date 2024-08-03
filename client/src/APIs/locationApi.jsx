import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from '../components/service'

export const locationApi = createApi({
    reducerPath: "locationApi",
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
    tagTypes: ["locationApi"],
    endpoints: (builder) => ({
        getBestLocation: builder.mutation({
            query: (body) => ({ url: `/general/bestLocation`, method: "POST", body }),
            providesTags: ["locationApi"],
        }),
    }),
});

export const {
    useGetBestLocationMutation,
} = locationApi;
