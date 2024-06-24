import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    getCategories: (state, actions) => {
      return (state = actions.payload);
    },
  },
});

export const { getCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
