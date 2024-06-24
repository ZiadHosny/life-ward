import { createSlice } from "@reduxjs/toolkit";
import {} from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    setCurrentUser: (state, { payload }) => (state = { ...payload }),
    removeCurrentUser: (state) => (state = null),
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export default userSlice.reducer;
