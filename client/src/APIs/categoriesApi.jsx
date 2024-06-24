import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";
import { getCategories } from "./categoriesSlice";

export const categoriesApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/categories`,
      providesTags: ["category"],
    }),
    getAllSubCategories: builder.query({
      query: (categoryId) => `/subCategories?category=${categoryId}`,
      providesTags: ["Category"],
    }),
    getAllCategoriesWithSubAndSubSubs: builder.query({
      query: () =>
        `/categories/getAllCategoriesWithSubCategoriesWithSubSubCategories`,
      providesTags: ["Category"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const sortedCategories = data?.data?.map((item) => ({
            id: item.category["id"],
            title_en: item.category.name_en,
            title_ar: item.category.name_ar,
            subs: item.subCategories.map((el) => ({
              id: el.subCategory.id,
              title_en: el.subCategory.name_en,
              title_ar: el.subCategory.name_ar,
              subSubCategories: el.subSubCategory.map((subSub) => ({
                id: subSub._id,
                title_en: subSub.name_en,
                title_ar: subSub.name_ar,
              })),
            })),
          }));
          dispatch(getCategories(sortedCategories));
        } catch (err) {
          dispatch(getCategories([]));
        }
      },
    }),
    getProductsByDepartments: builder.query({
      query: () => `/categories/getAllCategoriesWithProducts`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllSubCategoriesQuery,
  useLazyGetAllCategoriesWithSubAndSubSubsQuery,
  useLazyGetProductsByDepartmentsQuery,
} = categoriesApi;
