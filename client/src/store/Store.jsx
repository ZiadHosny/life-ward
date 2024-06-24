import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoriesApi } from "../APIs/categoriesApi";
import { ProductsApi } from "../APIs/ProductApis";
import { savedProductsApi } from "../APIs/SavedProductApi";
import { SectionApi } from "../APIs/SectionApis";
import { userApi } from "../APIs/UserApis";
import savedReducer from "../APIs/savedSlice";
import cartReducer from "../APIs/cartSlice";
import guestUserApi from "../APIs/gestUserApi";
import cartApi from "../APIs/cartApi";
import aboutUsApi from "../APIs/aboutUsApi";
import contactsApi from "../APIs/contactsApis";
import ordersApi from "../APIs/ordersApi";
import refetchReducer from "../APIs/refetchSlice";
import privacyApi from "../APIs/privacyApi";
import bannerApi from "../APIs/bannerApi";
import userSlice from "../APIs/userSlice";
import occasionsApi from "../APIs/occasionsApi";
import { verifySmsApi } from "../APIs/verifySmsApi";
import { uploadApi } from "../APIs/UploadAPi";
import fastDeliveryCoastApi from "../APIs/fastCoastApi";
import noteApi from "../APIs/noteApi";
import { blogsApi } from "../APIs/blogsApi";
import categoriesSlice from "../APIs/categoriesSlice";
import { NotificationsApi } from "../APIs/NotificationsApi";
import { webhookApi } from "../APIs/webhookApi";
import forgetPassApi from "../APIs/forgetPassApi";
import commentsApi from "../APIs/commentApi";
import PointsApi from "../APIs/pointsApi";
const RootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [ProductsApi.reducerPath]: ProductsApi.reducer,
  [SectionApi.reducerPath]: SectionApi.reducer,
  [savedProductsApi.reducerPath]: savedProductsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [guestUserApi.reducerPath]: guestUserApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [aboutUsApi.reducerPath]: aboutUsApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [privacyApi.reducerPath]: privacyApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [occasionsApi.reducerPath]: occasionsApi.reducer,
  [verifySmsApi.reducerPath]: verifySmsApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [fastDeliveryCoastApi.reducerPath]: fastDeliveryCoastApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  [NotificationsApi.reducerPath]: NotificationsApi.reducer,
  [forgetPassApi.reducerPath]: forgetPassApi.reducer,
  [webhookApi.reducerPath]: webhookApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [PointsApi.reducerPath]: PointsApi.reducer,
 
  saved: savedReducer,
  cart: cartReducer,
  refetching: refetchReducer,
  currentUser: userSlice,
  categoriesSlice,
  
});
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      ProductsApi.middleware,
      SectionApi.middleware,
      savedProductsApi.middleware,
      categoriesApi.middleware,
      guestUserApi.middleware,
      cartApi.middleware,
      aboutUsApi.middleware,
      contactsApi.middleware,
      ordersApi.middleware,
      privacyApi.middleware,
      bannerApi.middleware,
      occasionsApi.middleware,
      verifySmsApi.middleware,
      uploadApi.middleware,
      fastDeliveryCoastApi.middleware,
      noteApi.middleware,
      blogsApi.middleware,
      NotificationsApi.middleware,
      forgetPassApi.middleware,
      webhookApi.middleware,
      commentsApi.middleware,
      PointsApi.middleware,
 

    );
  },
});
