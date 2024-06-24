import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const ProductsApi = createApi({
  reducerPath: "Product",
  keepUnusedDataFor: 0,
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  /* 
  &page=${page ? page : 1}
  */
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => {
        console.log('================================================',query)
        return `/products?${query ? query : ""}`
      },
      providesTags: ["Product"],
    }),
    getAllAtts: builder.query({
      query: () => `/attributes/`,
      providesTags: ["Product"],
    }),
    getAllProductsBySubId: builder.query({
      query: (parameter) => `/products?${parameter}`,
      providesTags: ["Product"],
    }),
    getMostSellingProducts: builder.query({
      query: (query) => `/products?sort=-sales&${query ? query : ""}`,
      providesTags: ["Product"],
    }),
    getMostNewiestProducts: builder.query({
      query: () => `/products?sort=-createdAt`,
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProductsOfCategory: builder.query({
      query: (id) => `/products/forSpecificCategory/${id}`,
      providesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, product }) => ({
        url: `/products/${productId}`,
        body: product,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
   
    addRating: builder.mutation({
      query: ({ productId, rating }) => ({
        url: `/reviews/product/${productId}`,
        body: { rating },
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetSingleProductQuery,
  useLazyGetAllProductsBySubIdQuery,
  useGetAllProductsQuery,
  useGetMostSellingProductsQuery,
  useGetMostNewiestProductsQuery,
  useLazyGetAllProductsQuery,
  useLazyGetSingleProductQuery,
  useUpdateProductMutation,
  useAddRatingMutation,
  useLazyGetAllAttsQuery,
  useLazyGetProductsOfCategoryQuery
} = ProductsApi;
