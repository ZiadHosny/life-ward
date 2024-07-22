import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import { baseUrl } from '../components/service'


const cartApi = createApi({
  reducerPath: 'Cart',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      return headers
    },
  }),
  keepUnusedDataFor: 0,

  tagTypes: ['Cart', 'Verification', 'Orders'],
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => '/cart',
      transformResponse: (response, meta, arg) => {
        console.log(response, arg, 'response')
        return response
      },
      providesTags: ['Cart', 'Verification', 'points'],
    }),
    updateQuantity: builder.mutation({
      query: (payload) => ({
        url: `/cart/${payload.product}`,
        method: 'POST',
        body: {
          quantity: payload.quantity,
          properties: payload.properties,
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (err) { }
      },
      invalidatesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: `/cart/${cartData.id}`,
        body: {
          quantity: cartData.quantity,
          properties: cartData.qualities,
          paymentType: cartData.paymentType,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart/deleteAllByUser',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    verifyCart: builder.mutation({
      query: ({ productsIds = [], code = '' }) => ({
        url: '/cart/verify',
        method: 'POST',
        body: { productsIds, code },
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled


          cartApi.endpoints.getAllCarts.initiate()
        } catch (err) { }
      },

      providesTags: ['Cart'],
    }),
    CouponQuery: builder.mutation({
      query: (code) => ({
        url: `coupons/getCouponByNameAndProducts`,
        body: { code },
        method: 'post'
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled


          cartApi.endpoints.getAllCarts.initiate()
        } catch (err) { }
      },
      providesTags: ['cart'],
    }),
  }),
})

export const {
  useGetAllCartsQuery,
  useLazyGetAllCartsQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useUpdateQuantityMutation,
  useClearCartMutation,
  useVerifyCartMutation,
  useCouponQueryMutation

} = cartApi
export default cartApi
