import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 import cartApi from './cartApi'
import { baseUrl } from '../components/service'
 
const PointsApi = createApi({
  reducerPath: 'points',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      return headers
    },
  }),
  
  keepUnusedDataFor: 0,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({

    SubmitPoints: builder.mutation({
        query: (userToken) => ({
            url: '/points-management/grantPoints',
            body: userToken,
            method: 'POST'
        })
  ,
        invalidatesTags: [ 'cart'] 
    }),
})
  
})

export const {
  useSubmitPointsMutation
} = PointsApi
export default PointsApi
