import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import tokenReducer from "./reducers/token";
import moviesReducer from "./reducers/movies";

export const store = configureStore({
    reducer: {user: userReducer, token: tokenReducer, movies: moviesReducer}
});