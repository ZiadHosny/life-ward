import { createSlice } from "@reduxjs/toolkit";
import { } from "@reduxjs/toolkit";

const initialState = {
  cart: 0,
  totalPrice: 0,
  goToCart: false
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state) => {
      state.cart++;
    },
    DecrementCart: (state) => {
      state.cart -= 1;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    calculateTheTotalCart: (state, action) => {
      let sumRes = 0;
      action.payload.forEach((item) => {
        sumRes += item?.product?.price * item?.Quantity;
      });
      state.totalPrice = sumRes;
    },
    setGoToCart: (state, action) => {
      state.goToCart = action.payload;
    },
  },
});

export const { incrementCart, DecrementCart, setCart, calculateTheTotalCart, setGoToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
