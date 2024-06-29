import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    phone: '',
    for: 'yourself'
};
const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.open = true;
        },
        closeDialog: (state) => {
            state.open = false;
        },
        submitDialog: (state, action) => {
            const { phone, for: sendFor } = action.payload
            state.phone = phone
            state.for = sendFor
            state.open = false
        },
    },
});

export const { closeDialog, openDialog, submitDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
