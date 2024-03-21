import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    // initialState: {token: null},
    initialState: {token: JSON.parse(localStorage.getItem('token')) || null},
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;