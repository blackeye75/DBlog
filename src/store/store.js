import { configureStore } from "@reduxjs/toolkit";
import reducer from "../store/authSlice"

const store =configureStore({
    reducer:{
        reducer:reducer
    }
});

export default store;