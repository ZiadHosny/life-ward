// categories
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

export const cityApi = createApi({
    reducerPath: "cityApi",
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
    tagTypes: ["cityApi"],
    endpoints: (builder) => ({
        getAllCities: builder.query({
            query: (params) => ({ url: `/city${params ? params : ""}` }),
            providesTags: ["cityApi"],
        }),
        getCityById: builder.query({
            query: (id) => ({ url: `/city/${id}` }),
            providesTags: ["cityApi"],
        }),
        createCity: builder.mutation({
            query: (body) => ({
                url: "/city",
                method: "POST",
                body,
            }),
            invalidatesTags: ["cityApi"],
        }),
        updateCityById: builder.mutation({
            query: ({ body, id }) => ({
                url: `/city/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["cityApi"],
        }),
        deleteCityById: builder.mutation({
            query: (id) => ({
                url: `/city/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["cityApi"],
        }),
        changeCityDefaultById: builder.mutation({
            query: (id) => ({
                url: `/city/changeDefault/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["cityApi"],
        }),
    }),
});

export const {
    useGetAllCitiesQuery,
    useLazyGetAllCitiesQuery,
    useGetCityByIdQuery,
    useCreateCityMutation,
    useUpdateCityByIdMutation,
    useDeleteCityByIdMutation,
    useChangeCityDefaultByIdMutation,
} = cityApi;
