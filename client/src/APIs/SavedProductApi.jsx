import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const savedProductsApi = createApi({
  reducerPath: "SavedProduct",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      return headers.set("Authorization","Bearer " + localStorage.getItem("token"));
    },
  }),
  tagTypes: ["SavedProduct"],
  endpoints: (builder) => ({
    //  SavedProductS ENDPOINTS =>
    getAllSavedProducts: builder.query({
      query: (query) => `/favourites?limit=1000${query ? `&${query}` : ''}`,
      providesTags: ["SavedProduct"],
    }),

    addToSavedProduct: builder.mutation({
      query: (product) => ({
        url: `/favourites/toggleItemToFavourites/${product}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["SavedProduct"],
    }),
    deleteSavedProduct: builder.mutation({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedProduct"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddToSavedProductMutation,
  useLazyGetAllSavedProductsQuery,
  useGetAllSavedProductsQuery,
  useDeleteSavedProductMutation,
} = savedProductsApi;
