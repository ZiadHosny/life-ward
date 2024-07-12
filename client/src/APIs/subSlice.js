import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subId: ''
};
const subSlice = createSlice({
    name: "subSlice",
    initialState,
    reducers: {
        setSubId: (state, actions) => {
            state.subId = actions.payload
        },
    },
});

export const { setSubId } = subSlice.actions;
export default subSlice.reducer;
