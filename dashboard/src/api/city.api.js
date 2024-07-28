// categories
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

const cityUrl = '${cityUrl}'

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
            query: (params) => ({ url: `/${cityUrl}${params ? params : ""}` }),
            providesTags: ["cityApi"],
        }),
        getCityById: builder.query({
            query: (id) => ({ url: `/${cityUrl}/${id}` }),
            providesTags: ["cityApi"],
        }),
        createCity: builder.mutation({
            query: (body) => ({
                url: "/${cityUrl}",
                method: "POST",
                body,
            }),
            invalidatesTags: ["cityApi"],
        }),
        updateCityById: builder.mutation({
            query: ({ body, id }) => ({
                url: `/${cityUrl}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["cityApi"],
        }),
        deleteCityById: builder.mutation({
            query: (id) => ({
                url: `/${cityUrl}/${id}`,
                method: "DELETE",
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
} = cityApi;
