import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slice/AuthSlice";

const reduxStore = configureStore({
    reducer : {
        auth: authReducer
    }
})

export default reduxStore