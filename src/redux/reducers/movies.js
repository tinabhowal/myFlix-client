import { createSlice } from "@reduxjs/toolkit"; 

const moviesSlice = createSlice({
    name:"movies",
    initialState: { list:[], filter:""},
    reducers:{
        setMovies:(state, action) => {
            state.list = action.payload
        },
        setFilter:(state,action) => {
            state.filter = action.payload
        },
        addMovie:(state, action) => {
            state.list.push(action.payload)
        }
    }
});

export const { setMovies, setFilter, addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;