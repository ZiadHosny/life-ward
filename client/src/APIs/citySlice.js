import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCity: localStorage['city'] ?? null,
};
const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setCurrentCity: (state, action) => {
            // if (action.payload?._id)
            //     localStorage['city'] = action.payload?._id;
            state.currentCity = action.payload;
        },
    },
});

export const { setCurrentCity } = citySlice.actions;
export default citySlice.reducer;
