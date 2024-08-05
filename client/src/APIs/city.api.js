// categories
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from '../components/service'

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
            query: () => ({ url: `/city` }),
            providesTags: ["cityApi"],
        }),
        getAllNeighborhoodsForSpecificCity: builder.query({
            query: ({ id, query }) => ({
                url: `/neighborhood/forSpecificCity/${id}${query ? `?${query}` : ""
                    }`,
            }),
            providesTags: ["neighborhoodApi"],
        }),
    }),
});

export const {
    useGetAllCitiesQuery,
    useGetAllNeighborhoodsForSpecificCityQuery
} = cityApi;
