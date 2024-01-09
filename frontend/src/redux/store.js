import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import noteSlice from "./slices/noteSlice";

const combine = combineReducers({
    user:userSlice.reducer,
    note:noteSlice.reducer
})

export const store = configureStore({
    reducer:combine
})