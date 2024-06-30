import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";
const ordersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`),
  }),
  reducerPath: "order",
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => "/order/getOrdersByUser",
      providesTags: ["Orders"],
    }),
    getMyLastOrder: builder.query({
      query: () => "/order/getMyLastOrder",
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    verifyOrderCode: builder.mutation({
      query: (payload) => ({
        url: `/orders/verifyOrder`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    createOnlineOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const {
  useGetUserOrdersQuery,
  useAddOrderMutation,
  useVerifyOrderCodeMutation,
  useCreateOnlineOrderMutation,
  useLazyGetMyLastOrderQuery
} = ordersApi;
export default ordersApi;
